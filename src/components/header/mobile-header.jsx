"use client";
import React, { useState, useEffect } from "react";
import Logo from "./logo";
import Image from "next/image";
import { navItems } from "./nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenu = (href) => {
    if (currentSubMenu === href) {
      setCurrentSubMenu(null);
    } else {
      setCurrentSubMenu(href);
    }
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // Add logic to search through blogs
  };

  return (
    <>
      <header
        className={`md:hidden px-4 py-6 flex justify-between items-center z-50 fixed w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#05095080] backdrop-blur-md"
            : "bg-[#85858526] backdrop-blur-[12px]"
        } shadow-lg`}
      >
        <Logo />
        <button onClick={() => setOpenMenu(!openMenu)}>
          <Image src="/svg/menu-burger.svg" alt="" width={20} height={20} />
        </button>
      </header>
      <nav
        className={`fixed left-0 top-0 w-full h-full bg-gradient-to-r from-blue-50 to-blue-50 z-40 transition-transform duration-300 ease-in-out ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <Logo contrast={true} />
          <button
            className="text-white text-2xl"
            onClick={() => setOpenMenu(false)}
          >
            &times;
          </button>
        </div>
        <div className="px-4 pt">
          {/* <div className="flex items-center bg-white rounded-md shadow-md">
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div> */}
        </div>
        <ul className="flex flex-col items-start px-4 mt-8 gap-6">
          {navItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={index} className="w-full">
                <div className="flex justify-between items-center">
                  <Link
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className={`block w-full px-4 py-2 text-lg font-medium rounded-md text-white hover:bg-blue-700 ${
                      isActive ? "bg-blue-700" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.subMenu && (
                    <button onClick={() => handleMobileMenu(index)}>
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M15 8.00004C15 8.00004 11.3176 13 9.99996 13C8.68237 13 5 8 5 8"
                          stroke="#ECECEC"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {item.subMenu && currentSubMenu === index && (
                  <ul className="flex flex-col gap-4 mt-2 pl-6">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MobileHeader;
