import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../header/logo";

const Footer = () => {
  return (
    <footer className="bg-[#EFF7FF]">
      <section className="bg-[#486ec4] z-[10] relative container text-white rounded-[10px] mx-auto flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:px-[56px] py-[73px] px-4 md:py-10">
        <h4 className="font-bold text-[28px] z-[1]">
          Do you need free Consultation?
        </h4>
        <div className="flex items-center gap-4 z-1">
          <Link href="">
            <Image
              src="/svg/envlop.svg"
              alt=""
              width={76}
              height={76}
              className="w-[76px]"
            />
          </Link>
          <div>
            <p>Send e-Mail</p>
            <p className="text-2xl font-medium">sales@innovationsgp.com</p>
          </div>
        </div>
        <Image
          src={"/svg/half-circle-shape.svg"}
          alt=""
          className="absolute hidden md:block top-0 left-0"
          width={108}
          height={102}
        />
        <Image
          src={"/svg/half-circle-right.svg"}
          alt=""
          className="absolute top-0 right-0"
          width={108}
          height={102}
        />
      </section>
      <section className="bg-blue-40 -mt-20">
        <div className="container mx-auto px-3 flex">
          <div className="w-[30%] border-r border-white/10 pt-[178px] pr-[51px]">
            <Logo />
            <p className="text-[#FCFCFC] mt-4 max-w-[340px] pb-[113px]">
              Credibly harness client-centric opportunities with prospective
              bandwidth
            </p>
          </div>
          <div className="pt-[178px] flex gap-[77px] pb-[113px] pl-[51px]">
            <div>
              <h5 className="font-medium text-white text-sora text-xl">
                Company
              </h5>
              <ul className="font-sans text-blue-10 mt-[30px] flex flex-col gap-3">
                <li>
                  <Link href="#">Who We Are?</Link>
                </li>
                <li>
                  <Link href="#">Our Services</Link>
                </li>
                <li>
                  <Link href="#">Meet Our Team</Link>
                </li>
                <li>
                  <Link href="#">Latest Blog</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-white text-sora text-xl">
                Service Link
              </h5>
              <ul className="font-sans text-blue-10 mt-[30px] flex flex-col gap-3">
                <li>
                  <Link href="#">Business Intelligence</Link>
                </li>
                <li>
                  <Link href="#">Risk Management</Link>
                </li>
                <li>
                  <Link href="#">Finance Advisor</Link>
                </li>
                <li>
                  <Link href="#">Portfolio Management</Link>
                </li>
                <li>
                  <Link href="#">Consulting Network</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-white text-sora text-xl">
                Newsletter
              </h5>
              <p className="text-[#E9EEF8] font-sans mt-[33px]">
                Don’t miss the latest news
              </p>
              <div className="bg-white py-5">
                <input placeholder="#E9EEF8"/>

              </div>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-white/10  pt-[29px] pb-[24px] font-sans text-[#A5B7E2]">
          Copyright © 2025 Innovation Strategy Group LLC dba InnovationSGP.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
