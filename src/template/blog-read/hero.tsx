import Heading from "@/components/ui/heading";
import { getMediaURL } from "@/utils";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import styles from "@/styles/blog-content.module.css";

function Hero({ latesposts, post }: any) {
  // Format the date to MM DD YY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
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

  return (
    <section className="bg-gradient-to-b from-[#EFF7FF] to-white pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          {/* Left Content */}
          <div className="w-full lg:w-2/3">
            <Image
              src={getMediaURL(post)}
              alt="Main Article"
              width={500}
              height={500}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[25px]"
            />

            {/* Author and Date */}
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                {authorAvatar ? (
                  <Image
                    src={authorAvatar}
                    alt={`${author} avatar`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full mr-2 bg-blue-500 text-white flex items-center justify-center font-medium">
                    {authorFirstLetter}
                  </div>
                )}
                <span className="font-medium">{author}</span>
              </div>
              <span className="mx-2">•</span>
              <div>{formattedDate}</div>
            </div>

            <Heading className="mt-6 text-black-20">
              {post?.title?.rendered}
            </Heading>
            {/* Render WordPress content with Tailwind Typography */}
            <div
              className="mt-6 prose prose-lg prose-headings:font-semibold prose-headings:text-gray-800 
                          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline 
                          prose-img:rounded-lg prose-img:shadow-md 
                          prose-hr:border-gray-300
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:italic
                          prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                          prose-li:mb-1 prose-li:text-gray-700
                          prose-table:border-collapse prose-table:w-full 
                          prose-th:bg-gray-100 prose-th:p-2 prose-th:border prose-th:border-gray-300
                          prose-td:p-2 prose-td:border prose-td:border-gray-300
                          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-md
                          prose-code:bg-gray-100 prose-code:text-red-500 prose-code:px-1 prose-code:rounded
                          max-w-none"
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
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            <Heading
              colorText="You Like"
              className="mt-10 md:mt-0 text-black-20"
            >
              Maybe
            </Heading>
            <div className="mt-6 flex flex-col gap-6">
              {latesposts?.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 items-start">
                  <Image
                    src={getMediaURL(item)}
                    alt=""
                    width={100}
                    height={100}
                    className="w-[100px] h-[80px] rounded-[12px] object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {item?.date_gmt}
                    </span>
                    <h4 className="text-md font-medium text-[#2D2D2D] leading-snug">
                      {item?.title?.rendered}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
