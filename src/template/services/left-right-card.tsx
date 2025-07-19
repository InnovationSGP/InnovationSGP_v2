"use client";
import React from "react";
import Image from "next/image";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";
import { fixedUrls } from "@/components/header/nav-items";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  LucideIcon,
  ChevronRight,
  Shield,
} from "lucide-react";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const highlightVariants: Variants = {
  hidden: { width: "0%", opacity: 0 },
  visible: {
    width: "100%",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

interface LeftRightCardProps {
  data: {
    label?: string;
    color_title?: string;
    palin_title?: string;
    description?: string;
    caption?: string;
    images?: string[];
    list?: Array<{ info: string; caption?: string }>;
  };
  id: number;
}

function LeftRightCard({ data, id }: LeftRightCardProps) {
  const points = data?.list || [];
  const isEven = id % 2 === 0;

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute ${
            isEven ? "left-0" : "right-0"
          } top-20 w-64 h-64 bg-gradient-to-r from-blue-100/30 to-teal-100/30 rounded-full blur-3xl opacity-70`}
        />
        <div
          className={`absolute ${
            isEven ? "right-10" : "left-10"
          } bottom-20 w-48 h-48 bg-gradient-to-r from-purple-100/20 to-blue-100/20 rounded-full blur-3xl opacity-60`}
        />

        {/* Abstract geometric shapes */}
        <div
          className={`absolute ${
            isEven ? "left-1/4" : "right-1/4"
          } top-1/3 w-32 h-32 border-2 border-blue-200/20 rounded-xl rotate-12 opacity-40`}
        />
        <div
          className={`absolute ${
            isEven ? "right-1/3" : "left-1/3"
          } bottom-1/4 w-16 h-16 border-2 border-teal-200/30 rounded-full opacity-40`}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className={`container mx-auto px-4 lg:px-6 flex flex-col gap-16 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center relative z-10`}
      >
        {/* Content Section */}
        <motion.div
          variants={containerVariants}
          className="w-full md:w-1/2 flex flex-col"
        >
          {data?.label && (
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100/70 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-blue-700 text-xs font-medium tracking-wide">
                {data.label}
              </span>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="relative">
            <Heading
              colorText={data?.color_title || ""}
              className="text-3xl md:text-4xl lg:text-5xl font-bold !leading-tight text-gray-800"
            >
              {data?.palin_title || ""}
            </Heading>

            {/* Animated underline highlight */}
            <motion.div
              variants={highlightVariants}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
            />
          </motion.div>

          {data?.description && (
            <motion.div
              variants={itemVariants}
              className="mt-8 text-gray-600 prose prose-lg max-w-none prose-headings:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}

          {data?.caption && (
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-start gap-3 bg-gradient-to-r from-blue-50/80 to-teal-50/80 rounded-lg p-4 border-l-4 border-blue-400"
            >
              <Shield className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
              <p className="text-gray-600 text-base leading-relaxed">
                {data.caption}
              </p>
            </motion.div>
          )}

          {points.length > 0 && (
            <motion.div variants={containerVariants} className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <div className="h-6 w-1.5 bg-gradient-to-b from-blue-500 to-teal-400 rounded-full"></div>
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-5">
                {points.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-10 h-10 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-full flex items-center justify-center border border-blue-100/80 group-hover:from-blue-400/20 group-hover:to-teal-400/20 transition-colors duration-300">
                        <CheckCircle className="w-5 h-5 text-blue-500 group-hover:text-teal-500 transition-colors" />
                      </div>
                      <div>
                        <span className="text-gray-800 font-medium text-lg group-hover:text-blue-600 transition-colors">
                          {item.info}
                        </span>
                        {item.caption && (
                          <p className="text-gray-500 mt-2 leading-relaxed">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="mt-12">
            <Button
              href={fixedUrls.letsTalk}
              className="group inline-flex items-center gap-3 text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 border-none px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]"
            >
              Contact Us
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={containerVariants}
          className="w-full md:w-1/2 relative"
        >
          <div
            className={`relative w-full ${
              isEven ? "pl-0 md:pl-8" : "pr-0 md:pr-8"
            }`}
          >
            {/* Main image */}
            {data?.images?.[0] && (
              <motion.div
                variants={imageVariants}
                className="relative z-10 rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={data.images[0]}
                  width={600}
                  height={700}
                  alt={data?.palin_title || "Feature"}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-70" />

                {/* Decorative elements on the image */}
                <div className="absolute top-6 right-6 w-20 h-20 border-4 border-white/20 rounded-full blur-[1px]" />
                <div className="absolute bottom-10 left-10 w-16 h-16 border-4 border-white/20 rounded-lg rotate-45 blur-[1px]" />
              </motion.div>
            )}

            {/* Secondary image */}
            {data?.images?.[1] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`absolute ${
                  isEven ? "-right-4" : "-left-4"
                } bottom-16 z-20 w-48 md:w-64 rounded-lg overflow-hidden shadow-2xl border-4 border-white`}
              >
                <Image
                  src={data.images[1]}
                  width={240}
                  height={300}
                  alt="Detail"
                  className="w-full h-auto object-cover"
                />

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 mix-blend-overlay" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default LeftRightCard;
