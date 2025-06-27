"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  PieChart,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

const AboutUs = ({ data }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

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
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>

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

      <div
        className={`max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 hover:bg-blue-500/20 transition-colors duration-300">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
              {data?.about_label || "Innovation Strategy Group"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white max-w-4xl mx-auto">
            {data?.about_plain_title || "We help companies"}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              {data?.about_color_title || "achieve their goals"}
            </span>
          </h2>
          x
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            {data?.about_description ||
              "Innovation Strategy Group combines strategic thinking with cutting-edge technology to help businesses navigate digital transformation."}
          </p>
        </div>

        {/* Enhanced Two Column Layout with improved balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column - Image Slider (6/12 width) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/30 group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
              <Slider {...settings} ref={slider}>
                {data?.about_images?.map((item: any, idx: number) => (
                  <figure key={idx} className="relative">
                    <Image
                      src={item}
                      alt="About Us"
                      width={800}
                      height={600}
                      className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </figure>
                )) || (
                  <figure className="relative">
                    <Image
                      src="/images/hero.jpg"
                      alt="About Us"
                      width={800}
                      height={600}
                      className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </figure>
                )}
              </Slider>

              {/* Stats overlay */}
              <div className="absolute top-[330px] right-10 p-6 max-w-[180px] z-10 bg-gradient-to-r from-blue-50 to-blue-400 rounded-xl backdrop-blur-xs transform hover:scale-105 transition-all duration-300">
                <h4 className="font-bold text-4xl text-white">
                  {data?.about_customers_impacted || "1M+"}
                </h4>
                <p className="font-medium leading-tight text-sm text-blue-100 mt-2">
                  end users impacted
                </p>
              </div>

              {/* Nav buttons */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                <button
                  onClick={() => slider?.current?.slickPrev()}
                  className="bg-white/20 backdrop-blur-sm h-10 w-10 cursor-pointer rounded-full flex items-center justify-center rotate-180 hover:bg-white/30 transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={() => slider?.current?.slickNext()}
                  className="bg-white/20 backdrop-blur-sm h-10 w-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content (6/12 width for better balance) */}
          <div className="lg:col-span-6">
            {/* Key features with enhanced styling */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 hover:bg-white/8 transition-colors duration-300 shadow-lg shadow-blue-900/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-300"></div>
                <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                  {data?.about_label}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6">
                {data?.about_caption}
              </h3>

              {/* Feature list with enhanced styling */}
              <ul className="space-y-5">
                {data?.about_icon_list?.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-blue-300/10 flex items-center justify-center shrink-0 group-hover:bg-blue-300/20 transition-colors duration-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <span className="text-gray-200 text-lg">
                        {typeof item === "string" ? item : item.text}
                      </span>
                      {item.description && (
                        <p className="text-gray-400 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-blue-300/10 flex items-center justify-center shrink-0 group-hover:bg-blue-300/20 transition-colors duration-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <span className="text-gray-200 text-lg">
                          Strategic business consulting
                        </span>
                        <p className="text-gray-400 text-sm mt-1">
                          Expert guidance to drive business growth and
                          innovation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-blue-300/10 flex items-center justify-center shrink-0 group-hover:bg-blue-300/20 transition-colors duration-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <span className="text-gray-200 text-lg">
                          Technology implementation
                        </span>
                        <p className="text-gray-400 text-sm mt-1">
                          Seamless integration of cutting-edge technologies
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-blue-300/10 flex items-center justify-center shrink-0 group-hover:bg-blue-300/20 transition-colors duration-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <span className="text-gray-200 text-lg">
                          Digital transformation
                        </span>
                        <p className="text-gray-400 text-sm mt-1">
                          Comprehensive strategies for digital evolution
                        </p>
                      </div>
                    </li>
                  </>
                )}
              </ul>

              {/* Add a CTA button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-300 group"
                >
                  <span>Learn how we can help</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
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
  );
};

export default AboutUs;
