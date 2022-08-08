// TODO - quoted expressions
Prism.languages.opengoal_goos = {
	'comment': [
		{
			pattern: /#\|[\s\S]*?(?:\|#|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:]);+.*/,
			lookbehind: true,
			greedy: true
		}
	],
  'string': {
		pattern: /"(?:[^"\\]|\\.)*"/,
		greedy: true
	},
  'keyword': {
		pattern: /de[sf][\w\d._:+=><!?*-]*/,
		lookbehind: true
	},
  'function': {
		pattern: /((?:^|[^'])\()[\w*+!?'<>=/.-]+(?=[\s)]|$)/,
		lookbehind: true
	},
  'constant': [
    // nil
    {
      pattern: /(none)(?=\s|\)|\]|\})/,
      greedy: true
    }
  ],
  'boolean': [
    // true/false,
    {
      pattern: /(#t|#f)/,
      greedy: true
    }
  ],
  'number': [
    // ratio
    {
      pattern: /([-+]?\d+\/\d+)/,
      greedy: true
    },
    // hex
    {
      pattern: /([-+]?#[0-9a-fA-F]+N?)/,
      greedy: true
    },
    // binary
    {
      pattern: /([-+]?#b[0-9a-fA-F]+N?)/,
      greedy: true
    },
    // floats
    {
      pattern: /([-+]?[0-9]+(?:(\.|(?=[eEM]))[0-9]*([eE][-+]?[0-9]+)?)M?)/,
      greedy: true
    },
    // integers
    {
      pattern: /\s([-+]?\d+N?)/,
      greedy: true
    }
  ],
  'property': [
    // keyword
    {
      pattern: /(\s|\(|\[|\{):[\w\#\.\-\_\:\+\=\>\<\/\!\?\*]+(?=(\s|\)|\]|\}|\,))/,
      lookbehind: true
    }
  ],
  'operator': [
    // reader macros
    {
      pattern: /('|,@|`|,|&->)/
    }
  ]
};
