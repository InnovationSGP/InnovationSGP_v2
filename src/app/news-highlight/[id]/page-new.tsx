import { fetchAPI } from "@/config/api";
import BlogHero from "@/template/blog/blog-hero";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";

// Define the types
type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for the page
export async function generateMetadata(props: Props): Promise<Metadata> {
  // Extract the ID from props
  const id = props.params?.id;

  if (!id) {
    return {
      title: "News Article Not Found | InnovationSGP",
      description: "The requested news article could not be found.",
    };
  }

  try {
    // Fetch post data
    const post = await fetchAPI({ endpoint: `posts/${id}?_embed` });

    if (!post) {
      return {
        title: "News Article Not Found | InnovationSGP",
        description: "The requested news article could not be found.",
      };
    }

    // Decode HTML entities in title
    const title = post.title?.rendered
      ? post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: string) =>
          String.fromCharCode(parseInt(dec, 10))
        )
      : "News Article";

    // Extract description from excerpt or content
    let description = "";
    if (post.excerpt?.rendered) {
      // Remove HTML tags and limit to ~155 characters
      description = post.excerpt.rendered
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim()
        .substring(0, 155);
      if (description.length === 155) description += "...";
    }

    // Get featured image if available
    let openGraphImage = null;
    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0]
    ) {
      openGraphImage = post._embedded["wp:featuredmedia"][0].source_url;
    }

    return {
      title: `${title} | InnovationSGP News`,
      description,
      openGraph: openGraphImage
        ? {
            images: [
              {
                url: openGraphImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "News Article | InnovationSGP",
      description: "Read the latest news from InnovationSGP",
    };
  }
}

export default async function NewsArticlePage(props: Props) {
  // Extract the ID from props
  const id = props.params?.id;

  if (!id) {
    notFound();
  }

  try {
    // Fetch post data
    const post = await fetchAPI({ endpoint: `posts/${id}?_embed` });

    if (!post) {
      notFound();
    }

    // Get the date formatted
    const date = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Get the featured image if available
    let featuredImage = null;
    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0]
    ) {
      featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
    }

    // Get the author if available
    let author = "InnovationSGP";
    if (
      post._embedded &&
      post._embedded["author"] &&
      post._embedded["author"][0] &&
      post._embedded["author"][0].name
    ) {
      author = post._embedded["author"][0].name;
    }

    return (
      <>
        <BlogHero
          title={post.title.rendered}
          subtitle="News Article"
          description={`Published on ${date} by ${author}`}
          backgroundImage={featuredImage || "/images/blog-read.png"}
          breadcrumbs={[
            { label: "Home", url: "/" },
            { label: "News", url: "/news-highlight" },
            { label: post.title.rendered, url: "" },
          ]}
          highlightPattern="bookend"
        />

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured image for the article body */}
              {featuredImage && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article content */}
              <article className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  className="blog-content"
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
    console.error("Error loading article:", error);
    notFound();
  }
}
