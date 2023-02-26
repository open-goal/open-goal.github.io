import React from 'react';
import clsx from 'clsx';
import BlogPostItemHeaderAuthor from '@theme/BlogPostItem/Header/Author';
import styles from './styles.module.css';
// Component responsible for the authors layout
export default function PostAuthors({className, authors}) {
  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }
  return (
    <div
      className={clsx(
        'margin-top--md margin-bottom--sm',
        styles.imageOnlyAuthorRow,
        className,
      )}>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            styles.imageOnlyAuthorCol,
          )}
          key={idx}>
          <BlogPostItemHeaderAuthor
            author={{
              ...author,
              name: author,
              url: `https://github.com/${author}`,
              imageURL: `https://github.com/${author}.png`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
