"use client";
import { useEffect, useState } from "react";
import BlogHero from "@/template/blog/blog-hero";
import Blogs from "@/template/services/blogs";

// Define Post interface for strong typing
interface Post {
  id: number;
  date: string;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  _embedded?: any;
  [key: string]: any;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);

        // Get the WordPress API URL
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://innovationsgp.com/wp-json/wp/v2";

        // Important: Always include _embed=true to get featured media data
        const postsUrl = `${apiUrl}/posts?_embed=true&per_page=9`;

        const response = await fetch(postsUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <BlogHero
        title="Intel & Insights"
        subtitle="Intel & Insights"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
        backgroundImage="/images/about-hero.png"
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: "Intel", url: "/blog" },
          { label: "Intel & Insights", url: "" },
        ]}
        highlightPattern="bookend"
        ctaText="Contact Us"
        ctaLink="/contact"
      />

      <section className="blog_gradient mb-20">
        {error && (
          <div className="container mx-auto px-4 py-10">
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
            <div className="p-4 bg-white rounded shadow-sm">
              <p>To fix this issue:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>
                  Check that the WordPress API URL is correctly set in your
                  environment variables (current:{" "}
                  {process.env.NEXT_PUBLIC_API_URL || "not set"})
                </li>
                <li>Verify that your WordPress site has posts available</li>
                <li>
                  Ensure CORS is properly configured on your WordPress server
                </li>
                <li>
                  Try accessing the WordPress API directly in a browser to
                  verify it works
                </li>
              </ol>
            </div>
          </div>
        )}

        {loading ? (
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="flex flex-col space-y-4">
                    <div className="bg-slate-200 h-64 rounded-lg"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : posts.length > 0 ? (
          <div className="py-10">
            <Blogs showLabel={false} showHeading={false} data={posts} />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-gray-200/10 rounded-xl p-8">
              <div className="text-blue-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 mb-6">
                There are no posts available in your WordPress site, or the
                connection to WordPress couldn't be established.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
