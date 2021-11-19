import React from "react";
import { usePhotos } from "../../context/PhotoContext";
import Error from "../../helpers/Error/Error";
import Loading from "../Loading";
import PhotoContent from "../PhotoContent";

import styles from "./FeedModal.module.css";

const FeedModal = () => {
  const { photoSelected, loading, error } = usePhotos();

  return (
    <div className={styles.modal}>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {photoSelected && <PhotoContent {...photoSelected} />}
    </div>
  );
};

export default FeedModal;
