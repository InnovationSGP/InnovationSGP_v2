"use client";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import List from "@/components/ui/list";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
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

// Function to generate deterministic "random" numbers based on index
const generateDeterministicValue = (
  index: number,
  min: number,
  max: number,
  offset = 0
) => {
  // Use a simple but deterministic algorithm
  const value = ((index * 9301 + 49297) % 233280) / 233280;
  return min + (value + offset) * (max - min);
};

// Generate particles data once, not on every render
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    left: generateDeterministicValue(i, 0, 100),
    top: generateDeterministicValue(i + 100, 0, 100),
    animationDelay: generateDeterministicValue(i + 200, 0, 3),
    animationDuration: generateDeterministicValue(i + 300, 2, 4),
  }));
};

// Generate particles data
// IMPORTANT: Define the particles array OUTSIDE the component to ensure
// the same values are used during both server and client rendering
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: generateDeterministicValue(i, 0, 100),
  top: generateDeterministicValue(i + 100, 0, 100),
  animationDelay: generateDeterministicValue(i + 200, 0, 3),
  animationDuration: generateDeterministicValue(i + 300, 2, 4),
}));

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
      icon: (
        <BarChart2
          className="w-6 h-6"
          style={{ color: "var(--brand-primary-purple)" }}
        />
      ),
      title: "Change Strategy",
      description:
        "Data-driven approaches to reach your target audience effectively.",
    },

    {
      icon: (
        <Users
          className="w-6 h-6"
          style={{ color: "var(--brand-primary-purple)" }}
        />
      ),
      title: "Team Collaboration",
      description:
        "Experienced specialists working together to solve complex challenges.",
    },

    {
      icon: (
        <Award
          className="w-6 h-6"
          style={{ color: "var(--brand-primary-purple)" }}
        />
      ),
      title: "Quality Assurance",
      description:
        "Rigorous standards ensuring excellence in every deliverable.",
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div
        className={`relative overflow-hidden rounded-[32px] py-[60px] px-6 md:px-12 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ background: "var(--gradient-professional)" }}
      >
        {/* Minimal background accent */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.03]"
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
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 transition-colors duration-300"
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
                {data?.chose_us_label || "Why Choose Us"}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto" style={{ color: 'var(--brand-text-dark)' }}>
              {data?.chose_us_plain_title || "Solutions Today for Tomorrow's"}{" "}
              <span style={{ 
                background: 'var(--brand-gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {data?.chose_us_color_title || "Success"}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl" style={{ color: 'var(--brand-text-secondary)' }}>
              {typeof data?.chose_us_description === "string"
                ? data?.chose_us_description
                : "Accelerate Growth with Vertical Tech and Emerging Innovations. Empower dynamic industries through modern solutions and strong team collaboration."}
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left column - Key benefits */}
            <div
              className="rounded-xl p-8 flex flex-col transition-colors duration-300 transform hover:-translate-y-1"
              style={{
                backgroundColor: "var(--white)",
                border: `1px solid var(--brand-border-light)`,
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <h3
                className="text-xl font-semibold mb-6 flex items-center gap-2"
                style={{ color: "var(--brand-text-dark)" }}
              >
                <div
                  className="h-5 w-1 rounded-full"
                  style={{ backgroundColor: "var(--brand-primary-purple)" }}
                ></div>
                Key Benefits
              </h3>

              <ul className="space-y-4 mb-8 flex-grow">
                {(data?.chose_us_list || []).map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300"
                      style={{ color: "var(--brand-primary-purple)" }}
                    />
                    <span
                      className="transition-colors duration-300"
                      style={{ color: "var(--brand-text-primary)" }}
                    >
                      {typeof item === "string" ? item : item.text}
                    </span>
                  </li>
                ))}
                {(!data?.chose_us_list || data?.chose_us_list.length === 0) && (
                  <>
                    <li className="flex items-start gap-3 group">
                      <CheckCircle2
                        className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300"
                        style={{ color: "var(--brand-primary-purple)" }}
                      />
                      <span
                        className="transition-colors duration-300"
                        style={{ color: "var(--brand-text-primary)" }}
                      >
                        Strategic growth planning
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <CheckCircle2
                        className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300"
                        style={{ color: "var(--brand-primary-purple)" }}
                      />
                      <span
                        className="transition-colors duration-300"
                        style={{ color: "var(--brand-text-primary)" }}
                      >
                        Technology for Maximum Impact
                      </span>
                    </li>
                  </>
                )}
              </ul>

              <div
                className="mt-auto pt-8"
                style={{ borderTop: `1px solid var(--brand-border-light)` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "var(--brand-gradient-accent)" }}
                  >
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ color: "var(--brand-text-dark)" }}
                    >
                      Expert Consultation
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "var(--brand-text-muted)" }}
                    >
                      Book a free strategy session with our consultants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Our Commitment */}
            <div
              className="rounded-xl p-8 flex flex-col transition-colors duration-300 transform hover:-translate-y-1"
              style={{
                backgroundColor: "var(--white)",
                border: `1px solid var(--brand-border-light)`,
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <h3
                className="text-xl font-semibold mb-6 flex items-center gap-2"
                style={{ color: "var(--brand-text-dark)" }}
              >
                <div
                  className="h-5 w-1 rounded-full"
                  style={{ backgroundColor: "var(--brand-primary-purple)" }}
                ></div>
                Our Commitment
              </h3>

              <div className="flex-grow">
                <div className="mb-6">
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ color: "var(--brand-text-dark)" }}
                  >
                    We're Committed to the{" "}
                    <span style={{ color: "var(--brand-primary-purple)" }}>
                      next level business
                    </span>
                  </h4>
                  <p style={{ color: "var(--brand-text-secondary)" }}>
                    Our team of experts is dedicated to helping you achieve
                    sustainable growth through innovative strategies and
                    cutting-edge technology solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 group">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--brand-purple-50)",
                      }}
                    >
                      <Target
                        className="w-4 h-4"
                        style={{ color: "var(--brand-primary-purple)" }}
                      />
                    </div>
                    <div>
                      <h5
                        className="font-medium text-sm"
                        style={{ color: "var(--brand-text-dark)" }}
                      >
                        Strategic Focus
                      </h5>
                      <p
                        className="text-sm"
                        style={{ color: "var(--brand-text-muted)" }}
                      >
                        Targeted solutions for your business needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--brand-purple-50)",
                      }}
                    >
                      <Clock
                        className="w-4 h-4"
                        style={{ color: "var(--brand-primary-purple)" }}
                      />
                    </div>
                    <div>
                      <h5
                        className="font-medium text-sm"
                        style={{ color: "var(--brand-text-dark)" }}
                      >
                        Timely Delivery
                      </h5>
                      <p
                        className="text-sm"
                        style={{ color: "var(--brand-text-muted)" }}
                      >
                        Projects completed on schedule
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-auto pt-8"
                style={{ borderTop: `1px solid var(--brand-border-light)` }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 transition-all duration-300 group"
                  style={{ color: "var(--brand-primary-purple)" }}
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
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--brand-text-dark)" }}
              >
                Our Service Features
              </h3>
              <p
                className="max-w-2xl mx-auto"
                style={{ color: "var(--brand-text-secondary)" }}
              >
                Comprehensive solutions designed to transform your business and
                drive exceptional results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.chose_us_features || serviceFeatures).map(
                (feature: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 group"
                    style={{
                      backgroundColor: "var(--white)",
                      border: `1px solid var(--brand-border-light)`,
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                      style={{
                        backgroundColor: "var(--brand-purple-50)",
                      }}
                    >
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
                    <h4
                      className="text-lg font-medium mb-2"
                      style={{ color: "var(--brand-text-dark)" }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "var(--brand-text-secondary)" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoseUs;
