import React from "react";

export default function DocToggle({ children, summary }) {
  return (
    <details class="doc-toggle" open>
      <summary class="hideme">
        <span>{summary ? summary : "Expand description"}</span>
      </summary>
      <div class="doc-block">{children}</div>
    </details>
  );
}
