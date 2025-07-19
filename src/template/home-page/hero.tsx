"use client";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fixedUrls } from "@/components/header/nav-items";
import { ArrowRight, Sparkles, ChevronRight, Shield } from "lucide-react";

const Hero = ({ data }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen py-8 bg-gradient-to-b from-slate-900 to-blue-900 overflow-hidden">
      {/* Removed duplicate navigation - using the one from layout */}

      {/* Subtle background elements - reduced noise */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Simplified grid overlay with reduced opacity */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:30px_30px]"></div>

      {/* Hero content container - adjusted for header */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 min-h-screen pt-28 flex items-center">
        <div
          className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left column - Text content (spans 7/12 columns) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badge - simplified */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span className="text-blue-100 text-sm font-medium">
                {data?.hero_label || "Innovation Strategy Group"}
              </span>
            </div>

            {/* Heading with reduced glow effect */}
            <div className="relative">
              <Heading
                colorText={data?.hero_color_title || "innovative solutions"}
                secondColor="blue"
                className="!text-4xl md:!text-5xl xl:!text-6xl !leading-tight !text-white"
              >
                {data?.hero_title || "Transforming businesses with"}
              </Heading>
            </div>

            <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-xl leading-relaxed">
              {data?.hero_caption ||
                "Empower your organization with cutting-edge strategies and technology solutions designed to drive growth and innovation."}
            </p>

            {/* CTA buttons - simplified */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={data?.hero_button_link || "/contact"}
                className="px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={data?.hero_secondary_button_link || "/about"}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Simple highlight badge */}
            <div className="mt-12 inline-flex items-center gap-2 bg-blue-900/50 border border-blue-400/20 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-blue-300" />
              <span className="text-blue-100 text-sm">
                Enterprise-grade security & reliability
              </span>
            </div>
          </div>

          {/* Right column - Image (spans 5/12 columns) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative">
              {/* Clean image container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                <Image
                  src={data?.hero_image || "/images/hero.png"}
                  alt="Innovation Strategy"
                  width={800}
                  height={600}
                  className="w-full h-[500px] object-cover"
                  priority
                />

                {/* Single clean overlay card */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 max-w-[280px]">
                  <h5 className="text-white font-medium text-center mb-1">
                    Trusted by Industry Leaders
                  </h5>
                  <p className="text-gray-200 text-sm text-center">
                    Helping businesses achieve their strategic goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view - simplified */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-blue-900/95 z-10"></div>
        <Image
          src={data?.hero_image || "/images/hero.png"}
          alt="Innovation Strategy"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
