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
import SinglePhoto from "./pages/SinglePhoto";
import PageNotFound from "./components/PageNotFound";
import UserProfile from "./components/UserProfile";

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
      path: "/profile",
      children: [
        {
          path: "",
          element: <PageNotFound />,
        },
        {
          path: ":id",
          element: <UserProfile />,
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
          element: <SinglePhoto />,
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
