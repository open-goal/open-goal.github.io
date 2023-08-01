import React from "react";

export default function ImageCompare({
  children,
  left,
  right,
  altLeft,
  altRight,
}) {
  return (
    <div className="row">
      <div className="col col--6">
        <img src={left} loading="lazy" alt={altLeft ?? ""} />
      </div>
      <div className="col col--6">
        <img src={right} loading="lazy" alt={altRight ?? ""} />
      </div>
    </div>
  );
}
