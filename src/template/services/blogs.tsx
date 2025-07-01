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
  // Log incoming data for debugging
  console.log(`Blogs component received ${data?.length || 0} posts`);

  if (data?.length > 0) {
    console.log("Sample post structure:", {
      id: data[0]?.id,
      title:
        typeof data[0]?.title === "object"
          ? data[0]?.title?.rendered
          : data[0]?.title,
      hasEmbedded: !!data[0]?._embedded,
      hasMedia: !!data[0]?.featured_media,
      mediaInfo: data[0]?._embedded?.["wp:featuredmedia"]?.[0]
        ? {
            id: data[0]._embedded["wp:featuredmedia"][0].id,
            url: data[0]._embedded["wp:featuredmedia"][0].source_url,
          }
        : "No media",
    });
  }

  // Validate posts and ensure they have required fields
  const validPosts =
    data?.filter((post) => {
      if (!post || !post.id) {
        console.log("Invalid post: Missing ID");
        return false;
      }

      // Allow either {rendered: string} or direct string for title
      const hasTitle =
        (post.title && typeof post.title === "object" && post.title.rendered) ||
        (post.title && typeof post.title === "string");

      if (!hasTitle) {
        console.log(`Post ${post.id} missing title`);
        return false;
      }

      return true;
    }) || [];

  // Log validation results
  console.log(`Valid posts: ${validPosts.length} of ${data?.length || 0}`);

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
