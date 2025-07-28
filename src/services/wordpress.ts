import { useWordPressStore } from '@/store/wordpress';
import { PostQueryParams, CategoryQueryParams } from '@/types/wordpress';

/**
 * WordPress Service Layer
 * Provides a clean API for WordPress data operations
 */
export class WordPressService {
  private static instance: WordPressService;
  
  static getInstance(): WordPressService {
    if (!this.instance) {
      this.instance = new WordPressService();
    }
    return this.instance;
  }
  
  // Posts
  async getPosts(params?: PostQueryParams) {
    const store = useWordPressStore.getState();
    await store.fetchPosts(params);
    return store.posts;
  }
  
  async getPost(id: number) {
    const store = useWordPressStore.getState();
    let post = store.getPostById(id);
    
    if (!post) {
      // Try to fetch fresh posts if not found
      await store.fetchPosts();
      post = store.getPostById(id);
    }
    
    return post;
  }
  
  async getRecentPosts(count: number = 6) {
    return this.getPosts({ per_page: count });
  }
  
  async getPostsByCategory(categoryId: number, params?: Omit<PostQueryParams, 'categories'>) {
    return this.getPosts({ 
      ...params, 
      categories: String(categoryId) 
    });
  }
  
  // Categories
  async getCategories(params?: CategoryQueryParams) {
    const store = useWordPressStore.getState();
    await store.fetchCategories(params);
    return store.categories;
  }
  
  async getCategory(id: number) {
    const store = useWordPressStore.getState();
    let category = store.getCategoryById(id);
    
    if (!category) {
      await store.fetchCategories();
      category = store.getCategoryById(id);
    }
    
    return category;
  }
  
  // Services
  async getServices() {
    const store = useWordPressStore.getState();
    await store.fetchServices();
    return store.services;
  }
  
  async getService(id: number) {
    const store = useWordPressStore.getState();
    let service = store.getServiceById(id);
    
    if (!service) {
      await store.fetchServices();
      service = store.getServiceById(id);
    }
    
    return service;
  }
  
  // Testimonials
  async getTestimonials() {
    const store = useWordPressStore.getState();
    await store.fetchTestimonials();
    return store.testimonials;
  }
  
  // Pages
  async getPage(id: string | number) {
    const store = useWordPressStore.getState();
    return store.fetchPage(id);
  }
  
  // Utility methods
  clearCache() {
    const store = useWordPressStore.getState();
    store.clearCache();
  }
  
  getLoadingStates() {
    const store = useWordPressStore.getState();
    return store.loading;
  }
  
  getErrors() {
    const store = useWordPressStore.getState();
    return store.errors;
  }
  
  // Initialize with SSR data
  initializeWithSSRData(data: {
    posts?: any[];
    categories?: any[];
    services?: any[];
    testimonials?: any[];
    pages?: Record<string, any>;
  }) {
    const store = useWordPressStore.getState();
    store.initializeData(data);
  }

  // Server-side data fetching methods (using the existing fetchAPI)
  async getHomePageDataSSR() {
    const { fetchAPI } = await import('@/config/api');
    
    try {
      // Use Promise.allSettled to prevent one failure from breaking everything
      const [resResult, testimonialsResult, blogsResult] = await Promise.allSettled([
        fetchAPI({ endpoint: "pages/34" }),
        fetchAPI({ endpoint: "testimonial" }),
        fetchAPI({
          endpoint: "posts?_embed=true&per_page=6&_fields=id,date,title,slug,excerpt,featured_media,_embedded,yoast_head_json",
        }),
      ]);

      const homepage = resResult.status === 'fulfilled' ? resResult.value : null;
      const testimonials = testimonialsResult.status === 'fulfilled' ? testimonialsResult.value : [];
      const blogsData = blogsResult.status === 'fulfilled' ? blogsResult.value : [];

      if (blogsResult.status === 'rejected') {
        console.warn('Failed to fetch blog posts:', blogsResult.reason);
      }

      // Validate blog posts data
      const validatedBlogs = Array.isArray(blogsData)
        ? blogsData.filter(
            (post: any) => post && post.id && post.title && post.title.rendered
          )
        : [];

      // Log information about the blog data fetched
      console.log(`Fetched ${validatedBlogs.length} validated blog posts`);
      if (validatedBlogs.length > 0) {
        console.log(
          "First post has embedded media:",
          !!validatedBlogs[0]._embedded
        );
        console.log(
          "First post has featured media:",
          !!validatedBlogs[0]._embedded?.["wp:featuredmedia"]?.[0]
        );
      }

      return {
        homepage,
        testimonials,
        blogs: validatedBlogs,
        // Store initialization data
        storeData: {
          posts: validatedBlogs,
          testimonials,
          pages: homepage ? { '34': homepage } : {},
        }
      };
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      
      // Return mock data to prevent homepage from failing completely
      const mockHomepage = {
        title: { rendered: "Innovation Strategy Group" },
        acf: {
          hero_title: "Transforming businesses with AI",
          hero_caption: "Strategic innovation and cutting-edge technology solutions that drive exponential growth for forward-thinking enterprises.",
          hero_label: "Innovation Strategy Group"
        }
      };

      return {
        homepage: mockHomepage,
        testimonials: [],
        blogs: [],
        storeData: {
          posts: [],
          testimonials: [],
          pages: { '34': mockHomepage },
        }
      };
    }
  }

  // Server-side data fetching for About page
  async getAboutPageDataSSR() {
    const { fetchAPI } = await import('@/config/api');
    
    try {
      // Run these fetches in parallel for better performance
      const [aboutpageResponse, membersResponse, testimonialsResponse] =
        await Promise.allSettled([
          fetchAPI({ endpoint: "pages/91" }),
          fetchAPI({ endpoint: "members?_embed" }),
          fetchAPI({ endpoint: "testimonial" }),
        ]);

      // Process responses with proper type checking
      const aboutpage =
        aboutpageResponse.status === "fulfilled" ? aboutpageResponse.value : null;
      const members =
        membersResponse.status === "fulfilled"
          ? Array.isArray(membersResponse.value)
            ? membersResponse.value
            : []
          : [];
      const testimonials =
        testimonialsResponse.status === "fulfilled"
          ? Array.isArray(testimonialsResponse.value)
            ? testimonialsResponse.value
            : []
          : [];

      // If we couldn't get the about page data, log the error
      if (!aboutpage) {
        console.error("Failed to fetch about page data");
      }

      return { 
        aboutpage, 
        members, 
        testimonials,
        // Store initialization data for about page
        storeData: {
          testimonials,
          pages: aboutpage ? { '91': aboutpage } : {},
        }
      };
    } catch (error) {
      console.error("Error in getAboutPageDataSSR function:", error);
      return {
        aboutpage: null,
        members: [],
        testimonials: [],
        storeData: {
          testimonials: [],
          pages: {},
        }
      };
    }
  }
}

// Export singleton instance
export const wpService = WordPressService.getInstance();

// React hooks for easy component usage
export const useWordPress = () => {
  const store = useWordPressStore();
  
  return {
    // Data
    posts: store.posts,
    categories: store.categories,
    services: store.services,
    testimonials: store.testimonials,
    pages: store.pages,
    
    // Loading states
    loading: store.loading,
    errors: store.errors,
    pagination: store.pagination,
    
    // Actions
    fetchPosts: store.fetchPosts,
    fetchCategories: store.fetchCategories,
    fetchServices: store.fetchServices,
    fetchTestimonials: store.fetchTestimonials,
    fetchPage: store.fetchPage,
    
    // Getters
    getPostById: store.getPostById,
    getServiceById: store.getServiceById,
    getPageById: store.getPageById,
    getCategoryById: store.getCategoryById,
    
    // Utilities
    clearCache: store.clearCache,
    clearError: store.clearError,
    initializeData: store.initializeData,
  };
};

// Specialized hooks for specific data types
export const usePosts = (params?: PostQueryParams) => {
  const { posts, loading, errors, fetchPosts, pagination } = useWordPress();
  
  return {
    posts,
    loading: loading.posts,
    error: errors.posts,
    pagination: pagination.posts,
    refetch: (newParams?: PostQueryParams) => fetchPosts(newParams || params),
  };
};

export const useCategories = () => {
  const { categories, loading, errors, fetchCategories } = useWordPress();
  
  return {
    categories,
    loading: loading.categories,
    error: errors.categories,
    refetch: fetchCategories,
  };
};

export const useServices = () => {
  const { services, loading, errors, fetchServices } = useWordPress();
  
  return {
    services,
    loading: loading.services,
    error: errors.services,
    refetch: fetchServices,
  };
};

export const useTestimonials = () => {
  const { testimonials, loading, errors, fetchTestimonials } = useWordPress();
  
  return {
    testimonials,
    loading: loading.testimonials,
    error: errors.testimonials,
    refetch: fetchTestimonials,
  };
};

export const usePage = (id: string | number) => {
  const { pages, loading, errors, fetchPage } = useWordPress();
  const pageId = String(id);
  
  return {
    page: pages[pageId],
    loading: loading.pages[pageId] || false,
    error: errors.pages[pageId] || null,
    refetch: () => fetchPage(id),
  };
};

// Specialized hook for homepage data
export const useHomePage = () => {
  return usePage('34'); // Homepage is page ID 34
};