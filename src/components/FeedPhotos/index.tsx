import FeedPhotosItem from "../FeedPhotosItem";

import Error from "../../helpers/Error/Error";
import { PostImageData } from "../../objectType";
import styles from "./FeedPhotos.module.css";
import { usePhotos } from "../../context/PhotoContext";
import Loading from "../../helpers/Loading";

const FeedPhotos = () => {
  const { photos, error, loading } = usePhotos();

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;
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
