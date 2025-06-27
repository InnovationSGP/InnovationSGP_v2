"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceType = {
  id: string;
  title: string;
  caption: string;
  icon: string;
  image: string;
  link?: string;
};

const MobileServiceList = ({ data }: { data?: ServiceType[] }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto mt-5 space-y-4 mb-24">
      <Slider {...settings}>
        {data.map((service, idx) => (
          <div className="group mb-0 px-2" key={idx}>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="h-[212px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={342}
                  height={212}
                />
              </div>

              <div className="flex items-center gap-4 mt-6">
                <figure className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-blue-50 group-hover:bg-teal-400 transition-colors duration-300">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    className="object-cover group-hover:invert group-hover:brightness-0 filter transition-all duration-300"
                    width={24}
                    height={24}
                  />
                </figure>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-700 mt-3 mb-5 line-clamp-3 leading-relaxed">
                {service.caption}
              </p>

              <Link
                href={service?.link || "#"}
                className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors group"
                aria-label={`Learn more about ${service.title}`}
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  dotsClass: "slick-dots !bottom-[-30px]",
  className: "pb-8",
};
