"use client";

import Image from "next/image";
import React from "react";
import { Building2 } from "lucide-react";

function Logo({ data }: any) {
  // Ensure we have data to display
  const logos = Array.isArray(data) ? data : [];

  // If no logos, show a placeholder
  if (logos.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-colors duration-300" style={{
              backgroundColor: 'var(--brand-purple-50)',
              border: `1px solid var(--brand-border-accent)`
            }}>
              <Building2 className="w-4 h-4" style={{ color: 'var(--brand-primary-purple)' }} />
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--brand-text-brand)' }}>
                Partnerships
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto" style={{ color: 'var(--brand-text-dark)' }}>
              Our Trusted{" "}
              <span style={{ 
                background: 'var(--brand-gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Partners
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl" style={{ color: 'var(--brand-text-secondary)' }}>Partner logos coming soon</p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--brand-bg-secondary)' }}>
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-colors duration-300" style={{
            backgroundColor: 'var(--brand-purple-50)',
            border: `1px solid var(--brand-border-accent)`
          }}>
            <Building2 className="w-4 h-4" style={{ color: 'var(--brand-primary-purple)' }} />
            <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--brand-text-brand)' }}>
              Partnerships
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto" style={{ color: 'var(--brand-text-dark)' }}>
            Our Trusted{" "}
            <span style={{ 
              background: 'var(--brand-gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Partners
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl" style={{ color: 'var(--brand-text-secondary)' }}>
            Collaborating with industry leaders to deliver exceptional solutions
          </p>
        </div>
      </div>

      {/* Modern scrolling logos with CSS animation */}
      <div className="relative overflow-hidden">
        {/* Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" style={{ background: 'linear-gradient(to right, var(--brand-bg-secondary), transparent)' }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" style={{ background: 'linear-gradient(to left, var(--brand-bg-secondary), transparent)' }}></div>
        
        <div className="flex items-center justify-center py-8">
          <div 
            className="flex gap-12 animate-scroll"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {duplicatedLogos.map((logo: any, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center w-32 h-16 p-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--white)',
                  border: `1px solid var(--brand-border-light)`,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Image
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  width={100}
                  height={50}
                  className="object-contain w-auto h-auto max-h-8 max-w-[100px] filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add CSS keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default Logo;
