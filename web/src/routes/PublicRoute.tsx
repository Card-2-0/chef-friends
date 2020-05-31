import React, { useContext } from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { UserContext } from "../utils/context";
export const PublicRoute = (props: RouteProps) => {
  const { isAuthenticated } = useContext(UserContext);
  return !isAuthenticated ? <Route {...props} /> : <Redirect to="/user" />;
};
