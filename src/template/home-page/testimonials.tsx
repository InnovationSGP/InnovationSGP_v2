"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { Sparkles, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = ({ data }: any) => {
  const slider = React.useRef<any>(null);

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-12 h-12 rounded-full bg-purple-500/10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-blue-500/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 transition-colors duration-300" style={{
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            border: `1px solid rgba(139, 92, 246, 0.2)`
          }}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-purple-300">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 leading-tight max-w-4xl mx-auto text-white">
            What Our Clients{" "}
            <span style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Say About Us
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-base text-gray-300">
            Discover how we've helped businesses achieve their goals
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <Slider {...settings} ref={slider}>
            {data?.testimonials?.map((t: any, index: number) => (
              <div key={index} className="px-3">
                <div className="relative p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-102" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}>
                  {/* Quote Icon */}
                  <div className="absolute -top-3 left-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                    }}>
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3 pt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-base leading-relaxed text-gray-100 mb-4 italic">
                    "{t?.acf?.testimonial_review || "This testimonial demonstrates the exceptional service and results we provide to our clients."}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                      <Image
                        src={t?.acf?.testimonial_image || "/images/placeholderMember.png"}
                        alt={t?.acf?.testimonial_name || "Client"}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {t?.acf?.testimonial_name || "Satisfied Client"}
                      </h4>
                      <p className="text-gray-300 text-xs">
                        {t?.acf?.testimonial_designation || "Business Owner"}
                      </p>
                    </div>
                  </div>

                  {/* Decorative gradient border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => slider?.current?.slickPrev()}
              className="group p-2 rounded-full transition-all duration-300 bg-white/10 border border-white/20 hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => slider?.current?.slickNext()}
              className="group p-2 rounded-full transition-all duration-300 bg-white/10 border border-white/20 hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
