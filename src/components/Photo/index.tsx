import React, { useState } from "react";
import { usePhotos } from "../../context/PhotoContext";
import Error from "../../helpers/Error/Error";
import Loading from "../../helpers/Loading";
import PhotoServices from "../../services/PhotoServices";
import PhotoContent from "../PhotoContent";

interface SinglePhotoProps {
  id: string;
}

const Photo = ({ id }: SinglePhotoProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleChangeModalPhoto, photoSelected, commentsSelected } =
    usePhotos();

  React.useEffect(() => {
    handleChangeModalPhoto(id);
  }, []);

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;
  if (photoSelected)
    return (
      <section className="container main-container">
        <PhotoContent
          single={true}
          photo={photoSelected}
          comments={commentsSelected ? commentsSelected : []}
        />
      </section>
    );
  else return null;
};

export default Photo;
