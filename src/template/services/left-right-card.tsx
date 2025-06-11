import React from "react";
import Image from "next/image";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import List from "@/components/ui/list";
import Button from "@/components/ui/button";

function LeftRightCard({ data, id }: any) {
  const points = data?.list;
  return (
    <section className="pb-10 md:py-10">
      <div
        className={`container mx-auto px-3 flex gap-10 ${
          id % 2 !== 0 ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"
        }`}
      >
        {/* Right Section  */}
        <div className="flex flex-col flex-1 items-start">
          {data?.label && <Label>{data?.label}</Label>}
          <Heading colorText={data?.color_title} className="mt-3 text-black-20">
            {data?.palin_title}
          </Heading>

          <div
            className="mt-4 text-xl"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          {/* border  */}
          {points?.length > 0 && (
            <ul className="flex flex-col gap-3 mt-6">
              {points?.map((i: any, idx: number) => (
                <List key={idx}>{i?.info}</List>
              ))}
            </ul>
          )}
          <div className="max-w-[190px] w-full mt-8">
            <Button href={data?.button_link} className="hidden md:flex">
              Contact Us
            </Button>
          </div>
        </div>
        <div className="relative flex-1 w-full flex justify-center items-center">
          <div className="bg-primary rounded-2xl w-full mx-auto relative mr-10">
            {data?.images?.[0] && (
              <Image
                src={data?.images?.[0]}
                width={500}
                height={500}
                alt="Main"
                className="w-full object-cover h-[400px] md:min-h-[566px] rounded-2xl "
              />
            )}
            {data?.images?.[1] && (
              <Image
                src={data?.images?.[1]}
                width={200}
                height={300}
                alt="Overlay"
                className="absolute bottom-12 -right-8 object-cover md:h-72 rounded-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftRightCard;
