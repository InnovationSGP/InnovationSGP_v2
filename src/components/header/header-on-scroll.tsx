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
        <div className="max-w-[1600px] mx-auto flex items-center justify-between font-sans px-6 md:px-8 py-4 backdrop-blur-md bg-gradient-to-r from-slate-900/90 to-blue-900/90 border-b border-white/10 shadow-lg">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex-1">
            <Nav />
          </div>
          <div className="flex-1 flex justify-end">
            <Link
              href={fixedUrls.letsTalk}
              className="group px-6 py-2 bg-white text-blue-900 hover:bg-blue-100 hover:text-blue-700 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:translate-y-[-1px]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default ScrollHeader;
