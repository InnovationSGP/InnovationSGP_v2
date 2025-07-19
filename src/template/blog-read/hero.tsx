import Heading from "@/components/ui/heading";
import { getMediaURL } from "@/utils";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import styles from "@/styles/blog-content.module.css";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  MessageCircle,
  Share2,
  Sparkles,
} from "lucide-react";

function Hero({ latesposts, post }: any) {
  // Format the date to MM DD YY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get author from yoast_head_json
  const author = post?.yoast_head_json?.author || "Unknown Author";

  // Get author avatar URL with fallbacks
  const authorAvatar =
    post?._embedded?.author?.[0]?.avatar_urls?.["96"] ||
    post?._embedded?.author?.[0]?.avatar_urls?.["48"] ||
    post?._embedded?.author?.[0]?.avatar_urls?.["24"];

  // First letter of author name for fallback avatar
  const authorFirstLetter =
    author && author.length > 0 ? author.charAt(0).toUpperCase() : "A";

  // Format the post date
  const formattedDate = formatDate(post?.date);

  // Estimate reading time (very rough estimate based on word count)
  const wordCount = post?.content?.rendered
    ? post.content.rendered.replace(/<[^>]*>/g, "").split(/\s+/).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 250));

  return (
    <section
      id="article-content"
      className="relative bg-gradient-to-b from-[#EDF6FF] to-white pt-16 pb-24 overflow-hidden"
    >
      {/* Modern geometric shapes for visual interest */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-100/60 blur-3xl opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] rounded-full bg-indigo-100/40 blur-3xl opacity-50"></div>
      </div>

      {/* Grid background overlay for depth */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 40, 120, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 40, 120, 0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20">
          {/* Left Content */}
          <div className="w-full lg:w-2/3">
            {/* Featured Image with subtle shadow and rounded corners */}
            <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/5 group">
              <Image
                src={getMediaURL(post)}
                alt={post?.title?.rendered || "Featured Image"}
                width={1200}
                height={700}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Article Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-b border-gray-200">
              {/* Author */}
              <div className="flex items-center">
                <div className="relative">
                  {authorAvatar ? (
                    <Image
                      src={authorAvatar}
                      alt={`${author} avatar`}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-medium shadow-md">
                      {authorFirstLetter}
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div className="ml-3">
                  <span className="font-medium text-gray-900">{author}</span>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>

              {/* Date */}
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                <span>{formattedDate}</span>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>

              {/* Reading Time */}
              <div className="flex items-center text-gray-600 text-sm">
                <BookOpen className="w-4 h-4 mr-1.5 text-blue-500" />
                <span>{readingTime} min read</span>
              </div>

              {/* Share Button */}
              <div className="ml-auto">
                <button className="flex items-center gap-1.5 rounded-full bg-gray-100 hover:bg-blue-50 px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Article Title with Background Accent */}
            <div className="mt-8 relative">
              <div className="absolute -left-6 top-0 h-full w-2 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <Heading className="text-[2rem] md:text-[2.5rem] font-bold text-gray-900 leading-tight">
                {post?.title?.rendered}
              </Heading>
            </div>

            {/* Render WordPress content with enhanced Tailwind Typography */}
            <div
              className="mt-8 prose prose-lg max-w-none
                prose-headings:font-semibold prose-headings:text-gray-800 prose-headings:mb-4 prose-headings:mt-8
                prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900
                prose-h3:text-xl prose-h3:font-bold prose-h3:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                prose-hr:border-gray-200 prose-hr:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:not-italic prose-blockquote:font-medium
                prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                prose-li:mb-2 prose-li:text-gray-700
                prose-table:border-collapse prose-table:w-full prose-table:my-8
                prose-th:bg-gray-100 prose-th:p-3 prose-th:border prose-th:border-gray-300 prose-th:font-semibold
                prose-td:p-3 prose-td:border prose-td:border-gray-300
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-auto
                prose-code:bg-gray-100 prose-code:text-blue-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
            >
              {post?.content?.rendered ? (
                <div
                  className={`${styles.blogContent} wp-content`}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content.rendered),
                  }}
                />
              ) : null}
            </div>

            {/* Comment Section Teaser */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Discussion
                  </h3>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <span>Join the conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky ">
              {/* Sidebar Card with Background - Minimalist Design */}
              <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Subtle decorative header */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                <div className="p-6">
                  {/* Clean, minimal heading */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      Related Articles
                    </h2>
                    <div className="w-12 h-0.5 bg-blue-500"></div>
                  </div>

                  {/* Minimalist related posts list */}
                  <div className="space-y-4">
                    {latesposts?.slice(0, 3).map((item: any, index: number) => (
                      <Link
                        href={`/blog/${item?.slug || "#"}`}
                        key={index}
                        className="group block"
                      >
                        <div className="flex gap-3 items-start">
                          {/* Clean thumbnail design */}
                          <div className="relative rounded-lg overflow-hidden w-[80px] h-[60px] flex-shrink-0">
                            <Image
                              src={getMediaURL(item)}
                              alt={item?.title?.rendered || ""}
                              width={80}
                              height={60}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                          </div>

                          {/* Simplified post details */}
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {item?.title?.rendered}
                            </h4>
                            <div className="mt-1 flex items-center">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500 ml-1">
                                {formatDate(item?.date).split(",")[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Simple divider */}
                  <div className="h-px bg-gray-100 my-5"></div>

                  {/* Clean, minimal button */}
                  <Link
                    href="/blog"
                    className="block w-full text-center py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    View all articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
