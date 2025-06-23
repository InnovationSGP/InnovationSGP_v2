import Label from "@/components/ui/label";
import React from "react";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import List from "@/components/ui/list";
import Button from "@/components/ui/button";
import { fixedUrls } from "@/components/header/nav-items";

function JustConsultancy({ data }: any) {
  return (
    <section className="py-24">
      <div className="grid container mx-auto px-3 grid-cols-1 md:grid-cols-2 gap-10">
        {/* Right Section  */}
        <div className="flex flex-col items-start mt-12 md:mt-0">
          <Label>{data?.about_label}</Label>
          <Heading
            colorText={data?.about_color_title}
            className="mt-3 text-black-20"
          >
            {data?.about_plain_title}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-12">
            {data?.about_icon_list?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center font-medium gap-5 font-sans"
              >
                <div className="">
                  <Image
                    src={item?.icon?.url}
                    alt={item?.text}
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px]"
                  />
                </div>
                <p className="text-blue-50">{item?.text}</p>
              </div>
            ))}
          </div>
          {/* border  */}
          <div className="bg-[#0632321A] h-[1px] w-full my-[34px]" />
          <ul className="flex flex-col gap-3">
            {data?.about_list?.map((item: any, idx: number) => (
              <List key={idx}>{item?.text}</List>
            ))}
          </ul>

          <div className="max-w-[190px] w-full mt-8">
            <Button
              href={fixedUrls.letsTalk}
              className="hidden md:flex"
            >
              Contact Us
            </Button>
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center">
          <div className="bg-primary p-6 rounded-2xl w-full  mx-auto relative ml-10">
            {data?.about_images?.[0] && (
              <Image
                src={data?.about_images?.[0]}
                width={500}
                height={500}
                alt="Main"
                className="w-full object-cover min-h-[566px] rounded-2xl "
              />
            )}
            {data?.about_images?.[1] && (
              <Image
                src={data?.about_images?.[1]}
                width={200}
                height={300}
                alt="Overlay"
                className="absolute bottom-12 -left-8 object-cover h-72 rounded-2xl hidden sm:block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JustConsultancy;
