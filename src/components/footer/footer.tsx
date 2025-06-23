import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../header/logo";
import { fixedUrls, footerLinks } from "../header/nav-items";
import EmailForm from "./email-form";

const Footer = () => {
  return (
    <footer className="bg-[#EFF7FF]">
      <section className="px-3">
        <div className="bg-[#486ec4] z-[10] relative container text-white rounded-[10px] mx-auto flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:px-[56px] py-[73px] px-3 md:py-10">
          <h4 className="font-bold text-[28px] z-[1]">
            Do you need free Consultation?
          </h4>
          <div className="flex items-center gap-4 z-1 p-2 ">

            <div>
              <div className="flex-1 flex justify-end">
                <Link href={fixedUrls.letsTalk} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                                     active:translate-y-0 border-[#E6E6EE] border py-[7px] leading-[30px] white_button_gradient text-blue-50 font-medium rounded-full px-[24px]">Contact Us</Link>
              </div>
            </div>
          </div>
          <Image
            src={"/svg/half-circle-shape.svg"}
            alt=""
            className="absolute hidden md:block top-0 left-0 h-auto w-auto"
            width={108}
            height={102}

          />
          <Image
            src={"/svg/half-circle-right.svg"}
            alt=""
            className="absolute h-auto w-auto top-0 right-0"
            width={108}
            height={102}

          />
        </div>
      </section>

      <section className="bg-blue-40 -mt-20">
        <div className="container mx-auto px-3 flex flex-col md:flex-row">
          <div className="md:w-[30%] md:border-r border-white/10 pt-[178px] pr-[51px]">
            <Logo />
            <p className="text-[#FCFCFC] mt-4 max-w-[340px] md:pb-[113px]">
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
                  return ( <li key={index} className="hover:text-white">
                        <Link  href={item.href} >{item.label}</Link>
                      </li>)

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
            {/* Newsletter */}
            {/*<div>*/}
            {/*  <h5 className="font-medium text-white text-sora text-xl">*/}
            {/*    Newsletter*/}
            {/*  </h5>*/}
            {/*  <p className="text-[#E9EEF8] font-sans mt-[30px]">*/}
            {/*    Don’t miss the latest news*/}
            {/*  </p>*/}
            {/*  <EmailForm/>*/}
            {/*  <div className="flex items-center gap-2 mt-8 text-blue-10">*/}
            {/*    <Image*/}
            {/*      src={"/svg/bell-button.svg"}*/}
            {/*      alt=""*/}
            {/*      width={38}*/}
            {/*      height={38}*/}
            {/*    />*/}
            {/*    <p>Please sign up for notify any updates</p>*/}
            {/*  </div>*/}
            {/*</div>*/}

          </div>
        </div>
        <div className="text-center border-t border-white/10 px-3 pt-[29px] pb-[24px] font-sans text-[#A5B7E2]">
          Copyright © 2025 Innovation Strategy Group LLC dba InnovationSGP.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
