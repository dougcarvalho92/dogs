import React, { ChangeEvent, useState } from "react";

import styles from "./Image.module.css";
interface ImageProps extends Partial<HTMLImageElement> {
  alt: string;
  src: string;
}
const Image = ({ alt, ...props }: ImageProps) => {
  const [skeleton, setSkeleton] = useState(true);
  function handleLoad({ target }: ChangeEvent<HTMLImageElement>) {
    setSkeleton(false);
    target.style.opacity = "1";
  }
  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img
        onLoad={handleLoad}
        src={props.src}
        alt={alt}
        className={styles.img}
      />
    </div>
  );
};

export default Image;
