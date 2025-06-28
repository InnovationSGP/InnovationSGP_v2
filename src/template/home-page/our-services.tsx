"use client";
import Heading from "@/components/ui/heading";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  BarChart3,
  Server,
  Briefcase,
  Code,
  Presentation,
  Globe,
  LineChart,
  Database,
  ShieldCheck,
  Settings,
  Layers,
} from "lucide-react";

type ServiceType = {
  id: string;
  title: string;
  caption: string;
  icon: string;
  image: string;
  link?: string;
};

type OurServicesProps = {
  data: {
    our_service_label?: string;
    our_service_color_title?: string;
    our_service_plain_title?: string;
    our_service_description?: string;
    our_service_service?: ServiceType[];
    cta_url?: string;
  };
};

// Map of service icons using Lucide components
const serviceIcons = {
  business: <Briefcase className="w-5 h-5" />,
  consulting: <Presentation className="w-5 h-5" />,
  data: <Database className="w-5 h-5" />,
  analytics: <BarChart3 className="w-5 h-5" />,
  technology: <Server className="w-5 h-5" />,
  software: <Code className="w-5 h-5" />,
  global: <Globe className="w-5 h-5" />,
  security: <ShieldCheck className="w-5 h-5" />,
  performance: <LineChart className="w-5 h-5" />,
  system: <Settings className="w-5 h-5" />,
  default: <Layers className="w-5 h-5" />,
};

// Helper function to determine which icon to use based on service title or id
const getServiceIcon = (service: ServiceType) => {
  const title = service.title.toLowerCase();

  if (title.includes("business") || title.includes("management"))
    return serviceIcons.business;
  if (title.includes("consult")) return serviceIcons.consulting;
  if (title.includes("data")) return serviceIcons.data;
  if (title.includes("analytics") || title.includes("intelligence"))
    return serviceIcons.analytics;
  if (title.includes("tech")) return serviceIcons.technology;
  if (title.includes("software") || title.includes("develop"))
    return serviceIcons.software;
  if (title.includes("global") || title.includes("international"))
    return serviceIcons.global;
  if (title.includes("security") || title.includes("protect"))
    return serviceIcons.security;
  if (title.includes("performance") || title.includes("optimization"))
    return serviceIcons.performance;
  if (title.includes("system") || title.includes("infrastructure"))
    return serviceIcons.system;

  return serviceIcons.default;
};

const OurServices = ({ data }: OurServicesProps) => {
  const [activeService, setActiveService] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const services = data?.our_service_service || [];

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
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">
                  {data?.our_service_label || "Our Services"}
                </span>
              </div>

              <Heading
                colorText={data?.our_service_color_title}
                secondColor="teal"
                className="!text-4xl md:!text-5xl !leading-tight !text-white"
              >
                {data?.our_service_plain_title || "Explore Our Solutions"}
              </Heading>

              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                {data?.our_service_description ||
                  "Explore our comprehensive range of services designed to help your business achieve its goals and reach new heights."}
              </p>
            </div>

            {data?.cta_url && (
              <Link
                href={data.cta_url}
                className="mt-8 md:mt-0 group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/15 transition-all duration-300"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>

          {/* Main Services Section - Widescreen Layout */}
          {services.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Service Navigation Column */}
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <h3 className="font-medium text-white mb-6 flex items-center gap-2">
                    <div className="h-4 w-1 bg-teal-400 rounded-full"></div>
                    Our Solutions
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {services.map((service, idx) => (
                      <button
                        key={service.id || idx}
                        className={`flex items-center justify-between text-left px-5 py-3.5 rounded-lg transition-all duration-300 ${
                          activeService === idx
                            ? "bg-gradient-to-r from-teal-400/20 to-blue-500/20 text-white font-medium border border-teal-400/30"
                            : "text-gray-300 hover:bg-white/5 border border-transparent hover:border-white/20"
                        }`}
                        onClick={() => setActiveService(idx)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              activeService === idx
                                ? "bg-teal-400 text-white"
                                : "bg-white/10 text-white"
                            }`}
                          >
                            {getServiceIcon(service)}
                          </div>
                          <span>{service.title}</span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-all duration-300 ${
                            activeService === idx
                              ? "text-teal-400 opacity-100"
                              : "opacity-0 text-gray-400 translate-x-2"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Detail Column */}
              <div className="lg:col-span-8 xl:col-span-9">
                {services[activeService] && (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:bg-white/10">
                    <div className="relative h-[350px] overflow-hidden">
                      <Image
                        src={services[activeService].image}
                        alt={services[activeService].title}
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        fill
                        sizes="(max-width: 1600px) 100vw, 1600px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Decorative accent line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/0 via-teal-400/70 to-blue-400/0"></div>

                      <div className="absolute bottom-0 left-0 p-8">
                        <div className="inline-flex items-center justify-center p-3 bg-teal-400 rounded-full mb-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-3">
                          {getServiceIcon(services[activeService])}
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl font-semibold drop-shadow-md">
                          {services[activeService].title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {services[activeService].caption}
                      </p>

                      <Link
                        href={services[activeService].link || "#"}
                        className="inline-flex items-center gap-2 text-teal-300 font-medium hover:text-teal-200 transition-all duration-300 group px-5 py-2 border border-teal-400/30 rounded-full hover:bg-teal-400/10 hover:border-teal-400/50 hover:shadow-sm"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Fallback - For very small screens */}
          <div className="lg:hidden mt-8">
            {services.length > 0 && activeService !== null && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mt-6 transition-all duration-300 hover:bg-white/10">
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    fill
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  {/* Decorative accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/0 via-teal-400/70 to-blue-400/0"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="inline-flex items-center justify-center p-2 bg-teal-400 rounded-full mb-2 shadow-lg transition-transform duration-300 hover:scale-105">
                      {getServiceIcon(services[activeService])}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {services[activeService].caption}
                  </p>
                  <Link
                    href={services[activeService].link || "#"}
                    className="inline-flex items-center gap-2 text-teal-300 font-medium hover:text-teal-200 transition-all duration-300 group px-4 py-1.5 border border-teal-400/30 rounded-full hover:bg-teal-400/10 hover:border-teal-400/50 hover:shadow-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
