import { usePhotos } from "../../context/PhotoContext";

import styles from "./PhotoDelete.module.css";
interface PhotoDeleteProps {
  id: string;
}
const PhotoDelete = ({ id }: PhotoDeleteProps) => {
  const { handleDeletePhoto, loading } = usePhotos();

  return (
    <div>
      {loading ? (
        <button className={styles.delete}>Deletando...</button>
      ) : (
        <button
          className={styles.delete}
          onClick={() => {
            handleDeletePhoto(id);
          }}
        >
          Deletar
        </button>
      )}
    </div>
  );
};

export default PhotoDelete;
