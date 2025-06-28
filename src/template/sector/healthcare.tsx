"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fixedUrls } from "@/components/header/nav-items";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import List from "@/components/ui/list";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Users,
  BarChart2,
} from "lucide-react";
import Link from "next/link";

function Healthcare({ data }: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  if (!data) {
    return null;
  }

  // Default fallback images if none are provided
  const primaryImage = data?.images?.[0] || "/images/services.avif";
  const secondaryImage = data?.images?.[1] || "/images/about-hero.png";

  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[32px] py-[60px] px-6 md:px-12 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Grid background overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>

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

        {/* Content */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left column - Content and CTA */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-colors duration-300 transform hover:-translate-y-1">
              {/* Badge */}
              {data?.label && (
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 hover:bg-blue-500/20 transition-colors duration-300">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                    {data.label}
                  </span>
                </div>
              )}

              {/* Heading */}
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-pulse"></div>

                <Heading
                  colorText={data?.color_title || "Healthcare"}
                  secondColor="teal"
                  className="!text-3xl md:!text-4xl !leading-tight !text-white mb-6"
                >
                  {data?.palin_title || "Solutions"}
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
              {data?.list?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <div className="h-5 w-1 bg-teal-400 rounded-full"></div>
                    Our Goals
                  </h3>
                  <ul className="space-y-4">
                    {data.list.map((item: any, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300 group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                        <span className="group-hover:text-white transition-colors duration-300">
                          {item.info}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={fixedUrls.letsTalk}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 inline-flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Right column - Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/10 transform transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src={primaryImage}
                  alt="Healthcare Sector"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-slate-900/30"></div>
              </div>

              {/* Secondary image */}
              {secondaryImage && (
                <div className="absolute -bottom-6 -right-6 w-1/2 h-2/5 rounded-xl overflow-hidden border-4 border-slate-800/90 shadow-lg transform transition-all duration-500 hover:scale-105 z-10">
                  <Image
                    src={secondaryImage}
                    alt="Healthcare Detail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center z-20 shadow-lg animate-pulse animation-delay-3000">
                <BarChart2 className="w-7 h-7 text-white" />
              </div>

              <div className="absolute bottom-10 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center z-20 shadow-lg animate-pulse animation-delay-2000">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Healthcare;
