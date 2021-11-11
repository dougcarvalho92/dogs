import React from "react";
import { ErrorMessage } from "../../objectType";
import "./style.css";
const Error = ({ message }: ErrorMessage) => {
  if (!message) return null;

  return (
    <div className="error" dangerouslySetInnerHTML={{ __html: message }} />
  );
};

export default Error;
