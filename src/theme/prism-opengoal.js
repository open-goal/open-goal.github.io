Prism.languages.opengoal = {
  // ----------------------------------
  // Comments
  // ----------------------------------

  'block-comment': {
    pattern: /#\|[\s\S]*?\|#/,
    greedy: true
  },

  'comment': {
    pattern: /;[^\n]*/,
    greedy: true
  },

  // ----------------------------------
  // Strings (with ~ format specifiers)
  // ----------------------------------

  'string': {
    pattern: /"(?:\\.|~(?:[#vV]?[,0-9@:\-]*[\s\S])|[^\\~"])*~?"/,
    greedy: true,
    inside: {
      'format-specifier': {
        pattern: /~[#vV]?[,0-9@:\-]*[\s\S]/,
        alias: 'keyword'
      },
      'escape': {
        pattern: /\\./,
        alias: 'symbol'
      }
    }
  },

  // ----------------------------------
  // Characters
  // ----------------------------------

  'char': {
    pattern: /#\\(?:.|\\[snt])/,
    alias: 'string'
  },

  // ----------------------------------
  // Booleans + Null
  // ----------------------------------

  'boolean': /#(?:t|f)\b/,
  'null': /\bnone\b/,

  // ----------------------------------
  // Numbers
  // ----------------------------------

  'number': {
    pattern: /[+-]?(?:#x[0-9a-fA-F]+|#b[01]+|\d+\.\d*|\d+)/,
    greedy: true
  },

  // ----------------------------------
  // Keywords (colon-prefixed)
  // ----------------------------------

  'keyword': {
    pattern: /:[^\s()\[\]{}"@~^;`\\,:/][^\s()\[\]{}"@~^;`\\,]*/,
    greedy: true
  },

  // ----------------------------------
  // Quoting / Reader Macros
  // ----------------------------------

  'reader-macro': {
    pattern: /(?:,@|['`,])/,
    alias: 'operator'
  },

  // ----------------------------------
  // Symbols
  // ----------------------------------

  'symbol': {
    pattern: /\b\d+[^\s()\[\]{}"@~^;`\\,:'0-9][^\s()\[\]{}"@~^;`\\,]*|\b\/|[^\s()\[\]{}"@~^;`\\,:'0-9][^\s()\[\]{}"@~^;`\\,]*/,
    greedy: true
  },

  // ----------------------------------
  // Lists / Delimiters
  // ----------------------------------

  'punctuation': /[()\[\]{}]/,

  'operator': [
    // reader macros
    {
      pattern: /('|,@|`|,|&->)/,
    },
  ],

  'keyword': {
    pattern: /de[sf][\w\d._:+=><!?*-]*/,
    lookbehind: true,
  },
  'keyword': {
    pattern: /((?:^|[^'])\()[\w*+!?'<>=/.-]+(?=[\s)]|$)/,
    lookbehind: true,
  },
};