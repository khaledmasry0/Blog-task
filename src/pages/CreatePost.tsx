import React from "react";
import { useAddPostMutation } from "../redux/Service/api";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost: React.FC = () => {
  const [addPost, { isLoading }] = useAddPostMutation();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await addPost({
        ...data,
        author: user.username,
        authorId: user.id,
        likes: [],
      }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <BlogForm onSubmit={handleSubmit} />
      {isLoading && <p>Submitting...</p>}
    </div>
  );
};

export default CreatePost;
