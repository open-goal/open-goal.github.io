import React from 'react';
import parse from 'html-react-parser';

function CrossReferenceLink({text, url}) {
  if (url && url !== "#") {
    return (<a class="doc-symbol-link" href={url}>{text}</a>);
  } else {
    return (<span class="doc-symbol-link">{text}</span>);
  }
}

function FunctionBlock({ children, funcName, signatureHtml, returnType, returnTypeLink, closed, sourceLink }) {
  const anchor = `symName-${funcName}`;
  return (
    <details class="doc-toggle" open={closed ? !closed : true}>
      <summary class="doc-identifier-heading">
        <span class="monospaced">
          <a class="doc-identifier-link" href={`#${anchor}`} id={anchor}>{funcName}</a>{parse(signatureHtml)}{' => '}<CrossReferenceLink text={returnType} url={returnTypeLink}/>
        </span>
        {sourceLink ? <a href={sourceLink} class="doc-source-link" target="_blank">source</a> : (null)}
      </summary>
      <div class="doc-block">
        {children}
      </div>
    </details>
  );
}

function MethodBlock({ children, typeName, methodId, methodName, signatureHtml, returnType, returnTypeLink, closed, sourceLink }) {
  const anchor = `typeDecl-${typeName}-${methodId}`;
  return (
    <details class="doc-toggle" open={closed ? !closed : true}>
      <summary class="doc-identifier-heading">
        <span class="monospaced">
          <a class="doc-identifier-link" href={`#${anchor}`} id={anchor}>{methodName}</a>{parse(signatureHtml)}{' => '}<CrossReferenceLink text={returnType} url={returnTypeLink}/>
        </span>
        {sourceLink ? <a href={sourceLink} class="doc-source-link" target="_blank">source</a> : (null)}
      </summary>
      <div class="doc-block">
        {children}
      </div>
    </details>
  );
}

function VariableBlock({ children, name, closed, isConst, sourceLink, typeLink, type }) {
  const anchor = `symName-${name}`;
  return (
    <details class="doc-toggle" open={closed ? !closed : true}>
      <summary class="doc-identifier-heading">
        <span class="monospaced">
          {isConst ? "const " : ""}
          <a class="doc-identifier-link" href={`#${anchor}`} id={anchor}>{name}</a>: <CrossReferenceLink text={type} url={typeLink}/>
        </span>
        {sourceLink ? <a href={sourceLink} class="doc-source-link" target="_blank">source</a> : (null)}
      </summary>
      <div class="doc-block">
        {children}
      </div>
    </details>
  );
}

function GenericBlock({ children, name, closed, sourceLink, typeLink, type }) {
  return (
    <details class="doc-toggle" open={closed ? !closed : true}>
      <summary class="doc-identifier-heading">
        <span class="monospaced">
          <span class="doc-identifier-link">{name}</span>: <CrossReferenceLink text={type} url={typeLink}/>
        </span>
        {sourceLink ? <a href={sourceLink} class="doc-source-link" target="_blank">source</a> : (null)}
      </summary>
      <div class="doc-block">
        {children}
      </div>
    </details>
  );
}

export default function DocCollapsibleBlock(props) {
  if (props.docType === "function") {
    return <FunctionBlock {...props} />
  } else if (props.docType === "method") {
    return <MethodBlock {...props} />
  } else if (props.docType === "variable") {
    return <VariableBlock {...props} />
  } else {
    return <GenericBlock {...props} />
  }
}

// TODO - inline array/dynamic/etc
// TODO - states virtual / handlers
