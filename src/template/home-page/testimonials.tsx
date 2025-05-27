"use client";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Testimonials = () => {
    const slider = React.useRef<any>(null);

  return (
    <section className="max-w-[1356px] mx-auto px-3">
      <div className="gradient rounded-[32px] py-[60px] px-3 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        <div>
          <Label>TESTIMONIAL</Label>
          <Heading colorText={"Say About US"} secondColor="gary" className="mt-4 !text-white">
            Hear What Our Happy Clients
          </Heading>
          <div className="my-[32px] py-4 text-white flex items-center gap-3 border-t border-b border-[#FFFFFF26]">
            <h6 className="text-[44px] font-sora font-semibold">4.9</h6>
            <div>
              <p className="mb-2">Rating (30 Reviews)</p>
              <Image src={"/svg/star.svg"} width={92} alt="" height={16} />
            </div>
          </div>
          <div className="items-center gap-3 hidden md:flex">
            <button onClick={() => slider?.current?.slickPrev()} className="group bg-blue-10 p-[13px] rounded-full hover:bg-white cursor-pointer">
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

            <button onClick={() => slider?.current?.slickNext()} className="group bg-blue-10 p-[13px] rounded-full hover:bg-white cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M15.2969 8.2805C15.4879 8.07045 15.4879 7.86039 15.2969 7.65033L11.1722 3.52559C10.9621 3.33463 10.7521 3.33463 10.542 3.52559C10.3511 3.73565 10.3511 3.94571 10.542 4.15576L13.8647 7.50711H1.23272C0.946278 7.52621 0.79351 7.67898 0.774414 7.96542C0.79351 8.25186 0.946278 8.40463 1.23272 8.42372H13.8647L10.542 11.7751C10.3511 11.9851 10.3511 12.1952 10.542 12.4052C10.7521 12.5962 10.9621 12.5962 11.1722 12.4052L15.2969 8.2805Z"
                  className="fill-[#ffffff] group-hover:fill-black"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative">
          <Slider {...settings} ref={slider}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex z-10 items-center gap-4 bg-[#2B4A91] rounded-[16px] px-[32px] py-[35px] text-white"
              >
                <div className="flex items-center gap-2">
                  <Image src="/svg/qoute.svg" alt="" width={21} height={24} />
                  <h6 className="text- text-lg font-sora font-semibold">
                    Creative Services!
                  </h6>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Image src={"/svg/star.svg"} width={92} alt="" height={16} />
                  <span className="text-sm font-medium">4.5</span>
                </div>
                <p className="mt-5 text-[13px] text-gray-200 mb-[61px]">
                  Dramatically enable resource sucking only user. Dynamically
                  myocardinate into standards experiences had without make
                  flexible best practices
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={"/images/user.jpg"}
                    width={66}
                    alt=""
                    height={66}
                    className="rounded-full"
                  />
                  <div>
                    <h6 className="font-sora font-semibold">Maisha Jakulin</h6>
                    <p className="mb-2 text-sm text-gray-400">HR Manager</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <Image src="/svg/shape.svg" alt="" width={146} height={66} className="absolute hidden md:block z-[1] -bottom-8 -left-10"/>
          <div className="flex items-center justify-center mt-10 md:hidden gap-3">
            <button onClick={() => slider?.current?.slickPrev()} className="group bg-blue-10 p-[13px] rounded-full hover:bg-white cursor-pointer">
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

            <button onClick={() => slider?.current?.slickNext()} className="group bg-blue-10 p-[13px] rounded-full hover:bg-white cursor-pointer">
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
    </section>
  );
};

export default Testimonials;

var settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
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
    // {
    //   breakpoint: 600,
    //   settings: {
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //   },
    // },
  ],
};
