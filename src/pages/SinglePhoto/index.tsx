import React from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../../components/PageNotFound";
import Photo from "../../components/Photo";
import { PhotoProvider } from "../../context/PhotoContext";
import { useUser } from "../../context/UserContext";

// import { Container } from './styles';

const SinglePhoto = () => {
  const { user } = useUser();
  const { id } = useParams();

  return id ? (
    <PhotoProvider userId={user ? user.id : null}>
      <Photo id={id} />
    </PhotoProvider>
  ) : (
    <PageNotFound />
  );
};

export default SinglePhoto;
