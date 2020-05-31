import React from "react";
import { Input, Form, Button } from "antd"
import { useCreateUserMutation } from "../generated";
import { Link } from "react-router-dom";
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const Register = () => {
  const [form] = Form.useForm() 
  const ivalue = (id: string) =>
    (document.getElementById(id) as HTMLInputElement).value;
  const [
    createUserMutation,
    { data, error, loading },
  ] = useCreateUserMutation();
  const handlesSubmit = () => {}

  const submit = async () => {
    const name = ivalue("name");
    const email = ivalue("email");
    const userid = ivalue("userid");
    const pw1 = ivalue("pw1");
    const pw2 = ivalue("pw2");
    if (pw1 !== pw2 || pw1.length <6) {
      alert("Passwords must be atleast 6 characters long and both must match, please check");
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
    } else if (data.createUser === "2") {
      alert("Email ID already exists")
    } else if (data.createUser !== "3") {
      localStorage.setItem("chef", data.createUser);
      window.location.pathname = "user";
    }
    data.createUser = "3"
  }

  return (
    <div>
      <h1>Welcome to ChefBook !</h1>
      <p> Please fill details to register yourself </p>
      <p> Given Username now can't be changed later </p>
      <Form form={form} onFinish={handlesSubmit}>
        <div>
        <Form.Item
          name = "name"
          label = "name"
          rules={[{ required: true, message: "Name is required!" }]}>
          <Input placeholder="Enter Name" type="text" />
        </Form.Item>
        <Form.Item
          name = "email"
          label = "email"
          rules={[
            { required: true, message: "Email is required!" },
            { pattern: emailRegex, message: "Enter Valid Email" },
          ]}>
          <Input placeholder="Enter Email" type="email" />
        </Form.Item>
        <Form.Item
            name = "ccID"
            label = "CC ID">
            <Input placeholder="Enter CodeChef ID" type="text" />
        </Form.Item>
        <Form.Item
          name = "password"
          label = "password">
          rules={[
            { min: 8, message: "Enter Valid Password (atleast 8 characters)" },
            { required: true, message: "Password is required!" },
          ]}
          <Input placeholder="Enter Password" type="password" />
        </Form.Item>
        <Form.Item
            name="passwordRe"
            label="Re Enter Password"
            rules={[
              { min: 8, message: "Enter Valid Password" },
              { required: true, message: "Password is required!" },
              {},
            ]}>
            <Input placeholder="Enter Password" type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              block
            >
              Submit
            </Button>
          </Form.Item>
          </div>
      </Form>
      <form>
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
      </form>
      <button onClick={submit} disabled={loading}>
        {" "}
        Submit{" "}
      </button>
      <h5>Or Login</h5>
      <Link to="login">HERE</Link>
    </div>
  );
};
