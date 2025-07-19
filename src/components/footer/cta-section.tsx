"use client";
import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { fixedUrls } from "../header/nav-items";

// Type definitions for better type safety
interface CTAFeature {
  icon_type: string;
  text: string;
}

interface CTAStat {
  number: string;
  label: string;
}

interface CTAProps {
  badge?: string;
  headlineStart?: string;
  headlineHighlight?: string;
  description?: string;
  features: CTAFeature[];
  stats: CTAStat[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

function CTASection({ footerData }: { footerData: any }) {
  const [isHovered, setIsHovered] = useState(false);

  // Use useMemo to avoid unnecessary recalculations
  const data: CTAProps = useMemo(
    () => ({
      badge: footerData?.acf?.footerlabel || "Transform Your Business Today",
      headlineStart: footerData?.acf?.footerheaderwhite || "Ready to Scale",
      headlineHighlight: footerData?.acf?.footerheader || "Beyond Limits?",
      description:
        footerData?.acf?.footerdescription ||
        "Join industry leaders who've transformed their operations with our cutting-edge consulting solutions.",

      // Normalize features - always provide an array (empty if needed)
      features: Array.isArray(footerData?.acf?.footerfeatures)
        ? footerData.acf.footerfeatures
        : [
            {
              icon_type: "target",
              text: footerData?.acf?.footerbullet1 || "Strategic Planning",
            },
            {
              icon_type: "users",
              text: footerData?.acf?.footerbullet2 || "Expert Team",
            },
            {
              icon_type: "checkCircle",
              text: footerData?.acf?.footerbullet3 || "Proven Results",
            },
          ],

      // Normalize stats - always provide an array (empty if needed)
      stats: Array.isArray(footerData?.acf?.footerstats)
        ? footerData.acf.footerstats
        : [
            {
              number: footerData?.acf?.footer_project || "500+",
              label: "Projects Delivered",
            },
            {
              number: footerData?.acf?.footer_client_satisfaction || "98%",
              label: "Client Satisfaction",
            },
          ],

      // Button data
      primaryButtonText:
        footerData?.acf?.footerbutton1 || "Schedule Free Consultation",
      primaryButtonLink:
        footerData?.acf?.cta_primary_button_link || fixedUrls.letsTalk,
      secondaryButtonText:
        footerData?.acf?.footerbutton2 || "View Case Studies",
      secondaryButtonLink:
        footerData?.acf?.cta_secondary_button_link || "/service",
    }),
    [footerData]
  );

  // Helper function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "target":
        return <Target className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      case "checkCircle":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  // Pre-calculate particle positions for better performance with deterministic values
  const particles = useMemo(() => {
    // Use fixed values to ensure server/client match
    const positions = [
      { left: "10%", top: "15%", delay: "0.5s", duration: "2s" },
      { left: "18%", top: "22%", delay: "1.0s", duration: "2.3s" },
      { left: "26%", top: "29%", delay: "1.5s", duration: "2.6s" },
      { left: "34%", top: "36%", delay: "2.0s", duration: "2.9s" },
      { left: "42%", top: "43%", delay: "2.5s", duration: "3.2s" },
      { left: "50%", top: "50%", delay: "3.0s", duration: "3.5s" },
      { left: "58%", top: "57%", delay: "3.5s", duration: "3.8s" },
      { left: "66%", top: "64%", delay: "4.0s", duration: "4.1s" },
      { left: "74%", top: "71%", delay: "4.5s", duration: "4.4s" },
      { left: "82%", top: "78%", delay: "5.0s", duration: "4.7s" },
    ];
    return positions;
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements - fixed positions for SSR/CSR consistency */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-160px] right-[-160px] w-[320px] h-[320px] bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-160px] left-[-160px] w-[320px] h-[320px] bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[384px] h-[384px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Simplified particles with fixed positions for better performance */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              {data.badge}
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {data.headlineStart}
            <span className="block bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {data.headlineHighlight}
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-blue-400">
                  {renderIcon(feature.icon_type)}
                </span>
                <span className="text-gray-300 text-sm font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href={data.primaryButtonLink}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {data.primaryButtonText}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href={data.secondaryButtonLink}
              className="group flex items-center gap-2 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
            >
              <Users className="w-5 h-5" />
              {data.secondaryButtonText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-blue-400/20">
          <Sparkles
            className="w-12 h-12 animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </div>
        <div className="absolute bottom-10 right-10 text-blue-400/20">
          <Target
            className="w-10 h-10 animate-bounce"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
}

export default CTASection;
