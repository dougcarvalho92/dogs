import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Image from "../../helpers/Image";
import { PostImageData } from "../../objectType";
import PhotoComments from "../PhotoComments";
import PhotoDelete from "../PhotoDelete";
import styles from "./PhotoContent.module.css";

const PhotoContent = (photo: PostImageData) => {
  const { user } = useUser();
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
            )}
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
