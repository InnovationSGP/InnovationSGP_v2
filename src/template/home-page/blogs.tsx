"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "../services/blog-card";
import { ChevronRight, BookOpen } from "lucide-react";
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
    // Handle both array data and object with posts property
    const postsData = Array.isArray(data) ? data : data?.posts || [];

    // Validate posts and ensure they have required data
    const validated = validatePosts(postsData);
    setValidatedPosts(validated);
  }, [data]);

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  // If no valid posts, render a simplified version
  if (validatedPosts.length === 0) {
    return (
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--brand-bg-secondary)" }}
      >
        {/* Minimal background accent */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.03]"
            style={{ backgroundColor: "var(--brand-primary-purple)" }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.02]"
            style={{ backgroundColor: "var(--brand-primary-blue)" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-colors duration-300"
              style={{
                backgroundColor: "var(--brand-purple-50)",
                border: `1px solid var(--brand-border-accent)`,
              }}
            >
              <BookOpen
                className="w-4 h-4"
                style={{ color: "var(--brand-primary-purple)" }}
              />
              <span
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: "var(--brand-text-brand)" }}
              >
                {label || "Latest Articles"}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
              style={{ color: "var(--brand-text-dark)" }}
            >
              {title || "Explore Our Latest"}{" "}
              <span
                style={{
                  background: "var(--brand-gradient-accent)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {colorTitle || "Insights"}
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg md:text-xl"
              style={{ color: "var(--brand-text-secondary)" }}
            >
              Stay informed with our latest thoughts, insights, and industry
              updates
            </p>
          </div>

          <div className="text-center py-16">
            <div className="mb-8">
              <div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "var(--brand-purple-50)",
                  border: `2px solid var(--brand-border-accent)`,
                }}
              >
                <BookOpen
                  className="w-12 h-12"
                  style={{ color: "var(--brand-primary-purple)" }}
                />
              </div>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--brand-text-secondary)" }}
              >
                No blog posts available at the moment. Check back soon for fresh
                insights and updates.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white hover:bg-brand-primary-light rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:translate-y-[-1px]"
              aria-label="View all blog articles"
            >
              <span>Explore All Articles</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--brand-bg-secondary)" }}
    >
      {/* Minimal background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.03]"
          style={{ backgroundColor: "var(--brand-primary-purple)" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.02]"
          style={{ backgroundColor: "var(--brand-primary-blue)" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-colors duration-300"
              style={{
                backgroundColor: "var(--brand-purple-50)",
                border: `1px solid var(--brand-border-accent)`,
              }}
            >
              <BookOpen
                className="w-4 h-4"
                style={{ color: "var(--brand-primary-purple)" }}
              />
              <span
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: "var(--brand-text-brand)" }}
              >
                {label || "Latest Articles"}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
              style={{ color: "var(--brand-text-dark)" }}
            >
              {title || "Explore Our Latest"}{" "}
              <span
                style={{
                  background: "var(--brand-gradient-accent)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {colorTitle || "Insights"}
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg md:text-xl"
              style={{ color: "var(--brand-text-secondary)" }}
            >
              Stay informed with our latest thoughts, insights, and industry
              updates
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {validatedPosts.slice(0, 6).map((post: any, idx: number) => (
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
          <div className="text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white hover:bg-brand-primary-light rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:translate-y-[-1px]"
              aria-label="View all blog articles"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
