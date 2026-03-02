Prism.languages.opengoal_ir = {

  // -------------------------------------------------
  // SPECIAL IR COMMENT (must come FIRST)
  // -------------------------------------------------
  'ir-comment': {
    pattern: /;;\s*\[\s*\d+\s*\][^\n]*/,
    greedy: true,
    inside: {

      // the leading ;;
      'comment-prefix': {
        pattern: /^;;/,
        alias: 'comment'
      },

      // operation number
      'operation-number': {
        pattern: /\[\s*\d+\s*\]/,
        alias: 'number'
      },

      // embedded OpenGOAL
      'opengoal': {
        pattern: /(?<=\]\s*)\([\s\S]*?(?=\s+\[)/,
        greedy: true,
        inside: Prism.languages.opengoal
      },

      // everything else stays comment colored
      'comment-rest': {
        pattern: /.*/,
        alias: 'comment'
      }
    }
  },

  // -------------------------------------------------
  // FUNCTION HEADER
  // -------------------------------------------------
  'function-header': {
    pattern: /;\s*\.function\s+\S+/,
    greedy: true,
    inside: {
      'comment': {
        pattern: /^;\s*\.function/,
      },
      'function': {
        pattern: /\S+$/,
      }
    }
  },

  // -------------------------------------------------
  // GENERIC COMMENTS (greedy so nothing leaks)
  // -------------------------------------------------
  comment: {
    pattern: /;.*/,
    greedy: true
  },

  // -------------------------------------------------
  // STRINGS
  // -------------------------------------------------
  string: {
    pattern: /"(?:[^"\\]|\\.)*"/,
    greedy: true
  },

  // -------------------------------------------------
  // LABELS
  // -------------------------------------------------
  builtin: {
    pattern: /\b[BL]\d+:/,
  },

  // -------------------------------------------------
  // MNEMONIC
  // -------------------------------------------------
  keyword: {
    pattern: /^\s+[a-z][\w\.]*/m,
    greedy: true
  },

  // -------------------------------------------------
  // PUNCTUATION
  // -------------------------------------------------
  punctuation: {
    pattern: /[(),]/,
  },

  // -------------------------------------------------
  // REGISTERS
  // -------------------------------------------------
  variable: {
    pattern: /\b(?:ra|sp|fp|gp|r0|t\d|a\d|v\d|vf\d+|vi\d+)\b/
  },

  // -------------------------------------------------
  // NUMBERS
  // -------------------------------------------------
  number: {
    pattern: /\b\d+\b/
  },
};