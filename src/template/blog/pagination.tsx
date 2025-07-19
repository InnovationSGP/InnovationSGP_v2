"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalPages: number;
  bg?: string;
}

const Pagination = ({ totalPages = 10, bg }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Update currentPage when URL changes
  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());

    // Preserve category if it exists
    const categoryId = searchParams.get("id");
    if (categoryId) {
      params.set("id", categoryId);
    }

    // Update URL without causing page reload using history API
    const newUrl = `?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    // Update the current page locally
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = [];

  // Always show 1, 2, 3 ... last 3 pages
  for (let i = 1; i <= totalPages; i++) {
    if (
      i <= 3 ||
      i > totalPages - 3 ||
      i === currentPage ||
      i === currentPage - 1 ||
      i === currentPage + 1
    ) {
      pages.push(i);
    } else if (pages.length === 0 || pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <section className={`pt-[60px] pb-[70px] ${bg && "bg-[#EFF7FF]"}`}>
      <div
        className={`flex justify-between container mx-auto px-3 items-center gap-4 py-4`}
      >
        {/* Previous */}

        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="group flex items-center gap-1 cursor-pointer text-[#3e3e3e] hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded px-3 py-2"
          aria-label="Previous page"
        >
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            className="transition-all duration-200"
            aria-hidden="true"
          >
            <path
              d="M0.179353 7.65033C-0.0116072 7.86039 -0.0116072 8.07045 0.179353 8.2805L4.30409 12.4052C4.51415 12.5962 4.7242 12.5962 4.93426 12.4052C5.12522 12.1952 5.12522 11.9851 4.93426 11.7751L1.61155 8.42372H14.2436C14.53 8.40463 14.6828 8.25186 14.7019 7.96542C14.6828 7.67898 14.53 7.52621 14.2436 7.50711H1.61155L4.93426 4.15576C5.12522 3.94571 5.12522 3.73565 4.93426 3.52559C4.7242 3.33463 4.51415 3.33463 4.30409 3.52559L0.179353 7.65033Z"
              className="fill-[#3e3e3e] group-hover:fill-blue-600"
            />
          </svg>
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center">
          {pages.map((page, index) =>
            page === "..." ? (
              <span key={index} className="text-gray-400 px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(Number(page))}
                className={`p-3 w-10 h-10 !rounded-[8px] cursor-pointer font-medium text-sm font-sora focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  page === currentPage
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group flex items-center gap-1 cursor-pointer text-[#3e3e3e] hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded px-3 py-2"
          aria-label="Next page"
        >
          <span>Next</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15.2969 8.2805C15.4879 8.07045 15.4879 7.86039 15.2969 7.65033L11.1722 3.52559C10.9621 3.33463 10.7521 3.33463 10.542 3.52559C10.3511 3.73565 10.3511 3.94571 10.542 4.15576L13.8647 7.50711H1.23272C0.946278 7.52621 0.79351 7.67898 0.774414 7.96542C0.79351 8.25186 0.946278 8.40463 1.23272 8.42372H13.8647L10.542 11.7751C10.3511 11.9851 10.3511 12.1952 10.542 12.4052C10.7521 12.5962 10.9621 12.5962 11.1722 12.4052L15.2969 8.2805Z"
              className="fill-[#3e3e3e] group-hover:fill-blue-600"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Pagination;
