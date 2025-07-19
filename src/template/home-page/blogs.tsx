"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "../services/blog-card";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import { Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

// Helper function to validate WordPress posts for required fields
const validatePosts = (posts: any[] | null | undefined) => {
  if (!posts || !Array.isArray(posts)) return [];

  return posts.filter(
    (post) => post && post.id && post.title && post.title.rendered
  );
};

const Blogs = ({ data, title, colorTitle, label }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [validatedPosts, setValidatedPosts] = useState<any[]>([]);

  useEffect(() => {
    // Validate posts and ensure they have required data
    setValidatedPosts(validatePosts(data));

    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  // Log for debugging
  console.log(
    "Blogs component rendered with data:",
    Array.isArray(data) ? `${data.length} posts received` : "No posts"
  );

  // Only log detailed post data if we have posts
  if (validatedPosts.length > 0) {
    console.log("First post details:", {
      id: validatedPosts[0]?.id,
      hasEmbedded: !!validatedPosts[0]?._embedded,
      hasFeaturedMedia: !!validatedPosts[0]?._embedded?.["wp:featuredmedia"],
      mediaPath:
        validatedPosts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "none",
    });
  }

  // If no valid posts, render a simplified version
  if (validatedPosts.length === 0) {
    return (
      <section className="relative overflow-hidden home_page_blog_gradient py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col text-center items-center gap-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600 text-sm font-medium">
                {label || "Latest Articles"}
              </span>
            </div>

            <Heading
              colorText={colorTitle}
              className="!text-3xl md:!text-4xl !leading-tight !text-slate-800 max-w-2xl"
            >
              {title || "Explore Our Latest Insights and Updates"}
            </Heading>
          </div>

          <div className="col-span-3 py-10 text-center text-slate-500">
            <p className="mb-6">No blog posts available at the moment.</p>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-50 font-medium border border-blue-100 hover:bg-gray-300 transition-all shadow-sm hover:shadow"
            >
              View All Articles
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden home_page_blog_gradient py-20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-[300px] h-[300px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col text-center items-center gap-4 mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600 text-sm font-medium">
                {label || "Latest Articles"}
              </span>
            </div>

            <Heading
              colorText={colorTitle}
              className="!text-3xl md:!text-4xl !leading-tight !text-slate-800 max-w-2xl"
            >
              {title || "Explore Our Latest Insights and Updates"}
            </Heading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {validatedPosts.map((post: any, idx: number) => (
              <div
                key={idx}
                className={`transform transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${150 + idx * 100}ms`,
                }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          {/* View all blogs button */}
          <div className="flex justify-center mt-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-50 font-medium border border-blue-100 hover:bg-gray-300 transition-all shadow-sm hover:shadow"
            >
              View All Articles
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
