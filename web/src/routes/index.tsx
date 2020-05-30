import React from "react";
import {
  /*useCreateUserMutation,*/ useLoginMutation,
  useMeQuery,
} from "../generated";

export const AppRoutes = () => {
  const { data, error } = useMeQuery();
  const [loginMutation, { data: datal, error: errorl }] = useLoginMutation();

  const loginfun = async () => {
    loginMutation({
      variables: {
        email: "kaousheik@gmail.com",
        password: "11211212",
      },
    });

    if (errorl) console.log(errorl);
  };
  if (datal && datal.login) {
    console.log(datal);
    localStorage.setItem("chef", datal.login);
  }
  const mefun = () => {
    if (data) {
      console.log(data.me);
    }
    if (error) console.log(error);
  };

  return (
    <div>
      <button onClick={loginfun}> Press me </button>
      <button onClick={mefun}> Dont Press me ></button>
      <p>{datal?.login} </p>
    </div>
  );
};
