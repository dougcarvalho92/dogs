import User from "./pages/User";
import Auth from "./pages/Auth";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useUser } from "./context/UserContext";
import Feed from "./components/Feed";
import UserStats from "./components/UserStats";
import UserPost from "./components/UserPhotoPost";
import Home from "./pages/Home";
import Photo from "./components/Photo";

const PageNotFound = () => {
  return <h1>Não encontrada</h1>;
};

const AppRoutes = () => {
  const { signed, user } = useUser();

  let routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/",
      element: <Home />,
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
          element: <Feed userId={user ? user.id : "0"} />,
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
      path: "/photo",
      children: [
        {
          path: "",
          element: <PageNotFound />,
        },
        {
          path: ":id",
          element: <Photo />,
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
