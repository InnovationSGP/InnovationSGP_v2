"use client";

import { useEffect, ReactNode } from "react";
import { useWordPressStore } from "@/store/wordpress";

interface WordPressProviderProps {
  children: ReactNode;
  initialData?: {
    posts?: any[];
    categories?: any[];
    services?: any[];
    testimonials?: any[];
    pages?: Record<string, any>;
  };
}

/**
 * WordPress Provider Component
 *
 * This component:
 * 1. Initializes the WordPress store with any SSR data
 * 2. Fetches core data (categories, testimonials) when the app loads
 * 3. Provides a centralized place to manage WordPress data loading
 */
export function WordPressProvider({
  children,
  initialData,
}: WordPressProviderProps) {
  const initializeData = useWordPressStore((state) => state.initializeData);
  const fetchCategories = useWordPressStore((state) => state.fetchCategories);
  const fetchTestimonials = useWordPressStore(
    (state) => state.fetchTestimonials
  );
  const fetchPosts = useWordPressStore((state) => state.fetchPosts);
  const categories = useWordPressStore((state) => state.categories);
  const testimonials = useWordPressStore((state) => state.testimonials);
  const posts = useWordPressStore((state) => state.posts);

  useEffect(() => {
    // Initialize with any SSR data
    if (initialData) {
      initializeData(initialData);
    }

    // Only fetch core data if we don't already have it from SSR
    const fetchCoreData = async () => {
      try {

        const promises = [];

        // Only fetch categories if we don't have them and they weren't provided in initialData
        if (categories.length === 0 && !initialData?.categories?.length) {
          promises.push(fetchCategories());
        }

        // Only fetch testimonials if we don't have them and they weren't provided in initialData
        if (testimonials.length === 0 && !initialData?.testimonials?.length) {
          promises.push(fetchTestimonials());
        }

        // Only fetch posts if we don't have them and they weren't provided in initialData
        // Check if posts are empty arrays (corrupted state) or truly empty
        const hasValidPosts = posts.length > 0 && posts.every(post => post && post.id);
        if (!hasValidPosts && !initialData?.posts?.length) {
          promises.push(
            fetchPosts({
              per_page: 6,
            })
          );
        }

        if (promises.length > 0) {
          await Promise.allSettled(promises);
        }
      } catch (error) {
        console.error("Error fetching core WordPress data:", error);
      }
    };

    // Small delay to allow store initialization to complete
    const timeoutId = setTimeout(fetchCoreData, 100);
    return () => clearTimeout(timeoutId);
  }, [
    initializeData,
    fetchCategories,
    fetchTestimonials,
    fetchPosts,
    initialData,
    categories.length,
    testimonials.length,
    posts.length,
  ]);

  return <>{children}</>;
}

/**
 * Higher-order component for pages that need WordPress data
 */
export function withWordPressData<T extends object>(
  Component: React.ComponentType<T>,
  dataRequirements?: {
    posts?: boolean;
    services?: boolean;
    categories?: boolean;
    testimonials?: boolean;
  }
) {
  return function WordPressDataWrapper(props: T) {
    const fetchPosts = useWordPressStore((state) => state.fetchPosts);
    const fetchServices = useWordPressStore((state) => state.fetchServices);
    const fetchCategories = useWordPressStore((state) => state.fetchCategories);
    const fetchTestimonials = useWordPressStore(
      (state) => state.fetchTestimonials
    );

    useEffect(() => {
      const fetchRequiredData = async () => {
        const promises = [];

        if (dataRequirements?.posts) {
          promises.push(fetchPosts());
        }
        if (dataRequirements?.services) {
          promises.push(fetchServices());
        }
        if (dataRequirements?.categories) {
          promises.push(fetchCategories());
        }
        if (dataRequirements?.testimonials) {
          promises.push(fetchTestimonials());
        }

        if (promises.length > 0) {
          await Promise.allSettled(promises);
        }
      };

      fetchRequiredData();
    }, [fetchPosts, fetchServices, fetchCategories, fetchTestimonials]);

    return <Component {...props} />;
  };
}
