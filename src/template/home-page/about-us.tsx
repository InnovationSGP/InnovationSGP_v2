"use client";
import React, { useState, useEffect, useMemo } from "react";
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

const generateDeterministicValue = (
  index: number,
  min: number,
  max: number,
  offset = 0
) => {
  const value = ((index * 9301 + 49297) % 233280) / 233280;
  return min + (value + offset) * (max - min);
};

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
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--brand-bg-secondary)' }}>
      {/* Minimal background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.03]" style={{ backgroundColor: 'var(--brand-primary-purple)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-[0.02]" style={{ backgroundColor: 'var(--brand-primary-blue)' }}></div>
      </div>

      <div
        className={`container mx-auto px-4 md:px-6 lg:px-8 relative z-10 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-colors duration-300" style={{
            backgroundColor: 'var(--brand-purple-50)',
            border: `1px solid var(--brand-border-accent)`
          }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--brand-primary-purple)' }} />
            <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--brand-text-brand)' }}>
              {data?.about_label || "Innovation Strategy Group"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto" style={{ color: 'var(--brand-text-dark)' }}>
            {data?.about_plain_title || "We help companies"}{" "}
            <span style={{ 
              background: 'var(--brand-gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {data?.about_color_title || "achieve their goals"}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl" style={{ color: 'var(--brand-text-secondary)' }}>
            {data?.about_caption ||
              "Innovation Strategy Group combines strategic thinking with cutting-edge technology to help businesses navigate digital transformation."}
          </p>
        </div>

        {/* Enhanced Two Column Layout with improved balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column - Image Slider (6/12 width) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden group" style={{ 
              border: `1px solid var(--brand-border-light)`,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(255, 255, 255, 0.1) 100%)' }}></div>
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
              <div className="absolute top-[330px] right-10 p-6 max-w-[180px] z-10 rounded-xl backdrop-blur-md transform hover:scale-105 transition-all duration-300" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: `1px solid var(--brand-border-light)`,
                boxShadow: 'var(--shadow-lg)'
              }}>
                <h4 className="font-bold text-4xl" style={{ color: 'var(--brand-primary-purple)' }}>
                  {data?.about_customers_impacted || "1M+"}
                </h4>
                <p className="font-medium leading-tight text-sm mt-2" style={{ color: 'var(--brand-text-secondary)' }}>
                  end users impacted
                </p>
              </div>

              {/* Nav buttons */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                <button
                  onClick={() => slider?.current?.slickPrev()}
                  className="h-10 w-10 cursor-pointer rounded-full flex items-center justify-center rotate-180 transition-all duration-300 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid var(--brand-border-light)`,
                    color: 'var(--brand-text-secondary)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
                  aria-label="Previous slide"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => slider?.current?.slickNext()}
                  className="h-10 w-10 cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid var(--brand-border-light)`,
                    color: 'var(--brand-text-secondary)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
                  aria-label="Next slide"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content (6/12 width for better balance) */}
          <div className="lg:col-span-6">
            {/* Key features with enhanced styling */}
            <div className="rounded-2xl p-8 mb-8 transition-colors duration-300" style={{
              backgroundColor: 'var(--white)',
              border: `1px solid var(--brand-border-light)`,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ backgroundColor: 'var(--brand-primary-purple)' }}></div>
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--brand-text-brand)' }}>
                  {data?.about_label}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--brand-text-dark)' }}>
                {data?.about_caption}
              </h3>

              {/* Feature list with enhanced styling */}
              <ul className="space-y-5">
                {data?.about_icon_list?.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300" style={{
                      backgroundColor: 'var(--brand-purple-50)',
                    }}>
                      <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--brand-primary-purple)' }} />
                    </div>
                    <div>
                      <span className="text-lg" style={{ color: 'var(--brand-text-primary)' }}>
                        {typeof item === "string" ? item : item.text}
                      </span>
                      {item.description && (
                        <p className="text-sm mt-1" style={{ color: 'var(--brand-text-muted)' }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300" style={{
                        backgroundColor: 'var(--brand-purple-50)',
                      }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--brand-primary-purple)' }} />
                      </div>
                      <div>
                        <span className="text-lg" style={{ color: 'var(--brand-text-primary)' }}>
                          Strategic business consulting
                        </span>
                        <p className="text-sm mt-1" style={{ color: 'var(--brand-text-muted)' }}>
                          Expert guidance to drive business growth and
                          innovation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300" style={{
                        backgroundColor: 'var(--brand-purple-50)',
                      }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--brand-primary-purple)' }} />
                      </div>
                      <div>
                        <span className="text-lg" style={{ color: 'var(--brand-text-primary)' }}>
                          Technology implementation
                        </span>
                        <p className="text-sm mt-1" style={{ color: 'var(--brand-text-muted)' }}>
                          Seamless integration of cutting-edge technologies
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300" style={{
                        backgroundColor: 'var(--brand-purple-50)',
                      }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--brand-primary-purple)' }} />
                      </div>
                      <div>
                        <span className="text-lg" style={{ color: 'var(--brand-text-primary)' }}>
                          Digital transformation
                        </span>
                        <p className="text-sm mt-1" style={{ color: 'var(--brand-text-muted)' }}>
                          Comprehensive strategies for digital evolution
                        </p>
                      </div>
                    </li>
                  </>
                )}
              </ul>

              {/* Add a CTA button */}
              <div className="mt-8 pt-6" style={{ borderTop: `1px solid var(--brand-border-light)` }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 group"
                  style={{ 
                    backgroundColor: 'var(--brand-primary-purple)',
                    color: 'var(--white)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-purple-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-primary-purple)'}
                >
                  <span>Learn how we can help</span>
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

export default AboutUs;
