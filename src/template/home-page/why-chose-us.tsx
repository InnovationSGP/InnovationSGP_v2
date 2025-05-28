import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import List from "@/components/ui/list";
import Image from "next/image";
import React from "react";
import { homeContent } from "./content";

const WhyChoseUs = () => {
  const content = homeContent.whyChooseUs;

  return (
    <>
      <section className="bg-white pt-10 pb-20 md:py-[100px] gap-8 md:gap-4 flex md:flex-row flex-col container mx-auto px-3">
        <div className="flex-1">
          <Label>{content.label}</Label>
          <Heading
            colorText={content.colorText}
            secondColor="blue"
            className="mt-4 mb-3 !leading-10 md:!text-[36px]"
            style={{ lineHeight: "42px !important" }}
          >
            {content.title}
          </Heading>
          {content.description.map((text, index) => (
            <p key={index} className="text-text">
              {text}
            </p>
          ))}
          <ul className="mt-10 text-lg text-black-20 flex flex-col gap-[11px]">
            {content.list.map((item, index) => (
              <List key={index}>{item}</List>
            ))}
          </ul>
          <div className="flex mt-10">
            <Button>{content.buttonText}</Button>
          </div>
        </div>

        <div className="max-w-[350px] w-full order-last md:order-none">
          <Image
            src={content.image}
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
              colorText={content.commitment.colorText}
              className="mt-4 mb-3 !leading-10 !text-2xl !md:leading-[30px]"
              style={{ lineHeight: "32px !important" }}
              secondColor="blue"
            >
              {content.commitment.heading}
            </Heading>
          </div>
          <div className="h-[1px] bg-[#0632321A] w-full my-9" />
          <div className="flex flex-col gap-10">
            {content.features.map((feature, index) => (
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
                  <p className="text-sm text-text">{feature.description}</p>
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
