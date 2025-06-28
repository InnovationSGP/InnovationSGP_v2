"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMediaURL } from "@/utils"; // Adjust path as needed
import { ArrowRight, Calendar, User } from "lucide-react";

function BlogCard({ post }: any) {
  const [mediaURL, setMediaURL] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  // Format the date to MMM DD, YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get author avatar URL with fallbacks
  const authorAvatar =
    post?._embedded?.author?.[0]?.avatar_urls?.["96"] ||
    post?._embedded?.author?.[0]?.avatar_urls?.["48"] ||
    post?._embedded?.author?.[0]?.avatar_urls?.["24"];

  // First letter of author name for fallback avatar
  const authorName = post?.yoast_head_json?.author || "Unknown Author";
  const authorFirstLetter =
    authorName && authorName.length > 0
      ? authorName.charAt(0).toUpperCase()
      : "A";

  // Format the post date
  const formattedDate = formatDate(post?.date);

  useEffect(() => {
    const fetchMedia = async () => {
      if (post) {
        const url = await getMediaURL(post);
        setMediaURL(url);
      }
    };
    fetchMedia();
  }, [post]);

  if (!post) return null;

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with overlay */}
      <div className="relative overflow-hidden h-[220px]">
        {mediaURL ? (
          <>
            <Image
              src={mediaURL}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={post?.title?.rendered || "Blog post"}
              className={`object-cover transition-transform duration-700 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-70"></div>
          </>
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <span className="text-slate-400">No image available</span>
          </div>
        )}

        {/* Date badge */}
        {formattedDate && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link
            href={`/blog/${post?.slug}`}
            className="hover:underline decoration-2 decoration-blue-400 underline-offset-2"
          >
            {post?.title?.rendered}
          </Link>
        </h2>

        <div
          className="text-slate-600 text-sm line-clamp-3 mb-5"
          dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }}
        />

        {/* Author info */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
          {authorAvatar ? (
            <Image
              src={authorAvatar}
              width={32}
              height={32}
              alt={authorName}
              className="rounded-full h-8 w-8 object-cover border border-slate-200"
            />
          ) : (
            <div className="flex items-center justify-center bg-blue-100 rounded-full h-8 w-8">
              <span className="text-blue-700 font-medium text-sm">
                {authorFirstLetter}
              </span>
            </div>
          )}
          <div className="flex-grow">
            <span className="text-xs text-slate-500">By</span>{" "}
            <span className="text-sm font-medium text-slate-700">
              {authorName}
            </span>
          </div>

          <Link
            href={`/blog/${post?.slug}`}
            className="relative group flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-white transition-all hover:bg-blue-100 hover:text-blue-700 border border-blue-200 hover:border-blue-300 shadow-sm"
            aria-label={`Read more about "${post?.title?.rendered}"`}
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
