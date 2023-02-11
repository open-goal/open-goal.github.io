import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';

function isSpecialCharacter(char) {
  return !(/[a-zA-Z]/).test(char)
}

function generateSymbolIndex(symbolList) {
  console.log("Generating Symbol Index...")
  let symbols = {}; // String : Object {String : String}
  let output = "---\nsidebar_position: 1\ncustom_edit_url: null\n---\n\n# Symbol Index\n\nA complete directory of _all_ symbols. Click any symbol to be taken to it's relevant documentation.\n\n";

  for (const [symbol_name, symbol_info] of Object.entries(symbolList)) {
    // Skip art constants, TODO - separate page?
    if (symbol_name.endsWith("-ja")) {
      continue;
    }
    // Figure out what bucket to put the symbol into
    let firstChar = symbol_name.at(0);
    if (firstChar == "*" && symbol_name.length > 1) {
      firstChar = symbol_name.at(1);
    }

    if (isSpecialCharacter(firstChar)) {
      firstChar = "_";
    } else {
      firstChar = firstChar.toUpperCase();
    }

    if (!symbols.hasOwnProperty(firstChar)) {
      symbols[firstChar] = [];
    }

    // TODO - Use the location to generate a link to the package it's defined within (directly to the symbol too?)

    symbols[firstChar].push({
      name: symbol_info.name,
      link: "www.google.com"
    });
  }

  // Get the keys and sort them
  let headings = Object.keys(symbols).sort();
  for (const key of headings) {
    output += `### ${key}\n\n`;
    output += `<div class="no-margin">\n\n`
    let symbol_section = symbols[key].sort((a, b) => a.name.localeCompare(b.name));
    for (const symbol of symbol_section) {
      output += `[\`${symbol.name}\`](${symbol.link})\n\n`;
    }
    output += `</div>\n\n`;
  }

  // TODO - jak 2 specific
  writeFileSync("./documentation/source-docs/jak2/symbol-index.mdx", output);
  console.log("Generating Symbol Index...Done!")
}

function addComponentToPackageTree(packages, components) {
  if (components.length === 0) {
    return;
  }
  let currentComponent = components[0];
  if (!packages.hasOwnProperty(currentComponent)) {
    packages[currentComponent] = {}
  }
  components.shift();
  addComponentToPackageTree(packages[currentComponent], components);
}

function recursivelyPrintPackageTree(output, packages) {
  output.html += `<ul>`;
  let package_names = Object.keys(packages).sort();
  for (const package_name of package_names) {
    let subpackages = packages[package_name];
    output.html += `<li><a href="#">${package_name}</a></li>`;
    if (Object.keys(subpackages).length > 0) {
      recursivelyPrintPackageTree(output, subpackages);
    }
  }
  output.html += `</ul>`;
}

function generatePackageIndex(fileDocs) {
  console.log("Generating Package Index...")
  let packages = {}
  let output = {html: "---\nsidebar_position: 0\nhide_table_of_contents: true\ncustom_edit_url: null\n---\n\n# Package Index\n\nBeing as in OpenGOAL everything is one huge global namespace, it is difficult to organize into digestible and related modules.\n\nTo solve this, a `package` is simply a folder in `goal_src/`. This is similar to how a language like Golang handles packages, but purely for organizational reasons.\n\nThe `unknown` package is a catch-all for anything that is not associated with a file for one reason or another (likely a bug!)\n\n"};
  for (const [file_path, file_info] of Object.entries(fileDocs)) {
    let path = file_path.substring(0, file_path.lastIndexOf("/"));
    // Split the path into it's components
    let pathComponents = path.split("/");
    if (path === "") {
      pathComponents = ["unknown"]
    }
    // Insert package into the hierarchical tree
    addComponentToPackageTree(packages, pathComponents);
  }

  // Recursively iterate through it, building up a list
  recursivelyPrintPackageTree(output, packages);
  // TODO - jak 2 specific
  writeFileSync("./documentation/source-docs/jak2/package-index.mdx", output.html);
  console.log("Generating Package Index...Done!")
  return packages
}

function generatePackageDocs(fileDocs) {
  console.log("Generating Package Docs...")
  // let flattened_packages = [];
  // recursivelyFlattenPackages(flattened_packages, packages, "");

  let package_docs = {};

  for (const [file_path, file_info] of Object.entries(fileDocs)) {
    let pkg = file_path.substring(0, file_path.lastIndexOf("/"));
    if (pkg === "") {
      pkg = "unknown";
      // TODO - jak 2 specific
    } else if (pkg.startsWith("jak2/")) {
      pkg = pkg.slice(5);
    }

    let filePath = `./documentation/source-docs/jak2/packages/${pkg}/index.mdx`;
    let pkg_name = pkg.substring(pkg.lastIndexOf("/")).replaceAll("/", "");
    if (!package_docs.hasOwnProperty(filePath)) {
      package_docs[filePath] = `---\npagination_next: null\npagination_prev: null\nhide_title: true\ntitle: \"${pkg_name}\"\ncustom_edit_url: null\ntoc_min_heading_level: 2\ntoc_max_heading_level: 4\n---\n\n<div class="doc-file">\n`;
    }

    let output = package_docs[filePath];
    if (pkg !== "unknown") {
      let file_name = file_path.substring(file_path.lastIndexOf("/") + 1).replace(".gc", "").replace(".gs", "");
      output += `\n<div class="doc-file-header">\n\n## ${file_name}\n<a href="TODO" class="doc-source-link" target="_blank">source</a>\n</div>\n`;
    }

    if (file_info.description !== "") {
      output += `<DocToggle>\n${file_info.description}\n</DocToggle>`;
    }

    if (file_info.types.length == 0 && file_info.constants.length == 0 && file_info.global_vars.length == 0) {
      output += `<span class="doc-nothing-defined">nothing defined</span>`;
      continue;
    }

    // TODO the rest!
    if (file_info.types.length > 0) {
      output += `\n### Types\n---\n\n`;
      for (const type of file_info.types) {
        output += `<div style={{visibility: "hidden", height: 0}}>\n\n#### \`${type.name}\`\n</div>\n<DocVariableBlock name={"${type.name}"} type={"${type.parent_type}"} isConst={false}>\n${type.description}\n`;
        // Fields
        if (type.fields.length > 0) {
          output += `\n##### *Fields*\n`;
          for (const field of type.fields) {
            output += `<DocVariableBlock name={"${field.name}"} type={"${field.type}"} isConst={false} closed={true}>\n${field.description}\n</DocVariableBlock>\n`;
          }
        }
        // Methods (and virtual states)
        let methods = type.methods.concat(type.states.filter(state => state.is_virtual)).sort((a, b) => a.id - b.id);
        if (methods.length > 0) {
          //  TODO - correct formatting for methods / states
          output += `\n##### *Methods*\n`;
          for (const method of methods) {
            output += `<DocVariableBlock name={"${method.name}"} type={"TODO"} isConst={false} closed={true}>\n${method.description}\n</DocVariableBlock>\n`;
          }
        }
        // States
        let states = type.states.filter(state => !state.is_virtual)
        if (states.length > 0) {
          //  TODO - correct formatting for methods / states
          output += `\n##### *States*\n`;
          for (const state of states) {
            output += `<DocVariableBlock name={"${state.name}"} type={"TODO"} isConst={false} closed={true}>\n${state.description}\n</DocVariableBlock>\n`;
          }
        }
        output += `</DocVariableBlock>\n`;
      }
    }
    // TODO - put something there if nothing is there

    // Variables and Constants
    let variables = file_info.constants.concat(file_info.global_vars).sort((a, b) => a.name.localeCompare(b.name));
    if (variables.length > 0) {
      output += `\n### Variables\n---\n\n`
      for (const variable of variables) {
        // TODO - go get link for the type
        output += `<div style={{visibility: "hidden", height: 0}}>\n\n#### \`${variable.name}\`\n</div>\n<DocVariableBlock name={"${variable.name}"} type={"${variable.type}"} isConst={${variable.is_constant}}>\n`
        output += variable.description + "\n";
        output += `</DocVariableBlock>\n`;
      }
    }

    package_docs[filePath] = output;
  }

  // Write out all package files
  for (const [package_path, docs] of Object.entries(package_docs)) {
    mkdirSync(dirname(package_path), { recursive: true });
    writeFileSync(package_path, docs + "\n</div>\n");
  }
  console.log("Generating Package Docs...Done!")
}

// TODO - take an argument from CLI
let symbol_rawdata = readFileSync("./scripts/doc-formatter/symbol-map.json");
let symbolList = JSON.parse(symbol_rawdata);
generateSymbolIndex(symbolList)

let file_docs_data = readFileSync("./scripts/doc-formatter/file-docs.json");
let file_docs = JSON.parse(file_docs_data);
generatePackageIndex(file_docs);
generatePackageDocs(file_docs);

// package page:
// - go-to definition source (the file)

// LONG TERM
// TODO - provide a rust-lang like search
// TODO - https://github.com/facebook/docusaurus/discussions/8467
// TODO - label forward decls
// TODO - any decent template library to clean this up with?

// TODO - builtin docs should go into the `reference page`
// TODO - metadata on doc generation (commit sha, date
// TOOD - examples for std-lib sections
// TODO - collapse entire file blocks
// TODO - do i account for files in the root folder of a package? probably not! ie. `jak2/engine/yar.gc`
// TODO - function and method args
// TODO - state args
// TODO - summarize docstring and auto-show that even for closed fields?
