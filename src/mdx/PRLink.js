import React from 'react';
import { MarkGithubIcon } from '@primer/octicons-react'

export default function PRLink({href}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <MarkGithubIcon size={16} verticalAlign="middle"/>
    </a>
  );
}
