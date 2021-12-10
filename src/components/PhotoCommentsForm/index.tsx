import React, { FormEvent } from "react";
import { ReactComponent as Enviar } from "../../assets/images/enviar.svg";

import Error from "../../helpers/Error/Error";
import { usePhotos } from "../../context/PhotoContext";
import styles from "./PhotoCommentsForm.module.css";
interface PhotoCommentsFormProps {
  single?: boolean;
}
const PhotoCommentsForm = ({ single }: PhotoCommentsFormProps) => {
  const [comment, setComment] = React.useState("");
  const { PostComments, error, photoSelected } = usePhotos();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (photoSelected) {
      setComment("");
      PostComments(comment, photoSelected.id);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${single && styles.single}`}
    >
      <textarea
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        className={styles.textarea}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error message={error} />
    </form>
  );
};

export default PhotoCommentsForm;
