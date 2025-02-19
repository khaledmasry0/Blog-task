import React from "react";
import { useGetPostsQuery } from "../redux/Service/api";
import BlogPost from "../components/BlogPost";

const Home: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery(undefined);

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {posts &&
        posts.map((post: any) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            authorId={post.authorId}
            likes={post.likes}
          />
        ))}
    </div>
  );
};

export default Home;
