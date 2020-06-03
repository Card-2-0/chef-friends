import React from "react";
import { useLoginMutation, refetchMeQuery } from "../generated";
// import { Input, Form, Button, Typography } from "antd";
import { Link } from "react-router-dom";
// const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const Login = () => {
  let message = "";
  const imgsource = require('./Logo/Codechef_book_logo.png')
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
    if (errorl) console.log(errorl);
  };

  if (datal && datal.login) {
    console.log(datal);
    localStorage.setItem("chef", datal.login);
    window.location.pathname = "user";
  } else {
    if (datal?.login === "") message = "Email or Password is wrong";
    else message = "";
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={imgsource} alt="codecheflogo" width="110px"/>
        <h1 className="login-head">CHEFBOOK</h1>
        </div>
      <hr className="divider" />
      <div className="login-right">
      <div className="login-right-container">
      <div className="login-right-head">LOGIN</div>
      <h5 style={{color: "#ff0000",}}>{!datal?.login && message} </h5>
      <input className="login-input" id="email" type="email" pattern="[^ @]*@[^ @]*" placeholder="Email" required />
      <input className="login-input" id="password" type="password" placeholder="Password" required/>
      <button className="login-submit" onClick={loginfun} disabled={loading}><strong>LOGIN</strong> </button>
      <div className="login-register">
      <div>Register &nbsp;</div>
      <Link id="reg" to="reg">HERE</Link>
      </div>
      </div>
      </div>
    </div>
  );
};
