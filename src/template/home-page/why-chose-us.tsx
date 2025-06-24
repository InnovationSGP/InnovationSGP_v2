import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import List from "@/components/ui/list";
import Image from "next/image";
import React from "react";
import { homeContent } from "./content";

const WhyChoseUs = ({data}:any) => {
  const content = homeContent.whyChooseUs;

  return (
    <>
      <section className="bg-white pt-10 pb-20 md:py-[50px] gap-8 md:gap-4 flex md:flex-row flex-col container mx-auto px-3">
        <div className="flex-1">
          <Label>{data?.chose_us_label}</Label>
          <Heading
            colorText={data?.chose_us_color_title}
            secondColor="blue"
            className="mt-4 mb-3 !leading-10 md:!text-[36px]"
            style={{ lineHeight: "42px !important" }}
          >
            {data?.chose_us_plain_title}
          </Heading>
            <div className="text-text">
              {data?.chose_us_description}
            </div>
          
          <ul className="mt-10 text-lg text-black-20 flex flex-col gap-[11px]">
            {data?.chose_us_list?.map((item:any, index:number) => (
              <List key={index}>{item.text}</List>
            ))}
          </ul>
          {/*<div className="flex mt-10">*/}
          {/*  <Button href={data?.chose_us_button_link}>{content.buttonText}</Button>*/}
          {/*</div>*/}
        </div>

        <div className="max-w-[350px] w-full order-last md:order-none">
          <Image
            src={data?.chose_us_image}
            alt="Choose Us Image"
            width={370}
            height={504}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <Image
              src={content.commitment.icon}
              alt="Icon"
              width={50}
              height={50}
            />
            <Heading
              colorText={data?.chose_us_sub_color_title}
              className="mt-4 mb-3 !leading-10 !text-2xl !md:leading-[30px]"
              style={{ lineHeight: "32px !important" }}
              secondColor="blue"
            >
              {data?.chose_us_sub_plain_title}
            </Heading>
          </div>
          <div className="h-[1px] bg-[#0632321A] w-full my-9" />
          <div className="flex flex-col gap-10">
            {data?.chose_us_icon_list?.map((feature:any, index:number) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src={feature.icon}
                  alt="Icon"
                  width={50}
                  height={50}
                />
                <div>
                  <h6 className="text-lg text-[#1F1F1F] font-semibold">
                    {feature.title}
                  </h6>
                  <p className="text-sm text-text">{feature.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default WhyChoseUs;
