import { readFileSync, writeFileSync } from 'fs';

function isSpecialCharacter(char) {
  return !(/[a-zA-Z]/).test(char)
}

function generateSymbolIndex(symbolList) {
  let symbols = {}; // String : Object {String : String}
  let output = "# Symbol Index\n\nA complete directory of _all_ symbols. Click any symbol to be taken to it's relevant documentation.\n\n";

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

// TODO - take an argument from CLI
let symbol_rawdata = readFileSync("./scripts/doc-formatter/symbol-map.json");
let symbolList = JSON.parse(symbol_rawdata);
generateSymbolIndex(symbolList)
