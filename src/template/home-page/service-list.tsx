"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

type ServiceType = {
  id: string;
  title: string;
  caption: string;
  icon: string;
  image: string;
  link?: string;
};

const ServiceList = ({ data }: { data?: ServiceType[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto border-t border-blue-100/50 mt-[54px] space-y-1">
      {data.map((service, idx) => (
        <div
          className="border-b border-blue-100/50 group mb-0 transition-all"
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`flex items-center justify-between rounded-xl gap-10 cursor-pointer pr-6 py-6 transition-all duration-300 ${
              hoveredIndex === idx
                ? "bg-white/70 backdrop-blur-sm shadow-sm"
                : ""
            }`}
          >
            <div className="flex items-center gap-8">
              <div
                className={`ml-4 transition-all duration-300 overflow-hidden ${
                  hoveredIndex === idx
                    ? "w-[180px] opacity-100"
                    : "w-0 opacity-0"
                }`}
              >
                {hoveredIndex === idx && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="h-[130px] rounded-lg object-cover shadow-md"
                    width={180}
                    height={130}
                  />
                )}
              </div>

              <figure
                className={`w-[64px] h-[64px] flex justify-center items-center rounded-full transition-all duration-300 ${
                  hoveredIndex === idx ? "bg-teal-400 text-white" : "bg-blue-50"
                }`}
              >
                <Image
                  src={service.icon}
                  alt={service.title}
                  className={`object-cover transition-all duration-300 ${
                    hoveredIndex === idx ? "invert brightness-0 filter" : ""
                  }`}
                  width={28}
                  height={28}
                />
              </figure>

              <div className="flex-1 max-w-[325px] w-full">
                <h3 className="font-bold text-2xl text-gray-800">
                  {service.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between gap-10">
              <p className="text-sm text-gray-700 max-w-[400px] mt-1 leading-relaxed">
                {service.caption}
              </p>

              <Link
                href={service?.link || "#"}
                className={`transition-all duration-300 ${
                  hoveredIndex === idx
                    ? "bg-teal-400 text-white p-3 rounded-full shadow-md hover:bg-teal-500"
                    : "p-2 rounded-full border border-teal-300 text-teal-500"
                }`}
                aria-label={`Learn more about ${service.title}`}
              >
                {hoveredIndex === idx ? (
                  <ArrowRight className="w-5 h-5" />
                ) : (
                  <span className="-mt-[5px] text-xl">›</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
