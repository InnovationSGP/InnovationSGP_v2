import Link from "next/link";
import React from "react";
import Nav from "./nav";
import ScrollHeader from "./header-on-scroll";
import Logo from "./logo";
import MobileHeader from "./mobile-header";
import { fixedUrls } from "./nav-items";
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <>
      <header
        className={`absolute px-4 top-0 left-0 w-full hidden md:block z-50`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center font-sans justify-between px-6 md:px-8 py-4 w-full mt-6 backdrop-blur-md bg-gradient-to-r from-slate-900/60 to-blue-900/60 border border-white/10 rounded-lg">
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
      <ScrollHeader />
      <MobileHeader />
    </>
  );
};

export default Header;
