import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPostByIdQuery,
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useDeletePostMutation,
} from "../redux/Service/api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id;
  const navigate = useNavigate();

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useGetPostByIdQuery(postId);

  const { data: comments, refetch: refetchComments } =
    useGetCommentsByPostIdQuery(postId);

  const [addComment] = useAddCommentMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  // Get the logged-in user from the auth slice
  const user = useSelector((state: any) => state.auth.user);

  if (postLoading) return <p>Loading post...</p>;
  if (postError) return <p>Error loading post.</p>;
  if (!post) return <p>Post not found.</p>;

  const handleAddComment = async (text: string) => {
    await addComment({
      postId: post.id,
      text,
      author: user.username,
      authorId: user.id,
    });
    refetchComments();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id).unwrap();
        navigate("/");
      } catch (err) {
        console.error("Failed to delete the post", err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="mb-4">{post.content}</p>
          <p className="text-sm text-gray-500">By {post.author}</p>
        </div>
        {user && user.id === post.authorId && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${post.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
      <hr className="my-4" />
      <CommentForm onSubmit={handleAddComment} />
      {comments && (
        <CommentList comments={comments} refetchComments={refetchComments} />
      )}
    </div>
  );
};

export default BlogDetail;
