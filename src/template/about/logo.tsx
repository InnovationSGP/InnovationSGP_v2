"use client";

import Heading from "@/components/ui/heading";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Label from "@/components/ui/label";

function Logo({ data }: any) {
  // Create two refs for the scrolling containers
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  // Ensure we have data to display
  const logos = Array.isArray(data) ? data : [];

  // If we don't have enough logos, duplicate them to ensure smooth scrolling
  const extendedLogos =
    logos.length < 10 ? [...logos, ...logos, ...logos] : logos;

  // Handle the auto-scrolling animation
  useEffect(() => {
    if (!scrollRef1.current || !scrollRef2.current) return;

    // Animation timing
    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.12; // pixels per millisecond - slightly slower for smoother effect

    // Get width measurements
    const scrollWidth = scrollRef1.current.scrollWidth;

    // Set initial positions
    let scroll1Position = 0;
    let scroll2Position = scrollWidth;

    // Apply initial positions
    scrollRef1.current.style.transform = `translateX(${scroll1Position}px)`;
    scrollRef2.current.style.transform = `translateX(${scroll2Position}px)`;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Update scroll positions at identical rate
      scroll1Position -= scrollSpeed * deltaTime;
      scroll2Position -= scrollSpeed * deltaTime;

      // Reset positions when scrolled out of view
      // When the first container goes completely off-screen to the left
      if (scroll1Position <= -scrollWidth) {
        scroll1Position = scrollWidth; // Reset to right side of view
      }

      // When the second container goes completely off-screen to the left
      if (scroll2Position <= -scrollWidth) {
        scroll2Position = scrollWidth; // Reset to right side of view
      }

      // Apply scroll positions
      if (scrollRef1.current) {
        scrollRef1.current.style.transform = `translateX(${scroll1Position}px)`;
      }
      if (scrollRef2.current) {
        scrollRef2.current.style.transform = `translateX(${scroll2Position}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [data]);

  // If no logos, show a placeholder
  if (logos.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Label>Partnerships</Label>
          <Heading
            colorText="Partners"
            className="mt-3 text-black-20"
            secondColor="gradient"
          >
            Our Trusted
          </Heading>
          <p className="mt-4 text-gray-500">Partner logos coming soon</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <Label>Partnerships</Label>
          <Heading
            colorText="Partners"
            className="mt-3 text-black-20"
            secondColor="gradient"
          >
            Our Trusted
          </Heading>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Collaborating with industry leaders to deliver exceptional solutions
          </p>
        </div>
      </div>

      {/* Gradient overlays for smooth fade effect on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

      {/* Logos scroll container */}
      <div className="relative overflow-hidden w-full py-12">
        {/* Container for consistent height */}
        <div className="h-24 relative">
          {/* Single row of scrolling logos */}
          <div
            className="flex items-center justify-center whitespace-nowrap absolute left-0 right-0 top-0 bottom-0"
            ref={scrollRef1}
          >
            {extendedLogos.map((logo: any, index: number) => (
              <div
                key={`logo1-${index}`}
                className="inline-flex items-center justify-center mx-8"
              >
                <div className="p-4 bg-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105 h-16 w-[160px] flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner logo ${index + 1}`}
                    width={120}
                    height={60}
                    className="object-contain w-auto h-auto max-h-10 max-w-[120px] filter grayscale hover:grayscale-0 transition-all duration-500"
                    style={{ opacity: 0.75 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate row that follows immediately after */}
          <div
            className="flex items-center justify-center whitespace-nowrap absolute left-0 right-0 top-0 bottom-0"
            ref={scrollRef2}
          >
            {extendedLogos.map((logo: any, index: number) => (
              <div
                key={`logo2-${index}`}
                className="inline-flex items-center justify-center mx-8"
              >
                <div className="p-4 bg-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105 h-16 w-[160px] flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner logo ${index + 1}`}
                    width={120}
                    height={60}
                    className="object-contain w-auto h-auto max-h-10 max-w-[120px] filter grayscale hover:grayscale-0 transition-all duration-500"
                    style={{ opacity: 0.75 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Logo;
