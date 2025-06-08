"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Pagination = ({ totalPages = 10, bg }:any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(window.location.search);
  params.set("page", page.toString());
  router.push(`?${params.toString()}`);
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
    <section className={`pt-[90px] pb-[70px] ${bg && 'bg-[#EFF7FF]'}`}>
      <div className={`flex justify-between container mx-auto px-3 items-center gap-4 py-4`}>
      {/* Previous */}

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="group flex items-center gap-1 cursor-pointer text-[#3e3e3e] hover:text-blue-400"
      >
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          className="transition-all duration-200"
        >
          <path
            d="M0.179353 7.65033C-0.0116072 7.86039 -0.0116072 8.07045 0.179353 8.2805L4.30409 12.4052C4.51415 12.5962 4.7242 12.5962 4.93426 12.4052C5.12522 12.1952 5.12522 11.9851 4.93426 11.7751L1.61155 8.42372H14.2436C14.53 8.40463 14.6828 8.25186 14.7019 7.96542C14.6828 7.67898 14.53 7.52621 14.2436 7.50711H1.61155L4.93426 4.15576C5.12522 3.94571 5.12522 3.73565 4.93426 3.52559C4.7242 3.33463 4.51415 3.33463 4.30409 3.52559L0.179353 7.65033Z"
            className="fill-[#3e3e3e] group-hover:fill-blue-400"
          />
        </svg>
        Previous
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
              className={`p-3 w-10 h-10 !rounded-[8px] cursor-pointer font-medium text-sm font-sora ${
                page === currentPage
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
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
        className="group flex items-center gap-1 cursor-pointer text-[#3e3e3e] hover:text-blue-400"
      >
        Next
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M15.2969 8.2805C15.4879 8.07045 15.4879 7.86039 15.2969 7.65033L11.1722 3.52559C10.9621 3.33463 10.7521 3.33463 10.542 3.52559C10.3511 3.73565 10.3511 3.94571 10.542 4.15576L13.8647 7.50711H1.23272C0.946278 7.52621 0.79351 7.67898 0.774414 7.96542C0.79351 8.25186 0.946278 8.40463 1.23272 8.42372H13.8647L10.542 11.7751C10.3511 11.9851 10.3511 12.1952 10.542 12.4052C10.7521 12.5962 10.9621 12.5962 11.1722 12.4052L15.2969 8.2805Z"
            className="fill-[#3e3e3e] group-hover:fill-blue-400"
          />
        </svg>
      </button>
    </div>
    </section>
  );
};

export default Pagination;
