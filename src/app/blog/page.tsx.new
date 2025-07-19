"use client";
import { fetchAPI } from "@/config/api";
import FeatureTopics from "@/template/blog/feature-topics";
import BlogHero from "@/template/blog/blog-hero";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

interface Post {
  id: number;
  categories: number[];
  [key: string]: any;
}

export default function Home() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1";
  const categoryParam = searchParams.get("id");
  const page = parseInt(pageParam) || 1; // Default to page 1 if parsing fails

  // Safely parse categoryId, ensuring it's a valid number
  const parseCategoryId = (id: string | null): number | null => {
    if (!id) return null;
    const parsed = parseInt(id);
    return isNaN(parsed) ? null : parsed;
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    parseCategoryId(categoryParam)
  );

  // Cache for API responses
  const [apiCache, setApiCache] = useState<Record<string, any>>({});
  const apiCacheRef = useRef<Record<string, any>>({});

  // Keep ref in sync with state
  useEffect(() => {
    apiCacheRef.current = apiCache;
  }, [apiCache]);

  // Helper function to handle category change - use refs to avoid dependency issues
  const activeCategoryIdRef = useRef<number | null>(
    parseCategoryId(categoryParam)
  );
  const filteredPostsRef = useRef<Post[]>([]);

  // Keep refs in sync with state
  useEffect(() => {
    activeCategoryIdRef.current = activeCategoryId;
    filteredPostsRef.current = filteredPosts;
  }, [activeCategoryId, filteredPosts]);

  const handleCategoryChange = useCallback(
    (categoryId: number | null, filtered: Post[]) => {
      setActiveCategoryId(categoryId);
      setFilteredPosts(filtered);
      // We don't need to trigger a fetch here as the filtering happens client-side
    },
    [] // No dependencies to avoid recreation
  );

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
          // More specific error handling
          console.error(`Error fetching ${endpoint}:`, error);
          
          // Special handling for pagination errors (HTTP 400)
          if (endpoint.includes("page=") && endpoint.includes("per_page=")) {
            console.warn("Pagination error, attempting fallback strategy...");
            
            // Extract pagination parameters
            const params = new URLSearchParams();
            const baseEndpoint = endpoint.split("?")[0];
            const pageMatch = endpoint.match(/page=(\d+)/);
            const perPageMatch = endpoint.match(/per_page=(\d+)/);
            const categoryMatch = endpoint.match(/categories=(\d+)/);
            
            // Default to page 1 with same per_page value
            params.append("page", "1");
            
            if (perPageMatch && perPageMatch[1]) {
              params.append("per_page", perPageMatch[1]);
            } else {
              params.append("per_page", "9"); // Default
            }
            
            // Preserve category filter if present
            if (categoryMatch && categoryMatch[1]) {
              params.append("categories", categoryMatch[1]);
            }
            
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
                includeHeaders: true
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

  // Define a memoized filter function to avoid recreating it on every render
  const filterPosts = useCallback(
    (posts: Post[], categoryId: number | null) => {
      if (categoryId === null) {
        return posts;
      }
      return posts.filter((post: Post) => post.categories.includes(categoryId));
    },
    [] // No dependencies to avoid recreation
  );

  // Only fetch data when page or category changes
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!isMounted) return;

      try {
        setLoading(true);

        // Fetch categories with their post counts
        let categoriesRes;
        try {
          categoriesRes = await fetchWithCache("categories");
          // If no categories are found or the response is invalid, initialize an empty array
          if (!Array.isArray(categoriesRes)) {
            categoriesRes = [];
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error);
          categoriesRes = [];
        }

        if (!isMounted) return;

        // Add post count to each category (in parallel)
        const enhancedCategories = await Promise.all(
          categoriesRes.map(async (category: any) => {
            try {
              // For each category, fetch a single post to get the total count from headers
              const countParams = new URLSearchParams();
              countParams.append("categories", category.id.toString());
              countParams.append("per_page", "1");
              countParams.append("page", "1");
              
              const countResponse = await fetchWithCache(
                `posts?${countParams.toString()}`,
                true
              );

              return {
                ...category,
                count: countResponse?.pagination?.totalPosts || 0,
              };
            } catch (error) {
              console.warn(
                `Error fetching count for category ${category.id}:`,
                error
              );
              return {
                ...category,
                count: 0,
              };
            }
          })
        );

        if (!isMounted) return;

        // Fetch blog posts with pagination - always include headers for pagination info
        const safePageNum = isNaN(page) || page < 1 ? 1 : page;
        const postsPerPage = 9; // Number of posts per page

        // Build the endpoint based on current filters
        const params = new URLSearchParams();
        params.append("page", safePageNum.toString());
        params.append("per_page", postsPerPage.toString());
        params.append("_embed", "");
        
        // Add category filter if needed
        if (activeCategoryId !== null) {
          params.append("categories", activeCategoryId.toString());
        }
        
        // Construct properly encoded endpoint
        const postsEndpoint = `posts?${params.toString()}`;
        
        let blogsResponse;
        let postsData;

        try {
          // Get posts with pagination info
          blogsResponse = await fetchWithCache(postsEndpoint, true);
          
          // Handle the response data structure
          if (blogsResponse?.data && Array.isArray(blogsResponse.data)) {
            postsData = blogsResponse.data;
          } else if (Array.isArray(blogsResponse)) {
            postsData = blogsResponse;
          } else {
            // We have an unexpected structure, initialize an empty array
            postsData = [];
          }
        } catch (error) {
          console.error("Error with pagination, falling back to page 1:", error);
          // If pagination fails, try fetching page 1
          try {
            const fallbackParams = new URLSearchParams();
            fallbackParams.append("page", "1");
            fallbackParams.append("per_page", postsPerPage.toString());
            fallbackParams.append("_embed", "");
            
            // Keep the category filter if it exists
            if (activeCategoryId !== null) {
              fallbackParams.append("categories", activeCategoryId.toString());
            }
            
            blogsResponse = await fetchWithCache(`posts?${fallbackParams.toString()}`, true);
            
            // Extract the posts data
            if (blogsResponse?.data && Array.isArray(blogsResponse.data)) {
              postsData = blogsResponse.data;
            } else if (Array.isArray(blogsResponse)) {
              postsData = blogsResponse;
            } else {
              // Last resort - empty array to prevent crashes
              postsData = [];
            }
          } catch (fallbackError) {
            console.error("Even fallback fetch failed:", fallbackError);
            postsData = [];
          }
        }

        if (!isMounted) return;

        // Set the data
        setCategories(enhancedCategories);
        setAllPosts(postsData);

        // Filter posts based on current category
        const currentCategoryId = parseCategoryId(categoryParam);

        try {
          const filtered = filterPosts(postsData, currentCategoryId);
          setFilteredPosts(filtered);
        } catch (error) {
          console.error("Error filtering posts:", error);
          setFilteredPosts(postsData); // Fallback to showing all posts
        }

        // Determine total posts from pagination info or count endpoint
        try {
          // First try to get the total from pagination headers in the current response
          if (blogsResponse?.pagination?.totalPosts !== undefined && 
              blogsResponse.pagination.totalPosts !== null) {
            // We have pagination info directly from the WP headers
            setTotalPosts(blogsResponse.pagination.totalPosts);
          } else {
            // If headers are not available, make a separate count request
            let totalCount;
            const safeId = parseCategoryId(categoryParam);
            
            // Build a minimal request just to get the count
            const countParams = new URLSearchParams();
            countParams.append("per_page", "1");
            countParams.append("page", "1");
            
            if (safeId !== null) {
              // Get count for specific category
              countParams.append("categories", safeId.toString());
              const categoryCountResponse = await fetchWithCache(
                `posts?${countParams.toString()}`, 
                true
              );
              totalCount = categoryCountResponse?.pagination?.totalPosts;
            } else {
              // Get count for all posts
              const allPostsCountResponse = await fetchWithCache(
                `posts?${countParams.toString()}`, 
                true
              );
              totalCount = allPostsCountResponse?.pagination?.totalPosts;
            }

            // If we found a valid count, use it
            if (totalCount !== undefined && totalCount !== null) {
              setTotalPosts(totalCount);
            } else {
              // Fallback: Estimate based on the posts we have
              const estimatedTotal = Math.max(postsData.length * 3, 9);
              setTotalPosts(estimatedTotal);
            }
          }
        } catch (error) {
          console.error("Error determining total posts:", error);
          // Default to showing at least what we have to avoid pagination issues
          const safeEstimate = Math.max(postsData.length * 3, 9);
          setTotalPosts(safeEstimate);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setCategories([]);
          setAllPosts([]);
          setFilteredPosts([]);
          setTotalPosts(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [page, categoryParam, fetchWithCache, filterPosts]); // Include fetchWithCache and filterPosts

  // Listen for popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      // Get current URL parameters after navigation
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page") || "1";
      const categoryParam = searchParams.get("id");

      // Update local state based on URL
      const page = parseInt(pageParam) || 1;
      const categoryId = parseCategoryId(categoryParam);

      // Apply filtering based on current URL state
      if (allPosts.length > 0) {
        const filtered = filterPosts(allPosts, categoryId);
        setFilteredPosts(filtered);
        setActiveCategoryId(categoryId);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allPosts, filterPosts]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalPosts / 9);

  return (
    <>
      <BlogHero
        title="Feature Collections"
        subtitle="Intel & Insights"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
        backgroundImage="/images/about-hero.png"
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: "Intel", url: "/blog" },
          { label: "Feature Collections", url: "" },
        ]}
        highlightPattern="bookend"
        ctaText="Contact Us"
        ctaLink="/contact"
      />
      <section className="blog_gradient mb-20">
        <FeatureTopics
          categories={categories}
          allPosts={allPosts}
          onCategoryChange={handleCategoryChange}
          initialCategoryId={activeCategoryId}
        />
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
        ) : filteredPosts?.length > 0 ? (
          <div className="">
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
              </p>{" "}
              <button
                onClick={() => {
                  // Reset filters client-side
                  handleCategoryChange(null, allPosts);
                  // Update URL to remove category filter and reset to page 1
                  window.history.pushState({}, "", "?page=1");
                  // Scroll to top
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
        {/* Only show pagination if totalPages > 1 */}
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </section>
    </>
  );
}
