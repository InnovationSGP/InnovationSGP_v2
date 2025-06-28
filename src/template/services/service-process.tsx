"use client";
import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Heading from "@/components/ui/heading";

interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
}

interface ServiceProcessProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
}

function ServiceProcess({
  title = "Our Process",
  subtitle = "How We Work",
  steps = [],
}: ServiceProcessProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // If no steps are provided, use default steps
  const processSteps =
    steps.length > 0
      ? steps
      : [
          {
            title: "Discovery",
            description:
              "We begin by understanding your business goals, challenges, and requirements to establish project scope and objectives.",
            icon: "search",
          },
          {
            title: "Strategy",
            description:
              "Our team develops a comprehensive plan tailored to your specific needs, outlining the approach and expected outcomes.",
            icon: "map",
          },
          {
            title: "Execution",
            description:
              "We implement the strategy with precision, keeping you informed throughout the process with regular progress updates.",
            icon: "code",
          },
          {
            title: "Evaluation",
            description:
              "We measure results against established KPIs to ensure that objectives are met and expectations are exceeded.",
            icon: "chart",
          },
        ];

  // Helper function to render step icons based on the icon name
  const renderStepIcon = (iconName: string = "") => {
    return (
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {iconName === "search" && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          )}
          {iconName === "map" && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          )}
          {iconName === "code" && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          )}
          {iconName === "chart" && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          )}
          {/* Default icon if none matched */}
          {!["search", "map", "code", "chart"].includes(iconName) && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">
                {subtitle}
              </span>
            </div>

            <Heading
              className="!text-3xl md:!text-4xl !leading-tight !text-slate-800 max-w-2xl mx-auto"
              secondColor="gradient"
              colorText={title}
            >
              Our Process
            </Heading>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${150 + index * 100}ms`,
                }}
              >
                {/* Step number */}
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 border border-blue-100">
                    <span className="text-blue-600 text-xl font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block h-0.5 bg-blue-100 w-16 ml-auto mr-[-65px] relative z-10"></div>
                  )}
                </div>

                {/* Step icon */}
                {step.icon && renderStepIcon(step.icon)}

                {/* Step content */}
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceProcess;
