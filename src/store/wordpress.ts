import { create } from "zustand";
import { fetchAPI } from "@/config/api";
import {
  WordPressPost,
  WordPressPage,
  WordPressCategory,
  WordPressService,
  WordPressTestimonial,
  PostQueryParams,
  CategoryQueryParams,
  WordPressAPIResponse,
} from "@/types/wordpress";

interface LoadingState {
  posts: boolean;
  categories: boolean;
  services: boolean;
  testimonials: boolean;
  pages: Record<string, boolean>;
}

interface ErrorState {
  posts: string | null;
  categories: string | null;
  services: string | null;
  testimonials: string | null;
  pages: Record<string, string | null>;
}

interface PaginationState {
  posts: {
    currentPage: number;
    totalPages: number | null;
    totalPosts: number | null;
  };
}

interface WordPressStore {
  // Data
  posts: WordPressPost[];
  categories: WordPressCategory[];
  services: WordPressService[];
  testimonials: WordPressTestimonial[];
  pages: Record<string, WordPressPage>;

  // Loading states
  loading: LoadingState;

  // Error states
  errors: ErrorState;

  // Pagination
  pagination: PaginationState;

  // Cache timestamps for invalidation
  lastFetched: {
    posts: number | null;
    categories: number | null;
    services: number | null;
    testimonials: number | null;
    pages: Record<string, number>;
  };

  // Actions
  fetchPosts: (params?: PostQueryParams) => Promise<void>;
  fetchCategories: (params?: CategoryQueryParams) => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchTestimonials: () => Promise<void>;
  fetchPage: (id: string | number) => Promise<WordPressPage | null>;

  // Cache management
  clearCache: () => void;
  clearError: (key: keyof ErrorState) => void;

  // Getters/selectors
  getPostById: (id: number) => WordPressPost | undefined;
  getServiceById: (id: number) => WordPressService | undefined;
  getPageById: (id: string | number) => WordPressPage | undefined;
  getCategoryById: (id: number) => WordPressCategory | undefined;

  // Initialize store with data (for SSR hydration)
  initializeData: (data: {
    posts?: WordPressPost[];
    categories?: WordPressCategory[];
    services?: WordPressService[];
    testimonials?: WordPressTestimonial[];
    pages?: Record<string, WordPressPage>;
  }) => void;
}

export const useWordPressStore = create<WordPressStore>((set, get) => ({
  // Initial state
  posts: [],
  categories: [],
  services: [],
  testimonials: [],
  pages: {},

  loading: {
    posts: false,
    categories: false,
    services: false,
    testimonials: false,
    pages: {},
  },

  errors: {
    posts: null,
    categories: null,
    services: null,
    testimonials: null,
    pages: {},
  },

  pagination: {
    posts: {
      currentPage: 1,
      totalPages: null,
      totalPosts: null,
    },
  },

  lastFetched: {
    posts: null,
    categories: null,
    services: null,
    testimonials: null,
    pages: {},
  },

  // Actions
  fetchPosts: async (params: PostQueryParams = {}) => {
    const state = get();

    // Check if we should fetch (not loading, no recent cache)
    const now = Date.now();
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    const lastFetch = state.lastFetched.posts;

    if (state.loading.posts || (lastFetch && now - lastFetch < cacheExpiry)) {
      return;
    }

    set((state) => ({
      loading: { ...state.loading, posts: true },
      errors: { ...state.errors, posts: null },
    }));

    try {
      // Check if API URL is configured
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured");
      }

      const defaultParams = {
        _embed: true,
        per_page: 10,
        status: "publish", // Only fetch published posts
        ...params,
      };

      const queryString = new URLSearchParams(
        Object.entries(defaultParams).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      const endpoint = `posts?${queryString}`;

      const response: WordPressAPIResponse<WordPressPost[]> = await fetchAPI({
        endpoint,
        includeHeaders: true,
      });

      // Extract posts data - response.data contains the actual posts array
      const postsData = Array.isArray(response.data) ? response.data : [];

      set((state) => ({
        posts: postsData,
        loading: { ...state.loading, posts: false },
        pagination: {
          ...state.pagination,
          posts: {
            currentPage: params.page || 1,
            totalPages: response.pagination?.totalPages || null,
            totalPosts: response.pagination?.totalPosts || null,
          },
        },
        lastFetched: { ...state.lastFetched, posts: Date.now() },
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);

      set((state) => ({
        loading: { ...state.loading, posts: false },
        errors: {
          ...state.errors,
          posts:
            error instanceof Error ? error.message : "Failed to fetch posts",
        },
      }));
    }
  },

  fetchCategories: async (params: CategoryQueryParams = {}) => {
    const state = get();

    // Check cache
    const now = Date.now();
    const cacheExpiry = 10 * 60 * 1000; // 10 minutes for categories
    const lastFetch = state.lastFetched.categories;

    if (
      state.loading.categories ||
      (lastFetch && now - lastFetch < cacheExpiry)
    ) {
      return;
    }

    set((state) => ({
      loading: { ...state.loading, categories: true },
      errors: { ...state.errors, categories: null },
    }));

    try {
      const defaultParams = {
        hide_empty: true,
        orderby: "name",
        order: "asc",
        ...params,
      };

      const queryString = new URLSearchParams(
        Object.entries(defaultParams).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      const categories = await fetchAPI({
        endpoint: `categories?${queryString}`,
      });

      set((state) => ({
        categories,
        loading: { ...state.loading, categories: false },
        lastFetched: { ...state.lastFetched, categories: Date.now() },
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      set((state) => ({
        loading: { ...state.loading, categories: false },
        errors: {
          ...state.errors,
          categories: error instanceof Error ? error.message : "Unknown error",
        },
      }));
    }
  },

  fetchServices: async () => {
    const state = get();

    // Check cache
    const now = Date.now();
    const cacheExpiry = 15 * 60 * 1000; // 15 minutes for services
    const lastFetch = state.lastFetched.services;

    if (
      state.loading.services ||
      (lastFetch && now - lastFetch < cacheExpiry)
    ) {
      return;
    }

    set((state) => ({
      loading: { ...state.loading, services: true },
      errors: { ...state.errors, services: null },
    }));

    try {
      const services = await fetchAPI({
        endpoint: "services?_embed=true",
      });

      set((state) => ({
        services,
        loading: { ...state.loading, services: false },
        lastFetched: { ...state.lastFetched, services: Date.now() },
      }));
    } catch (error) {
      console.error("Error fetching services:", error);
      set((state) => ({
        loading: { ...state.loading, services: false },
        errors: {
          ...state.errors,
          services: error instanceof Error ? error.message : "Unknown error",
        },
      }));
    }
  },

  fetchTestimonials: async () => {
    const state = get();

    // Check cache
    const now = Date.now();
    const cacheExpiry = 30 * 60 * 1000; // 30 minutes for testimonials
    const lastFetch = state.lastFetched.testimonials;

    if (
      state.loading.testimonials ||
      (lastFetch && now - lastFetch < cacheExpiry)
    ) {
      return;
    }

    set((state) => ({
      loading: { ...state.loading, testimonials: true },
      errors: { ...state.errors, testimonials: null },
    }));

    try {
      const testimonials = await fetchAPI({
        endpoint: "testimonial",
      });

      set((state) => ({
        testimonials,
        loading: { ...state.loading, testimonials: false },
        lastFetched: { ...state.lastFetched, testimonials: Date.now() },
      }));
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      set((state) => ({
        loading: { ...state.loading, testimonials: false },
        errors: {
          ...state.errors,
          testimonials:
            error instanceof Error ? error.message : "Unknown error",
        },
      }));
    }
  },

  fetchPage: async (id: string | number) => {
    const state = get();
    const pageId = String(id);

    // Check if already loading or recently fetched
    const now = Date.now();
    const cacheExpiry = 10 * 60 * 1000; // 10 minutes for pages
    const lastFetch = state.lastFetched.pages[pageId];

    if (
      state.loading.pages[pageId] ||
      (lastFetch && now - lastFetch < cacheExpiry)
    ) {
      return state.pages[pageId] || null;
    }

    set((state) => ({
      loading: {
        ...state.loading,
        pages: { ...state.loading.pages, [pageId]: true },
      },
      errors: {
        ...state.errors,
        pages: { ...state.errors.pages, [pageId]: null },
      },
    }));

    try {
      const page = await fetchAPI({
        endpoint: `pages/${pageId}`,
      });

      set((state) => ({
        pages: { ...state.pages, [pageId]: page },
        loading: {
          ...state.loading,
          pages: { ...state.loading.pages, [pageId]: false },
        },
        lastFetched: {
          ...state.lastFetched,
          pages: { ...state.lastFetched.pages, [pageId]: Date.now() },
        },
      }));

      return page;
    } catch (error) {
      console.error(`Error fetching page ${pageId}:`, error);
      set((state) => ({
        loading: {
          ...state.loading,
          pages: { ...state.loading.pages, [pageId]: false },
        },
        errors: {
          ...state.errors,
          pages: {
            ...state.errors.pages,
            [pageId]: error instanceof Error ? error.message : "Unknown error",
          },
        },
      }));
      return null;
    }
  },

  // Cache management
  clearCache: () => {
    set({
      posts: [],
      categories: [],
      services: [],
      testimonials: [],
      pages: {},
      lastFetched: {
        posts: null,
        categories: null,
        services: null,
        testimonials: null,
        pages: {},
      },
    });
  },

  clearError: (key: keyof ErrorState) => {
    set((state) => ({
      errors: { ...state.errors, [key]: null },
    }));
  },

  // Getters/selectors
  getPostById: (id: number) => {
    const state = get();
    return state.posts.find((post) => post.id === id);
  },

  getServiceById: (id: number) => {
    const state = get();
    return state.services.find((service) => service.id === id);
  },

  getPageById: (id: string | number) => {
    const state = get();
    return state.pages[String(id)];
  },

  getCategoryById: (id: number) => {
    const state = get();
    return state.categories.find((category) => category.id === id);
  },

  // Initialize store with data (for SSR hydration)
  initializeData: (data) => {
    set((state) => ({
      ...state,
      ...data,
      lastFetched: {
        posts: data.posts ? Date.now() : state.lastFetched.posts,
        categories: data.categories ? Date.now() : state.lastFetched.categories,
        services: data.services ? Date.now() : state.lastFetched.services,
        testimonials: data.testimonials
          ? Date.now()
          : state.lastFetched.testimonials,
        pages: data.pages
          ? Object.keys(data.pages).reduce(
              (acc, key) => {
                acc[key] = Date.now();
                return acc;
              },
              { ...state.lastFetched.pages }
            )
          : state.lastFetched.pages,
      },
    }));
  },
}));
