"use client";
import React, { useState, useEffect } from "react";
import Logo from "./logo";
import Image from "next/image";
import { navItems } from "./nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const MobileHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const handleMobileMenu = (index) => {
    if (currentSubMenu === index) {
      setCurrentSubMenu(null);
    } else {
      setCurrentSubMenu(index);
    }
  };

  return (
    <>
      <header
        className={`md:hidden px-6 py-4 flex justify-between items-center z-50 fixed w-full transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-slate-900/90 to-blue-900/90 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-slate-900/60 to-blue-900/60 backdrop-blur-md"
        }`}
      >
        <Logo />
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      ></div>

      <nav
        className={`fixed right-0 top-0 w-[85%] max-w-sm h-full bg-gradient-to-b from-slate-900 to-blue-900 z-50 transition-transform duration-300 ease-in-out shadow-2xl ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <Logo contrast={true} />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            onClick={() => setOpenMenu(false)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="px-4 py-6">
          <ul className="flex flex-col items-start gap-1">
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
                      className={`block w-full px-4 py-3 text-[15px] font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <button
                        onClick={() => handleMobileMenu(index)}
                        className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {currentSubMenu === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                  {item.subMenu && currentSubMenu === index && (
                    <ul className="ml-4 border-l border-white/10 pl-2 mt-1 mb-2 space-y-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 text-[14px]"
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

          <div className="mt-8 px-4">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-900 hover:bg-blue-100 hover:text-blue-700 rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileHeader;
