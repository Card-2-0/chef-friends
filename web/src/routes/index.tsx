import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Dash } from "../components/Dash";
import { UserContext } from "../utils/context";
import { useMeQuery } from "../generated";
import { Register } from "../components/Register";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
export const AppRoutes = () => {
  const { data } = useMeQuery();
  console.log(data);
  if (data)
    return (
      <div>
        <UserContext.Provider
          value={{ user: data.me, isAuthenticated: !!data.me }}
        >
          <BrowserRouter>
            <div>
              <PublicRoute path="/login" component={Login} exact={true} />
              <PrivateRoute path="/user" component={Dash} exact={true} />
              <PublicRoute path="/reg" component={Register} exact={true} />
            </div>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
  else return <p></p>;
};
