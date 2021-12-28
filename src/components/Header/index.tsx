import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import styles from "./Header.module.css";

import { ReactComponent as DogsSvg } from "../../assets/images/dogs.svg";
const Header = () => {
  const { user } = useUser();
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <NavLink to="/" aria-label="Dogs - Home">
          <DogsSvg />
        </NavLink>
        {user ? (
          <NavLink to="/user" className={styles.loginLink}>
            {user.nome}
          </NavLink>
        ) : (
          <NavLink to="/auth" className={styles.loginLink}>
            Login / Criar
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
