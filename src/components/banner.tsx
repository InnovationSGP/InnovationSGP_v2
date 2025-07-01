import React from "react";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

interface BannerProps {
  bgImage: string;
  labelText: string;
  headingText: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Utility function for highlighting words in titles
const getHighlightIndices = (
  title: string,
  pattern: "alternate" | "bookend" | "middle" = "alternate"
): number[] => {
  const words = title.split(" ");
  const indices: number[] = [];

  switch (pattern) {
    case "alternate":
      for (let i = 0; i < words.length; i++) {
        if (i % 2 === 1) indices.push(i);
      }
      break;
    case "bookend":
      if (words.length > 0) indices.push(0);
      if (words.length > 1) indices.push(words.length - 1);
      break;
    case "middle":
      for (let i = 1; i < words.length - 1; i++) {
        indices.push(i);
      }
      break;
  }

  return indices;
};

function Banner({
  bgImage,
  labelText,
  headingText,
  description,
  ctaText,
  ctaLink,
}: BannerProps) {
  // Parse breadcrumbs from labelText (e.g., "Home / Intel & Insights / Read More")
  const breadcrumbsArray = labelText.split("/").map((item) => item.trim());

  // Get words to highlight
  const highlightIndices = getHighlightIndices(headingText, "alternate");
  const words = headingText.split(" ");

  return (
    <main className="relative overflow-hidden min-h-[75vh] flex items-center">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(0, 2, 44, 0.6), rgba(0, 2, 44, 0.9)), url(${bgImage})`,
        }}
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Grid background overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Floating particles - fixed positions for better performance */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
              style={{
                left: `${10 + i * 8}%`,
                top: `${15 + i * 7}%`,
                animationDelay: `${0.5 * i}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container px-4 sm:px-6 mx-auto flex items-center justify-center min-h-[600px] py-32 relative z-10">
        <div className="max-w-[800px] flex flex-col items-center text-center">
          {/* Breadcrumb with animation */}
          <div className="flex items-center space-x-1 mb-6 text-sm text-white/70">
            {breadcrumbsArray.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-white/50" />
                )}
                {index === breadcrumbsArray.length - 1 ? (
                  <span className="text-white">{crumb}</span>
                ) : (
                  <Link
                    href={index === 0 ? "/" : `/blog`}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {crumb}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              Intel & Insights
            </span>
          </div>

          {/* Main heading with highlight effect */}
          <Heading
            variant="large"
            className="mt-2 !text-5xl md:!text-6xl !leading-tight text-white"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className={
                  highlightIndices.includes(i)
                    ? "bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </Heading>

          {/* Description with better typography */}
          {description && (
            <div className="mt-8 text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
              {description.includes("<") && description.includes(">") ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <p>{description}</p>
              )}
            </div>
          )}

          {/* CTA Button */}
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="mt-10 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default Banner;
