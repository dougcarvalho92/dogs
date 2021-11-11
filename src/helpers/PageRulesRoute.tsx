import React from "react";
import { Navigate, RouteProps, Route } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface PageRulesRouteProps extends RouteProps {
  isProtected?: boolean;
  redirectTo?: string;
}

const PageRulesRoute = ({
  path,
  element,
  isProtected,
  ...rest
}: PageRulesRouteProps) => {
  const { signed, loading } = useUser();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (isProtected && signed === false) {
    <Navigate to="/auth" />;
  }

  return <Route path={path} element={element} {...rest} />;
};
export default PageRulesRoute;
