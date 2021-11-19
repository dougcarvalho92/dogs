import React from "react";
import { usePhotos } from "../../context/PhotoContext";
import { PostImageData } from "../../objectType";

import styles from "./FeedPhotosItem.module.css";

const FeedPhotosItem = (photo: PostImageData) => {
  const { handleChangeModalPhoto } = usePhotos();
  return (
    <li
      className={styles.photo}
      onClick={() => {
        handleChangeModalPhoto(photo);
      }}
    >
      <img src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
