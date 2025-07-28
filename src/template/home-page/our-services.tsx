"use client";
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
  business: (
    <Briefcase
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  consulting: (
    <Presentation
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  data: (
    <Database
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  analytics: (
    <BarChart3
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  technology: (
    <Server
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  software: (
    <Code
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  global: (
    <Globe
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  security: (
    <ShieldCheck
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  performance: (
    <LineChart
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  system: (
    <Settings
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
  default: (
    <Layers
      className="w-5 h-5"
      style={{ color: "var(--brand-primary-purple)" }}
    />
  ),
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
    <section className="container mx-auto px-4 md:px-6 lg:px-8 py-20">
      <div
        className={`relative overflow-hidden rounded-[32px] py-[60px] px-6 md:px-12 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ background: "var(--brand-bg-secondary)" }}
      >
        {/* Minimal background accent */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.03]"
            style={{ backgroundColor: "var(--brand-primary-purple)" }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.02]"
            style={{ backgroundColor: "var(--brand-primary-blue)" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-colors duration-300"
              style={{
                backgroundColor: "var(--brand-purple-50)",
                border: `1px solid var(--brand-border-accent)`,
              }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: "var(--brand-primary-purple)" }}
              />
              <span
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: "var(--brand-text-brand)" }}
              >
                {data?.our_service_label || "Our Services"}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
              style={{ color: "var(--brand-text-dark)" }}
            >
              {data?.our_service_plain_title || "Explore Our"}{" "}
              <span
                style={{
                  background: "var(--brand-gradient-accent)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data?.our_service_color_title || "Solutions"}
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg md:text-xl"
              style={{ color: "var(--brand-text-secondary)" }}
            >
              {data?.our_service_description ||
                "Explore our comprehensive range of services designed to help your business achieve its goals and reach new heights."}
            </p>
          </div>

          {/* Main Services Section - Widescreen Layout */}
          {services.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Service Navigation Column */}
              <div className="lg:col-span-4 xl:col-span-3">
                <div
                  className="rounded-xl p-6 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--white)",
                    border: `1px solid var(--brand-border-light)`,
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <h3
                    className="font-medium mb-6 flex items-center gap-2"
                    style={{ color: "var(--brand-text-dark)" }}
                  >
                    <div
                      className="h-4 w-1 rounded-full"
                      style={{ backgroundColor: "var(--brand-primary-purple)" }}
                    ></div>
                    Our Solutions
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {services.map((service, idx) => (
                      <button
                        key={service.id || idx}
                        className={`flex items-center justify-between text-left px-5 py-3.5 rounded-lg transition-all duration-300`}
                        style={{
                          backgroundColor:
                            activeService === idx
                              ? "var(--brand-purple-50)"
                              : "transparent",
                          color:
                            activeService === idx
                              ? "var(--brand-text-dark)"
                              : "var(--brand-text-secondary)",
                          border: `1px solid ${
                            activeService === idx
                              ? "var(--brand-border-accent)"
                              : "transparent"
                          }`,
                          fontWeight: activeService === idx ? "600" : "400",
                        }}
                        onClick={() => setActiveService(idx)}
                        onMouseEnter={(e) => {
                          if (activeService !== idx) {
                            e.currentTarget.style.backgroundColor =
                              "var(--brand-bg-secondary)";
                            e.currentTarget.style.borderColor =
                              "var(--brand-border-light)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeService !== idx) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.borderColor = "transparent";
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              backgroundColor:
                                activeService === idx
                                  ? "var(--brand-primary-purple)"
                                  : "var(--brand-purple-50)",
                            }}
                          >
                            <div
                              style={{
                                color:
                                  activeService === idx
                                    ? "var(--white)"
                                    : "var(--brand-primary-purple)",
                              }}
                            >
                              {getServiceIcon(service)}
                            </div>
                          </div>
                          <span>{service.title}</span>
                        </div>
                        <ChevronRight
                          className="w-4 h-4 transition-all duration-300"
                          style={{
                            color:
                              activeService === idx
                                ? "var(--brand-primary-purple)"
                                : "var(--brand-text-muted)",
                            opacity: activeService === idx ? 1 : 0,
                            transform:
                              activeService === idx
                                ? "translateX(0)"
                                : "translateX(8px)",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Detail Column */}
              <div className="lg:col-span-8 xl:col-span-9">
                {services[activeService] && (
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-500"
                    style={{
                      backgroundColor: "var(--white)",
                      border: `1px solid var(--brand-border-light)`,
                      boxShadow: "var(--shadow-lg)",
                    }}
                  >
                    <div className="relative h-[350px] overflow-hidden">
                      <Image
                        src={services[activeService].image}
                        alt={services[activeService].title}
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        fill
                        sizes="(max-width: 1600px) 100vw, 1600px"
                        priority
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(40, 18, 89, 0.7) 0%, rgba(40, 18, 89, 0.3) 40%, transparent 100%)",
                        }}
                      ></div>

                      {/* Decorative accent line */}
                      <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ background: "var(--brand-gradient-accent)" }}
                      ></div>

                      <div className="absolute bottom-0 left-0 p-8">
                        <div
                          className="inline-flex items-center justify-center p-3 rounded-full mb-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-3"
                          style={{
                            background: "var(--brand-gradient-accent)",
                          }}
                        >
                          <div style={{ color: "var(--white)" }}>
                            {getServiceIcon(services[activeService])}
                          </div>
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl font-semibold drop-shadow-md">
                          {services[activeService].title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-8">
                      <p
                        className="text-lg leading-relaxed mb-8"
                        style={{ color: "var(--brand-text-secondary)" }}
                      >
                        {services[activeService].caption}
                      </p>

                      <Link
                        href={services[activeService].link || "#"}
                        className="inline-flex items-center gap-2 font-medium transition-all duration-300 group px-5 py-2 rounded-full"
                        style={{
                          color: "var(--brand-primary-purple)",
                          border: `1px solid var(--brand-border-accent)`,
                          backgroundColor: "var(--brand-purple-50)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--brand-primary-purple)";
                          e.currentTarget.style.color = "var(--white)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--brand-purple-50)";
                          e.currentTarget.style.color =
                            "var(--brand-primary-purple)";
                        }}
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
        </div>
      </div>
    </section>
  );
};

export default OurServices;
