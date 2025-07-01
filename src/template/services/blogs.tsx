import React from "react";
import BlogCard from "./blog-card";

interface Post {
  id: number;
  date: string;
  title: { rendered: string } | string;
  slug: string;
  excerpt?: { rendered: string };
  featured_media?: number;
  categories?: number[];
  _embedded?: any;
  [key: string]: any;
}

interface BlogsProps {
  data: any[];
  showLabel?: boolean;
  showHeading?: boolean;
}

function Blogs({ data, showLabel = true, showHeading = true }: BlogsProps) {
  // Validate posts and ensure they have required fields
  const validPosts =
    data?.filter((post) => {
      if (!post || !post.id) {
        return false;
      }

      // Allow either {rendered: string} or direct string for title
      const hasTitle =
        (post.title && typeof post.title === "object" && post.title.rendered) ||
        (post.title && typeof post.title === "string");

      if (!hasTitle) {
        return false;
      }

      return true;
    }) || [];

  // If no valid posts, return message
  if (validPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-slate-500">No blog posts available at this time.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {validPosts.map((post: any, idx: number) => (
          <BlogCard post={post} key={post.id || idx} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
