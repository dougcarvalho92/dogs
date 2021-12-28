import { Outlet } from "react-router";

import styles from "./Auth.module.css";

const Auth = () => {
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Outlet />
      </div>
    </section>
  );
};

export default Auth;
