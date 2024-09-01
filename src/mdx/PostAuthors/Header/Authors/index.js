import React from "react";
import clsx from "clsx";
import BlogAuthor from '@theme/Blog/Components/Author';
import styles from "./styles.module.css";
// Component responsible for the authors layout
// authorNames is optional
export default function PostAuthors({ className, authors, authorNames }) {
  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }
  return (
    <div
      className={clsx(
        "margin-top--md margin-bottom--sm",
        styles.imageOnlyAuthorRow,
        className,
      )}
    >
      {authors.map((author, idx) => (
        <div className={clsx(styles.imageOnlyAuthorCol)} key={idx}>
          <BlogAuthor
            author={{
              ...author,
              name:
                authorNames && idx < authorNames.length && authorNames[idx]
                  ? authorNames[idx]
                  : author,
              url: `https://github.com/${author}`,
              imageURL: `https://github.com/${author}.png`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
