import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../Feed";

const UserProfile = () => {
  const { id } = useParams();
  return (
    <section className="container mainSection">
      <h1 className="title title-capitalized">{id}</h1>
      {id && <Feed userId={id} />}
    </section>
  );
};

export default UserProfile;
