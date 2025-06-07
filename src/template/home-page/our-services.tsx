import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React from "react";
import ServiceList from "./service-list";
import MobileServiceList from "./mobile-service-list";

const OurServices = ({data}:any) => {
  console.log("🚀 ~ OurServices ~ data:", data)

  return (
    <>
      <section className="mb-[60px] container mx-auto px-3">
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between">
          <div>
            <Label>{data?.our_service_label}</Label>
            <Heading
              colorText={data?.our_service_color_title}
              secondColor="blue"
              className="mt-4 mb-3 !leading-10 max-w-[817px]"
            >
              {data?.our_service_plain_title}
            </Heading>
          </div>
          <Button href={data?.our_service_button_url} className="hidden md:flex">Contact Us</Button>
        </div>
        <section className="hidden md:block">
            <ServiceList data={data?.our_service_service}/>
        </section>
        <section className="md:hidden">
            <MobileServiceList data={data?.our_service_service}/>
        </section>
      </section>
    </>
  );
};

export default OurServices;
