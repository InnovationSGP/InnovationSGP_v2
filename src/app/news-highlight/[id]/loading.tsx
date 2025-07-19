import React from "react";

export default function NewsArticleLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero section skeleton */}
      <div className="w-full h-[500px] bg-gradient-to-r from-slate-200 to-slate-300">
        <div className="container mx-auto px-4 py-40">
          <div className="h-10 bg-slate-400 w-1/3 rounded-md mb-4"></div>
          <div className="h-6 bg-slate-400 w-1/2 rounded-md mb-8"></div>
          <div className="h-4 bg-slate-400 w-2/3 rounded-md"></div>
        </div>
      </div>

      {/* Article content skeleton */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured image skeleton */}
            <div className="mb-10 rounded-xl overflow-hidden h-96 bg-slate-200"></div>

            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-full"></div>
              <div className="h-6 bg-slate-200 rounded w-5/6"></div>
              <div className="h-6 bg-slate-200 rounded w-4/5"></div>
              <div className="h-6 bg-slate-200 rounded w-full"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3"></div>

              <div className="h-48 bg-slate-200 rounded w-full my-8"></div>

              <div className="h-6 bg-slate-200 rounded w-full"></div>
              <div className="h-6 bg-slate-200 rounded w-5/6"></div>
              <div className="h-6 bg-slate-200 rounded w-4/5"></div>
              <div className="h-6 bg-slate-200 rounded w-full"></div>
            </div>

            {/* Footer skeleton */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-36"></div>
                </div>
                <div className="h-12 bg-slate-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
