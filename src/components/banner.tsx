import React from 'react';
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";

function Banner({ bgImage, labelText, headingText, description }:any) {
  return (
    <main
      className="w-full min-h-[500px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(0, 2, 44, 0.5), rgba(0, 2, 44, 0.9)), url(${bgImage})`,
      }}
    >
      <div className="container px-3 mx-auto flex items-center justify-center min-h-[500px] pt-20">
        <div className="max-w-[753px] flex flex-col items-center text-center">
          <Label className="px-4 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/30 shadow shadow-white/10">
            {labelText}
          </Label>

          <Heading variant="large" className="mt-2 !text-[48px] text-white">
            {headingText}
          </Heading>

          <p className="mt-2 text-lg text-gray-100 md:text-xl max-w-[553px]">
            {description}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Banner;
