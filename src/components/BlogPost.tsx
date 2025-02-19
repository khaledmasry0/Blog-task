import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} from "../redux/Service/api";
import { Button, Typography, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { RootState } from "../redux/store";

const { Title, Paragraph, Text } = Typography;

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  likes: number[];
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  content,
  author,
  authorId,
  likes,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useDislikePostMutation();

  const hasLiked =
    user && Array.isArray(likes) ? likes.includes(user.id) : false;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await deletePost(id).unwrap();
      message.success("Post deleted successfully");
    } catch (err) {
      console.error("Failed to delete post", err);
      message.error("Failed to delete post");
    }
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      message.error("Please log in to like posts");
      return;
    }
    try {
      if (hasLiked) {
        // Unlike post: remove user's like
        await unlikePost({ id, userId: user.id, currentLikes: likes }).unwrap();
        message.success("Removed your like");
      } else {
        // Like post: add user's like
        await likePost({ id, userId: user.id, currentLikes: likes }).unwrap();
        message.success("Liked the post");
      }
    } catch (err) {
      console.error("Error toggling like", err);
      message.error("Failed to update like status");
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-6 relative">
      <Link to={`/post/${id}`} className="hover:underline w-[90%] bg-black">
        <Title level={4} className="text-gray-800 mb-2 ">
          {title}
        </Title>
      </Link>
      <Paragraph className="text-gray-600">
        {content.slice(0, 100)}...
      </Paragraph>
      <Text type="secondary" className="block mb-4">
        By {author}
      </Text>

      <div className="flex items-center gap-4 mt-4">
        <Button
          type="default"
          icon={hasLiked ? <DislikeOutlined /> : <LikeOutlined />}
          onClick={handleToggleLike}
          className="flex items-center"
        >
          {hasLiked ? "Unlike" : "Like"}
        </Button>
        <Text className="text-gray-700">Likes: {likes?.length}</Text>
      </div>

      <Link
        to={`/post/${id}`}
        className="hover:text-blue-500 absolute bottom-4 right-4 text-blue-900"
      >
        View post & related comments
      </Link>

      {user && user.id === authorId ? (
        <div className="flex items-center gap-4 mt-6 absolute right-4 top-0">
          <Link to={`/edit/${id}`}>
            <EditOutlined />
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this post?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ) : (
        user &&
        user.role === "admin" && (
          <div className="flex items-center gap-4 mt-6 absolute right-4 top-0">
            <Popconfirm
              title="Are you sure you want to delete this post?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        )
      )}
    </div>
  );
};

export default BlogPost;
