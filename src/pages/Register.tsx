import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useRegisterUserMutation } from "../redux/Service/api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    const newUser = { username, password, role: "user" };
    try {
      await registerUser(newUser).unwrap();
      message.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 24 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Register
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" size="large" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
