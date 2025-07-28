"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMediaURL, sanitizeImageUrl } from "@/utils"; // Import the new utility
import { ArrowRight, Calendar, User } from "lucide-react";

// More robust function to extract image URL from WordPress post
const getPostImageURL = (post: any): string => {
  try {
    // Check different paths for featured image in WordPress REST API response

    // 1. Check embedded media (most common)
    if (post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return sanitizeImageUrl(post._embedded["wp:featuredmedia"][0].source_url);
    }

    // 2. Check for different sizes in media_details
    if (post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes) {
      const sizes = post._embedded["wp:featuredmedia"][0].media_details.sizes;
      return sanitizeImageUrl(
        sizes.full?.source_url ||
          sizes.large?.source_url ||
          sizes.medium_large?.source_url ||
          sizes.medium?.source_url ||
          sizes.thumbnail?.source_url
      );
    }

    // 3. Check for Yoast SEO og:image
    if (post?.yoast_head_json?.og_image?.[0]?.url) {
      return sanitizeImageUrl(post.yoast_head_json.og_image[0].url);
    }

    // 4. Check ACF fields
    if (post?.acf?.featured_image) {
      return sanitizeImageUrl(post.acf.featured_image);
    }

    // 5. Check for jetpack_featured_media_url
    if (post?.jetpack_featured_media_url) {
      return sanitizeImageUrl(post.jetpack_featured_media_url);
    }

    // 6. Check for guid rendered (sometimes used as fallback)
    if (post?._embedded?.["wp:featuredmedia"]?.[0]?.guid?.rendered) {
      return sanitizeImageUrl(
        post._embedded["wp:featuredmedia"][0].guid.rendered
      );
    }

    // 7. Try to construct URL from featured_media ID if available
    if (post?.featured_media && typeof post.featured_media === "number") {
      // Try to determine WordPress URL from available information
      let wpBaseUrl = "";

      // Try to extract domain from _links
      if (post?._links?.self?.[0]?.href) {
        const urlMatch = post._links.self[0].href.match(/(https?:\/\/[^\/]+)/);
        if (urlMatch && urlMatch[1]) {
          wpBaseUrl = urlMatch[1];
          return sanitizeImageUrl(
            `${wpBaseUrl}/wp-json/wp/v2/media/${post.featured_media}?_fields=source_url`
          );
        }
      }
    }

    // 8. Fall back to the existing getMediaURL utility
    const fallback = getMediaURL(post);
    if (fallback) return sanitizeImageUrl(fallback);

    // If all else fails, use default image
    return "/images/blog-read.png";
  } catch (error) {
    console.error("Error getting post image URL:", error);
    return "/images/blog-read.png";
  }
};

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
    if (post) {
      try {
        // First try the direct approach
        const url = getPostImageURL(post);
        if (url) {
          setMediaURL(url);
          return;
        }

        // If direct approach fails, try the existing async approach
        const fetchMedia = async () => {
          try {
            const url = await getMediaURL(post);
            // Make sure the URL is sanitized
            if (url) {
              setMediaURL(sanitizeImageUrl(url));
            } else {
              setMediaURL("/images/blog-read.png");
            }
          } catch (error) {
            console.error("Error fetching media for blog post:", error);
            // Set to fallback image in case of error
            setMediaURL("/images/blog-read.png");
          }
        };
        fetchMedia();
      } catch (error) {
        console.error("Error in blog card image loading:", error);
        setMediaURL("/images/blog-read.png");
      }
    } else {
      // No post provided, use fallback
      setMediaURL("/images/blog-read.png");
    }
  }, [post]);

  if (!post) return null;

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="article"
      aria-labelledby={`post-title-${post.id}`}
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
              onError={(e) => {
                // If image fails to load, try a placeholder
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = "/images/blog-read.png"; // Default blog image from public folder

                // Also update state to prevent future errors with this image
                setMediaURL("/images/blog-read.png");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-70"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-blue-100 flex items-center justify-center">
            <Image
              src="/images/blog-read.png"
              alt="Blog placeholder"
              fill
              className="object-cover opacity-50"
            />
            <span className="relative z-10 text-slate-600 font-medium px-4 py-2 bg-white/80 rounded-md shadow-sm">
              Loading image...
            </span>
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
        <h2
          className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors"
          id={`post-title-${post.id}`}
        >
          <Link
            href={`/blog/${post?.slug}`}
            className="hover:underline decoration-2 decoration-blue-400 underline-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded"
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
            className="relative group flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-white transition-all hover:bg-blue-100 hover:text-blue-700 border border-blue-200 hover:border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
