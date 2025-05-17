import Link from "next/link";
import React from "react";
import Nav from "./nav";
import ScrollHeader from "./header-on-scroll";
import Logo from "./logo";

const Header = () => {
  return (
    <>
      <header className={`absolute top-0 left-0 w-full`}>
        <div className="container mx-auto flex items-center font-sans justify-between px-6 py-4 w-full mt-6 rounded-[16px] bg-[#85858526] backdrop-blur-[12px]">
            <div className="flex-1">
              <Logo/>
            </div>
            <div className="flex-1">
              <Nav/>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="#" className="border-[#E6E6EE] border py-[7px] leading-[30px] white_button_gradient text-blue-50 font-medium rounded-full px-[24px]">Lets Talk</Link>
            </div>
        </div>
      </header>
      <ScrollHeader/>
    </>
  );
};

export default Header;
