import React, { useState } from "react";
import { useParams } from "react-router";
import Error from "../../helpers/Error/Error";
import Loading from "../../helpers/Loading";
import { PhotoSelectedProps } from "../../objectType";
import PhotoServices from "../../services/PhotoServices";
import PhotoContent from "../PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const [photoData, setPhotoData] = useState<PhotoSelectedProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    async function getPhotoData() {
      if (id) {
        await PhotoServices.getPhotoById(id).then((result) => {
          setPhotoData(result.data);
        });
      }
    }
    getPhotoData();
  }, [id]);

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;
  if (photoData)
    return (
      <section className="container main-container">
        <PhotoContent
          single={true}
          photo={photoData.photo}
          comments={photoData.comments}
        />
      </section>
    );
  else return null;
};

export default Photo;
