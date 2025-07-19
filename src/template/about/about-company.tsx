"use client";
import { fixedUrls } from "@/components/header/nav-items";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart2,
  Lightbulb,
  Target,
  Users,
  Cpu,
  Globe,
  Rocket,
  Zap,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  Presentation,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function AboutCompany({ data }: any) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("about-company-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
      },
    }),
  };

  // Company features with icons (similar to WhyChoseUs component)
  const companyFeatures = [
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Strategic Vision",
      description: "Clear direction and objectives for sustainable growth.",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Expert Team",
      description: "Seasoned professionals with diverse industry experience.",
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: "Global Reach",
      description: "International presence with local market understanding.",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Innovative Approach",
      description: "Cutting-edge solutions that drive business transformation.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Quality Assurance",
      description: "Rigorous standards ensuring excellence in delivery.",
    },
    {
      icon: <Presentation className="w-6 h-6 text-white" />,
      title: "Knowledge Transfer",
      description: "Building client capabilities through shared expertise.",
    },
  ];

  return (
    <section
      id="about-company-section"
      className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-10"
    >
      <motion.div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[32px] py-[60px] px-6 md:px-12`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 hover:bg-blue-500/20 transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                {data?.about_us_label || "About Our Company"}
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-pulse"></div>

              <Heading
                colorText={data?.about_us_color_title || "Excellence"}
                secondColor="teal"
                className="!text-4xl md:!text-5xl xl:!text-6xl !leading-tight !text-white mx-auto"
              >
                {data?.about_us_plain_title ||
                  "Transforming Ideas Into Strategic"}
              </Heading>

              <motion.div
                variants={itemVariants}
                className="text-gray-300 mt-8 text-xl leading-relaxed max-w-3xl mx-auto"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.about_us_discription ||
                      "Our mission is to empower businesses through innovative strategies and transformative solutions that drive sustainable growth and competitive advantage.",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left column - Our Expertise */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col hover:bg-white/8 transition-colors duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-5 w-1 bg-teal-400 rounded-full"></div>
                Our Expertise
              </h3>

              <ul className="space-y-4 mb-8 flex-grow">
                {(data?.about_us_expertise || []).map(
                  (item: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300 group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        {typeof item === "string" ? item : item.text}
                      </span>
                    </li>
                  )
                )}
                {(!data?.about_us_expertise ||
                  data?.about_us_expertise.length === 0) && (
                  <>
                    <li className="flex items-start gap-3 text-gray-300 group">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        Strategic planning and execution
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 group">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        Advanced technology implementation
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 group">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        Digital transformation consulting
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 group">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0 group-hover:text-teal-300 transition-colors duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">
                        Data-driven business intelligence
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
                    <h4 className="text-white font-semibold">Innovation Hub</h4>
                    <p className="text-gray-300 text-sm">
                      Pioneering solutions for tomorrow's challenges
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column - Our Approach */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col hover:bg-white/8 transition-colors duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-5 w-1 bg-teal-400 rounded-full"></div>
                Our Approach
              </h3>

              <div className="flex-grow">
                <div className="mb-6">
                  <h4 className="text-white text-lg font-medium mb-2">
                    We're dedicated to your{" "}
                    <span className="text-teal-400">business success</span>
                  </h4>
                  <p className="text-gray-300">
                    Our team combines deep industry expertise with cutting-edge
                    technical knowledge to deliver solutions that drive
                    measurable results and sustainable competitive advantage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center shrink-0 group-hover:bg-teal-400/30 transition-colors duration-300">
                      <Target className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm">
                        Result-Oriented
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Focused on measurable outcomes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center shrink-0 group-hover:bg-teal-400/30 transition-colors duration-300">
                      <Clock className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm">
                        Agile Methodology
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Adaptable to changing needs
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
                  <span>Learn more about our methodology</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Company Features Grid */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h3 className="text-white text-2xl font-bold mb-4">
                Our Core Capabilities
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Comprehensive expertise designed to transform your business and
                drive exceptional results
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {(data?.about_us_card || companyFeatures).map(
                (feature: any, idx: number) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={cardVariants}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-400/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-teal-400/30 transition-all duration-300">
                      {typeof feature.icon === "string" ? (
                        <Image
                          src={feature.icon}
                          alt={feature.title || feature.plain_title}
                          width={24}
                          height={24}
                        />
                      ) : (
                        companyFeatures[idx % companyFeatures.length].icon
                      )}
                    </div>
                    <h4 className="text-white text-lg font-medium mb-2">
                      {feature.title || feature.plain_title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {feature.description || feature.discription}
                    </p>
                  </motion.div>
                )
              )}
            </motion.div>
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
                    Ready to grow with expert guidance?
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
      </motion.div>
    </section>
  );
}

export default AboutCompany;
