import React from "react";
import { Outlet } from "react-router";
import UserHeader from "../../components/UserHeader";

import "./style.css";

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Outlet />
    </section>
  );
};

export default User;
