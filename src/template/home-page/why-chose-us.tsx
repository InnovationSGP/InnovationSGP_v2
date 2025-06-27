"use client";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import List from "@/components/ui/list";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Clock,
  Globe,
  Lightbulb,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  LifeBuoy,
  Award,
} from "lucide-react";

const WhyChoseUs = ({ data }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Service features with icons
  const serviceFeatures = [
    {
      icon: <Presentation className="w-6 h-6 text-white" />,
      title: "Business Relationship",
      description:
        "Build strong, lasting partnerships with strategic collaboration.",
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-white" />,
      title: "Marketing Strategy",
      description:
        "Data-driven approaches to reach your target audience effectively.",
    },
    {
      icon: <LifeBuoy className="w-6 h-6 text-white" />,
      title: "Lifetime Support",
      description:
        "Continuous assistance to ensure long-term success and growth.",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Team Collaboration",
      description:
        "Experienced specialists working together to solve complex challenges.",
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: "Global Reach",
      description:
        "International expertise to expand your business across borders.",
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Quality Assurance",
      description:
        "Rigorous standards ensuring excellence in every deliverable.",
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-20">
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[32px] py-[60px] px-6 md:px-12 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-3000"></div>
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

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 hover:bg-blue-500/20 transition-colors duration-300">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                {data?.chose_us_label || "Why Choose Us"}
              </span>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-pulse"></div>

              <Heading
                colorText={data?.chose_us_color_title || "Success"}
                secondColor="teal"
                className="!text-4xl md:!text-5xl xl:!text-6xl !leading-tight !text-white mx-auto"
              >
                {data?.chose_us_plain_title || "Solutions Today for Tomorrow's"}
              </Heading>

              <p className="text-gray-300 mt-8 text-xl leading-relaxed max-w-3xl mx-auto">
                {typeof data?.chose_us_description === "string"
                  ? data?.chose_us_description
                  : "Accelerate Growth with Vertical Tech and Emerging Innovations. Empower dynamic industries through modern solutions and strong team collaboration."}
              </p>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left column - Key benefits */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col hover:bg-white/8 transition-colors duration-300 transform hover:-translate-y-1">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-5 w-1 bg-teal-400 rounded-full"></div>
                Key Benefits
              </h3>

              <ul className="space-y-4 mb-8 flex-grow">
                {(data?.chose_us_list || []).map((item: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                    <span className="group-hover:text-white transition-colors duration-300">
                      {typeof item === "string" ? item : item.text}
                    </span>
                  </li>
                ))}
                {(!data?.chose_us_list || data?.chose_us_list.length === 0) && (
                  <>
                    <li className="flex items-start gap-3 text-gray-300 group">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        Strategic growth planning
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 group">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        Technology for Maximum Impact
                      </span>
                    </li>
                  </>
                )}
              </ul>

              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Expert Consultation
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Book a free strategy session with our consultants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Our Commitment */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col hover:bg-white/8 transition-colors duration-300 transform hover:-translate-y-1">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-5 w-1 bg-teal-400 rounded-full"></div>
                Our Commitment
              </h3>

              <div className="flex-grow">
                <div className="mb-6">
                  <h4 className="text-white text-lg font-medium mb-2">
                    We're Committed to the{" "}
                    <span className="text-teal-400">next level business</span>
                  </h4>
                  <p className="text-gray-300">
                    Our team of experts is dedicated to helping you achieve
                    sustainable growth through innovative strategies and
                    cutting-edge technology solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center shrink-0 group-hover:bg-teal-400/30 transition-colors duration-300">
                      <Target className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm">
                        Strategic Focus
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Targeted solutions for your business needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center shrink-0 group-hover:bg-teal-400/30 transition-colors duration-300">
                      <Clock className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm">
                        Timely Delivery
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Projects completed on schedule
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-all duration-300 group"
                >
                  <span>Learn more about our process</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Service Features Grid */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h3 className="text-white text-2xl font-bold mb-4">
                Our Service Features
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Comprehensive solutions designed to transform your business and
                drive exceptional results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.chose_us_features || serviceFeatures).map(
                (feature: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-400/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-teal-400/30 transition-all duration-300">
                      {typeof feature.icon === "string" ? (
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={24}
                          height={24}
                        />
                      ) : (
                        serviceFeatures[idx % serviceFeatures.length].icon
                      )}
                    </div>
                    <h4 className="text-white text-lg font-medium mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-800/50 to-teal-800/50 rounded-2xl border border-white/10 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-400/20 flex items-center justify-center shrink-0 animate-pulse">
                    <TrendingUp className="w-6 h-6 text-teal-400" />
                  </div>
                  <p className="text-white text-lg font-medium">
                    Ready to transform your business?
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-gray-300 transition-all duration-300 group flex items-center gap-2 hover:shadow-lg hover:shadow-teal-500/20"
                >
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoseUs;
