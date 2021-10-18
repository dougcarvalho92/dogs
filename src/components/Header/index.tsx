import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

import { ReactComponent as DogsSvg } from "../../assets/images/dogs.svg";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" aria-label="Dogs - Home">
          <DogsSvg />
        </NavLink>
        <NavLink to="/auth" className="login">
          Login / Criar
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
