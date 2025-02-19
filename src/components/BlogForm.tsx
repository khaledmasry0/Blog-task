import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

interface BlogFormProps {
  initialValues?: {
    title: string;
    content: string;
  };
  onSubmit: (data: { title: string; content: string }) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { title: string; content: string }) => {
    onSubmit(values);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <Title level={3} className="text-center text-gray-800">
        {initialValues ? "Edit Post" : "Create Post"}
      </Title>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        layout="vertical"
      >
        {/* Title Input */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Title is required" },
            { min: 3, message: "Title must be at least 3 characters" },
          ]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        {/* Content Input */}
        <Form.Item
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Content is required" },
            { min: 5, message: "Content must be at least 5 characters" },
          ]}
        >
          <TextArea rows={5} placeholder="Write your post here..." />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit" className="w-full">
            {initialValues ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogForm;
