import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import CaptionedImage from '@site/src/mdx/CaptionedImage';
import PRLink from '@site/src/mdx/PRLink';
import ImageCompare from '@site/src/mdx/ImageCompare';
import ReactPlayer from 'react-player'
import LauncherDownloadLink from "@site/src/components/LauncherDownloadLink"
import PostAuthors from '../mdx/PostAuthors/Header/Authors';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  "CaptionedImage": CaptionedImage,
  "PRLink": PRLink,
  "ReactPlayer": ReactPlayer,
  "ImageCompare": ImageCompare,
  "LauncherDownloadLink": LauncherDownloadLink,
  "PostAuthors": PostAuthors,
};
