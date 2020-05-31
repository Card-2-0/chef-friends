import React from "react";
import { useCreateUserMutation } from "../generated";
import { Link } from "react-router-dom";

export const Register = () => {
  const ivalue = (id: string) =>
    (document.getElementById(id) as HTMLInputElement).value;
  const [
    createUserMutation,
    { data, error, loading },
  ] = useCreateUserMutation();

  const submit = async () => {
    const name = ivalue("name");
    const email = ivalue("email");
    const userid = ivalue("userid");
    const pw1 = ivalue("pw1");
    const pw2 = ivalue("pw2");
    if (pw1 !== pw2) {
      alert("Passwords dont match");
      return;
    }

    await createUserMutation({
      variables: {
        name,
        email,
        userid,
        password: pw1,
      },
    });
  };
  console.log(error);
  console.log(data);
  if (data) {
    if (data.createUser === "1") {
      alert("Given codechef ID does not exist, please check");
    } else {
      localStorage.setItem("chef", data.createUser);
      window.location.pathname = "user";
    }
  }

  return (
    <div>
      <h1>Welcome to ChefBook !</h1>
      <p> Please fill details to register yourself </p>
      <p> Given Username now can't be changed later </p>
      <input id="name" placeholder="Enter Name"></input>
      <input
        id="email"
        placeholder="Enter Email"
        type="email"
        pattern="[^ @]*@[^ @]*"
      ></input>
      <input id="userid" placeholder="Enter Codechef ID"></input>
      <input id="pw1" placeholder="Enter password" type="password"></input>
      <input id="pw2" placeholder="Re-enter password" type="password"></input>
      <button onClick={submit} disabled={loading}>
        {" "}
        Submit{" "}
      </button>
      <h5>Or Login</h5>
      <Link to="login">HERE</Link>
    </div>
  );
};
