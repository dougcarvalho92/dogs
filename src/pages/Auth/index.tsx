import React from "react";
import { Outlet as AuthRoutes } from "react-router";

const Auth = () => {
  return (
    <section className="login">
      <div className="forms">
        <AuthRoutes />;
      </div>
    </section>
  );
};

export default Auth;
