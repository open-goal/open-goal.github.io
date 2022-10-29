import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import PRLink from '@site/src/mdx/PRLink';
import ImageCompare from '@site/src/mdx/ImageCompare';
import ReactPlayer from 'react-player'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  "PRLink": PRLink,
  "ReactPlayer": ReactPlayer,
  "ImageCompare": ImageCompare
};
