import Link from "next/link";
import React from "react";
import SharedHero from "@/components/shared-hero";

export default function NotFound() {
  return (
    <>
      <SharedHero
        title="News Article Not Found"
        subtitle="Error"
        description="We couldn't find the news article you're looking for."
        backgroundImage="/images/blog-read.png"
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: "News", url: "/news-highlight" },
          { label: "Not Found", url: "" },
        ]}
        highlightPattern="bookend"
      />

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-blue-600 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The news article you're looking for doesn't exist or has been
              removed. Please check the URL or return to our news section.
            </p>
            <Link
              href="/news-highlight"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2 rotate-180"
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
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
