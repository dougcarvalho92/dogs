import { Outlet } from "react-router";

import "./style.css";

const Auth = () => {
  return (
    <section className="login">
      <div className="forms">
        <Outlet />
      </div>
    </section>
  );
};

export default Auth;
