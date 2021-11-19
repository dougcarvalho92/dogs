import React from "react";
import { usePhotos } from "../../context/PhotoContext";
import { useUser } from "../../context/UserContext";
import PhotoCommentsForm from "../PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = () => {
  const { signed } = useUser();
  const { comments } = usePhotos();
  return (
    <>
      <ul className={styles.comments}>
        {comments &&
          comments.map((comment) => (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}: </b>
              <span>{comment.comment_content}</span>
            </li>
          ))}
      </ul>
      {signed && <PhotoCommentsForm />}
    </>
  );
};

export default PhotoComments;
