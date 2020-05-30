import React from "react";
import {
  useMeQuery
} from "../generated";

export const Dash    = () => {
  const { data } = useMeQuery();

  const logout = () => { 
      localStorage.removeItem("chef")
      window.location.pathname = ""
  }

  return (
    <div>
      <p>Hi {data?.me?.name} </p>
      {data?.me && data?.me.friends?.map((item,i) => {return <p key={i}>{item.userid}</p>})}
      <button onClick={logout}> LOGOUT </button>
    </div>
  );
};
