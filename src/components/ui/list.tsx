import React from "react";
import { BadgeCheck } from "lucide-react";

const List = ({ children }: any) => {
  return (
    <>
      <li className="text-text flex items-center gap-3 group">
        <div className="rounded-md bg-blue-50 p-1 transition-all duration-300 group-hover:bg-blue-100">
          <BadgeCheck
            className="w-5 h-5 text-blue-600 flex-shrink-0 transition-all duration-300 group-hover:text-blue-700"
            strokeWidth={2}
          />
        </div>
        <span className="transition-all duration-300 group-hover:text-blue-700">
          {children}
        </span>
      </li>
    </>
  );
};

export default List;
