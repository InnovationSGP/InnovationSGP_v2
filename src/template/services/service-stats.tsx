"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, Award, Clock, Users, BarChart, Star } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

interface ServiceStatsProps {
  stats: StatItem[];
}

function ServiceStats({ stats = [] }: ServiceStatsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // If no stats are provided, use default stats
  const displayStats =
    stats.length > 0
      ? stats
      : [
          {
            value: "500+",
            label: "Projects Completed",
            icon: "checkCircle",
          },
          {
            value: "98%",
            label: "Client Satisfaction",
            icon: "star",
          },
          {
            value: "50+",
            label: "Team Members",
            icon: "users",
          },
          {
            value: "15+",
            label: "Years Experience",
            icon: "clock",
          },
        ];

  // Function to render the appropriate icon
  const renderIcon = (iconType: string = "") => {
    switch (iconType?.toLowerCase()) {
      case "checkcircle":
        return <CheckCircle className="w-8 h-8" />;
      case "star":
        return <Star className="w-8 h-8" />;
      case "users":
        return <Users className="w-8 h-8" />;
      case "clock":
        return <Clock className="w-8 h-8" />;
      case "award":
        return <Award className="w-8 h-8" />;
      case "chart":
      case "barchart":
        return <BarChart className="w-8 h-8" />;
      default:
        return <Award className="w-8 h-8" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-[300px] h-[300px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => (
              <div
                key={index}
                className={`text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/10 text-blue-400 mb-4">
                  {renderIcon(stat.icon)}
                </div>
                <div className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceStats;
