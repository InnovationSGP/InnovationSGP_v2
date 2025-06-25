import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React from "react";

const Hero = ({
  data, bg
}: any) => {

  return (
    <>
 <main className="hidden md:block md:h-screen w-full bg-cover bg-no-repeat pt-[50px] pb-[30px] md:p-0 md:bg-[url('/images/hero.png')]">
  <div className="container px-3 mx-auto h-full flex flex-col items-start justify-center pt-20">
    <div className="max-w-[648px] py-4 flex flex-col items-start">
      <Label>{data?.hero_label}</Label>
      <Heading
        variant="large"
        className="mt-3 !text-black md:!text-white"
      >
        {data?.hero_title}
      </Heading>
      <p className="mt-4 text-lg md:text-gray-100 md:text-xl mb-16">
        {data?.hero_caption}
      </p>
      <Button
        variant="white"
        className="bg-[linear-gradient(180deg,_#FFFFFF_0%,_#8EA9E4_100%)] md:bg-white"
        href={data?.hero_button_link}
      >
        Get Started
      </Button>
    </div>
  </div>
</main>
<figure className="md:hidden relative h-screen">
  <img
    src={"/images/hero.png"}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 animate-fade-in">
    {/*<Label className="text-sm">{data?.hero_label}</Label>*/}
    <Heading
      variant="large"
      className="mt-3 text-4xl px-2 font-bold"
    >
      {data?.hero_title}
    </Heading>
    <p className="mt-2 p-6 text-sm">{data?.hero_caption}</p>
    <Button
        variant="white"
        className="bg-[linear-gradient(180deg,_#FFFFFF_0%,_#8EA9E4_100%)] md:bg-white"
        href={data?.hero_button_link}
    >
      Get Started
    </Button>
  </div>
</figure>
<style jsx>{`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-in-out;
  }
`}</style>
    </>
  );
};

export default Hero;