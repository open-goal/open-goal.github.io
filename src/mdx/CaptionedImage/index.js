import React from "react";

import styles from "./styles.module.css";

const CaptionedImage = ({ src, caption }) => (
  <figure className={styles.captionContainer}>
    <img
      // Manual addition of the class that comes with markdown created images
      class="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module"
      loading="lazy"
      src={src}
      alt={caption}
    />
    <figcaption>{caption}</figcaption>
  </figure>
);

export default CaptionedImage;
