import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router";
import useMedia from "../../hooks/useMedia";

import { ReactComponent as MyPhotos } from "../../assets/images/feed.svg";
import { ReactComponent as Stats } from "../../assets/images/estatisticas.svg";
import { ReactComponent as AddPhoto } from "../../assets/images/adicionar.svg";
import { ReactComponent as Logout } from "../../assets/images/sair.svg";

import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const { userLogout } = useUser();
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => {
            setMobileMenu(!mobileMenu);
          }}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/user" end>
          <MyPhotos />
          {mobile && "Minhas fotos"}
        </NavLink>
        <NavLink to="/user/stats">
          <Stats />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/user/post">
          <AddPhoto />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={userLogout}>
          <Logout /> {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
