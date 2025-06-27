"use client";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { Sparkles } from "lucide-react";

const Testimonials = ({ data }: any) => {
  const slider = React.useRef<any>(null);

  return (
    <section className="max-w-[1356px] mx-auto px-3 py-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[32px] py-[60px] px-3 md:px-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                Client Testimonials
              </span>
            </div>

            <Heading
              colorText={"Say About US"}
              secondColor="teal"
              className="mt-4 !text-white"
            >
              Hear What Our Happy Clients
            </Heading>

            <div className="items-center gap-3 hidden md:flex">
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-[13px] rounded-full hover:bg-white cursor-pointer transition-all duration-300"
              >
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  className="transition-all duration-200"
                >
                  <path
                    d="M0.179353 7.65033C-0.0116072 7.86039 -0.0116072 8.07045 0.179353 8.2805L4.30409 12.4052C4.51415 12.5962 4.7242 12.5962 4.93426 12.4052C5.12522 12.1952 5.12522 11.9851 4.93426 11.7751L1.61155 8.42372H14.2436C14.53 8.40463 14.6828 8.25186 14.7019 7.96542C14.6828 7.67898 14.53 7.52621 14.2436 7.50711H1.61155L4.93426 4.15576C5.12522 3.94571 5.12522 3.73565 4.93426 3.52559C4.7242 3.33463 4.51415 3.33463 4.30409 3.52559L0.179353 7.65033Z"
                    className="fill-[#ffffff] group-hover:fill-black"
                  />
                </svg>
              </button>

              <button
                onClick={() => slider?.current?.slickNext()}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-[13px] rounded-full hover:bg-white cursor-pointer transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M15.2969 8.2805C15.4879 8.07045 15.4879 7.86039 15.2969 7.65033L11.1722 3.52559C10.9621 3.33463 10.7521 3.33463 10.542 3.52559C10.3511 3.73565 10.3511 3.94571 10.542 4.15576L13.8647 7.50711H1.23272C0.946278 7.52621 0.79351 7.67898 0.774414 7.96542C0.79351 8.25186 0.946278 8.40463 1.23272 8.42372H13.8647L10.542 11.7751C10.3511 11.9851 10.3511 12.1952 10.542 12.4052C10.7521 12.5962 10.9621 12.5962 11.1722 12.4052L15.2969 8.2805Z"
                    className="fill-[#ffffff] group-hover:fill-black"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative flex flex-col">
            <Slider {...settings} ref={slider}>
              {data?.testimonials?.map((t: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[16px] px-[20px] py-[20px] text-white mx-2 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Image src="/svg/qoute.svg" alt="" width={21} height={24} />
                    <h6 className="text-lg font-sora font-semibold">
                      {t?.title?.rendered}
                    </h6>
                  </div>

                  <p className="mt-4 text-gray-300 text-sm mb-6 leading-relaxed">
                    {t?.acf?.testimonial_review}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                      <Image
                        src={
                          t?.acf?.testimonial_image ||
                          "/images/placeholderMember.png"
                        }
                        alt=""
                        width={66}
                        height={66}
                        className="object-cover rounded-full w-full h-full"
                      />
                    </div>
                    <div>
                      <h6 className="font-sora font-semibold">
                        {t?.acf?.testimonial_name}
                      </h6>
                      <p className="text-sm text-gray-400">
                        {t?.acf?.testimonial_designation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-blue-400/20">
              <Sparkles
                className="w-12 h-12 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>

            <div className="flex items-center justify-center mt-10 md:hidden gap-3">
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-[13px] rounded-full hover:bg-white cursor-pointer transition-all duration-300"
              >
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  className="transition-all duration-200"
                >
                  <path
                    d="M0.179353 7.65033C-0.0116072 7.86039 -0.0116072 8.07045 0.179353 8.2805L4.30409 12.4052C4.51415 12.5962 4.7242 12.5962 4.93426 12.4052C5.12522 12.1952 5.12522 11.9851 4.93426 11.7751L1.61155 8.42372H14.2436C14.53 8.40463 14.6828 8.25186 14.7019 7.96542C14.6828 7.67898 14.53 7.52621 14.2436 7.50711H1.61155L4.93426 4.15576C5.12522 3.94571 5.12522 3.73565 4.93426 3.52559C4.7242 3.33463 4.51415 3.33463 4.30409 3.52559L0.179353 7.65033Z"
                    className="fill-[#ffffff] group-hover:fill-black"
                  />
                </svg>
              </button>

              <button
                onClick={() => slider?.current?.slickNext()}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-[13px] rounded-full hover:bg-white cursor-pointer transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M15.2969 8.2805C15.4879 8.07045 15.4879 7.86039 15.2969 7.65033L11.1722 3.52559C10.9621 3.33463 10.7521 3.33463 10.542 3.52559C10.3511 3.73565 10.3511 3.94571 10.542 4.15576L13.8647 7.50711H1.23272C0.946278 7.52621 0.79351 7.67898 0.774414 7.96542C0.79351 8.25186 0.946278 8.40463 1.23272 8.42372H13.8647L10.542 11.7751C10.3511 11.9851 10.3511 12.1952 10.542 12.4052C10.7521 12.5962 10.9621 12.5962 11.1722 12.4052L15.2969 8.2805Z"
                    className="fill-[#ffffff] group-hover:fill-black"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
