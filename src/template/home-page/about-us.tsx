"use client";
import Label from "@/components/ui/label";
import React, { useState } from "react";
import { homeContent } from "@/template/home-page/content";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import Slider from "react-slick";
import { ArrowRight, Sparkles, CheckCircle, Target, Users } from "lucide-react";

const AboutUs = ({ data }: any) => {
  const { about } = homeContent;
  const [isHovered, setIsHovered] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const slider = React.useRef<any>(null);

  return (
    <>
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              {data?.about_label || "Innovation Strategy Group"}
            </span>
          </div>
        </div>
        <div className="grid container mx-auto px-6 grid-cols-1 lg:grid-cols-2 gap-16 relative">
          <div className="relative rounded-[20px] overflow-hidden shadow-2xl shadow-blue-900/20 group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
            <Slider {...settings} ref={slider}>
              {data?.about_images?.map((item: any, idx: number) => (
                <figure key={idx} className="relative">
                  <Image
                    src={item}
                    alt="About Us"
                    width={700}
                    height={500}
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </figure>
              ))}
            </Slider>
            <div className="absolute top-[330px] right-10 p-8 max-w-[208px] z-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[15px] backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <h4 className="font-bold text-5xl text-white">
                {data?.about_customers_impacted}
              </h4>
              <p className="font-medium leading-tight text-lg text-blue-100 mt-3">
                end users impacted
              </p>
            </div>
            {/* Nav buttons  */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="bg-white/20 backdrop-blur-sm h-12 w-12 cursor-pointer rounded-full flex items-center justify-center rotate-180 hover:bg-white/30 transition-all duration-300"
                aria-label="Previous slide"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM14.2672 17.5431L19.5172 12.5431L18.4828 11.4569L13.2328 16.4569L14.2672 17.5431ZM19.5172 11.4569L14.2672 6.4569L13.2328 7.5431L18.4828 12.5431L19.5172 11.4569ZM19 11.25L5 11.25V12.75L19 12.75V11.25Z"
                    fill="#fff"
                  />
                </svg>
              </button>
              <button
                onClick={() => slider?.current?.slickNext()}
                className="bg-white/20 backdrop-blur-sm h-12 w-12 cursor-pointer rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                aria-label="Next slide"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM14.2672 17.5431L19.5172 12.5431L18.4828 11.4569L13.2328 16.4569L14.2672 17.5431ZM19.5172 11.4569L14.2672 6.4569L13.2328 7.5431L18.4828 12.5431L19.5172 11.4569ZM19 11.25L5 11.25V12.75L19 12.75V11.25Z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section  */}
          <div className="flex flex-col items-start text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {data?.about_plain_title}
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {data?.about_color_title}
              </span>
            </h2>

            {/* Feature icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
              {data?.about_icon_list?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                    <Image
                      src={item?.icon.url}
                      alt={item.text || "Feature icon"}
                      width={40}
                      height={40}
                      className="w-8 h-8"
                    />
                  </div>
                  <p className="text-gray-200 font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="mt-12">
              <button
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-40">
          <Image
            src="/svg/shape.svg"
            alt=""
            className="w-full h-full"
            width={200}
            height={200}
          />
        </div>
      </section>
    </>
  );
};

export default AboutUs;
