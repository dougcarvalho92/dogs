import FeedPhotosItem from "../FeedPhotosItem";

import Error from "../../helpers/Error/Error";
import { PostImageData } from "../../objectType";
import styles from "./FeedPhotos.module.css";
import { usePhotos } from "../../context/PhotoContext";

const FeedPhotos = () => {
  const { photos, error } = usePhotos();

  if (error) return <Error message={error} />;

  return (
    <ul className={styles.feed}>
      {photos &&
        photos.map((photo: PostImageData) => (
          <FeedPhotosItem key={photo.id} {...photo} />
        ))}
    </ul>
  );
};

export default FeedPhotos;
