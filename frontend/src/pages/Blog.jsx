import BlogCard from "../components/BlogCard";
import { PostContext } from "../context/PostContext";
import { useContext } from "react";

const Blog = () => {
  const { posts, loading, error } = useContext(PostContext);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching posts: {error.message}</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Blog;
