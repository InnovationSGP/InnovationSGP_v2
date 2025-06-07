"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const MobileServiceList = ({data}:any) => {
  return (
    <div className="container mx-auto mt-5 space-y-4 mb-24">
      <Slider {...settings}>
        {data?.map((service:any, idx:number) => (
          <div
            className="border-[#06323226] group mb-0"
            key={idx}
          >
            <Image
              src={service.image}
              alt="Service"
              className="h-[212px] rounded-[25px] w-full object-cover"
              width={342}
              height={212}
            />
            <div className="flex items-center gap-4 border-t border-[#06323226] mt-5 pt-6">
              <figure className="w-[64px] h-[64px] group-hover:bg-blue-20 flex justify-center items-center rounded-full bg-[#DFE8FF]">
                <Image
                  src={service.icon}
                  alt="Service"
                  className="object-cover group-hover:invert group-hover:grayscale"
                  width={28}
                  height={28}
                />
              </figure>
              <div className="flex-1 max-w-[325px] w-full">
                <h3 className="font-bold text-2xl">{service.title}</h3>
              </div>
            </div>
            <p className="text-[#515151] max-w-[400px] mt-3 mb-8">
              {service.caption}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MobileServiceList;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};
