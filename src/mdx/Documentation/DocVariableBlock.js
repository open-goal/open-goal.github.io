import React from 'react';

export default function DocVariableBlock({children, name, type, isConst, sourceLink}) {
  return (
    <details class="doc-toggle" open>
      <summary class="doc-identifier-heading">
        <span class="monospaced">{isConst ? "const " : ""}<a class="doc-identifier-link" href="#TODO">{name}</a> : <a class="doc-symbol-link" href="TODO">{type}</a></span>
        <a href="TODO" class="doc-source-link" target="_blank">source</a>
      </summary>
      <div class="doc-block">
        {children}
      </div>
    </details>
  );
}
