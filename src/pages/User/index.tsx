import { Outlet } from "react-router";
import UserHeader from "../../components/UserHeader";

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Outlet />
    </section>
  );
};

export default User;
