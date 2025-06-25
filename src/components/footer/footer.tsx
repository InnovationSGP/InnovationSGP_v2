import Link from "next/link";
import React from "react";
import Logo from "../header/logo";
import {fixedUrls, footerLinks} from "../header/nav-items";
import {getCurrentYear} from "@/utils";

const Footer = () => {
  return (
    <footer className="bg-[#EFF7FF]">
      <section className="flex flex-col items-center justify-center text-center px-4 py-8 md:py-16">
  <div className="flex flex-col bg-[#486ec4] text-white rounded-[10px] w-full max-w-md md:max-w-none justify-center items-center md:px-[56px] py-8">
    <h4 className="font-bold text-[28px]">Chat with us</h4>
    <div className="flex items-center p-2 gap-4 mt-4 md:mt-0 ">
      <Link
        href={fixedUrls.letsTalk}
        className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 border-[#E6E6EE] border py-[7px] leading-[30px] white_button_gradient text-blue-50 font-medium rounded-full px-[24px]"
      >
        Contact Us
      </Link>
    </div>
  </div>
</section>


      <section className="bg-blue-40 -mt-20">
  <div className="container mx-auto px-3 flex flex-col md:flex-row justify-center items-center">
    <div className="md:w-[30%] flex flex-col justify-center items-center px-4 md:border-r border-white/10 pt-[178px] pr-[51px]">
      <Logo />
      <p className="text-[#FCFCFC] text-center mt-4 max-w-[340px] md:pb-[113px]">
        Project Management as a Service. Built for Complexity. Focused on Results.
      </p>
    </div>
    <div className="pt-8 md:pt-[178px] flex md:w-[70%] gap-8 md:gap-[77px] pb-[113px] flex-wrap md:pl-[51px]">
      {/* Company */}
      <div>
        <h5 className="font-medium text-white text-sora text-xl">
          Company
        </h5>
        <ul className="font-sans text-blue-10 mt-[30px] flex flex-col gap-3">
          {footerLinks?.map((item, index) => {
            return (
              <li key={index} className="hover:text-white">
                <Link href={item.href}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Service Link */}
      <div>
        <h5 className="font-medium text-white text-sora text-xl">
          Service Link
        </h5>
        <ul className="font-sans text-blue-10 mt-[30px] flex flex-col gap-3">
          <li className="hover:text-white">
            <Link href="#">Business Intelligence</Link>
          </li>
          <li className="hover:text-white">
            <Link href="#">Risk Management</Link>
          </li>
          <li className="hover:text-white">
            <Link href="#">Finance Advisor</Link>
          </li>
          <li className="hover:text-white">
            <Link href="#">Portfolio Management</Link>
          </li>
          <li className="hover:text-white">
            <Link href="#">Consulting Network</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="text-center border-t border-white/10 px-3 pt-[29px] pb-[24px] font-sans text-[#A5B7E2]">
    Copyright © {getCurrentYear()} Innovation Strategy Group LLC dba InnovationSGP.
  </div>
</section>



    </footer>
  );
};

export default Footer;
