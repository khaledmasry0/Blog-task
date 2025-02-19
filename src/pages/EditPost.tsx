import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../redux/Service/api";
import BlogForm from "../components/BlogForm";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = id;
  const { data: post, isLoading } = useGetPostByIdQuery(postId);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  if (isLoading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  console.log(post);

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await updatePost({ ...post, ...data }).unwrap();
      navigate(`/post/${post.id}`);
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <BlogForm
        initialValues={{ title: post.title, content: post.content }}
        onSubmit={handleSubmit}
      />
      {isUpdating && <p>Updating...</p>}
    </div>
  );
};

export default EditPost;
