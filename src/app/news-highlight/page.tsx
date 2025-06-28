import React from "react";
import { Suspense } from "react";
import { generateMetadata } from "./metadata";
import NewsHighlightClient from "./client";

// Export metadata for SEO
export { generateMetadata };

export default function NewsHighlightPage() {
  return (
    <Suspense fallback={<NewsHighlightSkeleton />}>
      <NewsHighlightClient />
    </Suspense>
  );
}

// Skeleton loader for the news highlight page
function NewsHighlightSkeleton() {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="w-full h-[500px] bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse">
        <div className="container mx-auto px-4 py-40">
          <div className="h-10 bg-slate-400 w-1/3 rounded-md mb-4"></div>
          <div className="h-6 bg-slate-400 w-1/2 rounded-md mb-8"></div>
          <div className="h-4 bg-slate-400 w-2/3 rounded-md"></div>
        </div>
      </div>

      {/* Featured News Section Skeleton */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 mb-16">
          <div className="flex items-center mb-10">
            <div className="w-10 h-1 bg-slate-300 mr-4"></div>
            <div className="h-8 bg-slate-200 w-1/4 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="bg-slate-200 h-56 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News Skeleton */}
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10">
            <div className="w-10 h-1 bg-slate-300 mr-4"></div>
            <div className="h-8 bg-slate-200 w-1/4 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="bg-slate-200 h-56 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
