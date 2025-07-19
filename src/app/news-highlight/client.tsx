"use client";
import { fetchAPI } from "@/config/api";
import BlogHero from "@/template/blog/blog-hero";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";
import FeaturedNews from "@/template/highlight/treding";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// Metadata is now imported from a separate file to keep server component functionality
// See metadata.ts in the same directory

interface Post {
  id: number;
  categories: number[];
  [key: string]: any;
}

// News category ID - set this to your actual "News" category ID
const NEWS_CATEGORY_ID = 1;

export default function NewsHighlight() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1";
  const page = parseInt(pageParam) || 1; // Default to page 1 if parsing fails

  const [newsPosts, setNewsPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  // Cache for API responses
  const [apiCache, setApiCache] = useState<Record<string, any>>({});
  const apiCacheRef = useRef<Record<string, any>>({});

  // Keep ref in sync with state
  useEffect(() => {
    apiCacheRef.current = apiCache;
  }, [apiCache]);

  // Helper function to fetch with cache
  const fetchWithCache = useCallback(
    async (endpoint: string, includeHeaders = false) => {
      try {
        // Generate a unique cache key based on the endpoint and whether headers are included
        const cacheKey = includeHeaders ? `${endpoint}_with_headers` : endpoint;

        // Check if we have a cached response using the ref for latest value
        if (apiCacheRef.current[cacheKey]) {
          return apiCacheRef.current[cacheKey];
        }

        // Small delay to prevent API hammering
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Fetch fresh data with proper error handling
        try {
          const result = await fetchAPI({
            endpoint,
            includeHeaders,
          });

          // Update cache
          setApiCache((prev) => ({
            ...prev,
            [cacheKey]: result,
          }));

          return result;
        } catch (error) {
          console.error(`Error fetching ${endpoint}:`, error);

          // Special handling for pagination errors
          if (endpoint.includes("page=") && endpoint.includes("per_page=")) {
            console.warn("Pagination error, attempting fallback strategy...");

            // Extract pagination parameters
            const params = new URLSearchParams();
            const baseEndpoint = endpoint.split("?")[0];

            // Default to page 1 with same per_page value
            params.append("page", "1");
            params.append("per_page", "9");

            // Keep the category filter
            params.append("categories", NEWS_CATEGORY_ID.toString());

            // Add _embed if it was in the original request
            if (endpoint.includes("_embed")) {
              params.append("_embed", "");
            }

            // Create a safe fallback endpoint
            const fallbackEndpoint = `${baseEndpoint}?${params.toString()}`;

            // Retry with the safer parameters
            try {
              const fallbackResult = await fetchAPI({
                endpoint: fallbackEndpoint,
                includeHeaders: true,
              });

              return fallbackResult;
            } catch (fallbackError) {
              console.error("Fallback fetch also failed:", fallbackError);
              return null;
            }
          }

          return null;
        }
      } catch (error) {
        console.error(`Cache error for ${endpoint}:`, error);
        return null;
      }
    },
    [] // No dependencies to avoid recreation and loops
  );

  // Helper function to filter posts by category
  const filterPostsByCategory = useCallback(
    (posts: Post[], categoryId: number) => {
      return posts.filter(
        (post) =>
          post.categories &&
          Array.isArray(post.categories) &&
          post.categories.includes(categoryId)
      );
    },
    []
  );

  // Fetch data when page changes
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!isMounted) return;

      try {
        setLoading(true);

        // Fetch all posts first page (we'll filter for News category client-side)
        const allPostsParams = new URLSearchParams();
        allPostsParams.append("page", "1");
        allPostsParams.append("per_page", "100"); // Get more to ensure we have enough for pagination
        allPostsParams.append("_embed", "");

        const allPostsEndpoint = `posts?${allPostsParams.toString()}`;
        let allPostsResponse;

        try {
          allPostsResponse = await fetchWithCache(allPostsEndpoint, true);

          if (!isMounted) return;

          // Extract and filter posts for News category (ID: 1)
          let allPosts: Post[] = [];

          if (allPostsResponse?.data && Array.isArray(allPostsResponse.data)) {
            allPosts = allPostsResponse.data;
          } else if (Array.isArray(allPostsResponse)) {
            allPosts = allPostsResponse;
          }

          // Filter posts that have category ID 1
          const newsCategoryPosts = filterPostsByCategory(
            allPosts,
            NEWS_CATEGORY_ID
          );

          // Calculate proper pagination
          const startIndex = (page - 1) * 12; // Showing 12 per page now
          const endIndex = startIndex + 12;

          // Set paginated posts for the current page
          setNewsPosts(newsCategoryPosts.slice(startIndex, endIndex));

          // Set total posts for pagination
          setTotalPosts(newsCategoryPosts.length);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setNewsPosts([]);
          setTotalPosts(0);
        }
      } catch (error) {
        console.error("Error in data fetching:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [page, fetchWithCache, filterPostsByCategory]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalPosts / 12);

  return (
    <>
      <BlogHero
        title="News and Highlights"
        subtitle="Latest Updates"
        description="Stay informed with the latest news and strategic intelligence from our research team"
        backgroundImage="/images/blog-read.png"
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: "Intel", url: "/blog" },
          { label: "News Highlights", url: "" },
        ]}
        highlightPattern="bookend"
        ctaText="Subscribe"
        ctaLink="/contact"
      />

      <section className="news-highlight-section py-16 bg-gradient-to-b from-gray-50 to-white">
        {/* News Posts Section */}
        {loading ? (
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="animate-pulse">
              <div className="flex items-center mb-10">
                <div className="w-10 h-1 bg-slate-200 mr-4"></div>
                <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(12)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col space-y-4 bg-white p-4 rounded-xl shadow-sm"
                  >
                    <div className="bg-slate-200 h-64 rounded-lg"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : newsPosts.length > 0 ? (
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-10">
              <div className="w-10 h-1 bg-blue-600 mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {newsPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/news-highlight/${post.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group"
                >
                  <div className="h-56 overflow-hidden relative">
                    {post._embedded &&
                    post._embedded["wp:featuredmedia"] &&
                    post._embedded["wp:featuredmedia"][0] ? (
                      <img
                        src={post._embedded["wp:featuredmedia"][0].source_url}
                        alt={post.title.rendered || "News image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">
                          No image available
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      News
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title.rendered}
                    </h3>
                    <div
                      className="text-gray-600 mb-4 line-clamp-2 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                        Read More
                        <svg
                          className="w-4 h-4 ml-1"
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
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto bg-white shadow-sm rounded-xl p-8">
              <div className="text-blue-600 mb-4">
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
                No News Articles Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any news articles in this category. Please
                check back later for updates.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Content
              </Link>
            </div>
          </div>
        )}

        {/* Pagination - Custom Design */}
        {totalPages > 1 && (
          <div className="container mx-auto px-4 mt-16">
            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                {/* First Page */}
                {page > 1 && (
                  <Link
                    href={`/news-highlight?page=1`}
                    className="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    <span className="sr-only">First</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M6.72 5.23a.75.75 0 01-.02 1.06L2.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}

                {/* Previous Page */}
                {page > 1 && (
                  <Link
                    href={`/news-highlight?page=${page - 1}`}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map(
                  (_, idx) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = idx + 1;
                    } else if (page <= 3) {
                      pageNumber = idx + 1;
                    } else if (page >= totalPages - 2) {
                      pageNumber = totalPages - 4 + idx;
                    } else {
                      pageNumber = page - 2 + idx;
                    }

                    return (
                      <Link
                        key={idx}
                        href={`/news-highlight?page=${pageNumber}`}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                          page === pageNumber
                            ? "z-10 bg-blue-600 text-white focus:z-20"
                            : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
                        } border border-gray-300`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  }
                )}

                {/* Next Page */}
                {page < totalPages && (
                  <Link
                    href={`/news-highlight?page=${page + 1}`}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}

                {/* Last Page */}
                {page < totalPages && (
                  <Link
                    href={`/news-highlight?page=${totalPages}`}
                    className="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    <span className="sr-only">Last</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M13.21 14.77a.75.75 0 01.02-1.06L17.168 10 13.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
