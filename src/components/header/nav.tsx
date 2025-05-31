"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { navItems } from "./nav-items";

const Nav = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-center gap-10 relative">
      {navItems?.map((item, index) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <li key={index} className="relative group inline-block">
            <Link
              href={item.href}
              className={`group flex items-center gap-1 font-semibold ${
                isActive ? "text-blue-10" : "text-white"
              } hover:text-blue-10`}
            >
              {item.label}

              {item?.subMenu && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="transition-colors duration-200"
                >
                  <path
                    d="M15.3701 7.50004C15.3701 7.50004 11.6877 12.5 10.3701 12.5C9.05248 12.5 5.37012 7.5 5.37012 7.5"
                    stroke={isActive ? "#2563EB" : "#ECECEC"} // default or active color
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
            {isActive && (
              <div className="h-[2px] mt-[2px] absolute -bottom-[2px] w-[36px] bg-blue-10" />
            )}

            {/* First-Level Submenu */}
            {item.subMenu && (
              <div className="absolute left-0 top-full">
                <ul className="mt-2 hidden group-hover:block bg-white shadow-lg overflow-hidden rounded-[10px] z-50 min-w-[222px]">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="relative group/submenu font-medium border-b border-gray-200 last:border-none font-sans text-text"
                    >
                      <Link
                        href={subItem?.href}
                        className="flex items-center justify-between px-4 py-3 text-gray-800 hover:bg-gray-100"
                      >
                        {subItem?.label}
                        {subItem?.subMenu && (
                          <span className="text-gray-400 ml-2">{">"}</span>
                        )}
                      </Link>

                      {/* 3rd-level submenu (visible on hover of this item or its child) */}
                      {subItem?.subMenu && (
                        <ul className="absolute top-0 left-full mt-0 hidden group-hover/submenu:block group-hover:block hover:block bg-white shadow-lg rounded-md z-50 min-w-[250px]">
                          {subItem?.subMenu.map((nestedItem:any, nestedIndex:number) => (
                            <li key={nestedIndex}>
                              <Link
                                href={nestedItem?.href}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                              >
                                {nestedItem?.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
