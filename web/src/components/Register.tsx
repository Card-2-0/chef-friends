import React from "react";
import { Input, Form } from "antd";
import { useCreateUserMutation } from "../generated";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-useless-escape
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const Register = () => {
  const [form] = Form.useForm();
  const imgsource = require('./Logo/Codechef_book_logo.png')
  const [
    createUserMutation,
    { data, error, loading },
  ] = useCreateUserMutation();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      createUserMutation({
        variables: {
          name: values["name"],
          email: values["email"],
          password: values["password"],
          userid: values["codechefID"],
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(error);
  console.log(data);
  if (data) {
    if (data.createUser === "1") {
      alert("Given codechef ID does not exist, please check");
    } else if (data.createUser === "2") {
      alert("Email ID already exists");
    } else if (data.createUser !== "3") {
      localStorage.setItem("chef", data.createUser);
      window.location.pathname = "user";
    }
    data.createUser = "3";
  }

  return (
    <div className="regform-page">
      <div className="regform-container">
      <div className="regform-left">
      <img src={imgsource} width="150px" alt="Chefbook logo" />
      <h1 className="regform-left-head">Welcome to <strong>CHEFBOOK</strong> </h1>
      <button className="regform-login">
      <Link to="login">LOGIN</Link>
      </button>
      </div>
      <div className="regform-right">
      <h1 className="regform-right-head">REGISTER</h1>
      <h4 style={{color:"#ffffff"}}>Given username can't be changed</h4>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label=""
          required
          rules={[
            {
              required: true,
              message: "Name required",
            },
          ]}
          >
          <Input className="regform-input" placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          required
          rules={[
            {
              required: true,
              message: "Email required",
            },
            { pattern: emailRegex, message: "Enter Valid Email" },
          ]}
          >
          <Input placeholder="E-mail" className="regform-input" type="email" />
        </Form.Item>
        <Form.Item
          name="codechefID"
          required
          rules={[
            {
              required: true,
              message: "Code chef ID reqiured",
            },
          ]}
          >
          <Input placeholder="Codechef ID" className="regform-input" />
        </Form.Item>
        <Form.Item name="password"           rules={[
            {
              required: true,
              message: "Password reqiured",
            },
          ]}>
          <Input type="password" placeholder="Password" className="regform-input" />
        </Form.Item>
        <Form.Item name="confirm-password"           rules={[
            {
              required: true,
              message: "Confirm Password reqiured",
            },
          ]}>
          <Input type="password" placeholder="Confirm Password" className="regform-input" />
        </Form.Item>
        <Form.Item>
          <button className="regform-submit" type="submit" disabled={loading}>
            SUBMIT
          </button>
        </Form.Item>
      </Form>
          </div>
    </div>
    </div>
  );
};
