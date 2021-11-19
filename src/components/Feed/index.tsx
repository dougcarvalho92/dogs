import React from "react";
import { usePhotos } from "../../context/PhotoContext";

import FeedModal from "../FeedModal";
import FeedPhotos from "../FeedPhotos";

// import { Container } from './styles';

const Feed = () => {
  const { photoSelected } = usePhotos();
  return (
    <div>
      {photoSelected && <FeedModal />}
      <FeedPhotos />
    </div>
  );
};

export default Feed;
