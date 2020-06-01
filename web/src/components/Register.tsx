import React from "react";
import { Input, Form, Button, Typography } from "antd";
import { useCreateUserMutation } from "../generated";
// import { Link } from "react-router-dom";
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const Register = () => {
  const [form] = Form.useForm();
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
    <Form form={form} onFinish={handleSubmit}>
      <Typography>
        {" "}
        Welcome to chef ChefBook
        <Typography>PLease fill details to register</Typography>
        <Typography>Given username can't be changed</Typography>
      </Typography>
      <Form.Item
        name="name"
        label="name"
        required
        rules={[
          {
            required: true,
            message: "Name required",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="email"
        required
        rules={[
          {
            required: true,
            message: "Email required",
          },
          { pattern: emailRegex, message: "Enter Valid Email" },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="codechefID"
        label="codechef Id"
        required
        rules={[
          {
            required: true,
            message: "Code chef id reqiured",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="password" label="password">
        <Input.Password />
      </Form.Item>
      <Form.Item name="confirm-password" label="confirm password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
