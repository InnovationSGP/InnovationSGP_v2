"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { navItems } from "./nav-items";

const Nav = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <ul className="flex items-center justify-center gap-8 relative">
      {navItems?.map((item, index) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={`group flex items-center gap-1 font-medium text-[15px] transition-colors duration-300 ${
                isActive ? "text-white" : "text-gray-300"
              } hover:text-white`}
            >
              {item.label}

              {item?.subMenu && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`transition-transform duration-300 ${
                    hoveredItem === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M15.3701 7.50004C15.3701 7.50004 11.6877 12.5 10.3701 12.5C9.05248 12.5 5.37012 7.5 5.37012 7.5"
                    stroke={isActive ? "#FFFFFF" : "#ECECEC"}
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
            {isActive && (
              <div className="h-[2px] absolute -bottom-[2px] left-0 right-0 bg-white opacity-100 transition-opacity duration-300" />
            )}

            {/* First-Level Submenu */}
            {item.subMenu && hoveredItem === index && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full transition-all duration-200">
                <ul className="mt-2 bg-gradient-to-b from-slate-800 to-blue-900 backdrop-blur-lg shadow-xl overflow-hidden rounded-xl z-50 min-w-[222px] border border-white/10">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="relative border-b border-white/5 last:border-none font-medium"
                    >
                      <Link
                        href={subItem?.href}
                        className="flex items-center justify-between px-5 py-3 text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        {subItem?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
