import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useLoginUserMutation } from "../redux/Service/api";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      const result: any = await loginUser({ username, password }).unwrap();
      if (result && result.length > 0) {
        const user = result[0];
        dispatch(login({ ...user, token: "fake-token" }));
        message.success("Login successful");
        navigate("/");
      } else {
        message.error("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed", err);
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 24 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
        {error && (
          <Form.Item>
            <Typography.Text type="danger">
              Login failed. Please try again.
            </Typography.Text>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default Login;
