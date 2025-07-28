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
      <header className="absolute top-0 left-0 w-full hidden md:block z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 mt-6">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-xl shadow-gray-900/5 px-8 py-4">
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
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white hover:bg-brand-primary-light rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:translate-y-[-1px]"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ScrollHeader />
      <MobileHeader />
    </>
  );
};

export default Header;
