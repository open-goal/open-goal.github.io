// TODO - embeded opengoal
// TODO - registers and CSS rules to make it look nice
// TODO - op numbers
// TODO - mnemonic styling
Prism.languages.opengoal_ir = {
  'string': {
		pattern: /"(?:[^"\\]|\\.)*"/,
		greedy: true
	},
  'function': [
    // function names
    {
      pattern: /;\s\.function\s(.*)/
    },
    // mnemonics
    {
      pattern: /^\s+\b([\w\.]+)\b/,
      greedy: true
    }
  ],
  'comment': [
		{
			pattern: /;+.*/,
		}
	],
  'property': [
    // function calls
    {
      pattern: /s7,\s[\w-!\*]+/,
      greedy: true
    },
    {
      pattern: /([\w-!\*]+)(?:\(s7\))/,
      greedy: true
    },
    {
      pattern: /\bt9/
    }
  ],
  'builtin': [
    {
      pattern: /[BL]\d+:?/
    }
  ],
  'keyword': {
		pattern: /[astv][0-3](?:-\d+)?/,
		lookbehind: true
	},
  'number': [
    // op number
    {
      pattern: /(?:;; )\[([\s\d]+)\]/,
      greedy: true
    },
    // immediates
    {
      pattern: /\b(\d+)|r0/,
      greedy: true
    }
  ],
};
