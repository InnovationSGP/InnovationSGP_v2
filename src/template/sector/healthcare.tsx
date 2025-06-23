import { fixedUrls } from "@/components/header/nav-items";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import List from "@/components/ui/list";
import React from "react";

function Healthcare({ data }: any) {
  return (
    <section className="py-20 bg-gray-100 px-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <Label>{data?.label}</Label>
            <Heading colorText={data?.color_title} className="mt-4 mb-3">
              {data?.palin_title}
            </Heading>
            <div className="max-w-[190px] w-full mt-8">
              <Button href={fixedUrls.letsTalk} className="hidden md:flex">
                Contact Us
              </Button>
            </div>
          </div>
          <div>
            <p className="text-[20px]">{data?.description}</p>
            <Heading
              colorText="Our Goals :"
              className="mt-4 mb-3 !text-[20px]"
            ></Heading>
            {data?.list?.map((i: any, id: number) => (
              <List key={id}>{i.info}</List>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Healthcare;
