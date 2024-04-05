import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, sep, join } from "path";

// TODO - collapse entire file blocks
// TODO - provide a rust-lang like search
// TODO - https://github.com/facebook/docusaurus/discussions/8467
// TODO - label forward decls
// TODO - metadata on doc generation (commit sha, date
// TOOD - examples for std-lib sections
// TODO - high level docs
// TODO - summarize docstring and auto-show that even for closed fields?
// TODO - cleanup the doc component
// TODO - run docstrings through a markdown generator
// TODO - use normal h5's for field headers and such
// TODO - better styling on collapsible headers

// Issues:
// - defbehaviours not being captured?
// - docstrings from defmethods aren't making it through?
// - some functions are ending up in the unknown section (add-nav-sphere)

function isSpecialCharacter(char) {
  return !/[a-zA-Z]/.test(char);
}

function getPackageSubPathFromFilePath(gameName, filePath) {
  let pkg = filePath.substring(0, filePath.lastIndexOf("/"));
  if (pkg === "") {
    pkg = "unknown";
  } else if (pkg.startsWith(`${gameName}/`)) {
    pkg = pkg.slice(5);
  }
  return pkg;
}

function getPackageNameFromPackageSubPath(pkgSubPath) {
  return pkgSubPath.substring(pkgSubPath.lastIndexOf("/")).replaceAll("/", "");
}

function generateSymbolIndex(gameName, symbolList) {
  console.log("Generating Symbol Index...");
  let symbols = {}; // String : Object {String : String}
  let output =
    "---\nsidebar_position: 1\ncustom_edit_url: null\n---\n\n# Symbol Index\n\nA complete directory of _all_ symbols. Click any symbol to be taken to it's relevant documentation.\n\n";
  for (const [symbolName, symbolInfo] of Object.entries(symbolList)) {
    // Skip art constants, TODO - separate page?
    if (
      symbolName.endsWith("-ja") ||
      symbolName.endsWith("-jg") ||
      symbolName.endsWith("-mg")
    ) {
      continue;
    }
    // Figure out what bucket to put the symbol into
    let firstChar = symbolName.at(0);
    if (firstChar == "*" && symbolName.length > 1) {
      firstChar = symbolName.at(1);
    }
    if (isSpecialCharacter(firstChar)) {
      firstChar = "_";
    } else {
      firstChar = firstChar.toUpperCase();
    }
    if (!symbols.hasOwnProperty(firstChar)) {
      symbols[firstChar] = [];
    }
    // TODO - a temporary hack to work-around files being shared across game directories not being a
    // properly thought out solution yet
    //
    // The generation in `jak-project` does not handle this well, leading to issues here where the path is not as expected
    //
    // They should instead be in a `common` folder, and there should be a `common` source-docs folder
    // Doing so properly, will require some thought.
    if (
      symbolInfo.def_location === undefined ||
      !symbolInfo.def_location.filename.startsWith("work/jak-project")
    ) {
      symbols[firstChar].push({
        name: symbolInfo.name,
        filePath: symbolInfo.def_location,
      });
    }
  }
  // Get the keys and sort them
  let headings = Object.keys(symbols).sort();
  for (const key of headings) {
    output += `### ${key}\n\n`;
    output += `<div class="no-margin">\n\n`;
    let symbol_section = symbols[key].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    for (const symbol of symbol_section) {
      let docFilePath = "#";
      if (symbol.filePath) {
        let pkgPath = getPackageSubPathFromFilePath(
          gameName,
          symbol.filePath.filename,
        );
        docFilePath = `/docs/source-docs/${gameName}/packages/${pkgPath}/`;
        output += `[\`${symbol.name}\`](${docFilePath})\n\n`;
      } else {
        output += `\`${symbol.name}\`\n\n`;
      }
    }
    output += `</div>\n\n`;
  }
  writeFileSync(
    `./documentation/source-docs/${gameName}/symbol-index.mdx`,
    output,
  );
  console.log("Generating Symbol Index...Done!");
}

function addComponentToPackageTree(packages, components) {
  if (components.length === 0) {
    return;
  }
  let currentComponent = components[0];
  if (!packages.hasOwnProperty(currentComponent)) {
    packages[currentComponent] = {};
  }
  components.shift();
  addComponentToPackageTree(packages[currentComponent], components);
}

// As we pass through the files, we have to lookup a reference to another symbol/method/etc
// When we find them, we cache the result in a simple flattened map so we can find it later
//
// describe formats
let crossReferenceLinkCache = new Map();

function findCrossReference(gameName, reference, fileDocs) {
  // First, do the obvious, if it's in the cache return it
  if (crossReferenceLinkCache.has(reference)) {
    return crossReferenceLinkCache.get(reference);
  }
  // Otherwise, we gotta go find it
  // references come in a few supported syntaxes
  // - plain symbols / types / functions / macros / globals / constants / non virtual states
  //   - [[name-of-symbol]] => #symName-<name>
  // - methods / virtual states / enums / bitfields
  //   - [[type::id (or val in the case of a enum/bitfield) ]] => #typeDecl-<type>-<val>
  // So all we do is enumerate through all the packages until we find the file it will be generated in
  // from that, we can assume what the anchor tag will be and create our link
  const isPlain = !reference.includes("::");
  const symName = isPlain ? reference : undefined;
  const typeName = isPlain ? undefined : reference.split("::")[0];
  const typeVal = isPlain ? undefined : reference.split("::")[1];
  for (const [filePath, fileInfo] of Object.entries(fileDocs)) {
    const pkgPath = getPackageSubPathFromFilePath(gameName, filePath);
    const srcPath = `/docs/source-docs/${gameName}/packages/${pkgPath}`;
    if (!isPlain) {
      // Check the types
      const link = `${srcPath}#typeDecl-${typeName}-${typeVal}`;
      for (const type of fileInfo.types) {
        if (type.name === typeName) {
          // Then check to see if the value matches a method/state id
          const methods = type.methods
            .concat(type.states.filter((state) => state.is_virtual))
            .sort((a, b) => a.id - b.id);
          for (const method of methods) {
            if (`${method.id}` === typeVal) {
              crossReferenceLinkCache.set(reference, link);
              return link;
            }
          }
        }
      }
    } else {
      const link = `${srcPath}#symName-${symName}`;
      // Check everything else
      for (const variable of fileInfo.global_vars) {
        if (variable.name === symName) {
          crossReferenceLinkCache.set(reference, link);
          return link;
        }
      }
      for (const variable of fileInfo.constants) {
        if (variable.name === symName) {
          crossReferenceLinkCache.set(reference, link);
          return link;
        }
      }
      for (const func of fileInfo.functions) {
        if (func.name === symName) {
          crossReferenceLinkCache.set(reference, link);
          return link;
        }
      }
      for (const macro of fileInfo.macros) {
        if (macro.name === symName) {
          crossReferenceLinkCache.set(reference, link);
          return link;
        }
      }
      for (const type of fileInfo.types) {
        if (type.name === symName) {
          crossReferenceLinkCache.set(reference, link);
          return link;
        }
      }
    }
  }
  return "#";
}

function prepareDocstring(docstring, gameName, fileDocs) {
  if (docstring === "" || docstring === undefined) {
    return "";
  }
  // There are three main things that are done here:
  // - replace any problematic fields (ie. angle brackets in html)
  // - replace symbol references with links to the actual symbols
  // - strip out any pointless lines -- like for example @param syntax for functions is redundant
  let newString = docstring;
  newString = newString
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("{", "&lcub;")
    .replaceAll("}", "&rcub;");
  let words = newString.split(" ");
  let buffer = "";
  for (const word of words) {
    if (
      word.startsWith("[[") &&
      (word.endsWith("]]") || word.endsWith("]]'s"))
    ) {
      let reference = word.substring(
        2,
        word.length - (word.endsWith("]]'s") ? 4 : 2),
      );
      const url = findCrossReference(gameName, reference, fileDocs);
      if (url === "#" || url === undefined) {
        buffer += `<span class="doc-symbol-link">${reference}</span> `;
      } else {
        buffer += `<a href="${url}" class="doc-symbol-link">${reference}</a> `;
      }
    } else {
      buffer += `${word} `;
    }
  }
  buffer = buffer.trimEnd();
  let lines = buffer.split("\n");
  let finalLines = [];
  for (const line of lines) {
    if (line.startsWith("@param") || line.startsWith("@returns")) {
      continue;
    }
    finalLines.push(line.trim());
  }
  return `<div class="doc-docstring">\n${finalLines.join("<br/>")}\n</div>`;
}

function makeSignatureFromArgs(gameName, argList, fileDocs) {
  let signature = `(`;
  for (let i = 0; i < argList.length; i++) {
    const arg = argList[i];
    let url = findCrossReference(gameName, arg.type, fileDocs);
    let urlTag = "";
    if (url === "#" || url === undefined) {
      urlTag = `<span class="doc-symbol-link">${arg.type}</span>`;
    } else {
      urlTag = `<a href="${url}" class="doc-symbol-link">${arg.type}</a>`;
    }
    signature += `${arg.isMutated ? "mut " : ""}${arg.name}${
      arg.isOptional ? "?" : ""
    }: ${urlTag}`;
    if (i !== argList.length - 1) {
      signature += `, `;
    }
  }
  signature += `)`;
  return signature;
}

function makeGithubFileLink(gameName, def_location) {
  if (def_location === undefined) {
    return "null";
  }
  return `https://github.com/open-goal/jak-project/tree/master/goal_src/${gameName}/${
    def_location.filename
  }#L${def_location.line_idx + 1}`;
}

function findMethodInfo(methodId, typeName, fileDocs) {
  for (const [filePath, fileInfo] of Object.entries(fileDocs)) {
    for (const method of fileInfo.methods) {
      if (method.type === typeName && method.id === methodId) {
        return method;
      }
    }
  }
  return undefined;
}

function generatePackageDocs(gameName, fileDocs) {
  console.log("Generating Package Docs...");

  let package_docs = {};

  for (const [filePath, fileInfo] of Object.entries(fileDocs)) {
    let pkgPath = getPackageSubPathFromFilePath(gameName, filePath);
    let pkgName = getPackageNameFromPackageSubPath(pkgPath);
    let docFilePath = `./documentation/source-docs/${gameName}/packages/${pkgPath}/index.mdx`;
    if (!package_docs.hasOwnProperty(docFilePath)) {
      package_docs[docFilePath] =
        `---\npagination_next: null\npagination_prev: null\nhide_title: true\ntitle: \"${pkgName}\"\ncustom_edit_url: null\ntoc_min_heading_level: 2\ntoc_max_heading_level: 4\n---\n\n<div class="doc-file">\n`;
    }
    let output = package_docs[docFilePath];
    if (pkgPath !== "unknown") {
      let file_name = filePath
        .substring(filePath.lastIndexOf("/") + 1)
        .replace(".gc", "")
        .replace(".gs", "");
      output += `\n<div class="doc-file-header">\n\n## ${file_name}\n<a href="https://github.com/open-goal/jak-project/tree/master/goal_src/${file_name}" class="doc-source-link" target="_blank">source</a>\n</div>\n`;
    }
    if (fileInfo.description !== "") {
      output += `<DocToggle>\n${prepareDocstring(
        fileInfo.description,
        gameName,
        fileDocs,
      )}\n</DocToggle>`;
    }
    if (
      fileInfo.types.length === 0 &&
      fileInfo.constants.length === 0 &&
      fileInfo.global_vars.length === 0 &&
      fileInfo.functions.length === 0
    ) {
      output += `<span class="doc-nothing-defined">nothing defined</span>`;
      continue;
    }
    // TYPES
    if (fileInfo.types.length > 0) {
      output += `\n### Types\n---\n\n`;
      for (const type of fileInfo.types) {
        output += `<div style={{visibility: "hidden", height: 0}}>\n\n#### \`${type.name}\`\n</div>\n`;
        output += `<DocCollapsibleBlock name={"${type.name}"} type={"${
          type.parent_type
        }"} sourceLink={"${makeGithubFileLink(
          gameName,
          type.def_location,
        )}"}>\n${prepareDocstring(type.description, gameName, fileDocs)}\n`;
        // Fields
        if (type.fields.length > 0) {
          output += `\n##### *Fields*\n`;
          for (const field of type.fields) {
            output += `<DocCollapsibleBlock name={"${field.name}"} type={"${
              field.type
            }"} typeLink={"${findCrossReference(
              gameName,
              field.type,
              fileDocs,
            )}"} closed={true}>\n`;
            output +=
              prepareDocstring(field.description, gameName, fileDocs) + "\n";
            output += `</DocCollapsibleBlock>\n`;
          }
        }
        // Methods (and virtual states)
        // TODO - go and collect all methods for this type (not just the ones defined in the type declaration)
        let methods = type.methods
          .concat(type.states.filter((state) => state.is_virtual))
          .sort((a, b) => a.id - b.id);
        if (methods.length > 0) {
          output += `\n##### *Methods*\n`;
          for (const method of methods) {
            const method_info = findMethodInfo(method.id, type.name, fileDocs);
            if (method_info === undefined) {
              output += `<DocCollapsibleBlock name={"${method.name}"} type={"unknown"}></DocCollapsibleBlock>\n`;
            } else {
              const props = `docType={"method"} typeName={"${
                type.name
              }"} methodId={"${method.id}"} methodName={"${
                method.name
              }"} signatureHtml={\`${makeSignatureFromArgs(
                gameName,
                method_info.args,
                fileDocs,
              )}\`} returnType={"${
                method_info.return_type
              }"} returnTypeLink={"${findCrossReference(
                gameName,
                method_info.return_type,
                fileDocs,
              )}"} sourceLink={"${makeGithubFileLink(
                gameName,
                method_info.def_location,
              )}"}`;
              output += `<DocCollapsibleBlock ${props}>\n`;
              output +=
                prepareDocstring(method_info.description, gameName, fileDocs) +
                "\n";
              output += `</DocCollapsibleBlock>\n`;
            }
          }
        }
        // TODO - States
        let states = type.states.filter((state) => !state.is_virtual);
        if (states.length > 0) {
          output += `\n##### *States*\n`;
          for (const state of states) {
            output += `<DocCollapsibleBlock name={"${state.name}"} type={"TODO"} isConst={false} closed={true}></DocCollapsibleBlock>\n`;
          }
        }
        output += `</DocCollapsibleBlock>\n`;
      }
    }
    // FUNCTIONS
    if (fileInfo.functions.length > 0) {
      output += `\n### Functions\n---\n\n`;
      for (const func of fileInfo.functions) {
        const props = `docType={"function"} funcName={"${
          func.name
        }"} signatureHtml={\`${makeSignatureFromArgs(
          gameName,
          func.args,
          fileDocs,
        )}\`} returnType={"${
          func.return_type
        }"} returnTypeLink={"${findCrossReference(
          gameName,
          func.return_type,
          fileDocs,
        )}"} sourceLink={"${makeGithubFileLink(gameName, func.def_location)}"}`;
        output += `<div style={{visibility: "hidden", height: 0}}>\n\n#### \`${func.name}\`\n</div>\n<DocCollapsibleBlock ${props}>\n`;
        output += prepareDocstring(func.description, gameName, fileDocs) + "\n";
        output += `</DocCollapsibleBlock>\n`;
      }
    }

    // Variables and Constants
    let variables = fileInfo.constants
      .concat(fileInfo.global_vars)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (variables.length > 0) {
      output += `\n### Variables\n---\n\n`;
      for (const variable of variables) {
        // skip art groups
        if (
          variable.name.endsWith("-ja") ||
          variable.name.endsWith("-jg") ||
          variable.name.endsWith("-mg")
        ) {
          continue;
        }
        const props = `docType={"variable"} name={"${variable.name}"} type={"${
          variable.type
        }"} typeLink={"${findCrossReference(
          gameName,
          variable.type,
          fileDocs,
        )}"} sourceLink={"${makeGithubFileLink(
          gameName,
          variable.def_location,
        )}"} isConst={${variable.is_constant}}`;
        output += `<div style={{visibility: "hidden", height: 0}}>\n\n#### \`${variable.name}\`\n</div>\n<DocCollapsibleBlock ${props}>\n`;
        output +=
          prepareDocstring(variable.description, gameName, fileDocs) + "\n";
        output += `</DocCollapsibleBlock>\n`;
      }
    }

    // TODO - bitfields/enums

    package_docs[docFilePath] = output;
  }
  // Write out all package files
  for (const [package_path, docs] of Object.entries(package_docs)) {
    mkdirSync(dirname(package_path), { recursive: true });
    writeFileSync(package_path, docs + "\n</div>\n");
  }
  console.log("Generating Package Docs...Done!");
}

function walkPackageTree(startingPath) {
  const entries = readdirSync(startingPath, { withFileTypes: true });
  if (entries.length === 0) {
    return ["", false];
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));
  let dirTree = "<ul>";
  let hasIndexFile = false;
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const [subTree, shouldLink] = walkPackageTree(
        join(startingPath, entry.name),
      );
      dirTree += `<li>`;
      if (shouldLink) {
        dirTree += `<a href="${join(startingPath, entry.name)
          .replaceAll(sep, "/")
          .replace("documentation", "/docs")}">${entry.name}</a>`;
      } else {
        dirTree += entry.name;
      }
      dirTree += subTree + "</li>";
    } else if (entry.isFile() && entry.name === "index.mdx") {
      hasIndexFile = true;
    }
  }
  dirTree += "</ul>";
  return [dirTree, hasIndexFile];
}

function generatePackageIndex(gameName, fileDocs) {
  console.log("Generating Package Index...");
  let packages = {};
  let output =
    "---\nsidebar_position: 0\nhide_table_of_contents: true\ncustom_edit_url: null\n---\n\n# Package Index\n\nBeing as in OpenGOAL everything is one huge global namespace, it is difficult to organize into digestible and related modules.\n\nTo solve this, a `package` is simply a folder in `goal_src/`. This is similar to how a language like Golang handles packages, but purely for organizational reasons.\n\nThe `unknown` package is a catch-all for anything that is not associated with a file for one reason or another (likely a bug!)\n\n";
  for (const [file_path, file_info] of Object.entries(fileDocs)) {
    let path = file_path.substring(0, file_path.lastIndexOf("/"));
    // Split the path into it's components
    let pathComponents = path.split("/");
    if (path === "") {
      pathComponents = ["unknown"];
    }
    // Insert package into the hierarchical tree
    addComponentToPackageTree(packages, pathComponents);
  }

  // Recursively iterate through it, building up a list
  const [packageTree, ignore] = walkPackageTree(
    `./documentation/source-docs/${gameName}/packages`,
  );
  output += packageTree;
  writeFileSync(
    `./documentation/source-docs/${gameName}/package-index.mdx`,
    output,
  );
  console.log("Generating Package Index...Done!");
  return packages;
}

function generateSourceDocsForGame(gameName) {
  console.log(`Generating Docs for ${gameName}...`);
  mkdirSync(`./documentation/source-docs/${gameName}`, { recursive: true });
  crossReferenceLinkCache.clear();
  // Pull in the information generated by the REPL
  let symbolRawData = readFileSync(`./${gameName}-symbol-map.json`);
  let symbolList = JSON.parse(symbolRawData);
  let fileDocsRawData = readFileSync(`./${gameName}-file-docs.json`);
  let fileDocs = JSON.parse(fileDocsRawData);

  // Generate the full symbol index
  generateSymbolIndex(gameName, symbolList);

  // The big one, this generates docs for each and every package
  // which is just a collection of files
  generatePackageDocs(gameName, fileDocs);

  // Generate the full package index, use the directory tree!
  generatePackageIndex(gameName, fileDocs);

  // TODO - builtins (a whole separate page)
}

generateSourceDocsForGame("jak1");
generateSourceDocsForGame("jak2");
