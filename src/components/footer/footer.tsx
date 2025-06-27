import Link from "next/link";
import React from "react";
import Logo from "../header/logo";
import { fixedUrls, footerLinks } from "../header/nav-items";
import { getCurrentYear } from "@/utils";
import CTASection from "./cta-section";
import { getFooterData } from "./footer-data";

const Footer = async () => {
  const { data } = await getFooterData();

  return (
    <footer className="bg-[#EFF7FF]">
      <CTASection footerData={data} />
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -mt-20">
        {/* Subtle background elements similar to CTA */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container relative mx-auto px-3 flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-[30%] flex flex-col justify-center items-center px-4 md:border-r border-white/20 pt-[178px] pr-[51px]">
            <Logo />
            <p className="text-[#FCFCFC] text-center mt-4 max-w-[340px] md:pb-[113px]">
              Project Management as a Service. Built for Complexity. Focused on
              Results.
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
        <div className="relative text-center border-t border-white/20 px-3 pt-[29px] pb-[24px] font-sans text-[#A5B7E2]">
          Copyright © {getCurrentYear()} Innovation Strategy Group LLC dba
          InnovationSGP.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
