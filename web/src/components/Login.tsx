import React from "react";
import { useLoginMutation, refetchMeQuery } from "../generated";
import { Link } from "react-router-dom";
// const emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
export const Login = () => {
  let message = "";
  const [
    loginMutation,
    { data: datal, error: errorl, loading },
  ] = useLoginMutation({ refetchQueries: [refetchMeQuery()] });
  const loginfun = async () => {
    await loginMutation({
      variables: {
        email: (document.getElementById("email") as HTMLInputElement).value,
        password: (document.getElementById("password") as HTMLInputElement)
          .value,
      },
    });
    // console.log((document.getElementById("email") as HTMLInputElement).value)
    if (errorl) console.log(errorl);
  };

  if (datal && datal.login) {
    console.log(datal);
    localStorage.setItem("chef", datal.login);
    window.location.pathname = "user";
  } else {
    if (datal?.login === "") message = "Email or Password is wrong";
    else message = "Enter Email and Password";
  }

  return (
    <div>
      <p>{!datal?.login && message} </p>
      <h3>Enter Email</h3>
      <input
        id="email"
        type="email"
        pattern="[^ @]*@[^ @]*"
        placeholder="Email here"
      ></input>
      <h3>Enter Password</h3>
      <input id="password" type="password" placeholder="Password here"></input>
      <p>Click to continue</p>
      <button onClick={loginfun} disabled={loading}>
        {" "}
        LOGIN{" "}
      </button>
      <h5>Or Register</h5>
      <Link to="reg">HERE</Link>
    </div>
  );
};
