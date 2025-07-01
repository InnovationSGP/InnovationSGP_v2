"use client";
import { useEffect, useState } from "react";
import FeatureTopics from "@/template/blog/feature-topics";
import BlogHero from "@/template/blog/blog-hero";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";
import { useSearchParams } from "next/navigation";

// Define interfaces for our data
interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

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
  // Get URL params
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1";
  const categoryParam = searchParams.get("id");
  const page = parseInt(pageParam) || 1;

  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    categoryParam ? parseInt(categoryParam) : null
  );
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Safely parse category ID
  const parseCategoryId = (id: string | null): number | null => {
    if (!id) return null;
    const parsed = parseInt(id);
    return isNaN(parsed) ? null : parsed;
  };

  // Handle category changes from the FeatureTopics component
  const handleCategoryChange = (categoryId: number | null, posts: Post[]) => {
    setActiveCategory(categoryId);
    setFilteredPosts(posts);
  };

  // Filter posts by category
  const filterPostsByCategory = (posts: Post[], categoryId: number | null) => {
    if (!categoryId) return posts;
    return posts.filter((post) => post.categories.includes(categoryId));
  };

  // Fetch data on mount and when parameters change
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Get the base URL from environment or fallback
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

        // 1. Fetch categories with a higher per_page limit to get all of them
        const categoriesUrl = `${apiBaseUrl}/categories?per_page=100`;

        const catResponse = await fetch(categoriesUrl);
        if (!catResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${catResponse.status} when fetching categories`
          );
        }

        const categoriesData = await catResponse.json();

        // Filter out empty categories and uncategorized
        const validCategories = categoriesData.filter(
          (cat: Category) =>
            cat.count && cat.count > 0 && cat.slug !== "uncategorized"
        );

        setCategories(validCategories);

        // 2. Build the URL for posts
        const perPage = 9;
        let postsUrl = `${apiBaseUrl}/posts?_embed=true&per_page=${perPage}&page=${page}`;

        // Add category filter if needed
        if (activeCategory) {
          postsUrl += `&categories=${activeCategory}`;
        }

        // 3. Fetch posts
        const postsResponse = await fetch(postsUrl);

        if (!postsResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${postsResponse.status} when fetching posts`
          );
        }

        // 4. Extract posts and pagination info
        const postsData = await postsResponse.json();

        // Get total pages from headers for pagination
        const totalPosts =
          postsResponse.headers.get("X-WP-Total") ||
          postsResponse.headers.get("x-wp-total");
        const totalPagesHeader =
          postsResponse.headers.get("X-WP-TotalPages") ||
          postsResponse.headers.get("x-wp-totalpages");
        const totalPagesNum = totalPagesHeader ? parseInt(totalPagesHeader) : 1;

        setTotalPages(totalPagesNum); // 6. Update state with fetched posts
        setPosts(postsData);

        // 7. Apply category filtering
        const categoryId = parseCategoryId(categoryParam);
        const filtered = filterPostsByCategory(postsData, categoryId);
        setFilteredPosts(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        // Reset state in case of error
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, activeCategory, categoryParam]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const categoryParam = searchParams.get("id");
      const categoryId = parseCategoryId(categoryParam);

      if (posts.length > 0) {
        const filtered = filterPostsByCategory(posts, categoryId);
        setFilteredPosts(filtered);
        setActiveCategory(categoryId);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [posts]);

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
        <FeatureTopics
          categories={categories}
          allPosts={posts}
          onCategoryChange={(categoryId, filteredPosts) =>
            handleCategoryChange(categoryId, filteredPosts as any)
          }
          initialCategoryId={activeCategory}
        />

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
        ) : filteredPosts.length > 0 ? (
          <div className="py-10">
            <Blogs showLabel={false} showHeading={false} data={filteredPosts} />
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
                There are no posts available for this category right now.
              </p>
              <button
                onClick={() => {
                  handleCategoryChange(null, posts);
                  window.history.pushState({}, "", "?page=1");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="View all posts"
              >
                View all posts
              </button>
            </div>
          </div>
        )}

        {!loading && filteredPosts.length > 0 && totalPages > 1 && (
          <Pagination totalPages={totalPages} />
        )}
      </section>
    </>
  );
}
