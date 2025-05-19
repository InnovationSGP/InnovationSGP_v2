import Link from "next/link";
import React from "react";

const Button = ({ variant, children, className, href }: any) => {
  return (
    <Link href={href || "#"} className="group">
      <div
        className={`button_gradient sora-font flex items-center gap-3 rounded-full font-sans md:text-xl px-[11px] py-[8px] cursor-pointer pr-4 font-semibold capitalize
        ${variant === "white" ? "bg-white text-blue-50 group-hover:bg-blue-20 group-hover:text-white" : "bg-blue-20 text-white group-hover:bg-blue-50"}
        ${className}
      `}>
        <div
          className={`p-2 rounded-full transition-colors duration-300 ${
            variant === "white"
              ? "bg-blue-20 group-hover:bg-white"
              : "bg-white"
          }`}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-colors duration-300 ${
              variant === "white"
                ? "stroke-white group-hover:stroke-[#486EC4]"
                : "stroke-[#486EC4]"
            }`}
          >
            <path
              d="M6 18L18 6M18 6H9M18 6V15"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {children}
      </div>
    </Link>
  );
};

export default Button;
