import React from 'react';

export default function DocVariableBlock({children, name, type, isConst, closed, sourceLink}) {
  return (
    <details class="doc-toggle" open={closed ? !closed : true}>
      <summary class="doc-identifier-heading">
        <span class="monospaced">
            {isConst ? "const " : ""}
            <a class="doc-identifier-link" href="#TODO">{name}</a> : <a class="doc-symbol-link" href="TODO">{type}</a>
        </span>
        <a href="TODO" class="doc-source-link" target="_blank">source</a>
      </summary>
      <div class="doc-block">
        {children}
      </div>
    </details>
  );
}

// TODO - inline array/dynamic/etc
// TODO - states virtual / handlers
// TODO - signatures

// Hidden TOC entries

{/* <div style={{display: "none"}}>
### test
</div> */}
