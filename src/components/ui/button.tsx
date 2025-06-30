import Link from "next/link";
import React from "react";
import { MoveRight } from "lucide-react";

const Button = ({ variant, children, className, href }: any) => {
  return (
    <Link href={href || "#"} className="group">
      <div
        className={`button_gradient sora-font flex items-center gap-3 rounded-xl font-sans md:text-xl px-5 py-3 cursor-pointer font-semibold capitalize transition-all duration-300 overflow-hidden
        ${
          variant === "white"
            ? "bg-white text-blue-50 group-hover:bg-blue-20 group-hover:text-white shadow-md"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white group-hover:from-indigo-600 group-hover:to-blue-600 shadow-lg hover:shadow-blue-300/20"
        }
        ${className}
      `}
      >
        <span className="flex items-center gap-2 relative z-10">
          {children}
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 transform transition-transform duration-300 group-hover:translate-x-1">
            <MoveRight
              size={16}
              className="text-white transition-colors duration-300"
              strokeWidth={2.5}
            />
          </div>
        </span>
      </div>
    </Link>
  );
};

export default Button;
