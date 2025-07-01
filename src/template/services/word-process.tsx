"use client";
import React from "react";
import Image from "next/image";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle2,
  ArrowRightCircle,
  BarChart,
  PieChart,
  LineChart,
  Layers,
  Settings,
  Zap,
  Sparkles,
} from "lucide-react";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

// Map steps to icons
const getStepIcon = (index: number) => {
  const icons = [
    <CheckCircle2 key={0} className="w-5 h-5 text-white" />,
    <ArrowRightCircle key={1} className="w-5 h-5 text-white" />,
    <BarChart key={2} className="w-5 h-5 text-white" />,
    <PieChart key={3} className="w-5 h-5 text-white" />,
    <LineChart key={4} className="w-5 h-5 text-white" />,
    <Layers key={5} className="w-5 h-5 text-white" />,
    <Settings key={6} className="w-5 h-5 text-white" />,
    <Zap key={7} className="w-5 h-5 text-white" />,
  ];
  return icons[index % icons.length];
};

interface WordProcessProps {
  data: {
    steps_plain_title?: string;
    steps_color_title?: string;
    step?: Array<{
      title: string;
      caption: string;
    }>;
    steps_images?: string[];
  };
}

function WordProcess({ data }: WordProcessProps) {
  // Safely get steps array
  const steps = data?.step || [];
  const hasSteps = steps.length > 0;

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[32px] my-10 mx-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + i * 7}%`,
              animationDelay: `${0.5 * i}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col-reverse gap-16 lg:flex-row items-center"
        >
          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 relative mx-auto"
            variants={containerVariants}
          >
            <motion.div className="relative" variants={imageVariants}>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-teal-500/20 rounded-lg transform rotate-2 scale-[1.02]" />

              <Image
                src={data?.steps_images?.[0] || "/images/services.avif"}
                width={600}
                height={600}
                alt="Process visualization"
                className="w-full h-[400px] md:h-[551px] rounded-lg object-cover shadow-xl border border-white/10"
              />

              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-blue-400 rounded-full opacity-20 blur-lg" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-teal-400 rounded-full opacity-20 blur-lg" />
            </motion.div>

            {data?.steps_images?.[1] && (
              <motion.div
                className="absolute -right-2 bottom-10 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-1 max-w-xs overflow-hidden border border-white/20"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.4,
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={data.steps_images[1]}
                  width={238}
                  height={274}
                  alt="Detailed view"
                  className="w-full h-auto object-cover rounded opacity-90"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="w-full lg:w-1/2 mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4 hover:bg-blue-500/20 transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                What we do
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Heading
                colorText={data?.steps_color_title || "Our Process"}
                secondColor="teal"
                className="mt-2 !text-4xl md:!text-5xl !leading-tight !text-white"
              >
                {data?.steps_plain_title || "How we deliver excellence"}
              </Heading>
            </motion.div>

            {hasSteps && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
                variants={containerVariants}
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    {/* Step Number & Icon */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-400/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-teal-400/30 transition-all duration-300">
                        {getStepIcon(index)}
                      </div>
                      <span className="text-sm font-bold text-teal-400 group-hover:text-teal-300 transition-colors duration-300">
                        STEP {index + 1}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    {/* Description */}
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {step.caption}
                    </p>
                    {/* Decorative element */}
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-teal-400/10 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default WordProcess;
