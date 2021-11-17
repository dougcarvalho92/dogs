import User from "./pages/User";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useUser } from "./context/UserContext";
import Feed from "./components/Feed";
import UserStats from "./components/UserStats";
import UserPost from "./components/UserPost";

const PageNotFound = () => {
  return <h1>Não encontrada</h1>;
};

const AppRoutes = () => {
  const { signed } = useUser();

  let routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: signed ? <Navigate to="/user" /> : <Auth />,
      children: [
        {
          path: "",
          element: signed ? <Navigate to="/user" /> : <Login />,
        },
        {
          path: "register",
          element: signed ? <Navigate to="/user" /> : <Register />,
        },
      ],
    },
    {
      path: "/user",
      element: !signed ? <Navigate to="/auth" /> : <User />,
      children: [
        {
          path: "",
          element: <Feed />,
        },
        {
          path: "stats",
          element: <UserStats />,
        },
        {
          path: "post",
          element: <UserPost />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return routes;
};

export default AppRoutes;
