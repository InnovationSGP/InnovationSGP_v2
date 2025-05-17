import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React from "react";
import {homeContent} from "@/template/home-page/content";

const Hero = () => {
  const { hero } = homeContent;
  const { label, title, description } = hero;

  return (
    <main
      className="h-screen w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(115, 115, 115, 0) 0%, #00022C 100%), url(/images/hero.jpg)`,
      }}
    >
      <div className="container px-3 mx-auto h-full flex flex-col items-start justify-center pt-20">
        <div className="max-w-[648px] flex flex-col items-start">
          <Label>{label}</Label>
          <Heading variant="large" className="mt-3 ">
            {title}
          </Heading>
          <p className="mt-4 text-lg text-gray-100 md:text-xl mb-16">
            {description}
          </p>
          <Button variant="white">Get Started</Button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
