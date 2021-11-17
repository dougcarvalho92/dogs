import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import UserHeaderNav from "../UserHeaderNav";

import styles from "./UserHeader.module.css";

const UserHeader = () => {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/user/stats":
        setTitle("Estatísticas");
        break;
      case "/user/post":
        setTitle("Adicionar Foto");
        break;
      default:
        setTitle("Minha conta");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
