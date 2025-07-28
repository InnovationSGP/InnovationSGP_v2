"use client";
import React, { useState, useEffect } from "react";
import Logo from "./logo";
import { navItems } from "./nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const MobileHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState<number | null>(null);
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

  const handleMobileMenu = (index: number) => {
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
            ? "bg-white/98 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-200/50"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <Logo />
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      ></div>

      <nav
        className={`fixed right-0 top-0 w-[85%] max-w-sm h-full bg-white z-50 transition-transform duration-300 ease-in-out shadow-2xl shadow-gray-900/10 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200/60">
          <Logo />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setOpenMenu(false)}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="px-4 py-6">
          <ul className="flex flex-col items-start gap-2">
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
                      className={`block w-full px-4 py-3 text-[15px] font-semibold rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                          : "text-gray-700 hover:text-brand-primary hover:bg-brand-primary/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <button
                        onClick={() => handleMobileMenu(index)}
                        className="p-2 text-gray-500 hover:text-brand-primary transition-colors duration-200"
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
                    <ul className="ml-4 border-l-2 border-brand-primary/20 pl-4 mt-2 mb-2 space-y-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-brand-primary transition-colors duration-200 rounded-lg hover:bg-brand-primary/5 text-[14px] font-medium"
                          >
                            <span className="text-lg">{subItem.icon}</span>
                            <span>{subItem.label}</span>
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
              className="group flex items-center justify-center gap-2 w-full py-3 bg-brand-primary text-white hover:bg-brand-primary-light rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30"
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
