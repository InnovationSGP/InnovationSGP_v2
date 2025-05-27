"use client";
import Label from "@/components/ui/label";
import React from "react";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import List from "@/components/ui/list";
import Button from "@/components/ui/button";

function JustConsultancy () {
    
  return (
     <section className="py-24">
        <div className="grid container mx-auto px-3 grid-cols-1 md:grid-cols-2 gap-10">
        

          {/* Right Section  */}
          <div className="flex flex-col items-start mt-12 md:mt-0">
            <Label>Just A consultancy</Label>
            <Heading colorText='We know how to manage' className="mt-3 text-black-20">
            business globally
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-12">
              <div className="flex items-center font-medium gap-5 font-sans">
                <div className="">
                  <Image src={`/svg/about-1.svg`} alt="About Us" width={60} height={60} className="w-[60px] h-[60px]"/>
                </div>
                <p className="text-blue-50">Online Finance Advisor Consultation</p>
              </div>
              <div className="flex items-center font-medium gap-5 font-sans">
                <div className="">
                  <Image src={`/svg/about-2.svg`} alt="About Us" width={60} height={60} className="w-[60px] h-[60px]"/>
                </div>
                <p className="text-blue-50">Business Goal Setting Accountability</p>
              </div>
            </div>
            {/* border  */}
            <div className="bg-[#0632321A] h-[1px] w-full my-[34px]" />
            <ul className="flex flex-col gap-3">
              <List>Increasing your productivity for best sales</List>
              <List>Audience growth & competitor analysis</List>
            </ul>
               <div className="max-w-[190px] w-full mt-8">
              <Button className="hidden md:flex">Contact Us</Button>
            </div>
          </div>
           <div className="relative w-full flex justify-center items-center">
          <div className="bg-primary p-6 rounded-2xl w-full  mx-auto relative ml-10">
            <Image
              src="/images/about.png"
              width={500}
              height={500}
              alt="Main"
              className="w-full   rounded-2xl "
            />
            <Image
              src="/images/about.png"
              width={200}
              height={300}
              alt="Overlay"
              className="absolute -mt-52 -left-8  h-72 rounded-2xl hidden sm:block"
            />
          </div>
        </div>
        </div>
      </section>
  )
}

export default JustConsultancy;