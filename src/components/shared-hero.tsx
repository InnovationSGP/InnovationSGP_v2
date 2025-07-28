"use client";
import React from "react";
import Heading from "@/components/ui/heading";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getHighlightIndices } from "@/template/services/title-formatter";

interface BreadcrumbItem {
  text?: string;
  label?: string;
  href?: string;
  url?: string;
}

interface SharedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  excerpt?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  highlightPattern?: "alternate" | "bookend" | "middle";
  breadcrumbs?: BreadcrumbItem[];
  showScrollIndicator?: boolean;
  scrollText?: string;
}

function SharedHero({
  title,
  subtitle = "Professional Services",
  description,
  excerpt,
  backgroundImage = "/images/services.avif",
  ctaText,
  ctaLink,
  highlightPattern = "alternate",
  breadcrumbs = [
    { text: "Home", href: "/" },
    { text: "Services", href: "/services" },
  ],
  showScrollIndicator = false,
  scrollText = "Scroll down to explore",
}: SharedHeroProps) {
  const highlightIndices = getHighlightIndices(title, highlightPattern);
  const words = title.split(" ");

  const contentText = description || excerpt || "";

  const renderBreadcrumbs = () => {
    return (
      <div className="flex items-center justify-center space-x-1 text-xs text-white/70 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3 h-3" />}
            {crumb.url || crumb.href ? (
              <Link
                href={crumb.url || crumb.href || ""}
                className="hover:text-white transition-colors duration-200"
              >
                {crumb.label || crumb.text}
              </Link>
            ) : (
              <span className="text-brand-accent-teal font-medium">
                {crumb.label || crumb.text}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderBackground = () => {
    return (
      <>
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-primary/80"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/60 via-brand-primary-light/40 to-brand-primary-teal/60"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-brand-teal-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-secondary-teal/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </>
    );
  };

  const renderBadge = () => {
    return (
      <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
        <div className="w-2 h-2 bg-brand-accent-teal rounded-full animate-ping"></div>
        <span className="text-white/90 text-xs md:text-sm font-medium tracking-wide">
          {subtitle}
        </span>
      </div>
    );
  };

  const renderTitle = () => {
    const gradientClass =
      "bg-gradient-to-r from-brand-accent-teal via-white to-brand-secondary-teal bg-clip-text text-transparent";

    return (
      <div className="space-y-4">
        <Heading
          variant="large"
          className="!text-4xl md:!text-5xl lg:!text-6xl !leading-[1.1] !font-bold text-white tracking-tight"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={highlightIndices.includes(i) ? gradientClass : ""}
            >
              {word}{" "}
            </span>
          ))}
        </Heading>
      </div>
    );
  };

  const renderDescription = () => {
    return (
      <div className="max-w-3xl mx-auto">
        {typeof contentText === "string" &&
        contentText.includes("<") &&
        contentText.includes(">") ? (
          <div
            className="text-xl md:text-2xl text-white/80 leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: contentText }}
          />
        ) : (
          <p className="text-md md:text-md text-white/80 leading-relaxed font-light">
            {contentText}
          </p>
        )}
      </div>
    );
  };

  const renderCTA = () => {
    if (!ctaText || !ctaLink) return null;

    return (
      <div className="pt-8 space-y-4">
        <Link
          href={ctaLink}
          className="group inline-flex items-center gap-4 bg-white text-brand-primary hover:bg-brand-accent-teal hover:text-white font-semibold px-12 py-5 rounded-full transition-all duration-500 shadow-2xl hover:shadow-white/20 hover:scale-105 transform"
        >
          <span className="text-lg">{ctaText}</span>
          <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
        </Link>
        <p className="text-white/60 text-sm">{scrollText}</p>
      </div>
    );
  };

  const containerClass = "min-h-screen flex items-center py-20";
  const mainClass = "relative overflow-hidden";

  return (
    <main className={mainClass}>
      {renderBackground()}

      {/* Floating visual elements */}
      <div className="absolute top-32 left-8 w-20 h-20 bg-brand-accent-teal/20 rounded-2xl rotate-45 animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-2000 hidden lg:block"></div>
      <div className="absolute top-1/2 right-16 w-8 h-8 bg-brand-secondary-teal/30 rounded-full animate-ping animation-delay-4000 hidden lg:block"></div>

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className={containerClass}>
          <div className="w-full max-w-6xl mx-auto">
            {renderBreadcrumbs()}

            <div className="text-center space-y-8">
              {renderBadge()}
              {renderTitle()}
              {renderDescription()}
              {renderCTA()}
            </div>

            {showScrollIndicator && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                </div>
                <span className="text-white/50 text-xs">Scroll</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SharedHero;
