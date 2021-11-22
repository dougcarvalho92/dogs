import React, { MouseEvent } from "react";
import { usePhotos } from "../../context/PhotoContext";
import Error from "../../helpers/Error/Error";
import Loading from "../../helpers/Loading";

import PhotoContent from "../PhotoContent";

import styles from "./FeedModal.module.css";

const FeedModal = () => {
  const { photoSelected, handleChangeModalPhoto, loading, error } = usePhotos();

  function handleClickOutSide(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      handleChangeModalPhoto(null);
    }
  }
  if (loading) return <Loading />;
  return photoSelected ? (
    <div className={styles.modal} onClick={handleClickOutSide}>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {photoSelected && <PhotoContent {...photoSelected} />}
    </div>
  ) : null;
};

export default FeedModal;
