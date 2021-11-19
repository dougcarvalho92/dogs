import React from "react";
import { Link } from "react-router-dom";
import { PostImageData } from "../../objectType";
import PhotoComments from "../PhotoComments";
import styles from "./PhotoContent.module.css";

const PhotoContent = (photo: PostImageData) => {
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso > 1 ? `${photo.peso} kgs` : `${photo.peso} kg`}</li>
            <li>
              {photo.idade > 1 ? `${photo.idade} anos` : `${photo.idade} ano`}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments />
    </div>
  );
};

export default PhotoContent;
