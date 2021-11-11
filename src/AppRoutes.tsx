import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useUser } from "./context/UserContext";

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
      path: "profile",
      element: signed ? <Profile /> : <Navigate to="/auth" />,
    },
    {
      path: "auth",
      element: signed ? <Navigate to="/profile" /> : <Auth />,
      children: [
        {
          path: "",
          element: signed ? <Navigate to="/profile" /> : <Login />,
        },
        {
          path: "register",
          element: signed ? <Navigate to="/profile" /> : <Register />,
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
