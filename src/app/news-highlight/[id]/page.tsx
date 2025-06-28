import { fetchAPI } from "@/config/api";
import BlogHero from "@/template/blog/blog-hero";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import styles from "@/styles/blog-content.module.css";

interface PageProps {
  params: {
    id: string;
  };
}

// This function generates metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    // Need to await params in Next.js dynamic routes
    const resolvedParams = await params;

    // Validate params object and ID
    if (!resolvedParams || typeof resolvedParams.id !== "string") {
      return {
        title: "Article Not Found | InnovationSGP",
        description: "The requested news article could not be found.",
      };
    }

    const articleId = resolvedParams.id;

    let post;
    try {
      // Fetch the post data with strict error handling
      post = await fetchAPI({
        endpoint: `posts/${articleId}?_embed`,
      });
    } catch (error) {
      console.error("Error fetching article for metadata:", error);
      return {
        title: "Error Loading Article | InnovationSGP",
        description: "There was an error loading this article.",
      };
    }

    if (!post) {
      return {
        title: "Article Not Found | InnovationSGP",
        description: "The requested news article could not be found.",
      };
    }

    // Process title - decode HTML entities
    const title = post.title?.rendered
      ? post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: string) =>
          String.fromCharCode(parseInt(dec, 10))
        )
      : "News Article";

    // Process description from excerpt
    let description = "";
    if (post.excerpt?.rendered) {
      description = post.excerpt.rendered
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim()
        .substring(0, 155);
      if (description.length === 155) description += "...";
    }

    // Get featured image for Open Graph
    let ogImage = null;
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      ogImage = post._embedded["wp:featuredmedia"][0].source_url;
    }

    // Get author
    let author = "InnovationSGP";
    if (post._embedded?.["author"]?.[0]?.name) {
      author = post._embedded["author"][0].name;
    }

    // Get published date
    const date = post.date
      ? new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : undefined;

    return {
      title: `${title} | InnovationSGP News`,
      description,
      authors: author ? [{ name: author }] : undefined,
      openGraph: {
        title: `${title} | InnovationSGP News`,
        description,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/news-highlight/${articleId}`,
        siteName: "InnovationSGP",
        images: ogImage
          ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | InnovationSGP News`,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/news-highlight/${articleId}`,
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Error | InnovationSGP",
      description: "There was an error loading this page.",
    };
  }
}

// Main page component
export default async function NewsArticlePage({ params }: PageProps) {
  try {
    // Need to await params in Next.js dynamic routes
    const resolvedParams = await params;

    // Safely access and validate ID - ensure it's a string
    if (!resolvedParams || typeof resolvedParams.id !== "string") {
      notFound();
      // TypeScript needs this for type narrowing, though it won't be reached
      return null;
    }

    const articleId = resolvedParams.id;

    // We've validated articleId is a string by this point
    let post;
    try {
      // Fetch the post data
      post = await fetchAPI({
        endpoint: `posts/${articleId}?_embed`,
      });
    } catch (error) {
      console.error("Error loading article:", error);
      notFound();
      // TypeScript needs this for type narrowing, though it won't be reached
      return null;
    }

    if (!post || !post.title || !post.content) {
      notFound();
      // TypeScript needs this for type narrowing, though it won't be reached
      return null;
    }

    // Format the date
    const date = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Get featured image with proper fallback handling
    let featuredImage = null;
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
    }

    // Get author with proper fallback
    let author = "InnovationSGP";
    let authorAvatar = null;

    if (post._embedded?.["author"]?.[0]) {
      if (post._embedded["author"][0].name) {
        author = post._embedded["author"][0].name;
      }

      // Get avatar if available
      authorAvatar =
        post._embedded["author"][0]?.avatar_urls?.["96"] ||
        post._embedded["author"][0]?.avatar_urls?.["48"] ||
        post._embedded["author"][0]?.avatar_urls?.["24"];
    }

    // Get categories for breadcrumbs
    let categories = [];
    if (post._embedded?.["wp:term"]) {
      const categoryTerms = post._embedded["wp:term"].find(
        (termArray: any[]) =>
          termArray.length > 0 && termArray[0].taxonomy === "category"
      );

      if (categoryTerms && categoryTerms.length > 0) {
        categories = categoryTerms.map((term: any) => ({
          name: term.name,
          slug: term.slug,
          id: term.id,
        }));
      }
    }

    // Sanitize the content for security
    const sanitizedContent = DOMPurify.sanitize(post.content.rendered);

    // Decode HTML entities in title
    const decodedTitle = post.title?.rendered
      ? post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: string) =>
          String.fromCharCode(parseInt(dec, 10))
        )
      : "News Article";

    return (
      <>
        <BlogHero
          title={decodedTitle}
          subtitle="News Article"
          description={`Published on ${date} by ${author}`}
          backgroundImage={featuredImage || "/images/blog-read.png"}
          breadcrumbs={[
            { label: "Home", url: "/" },
            { label: "News", url: "/news-highlight" },
            { label: decodedTitle, url: "" },
          ]}
          highlightPattern="bookend"
        />

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Author info */}
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center mr-4">
                  {authorAvatar ? (
                    <Image
                      src={authorAvatar}
                      alt={author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-lg">
                      {author.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{author}</p>
                  <p className="text-sm text-gray-500">{date}</p>
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category: any) => (
                    <Link
                      key={category.id}
                      href={`/news-highlight?category=${category.id}`}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Featured image for the article body */}
              {featuredImage && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={featuredImage}
                    alt={decodedTitle}
                    width={1200}
                    height={630}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article content with WordPress styling */}
              <article className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizedContent || "<p>No content available.</p>",
                  }}
                  className={`${styles.blogContent} wp-content`}
                />
              </article>

              {/* Article footer */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-sm text-gray-500">Published on</h4>
                    <p className="text-lg font-medium">{date}</p>
                  </div>
                  <Link
                    href="/news-highlight"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2 rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                    Back to News
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in NewsArticlePage:", error);
    notFound();
    return null;
  }
}
