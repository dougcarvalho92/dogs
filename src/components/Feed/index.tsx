import React from "react";
import { PhotoProvider } from "../../context/PhotoContext";

import FeedModal from "../FeedModal";
import FeedPhotos from "../FeedPhotos";

interface FeedProps {
  userId: string | null;
}

const Feed = ({ userId }: FeedProps) => {
  return (
    <div>
      <PhotoProvider userId={userId}>
        <FeedModal />
        <FeedPhotos />
      </PhotoProvider>
    </div>
  );
};

export default Feed;
