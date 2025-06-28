"use client";

import React from "react";
import Image from "next/image";
import { fixedUrls } from "@/components/header/nav-items";
import Heading from "@/components/ui/heading";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

// Define proper TypeScript interfaces for the component props
interface ListItem {
  info: string;
}

interface SectorCardData {
  label?: string;
  palin_title?: string;
  color_title?: string;
  description?: string;
  list?: ListItem[];
  images?: string[];
}

interface EnhancedLeftRightCardProps {
  data: SectorCardData;
  id: number;
}

const EnhancedLeftRightCard: React.FC<EnhancedLeftRightCardProps> = ({
  data,
  id,
}) => {
  if (!data) {
    return null;
  }

  const isEven = id % 2 === 0;

  // Default fallback images if none are provided
  const primaryImage = data?.images?.[0] || "/images/services.avif";
  const secondaryImage = data?.images?.[1] || "/images/about-hero.png";

  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      <div
        className={`relative overflow-hidden ${
          id % 3 === 0
            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
            : id % 3 === 1
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900"
        } rounded-[32px] py-[60px] px-6 md:px-12`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-20 -right-40 w-80 h-80 ${
              id % 3 === 0
                ? "bg-blue-500"
                : id % 3 === 1
                ? "bg-purple-500"
                : "bg-teal-500"
            } rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}
          ></div>
          <div
            className={`absolute -bottom-40 -left-40 w-80 h-80 ${
              id % 3 === 0
                ? "bg-teal-500"
                : id % 3 === 1
                ? "bg-pink-500"
                : "bg-emerald-500"
            } rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}
          ></div>
        </div>

        {/* Grid background overlay - replaced with a simple pattern background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
              isEven ? "lg:gap-12" : "lg:gap-12 lg:grid-flow-dense"
            } items-center`}
          >
            {/* Content Column */}
            <div
              className={`${
                !isEven ? "lg:col-start-2" : ""
              } bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8`}
            >
              {/* Badge */}
              {data?.label && (
                <div
                  className={`inline-flex items-center gap-2 ${
                    id % 3 === 0
                      ? "bg-blue-500/10 border border-blue-500/20"
                      : id % 3 === 1
                      ? "bg-purple-500/10 border border-purple-500/20"
                      : "bg-teal-500/10 border border-teal-500/20"
                  } rounded-full px-4 py-2 mb-6`}
                >
                  <Sparkles
                    className={`w-4 h-4 ${
                      id % 3 === 0
                        ? "text-blue-400"
                        : id % 3 === 1
                        ? "text-purple-400"
                        : "text-teal-400"
                    }`}
                  />
                  <span
                    className={`${
                      id % 3 === 0
                        ? "text-blue-300"
                        : id % 3 === 1
                        ? "text-purple-300"
                        : "text-teal-300"
                    } text-sm font-medium uppercase tracking-wider`}
                  >
                    {data.label}
                  </span>
                </div>
              )}

              {/* Heading */}
              <div className="relative">
                <Heading
                  colorText={data?.color_title || ""}
                  secondColor={
                    id % 3 === 0 ? "teal" : id % 3 === 1 ? "pink" : "emerald"
                  }
                  className="!text-3xl md:!text-4xl !leading-tight !text-white mb-6"
                >
                  {data?.palin_title || ""}
                </Heading>
              </div>

              {/* Description */}
              <div className="text-gray-300 text-lg leading-relaxed mb-8">
                {typeof data?.description === "string" &&
                data.description.includes("<") &&
                data.description.includes(">") ? (
                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                ) : (
                  <p>{data?.description}</p>
                )}
              </div>

              {/* Goals/List */}
              {data?.list && data.list.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <div
                      className={`h-5 w-1 ${
                        id % 3 === 0
                          ? "bg-teal-400"
                          : id % 3 === 1
                          ? "bg-pink-400"
                          : "bg-emerald-400"
                      } rounded-full`}
                    ></div>
                    Key Points
                  </h3>
                  <ul className="space-y-4">
                    {data.list &&
                      data.list.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-300 group"
                        >
                          <CheckCircle2
                            className={`w-5 h-5 ${
                              id % 3 === 0
                                ? "text-teal-400"
                                : id % 3 === 1
                                ? "text-pink-400"
                                : "text-emerald-400"
                            } mt-0.5 shrink-0`}
                          />
                          <span>{item.info}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={fixedUrls.letsTalk}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </div>

            {/* Image Column */}
            <div
              className={`${
                !isEven ? "lg:col-start-1 lg:row-start-1" : ""
              } relative flex items-center justify-center`}
            >
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={primaryImage}
                  alt={data?.palin_title || "Sector Image"}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-slate-900/30"></div>
              </div>

              {/* Secondary image */}
              {secondaryImage && (
                <div
                  className={`absolute ${
                    isEven ? "-bottom-6 -right-6" : "-bottom-6 -left-6"
                  } w-1/2 h-2/5 rounded-xl overflow-hidden border-4 border-slate-800/90 shadow-lg z-10`}
                >
                  <Image
                    src={secondaryImage}
                    alt={`${data?.palin_title || "Sector"} Detail`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedLeftRightCard;
