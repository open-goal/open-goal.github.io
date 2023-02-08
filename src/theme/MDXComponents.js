// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import CaptionedImage from '@site/src/mdx/CaptionedImage';
import PRLink from '@site/src/mdx/PRLink';
import ImageCompare from '@site/src/mdx/ImageCompare';
import DocToggle from '@site/src/mdx/Documentation/DocToggle';
import DocVariableBlock from '@site/src/mdx/Documentation/DocVariableBlock';
import ReactPlayer from 'react-player';
import LauncherDownloadLink from "@site/src/components/LauncherDownloadLink";
import { MarkGithubIcon } from '@primer/octicons-react';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  "CaptionedImage": CaptionedImage,
  "PRLink": PRLink,
  "ReactPlayer": ReactPlayer,
  "ImageCompare": ImageCompare,
  "LauncherDownloadLink": LauncherDownloadLink,
  "DocToggle": DocToggle,
  "DocVariableBlock": DocVariableBlock,
  "MarkGithubIcon": MarkGithubIcon
};
