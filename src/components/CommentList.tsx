import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Typography, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../redux/Service/api";
import { RootState } from "../redux/store";

const { Text } = Typography;

interface Comment {
  id: number;
  author: string;
  authorId: number;
  text: string;
}

interface CommentListProps {
  comments: Comment[];
  refetchComments: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  refetchComments,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [form] = useForm();

  const handleDelete = async (commentId: number) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this comment?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteComment(commentId).unwrap();
          message.success("Comment deleted successfully");
          refetchComments();
        } catch (error) {
          console.error("Failed to delete comment:", error);
          message.error("Failed to delete comment");
        }
      },
    });
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    form.setFieldsValue({ text: comment.text });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await updateComment({ ...editingComment, text: values.text }).unwrap();
      setEditingComment(null);
      refetchComments();
      message.success("Comment updated successfully");
    } catch (error) {
      console.error("Failed to update comment:", error);
      message.error("Failed to update comment");
    }
  };

  return (
    <div>
      <Typography.Title level={4} className="mb-4">
        Comments
      </Typography.Title>
      {comments.length === 0 ? (
        <Text>No comments yet.</Text>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border p-2 px-4 mb-3 shadow-md rounded-lg relative bg-white"
          >
            {editingComment?.id === comment.id ? (
              <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                  name="text"
                  rules={[
                    { required: true, message: "Comment cannot be empty" },
                  ]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
                <div className="flex gap-2">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button onClick={() => setEditingComment(null)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <div>
                <Text>{comment.text}</Text>
                <Text type="secondary" className="block mt-1">
                  by {comment.author}
                </Text>
                {user && user.id === comment.authorId ? (
                  <div className="flex gap-2 mt-2 absolute right-2 top-0">
                    <Button onClick={() => handleEdit(comment)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(comment.id)}>
                      Delete
                    </Button>
                  </div>
                ) : (
                  user &&
                  user.role === "admin" && (
                    <div className="flex items-center gap-4 absolute right-4 top-2">
                      <DeleteOutlined
                        onClick={() => handleDelete(comment.id)}
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
