"use client";
import Link from "next/link";
import React from "react";
import Nav from "./nav";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import Logo from "./logo";
import { fixedUrls } from "./nav-items";
import { ArrowRight } from "lucide-react";

const ScrollHeader = () => {
  const isScrolled = useScrollTrigger(200);
  return (
    <>
      <header
        className={`fixed z-[100] hidden md:block left-0 w-full transition-all duration-500 ${
          isScrolled ? "top-0" : "-top-[100px]"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5">
          <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex-shrink-0">
                <Logo />
              </div>

              {/* Navigation */}
              <div className="flex-1 flex justify-center">
                <Nav />
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Link
                  href={fixedUrls.letsTalk}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white hover:bg-brand-primary-light rounded-full font-semibold text-sm transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:translate-y-[-1px]"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ScrollHeader;
