import React from "react";
import { BrowserRouter, Route } from "react-router-dom"
import { Login } from "../components/Login";
import { Dash } from "../components/Dash"
import { UserContext } from "../utils/context"
import { useMeQuery } from "../generated"
import { Register } from "../components/Register";

export const AppRoutes = () => {

  const { data } = useMeQuery();
  console.log(data)
  if(data)
  return (
    <div>
    <UserContext.Provider value={{user:data.me}}>
      <BrowserRouter>
        <div>
          <Route path='/' component={Login} exact={true} />
          <Route path='/user' component={Dash} exact={true} />
          <Route path='/reg' component={Register} exact={true} />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
  else
  return (
    <p>Couldnt fetch</p>
  )
};
