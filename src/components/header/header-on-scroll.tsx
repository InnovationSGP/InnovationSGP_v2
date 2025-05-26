"use client";
import Link from "next/link";
import React from "react";
import Nav from "./nav";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import Logo from "./logo";

const ScrollHeader = () => {
  const isScrolled = useScrollTrigger(200);
  return (
    <>
      <header
        className={`fixed bg-blue-50 z-[100] hidden md:block left-0 w-full transition-all duration-300 linear py-4 ${
          isScrolled ? "top-0" : "-top-[100px]"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between font-sans">
          <div className="flex-1">
            <Logo/>
          </div>
          <div className="flex-1">
            <Nav />
          </div>
          <div className="flex-1 flex justify-end">
            <Link
              href="#"
              className="border-[#E6E6EE] border py-[7px] leading-[30px] white_button_gradient text-blue-50 font-medium rounded-full px-[24px]"
            >
              Lets Talk
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default ScrollHeader;
