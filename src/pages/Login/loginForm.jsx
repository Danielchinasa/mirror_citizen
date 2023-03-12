import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { GoogleCircleFilled } from "@ant-design/icons";
import {
  Heading,
  InfoSec,
  MainButton,
  VerticalCenter,
} from "../../globalStyles";

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <InfoSec>
      <h4>Login</h4>
      <Button
        type="primary"
        icon={<GoogleCircleFilled />}
        loading={loadings[1]}
        onClick={() => enterLoading(1)}
      >
        Click me!
      </Button>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        className="login-form"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          style={{ marginBottom: "8px" }}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <MainButton type="primary" full>
            Login
          </MainButton>
        </Form.Item>
      </Form>
    </InfoSec>
  );
};

export default LoginForm;
