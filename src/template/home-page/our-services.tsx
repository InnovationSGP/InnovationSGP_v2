import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React from "react";
import ServiceList from "./service-list";
import MobileServiceList from "./mobile-service-list";

const OurServices = () => {
  return (
    <>
      <section className="mb-[60px] container mx-auto px-3">
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between">
          <div>
            <Label>{`Our Services`}</Label>
            <Heading
              colorText={`professional talents`}
              secondColor="blue"
              className="mt-4 mb-3 !leading-10 max-w-[817px]"
            >
              Deliver efficiently and connect 
            </Heading>
          </div>
          <Button className="hidden md:flex">Contact Us</Button>
        </div>
        <section className="hidden md:block">
            <ServiceList/>
        </section>
        <section className="md:hidden">
            <MobileServiceList/>
        </section>
      </section>
    </>
  );
};

export default OurServices;
