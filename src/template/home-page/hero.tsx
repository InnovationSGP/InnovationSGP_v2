"use client";
import Heading from "@/components/ui/heading";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Hero = ({ data }: any) => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-8">
            
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 ring-1 ring-teal-200/50">
                <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                <span className="text-sm font-medium text-teal-700">
                  {data?.hero_label || "Innovation Strategy Group"}
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center lg:text-left">
              <Heading
                colorText={data?.hero_color_title || null}
                secondColor="teal"
                className="!text-4xl !font-bold !tracking-tight text-gray-900 sm:!text-5xl lg:!text-6xl"
              >
                {data?.hero_title || "Transform your strategy into reality"}
              </Heading>
            </div>

            {/* Description */}
            <p className="text-center text-lg leading-8 text-gray-600 sm:text-xl lg:text-left">
              {data?.hero_caption || "Practical solutions that deliver lasting results for forward-thinking enterprises."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-start">
              <Link
                href={data?.hero_button_link || "/contact"}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                style={{ backgroundColor: "var(--brand-primary)" }}
              >
                Let's Get to Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={data?.hero_secondary_button_link || "/about"}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                See How
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-center text-sm font-medium uppercase tracking-wide text-gray-500 lg:text-left">
                Trusted by industry leaders
              </p>
              <div className="mt-6 grid grid-cols-3 gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold tracking-tight text-blue-900 lg:text-3xl" style={{ color: "var(--brand-primary)" }}>
                    500+
                  </div>
                  <div className="mt-1 text-sm text-gray-600">Clients</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold tracking-tight text-teal-600 lg:text-3xl">98%</div>
                  <div className="mt-1 text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold tracking-tight text-blue-900 lg:text-3xl" style={{ color: "var(--brand-primary)" }}>
                    $2.8B+
                  </div>
                  <div className="mt-1 text-sm text-gray-600">Value Created</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative mt-16 lg:mt-0">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
                <Image
                  src={data?.hero_background_image?.url || "/images/hero.png"}
                  alt="Innovation Strategy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -left-4 top-1/4 hidden h-16 w-16 rounded-2xl bg-teal-100 ring-1 ring-teal-200/50 lg:block"></div>
              <div className="absolute -right-6 bottom-1/4 hidden h-12 w-12 rounded-xl bg-blue-100 ring-1 ring-blue-200/50 lg:block" style={{ backgroundColor: "var(--brand-primary-100)" }}></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;