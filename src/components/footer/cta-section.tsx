"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Calendar,
  CheckCircle,
  Star,
} from "lucide-react";
import { fixedUrls } from "../header/nav-items";

interface FeatureItem {
  icon_type: string;
  text: string;
}

interface StatItem {
  number: string;
  label: string;
}

interface FooterDataProps {
  footerData: {
    acf?: {
      // Bullets data
      footerbullet1?: string;
      footerbullet2?: string;
      footerbullet3?: string;

      // Feature pills data
      cta_features?: FeatureItem[];

      // Stats data
      cta_stats?: StatItem[];

      // CTA content
      footerlabel?: string;
      footerheaderwhite?: string;
      footerheader?: string;
      footerdescription?: string;

      // Button data
      footerbutton1?: string;
      footerbutton2?: string;
      cta_primary_button_link?: string;
      cta_secondary_button_link?: string;
    };
  };
}

function CTASection({ footerData }: FooterDataProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get feature pills from API data
  const features = footerData?.acf?.cta_features;

  // Process bullets data from API
  const { footerbullet1, footerbullet2, footerbullet3 } = footerData?.acf || {};
  const bullets = [
    { icon_type: "target", text: footerbullet1 || "Strategic Planning" },
    { icon_type: "users", text: footerbullet2 || "Expert Team" },
    { icon_type: "checkCircle", text: footerbullet3 || "Proven Results" },
  ];

  // Get stats from API data or use defaults
  const stats = footerData?.acf?.cta_stats || [
    { number: "500+", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  // Get the badge text, headline, and description from API data
  const badgeText =
    footerData?.acf?.footerlabel || "Transform Your Business Today";
  const headlineStart = footerData?.acf?.footerheaderwhite || "Ready to Scale";
  const headlineHighlight = footerData?.acf?.footerheader || "Beyond Limits?";
  const description =
    footerData?.acf?.footerdescription ||
    "Join industry leaders who've transformed their operations with our cutting-edge consulting solutions. Your next breakthrough is just one conversation away.";

  // Get CTA button text and links
  const primaryCTAText =
    footerData?.acf?.footerbutton1 || "Schedule Free Consultation";
  const primaryCTALink = footerData?.acf?.cta_primary_button_link || "#";
  const secondaryCTAText =
    footerData?.acf?.footerbutton2 || "View Cases Studies";
  const secondaryCTALink = footerData?.acf?.cta_secondary_button_link || "#";

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

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

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

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              {badgeText}
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {headlineStart}
            <span className="block bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {headlineHighlight}
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {bullets.map((feature, index) => (
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
              href={fixedUrls.letsTalk}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {primaryCTAText}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="/service"
              className="group flex items-center gap-2 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
            >
              <Users className="w-5 h-5" />
              {secondaryCTAText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {stats.map((stat, index) => (
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
