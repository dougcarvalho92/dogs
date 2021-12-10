import React, { useEffect, useState } from "react";
import { usePhotos } from "../../context/PhotoContext";
import { useUser } from "../../context/UserContext";
import { CommentProps } from "../../objectType";
import PhotoCommentsForm from "../PhotoCommentsForm";
import styles from "./PhotoComments.module.css";
interface PhotoCommentsProps {
  comments: CommentProps[];
  single?: boolean;
}
const PhotoComments = ({ comments, single }: PhotoCommentsProps) => {
  const { signed } = useUser();
  const { commentsSelected } = usePhotos();
  const [showComments, setShowComments] = useState<CommentProps[]>();

  useEffect(() => {
    if (commentsSelected) {
      setShowComments(commentsSelected);
    } else if (comments) {
      setShowComments(comments);
    }
  }, [comments, commentsSelected]);

  return (
    <>
      <ul className={`${styles.comments} ${single && styles.single}`}>
        {showComments &&
          showComments.map((comment) => (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}: </b>
              <span>{comment.comment_content}</span>
            </li>
          ))}
      </ul>
      {signed && <PhotoCommentsForm single={single} />}
    </>
  );
};

export default PhotoComments;
