import { readFileSync, writeFileSync } from 'fs';

function isSpecialCharacter(char) {
  return !(/[a-zA-Z]/).test(char)
}

function generateSymbolIndex(symbolList) {
  let symbols = {}; // String : Object {String : String}
  let output = "---\nsidebar_position: 1\n---\n\n# Symbol Index\n\nA complete directory of _all_ symbols. Click any symbol to be taken to it's relevant documentation.\n\n";

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

  writeFileSync("./documentation/source-docs/jak2/symbol-index.mdx", output);
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
  let packages = {}
  let output = {html: "---\nsidebar_position: 0\n---\n\n# Package Index\n\nBeing as in OpenGOAL everything is one huge global namespace, it is difficult to organize into digestible and related modules.\n\nTo solve this, a `package` is simply a folder in `goal_src/`. This is similar to how a language like Golang handles packages, but purely for organizational reasons.\n\nThe `_unknown` package is a catch-all for anything that is not associated with a file for one reason or another (likely a bug!)\n\n"};
  for (const [file_path, file_info] of Object.entries(fileDocs)) {
    let path = file_path.substring(0, file_path.lastIndexOf("/"));
    // Split the path into it's components
    let pathComponents = path.split("/");
    if (path === "") {
      pathComponents = ["_unknown"]
    }
    // Insert package into the hierarchical tree
    addComponentToPackageTree(packages, pathComponents);
  }

  // Recursively iterate through it, building up a list
  recursivelyPrintPackageTree(output, packages);
  writeFileSync("./documentation/source-docs/jak2/package-index.mdx", output.html);
}

// TODO - take an argument from CLI
// let symbol_rawdata = readFileSync("./scripts/doc-formatter/symbol-map.json");
// let symbolList = JSON.parse(symbol_rawdata);
// generateSymbolIndex(symbolList)

let file_docs_data = readFileSync("./scripts/doc-formatter/file-docs.json");
let file_docs = JSON.parse(file_docs_data);
generatePackageIndex(file_docs);

// package page:
// - all symbol definitions in that package
// - go-to definition source (the file)
// - call out where its been forward declared
