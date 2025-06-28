"use client";
import Heading from "@/components/ui/heading";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Sparkles, ChevronDown, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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

interface FeatureTopicsProps {
  categories: Category[];
  allPosts?: Post[];
  onCategoryChange?: (categoryId: number | null, filteredPosts: Post[]) => void;
  initialCategoryId?: number | null;
}

function FeatureTopics({
  categories,
  allPosts = [],
  onCategoryChange = () => {},
  initialCategoryId = null,
}: FeatureTopicsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to create a clean URL when changing categories
  const updateUrl = useCallback((categoryId: number | null) => {
    const params = new URLSearchParams();
    if (categoryId !== null) {
      params.set("id", categoryId.toString());
    }
    // Always set page to 1 when changing categories
    params.set("page", "1");
    return `?${params.toString()}`;
  }, []);

  // State for dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Set default active category
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    initialCategoryId
  );

  // Initialize with the correct category
  useEffect(() => {
    // Only update if initialCategoryId changes or categories are loaded
    if (initialCategoryId !== activeCategoryId && categories.length > 0) {
      if (initialCategoryId !== null) {
        const matchedCategory = categories.find(
          (cat) => cat.id === initialCategoryId
        );
        if (matchedCategory) {
          setActiveCategory(matchedCategory.slug);
          setActiveCategoryId(initialCategoryId);
        }
      } else {
        setActiveCategory("all");
        setActiveCategoryId(null);
      }

      // Filter and pass initial posts
      let initialFilteredPosts;
      if (initialCategoryId === null) {
        initialFilteredPosts = allPosts;
      } else {
        initialFilteredPosts = allPosts.filter((post) =>
          post.categories.includes(initialCategoryId)
        );
      }
      onCategoryChange(initialCategoryId, initialFilteredPosts);
    }
  }, [
    initialCategoryId,
    categories,
    allPosts,
    onCategoryChange,
    activeCategoryId,
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (categoryId: number | null, slug: string) => {
    setActiveCategory(slug);
    setActiveCategoryId(categoryId);
    setIsOpen(false);

    // Filter posts based on selected category
    let filteredPosts;
    if (categoryId === null) {
      // "All Categories" - show all posts
      filteredPosts = allPosts;
    } else {
      // Filter to show only posts from the selected category
      filteredPosts = allPosts.filter((post) =>
        post.categories.includes(categoryId)
      );
    }

    // Pass filtered posts to parent component
    onCategoryChange(categoryId, filteredPosts);

    // Update URL without causing a full page reload by using history API directly
    const newUrl = updateUrl(categoryId);
    window.history.pushState({}, "", newUrl);
  };

  // Get display name for the active category
  const getActiveCategoryName = () => {
    if (activeCategory === "all") return "All Categories";
    const category = categories.find((cat) => cat.slug === activeCategory);
    return category?.name || "Feature Topics";
  };

  return (
    <div className="pt-8 md:pt-14">
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-8 md:mb-12 justify-between">
          {/* Left Column: Label and Heading */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-700 text-sm font-medium">
                {getActiveCategoryName()}
              </span>
            </div>
            <Heading
              colorText="Topics"
              className="!text-3xl md:!text-4xl !leading-tight text-black-20"
            >
              Feature
            </Heading>
          </div>

          {/* Right Column: Dropdown for Categories */}
          <div className="flex justify-start md:justify-end py-2">
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full md:w-64 bg-white border border-slate-200 rounded-xl px-4 py-3 text-left text-slate-700 font-medium shadow-sm hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center">
                  <span className="mr-1">Browse:</span>
                  <span className="font-semibold">
                    {getActiveCategoryName()}
                  </span>
                  {activeCategoryId !== null && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {categories.find((cat) => cat.id === activeCategoryId)
                        ?.count || 0}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute z-10 mt-2 w-full md:w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 max-h-80 overflow-y-auto">
                  {/* All Categories Option */}
                  <button
                    onClick={() => handleCategoryChange(null, "all")}
                    className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-blue-50/30 transition-colors"
                  >
                    <span className="font-medium">All Categories</span>
                    {activeCategory === "all" && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  {/* Category Options */}
                  {categories?.map((item: Category, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryChange(item.id, item.slug)}
                      className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="font-medium">{item.name}</span>
                        {item.count !== undefined && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            {item.count}
                          </span>
                        )}
                      </div>
                      {item.slug === activeCategory && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureTopics;
