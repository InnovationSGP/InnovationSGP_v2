"use client";
import React from "react";
import SharedHero from "@/components/shared-hero";
import ServiceCards from "@/template/services/service-cards";
import ServiceProcess from "@/template/services/service-process";
import ServiceStats from "@/template/services/service-stats";
import WhyChoseUs from "@/template/home-page/why-chose-us";
import Blogs from "@/template/home-page/blogs";
import TechServices from "@/template/home-page/tech-services";
import { useServices, usePage, usePosts } from "@/services/wordpress";
import { useWordPressStore } from "@/store/wordpress";

const ServicesPage = () => {
  const {
    services,
    loading: servicesLoading,
    refetch: refetchServices,
  } = useServices();
  const {
    page: pageData,
    loading: pageLoading,
    refetch: refetchPage,
  } = usePage("342");
  const { posts: recentPosts, refetch: refetchPosts } = usePosts({
    per_page: 3,
  });

  // Fetch data when component mounts
  React.useEffect(() => {
    if (!pageData) {
      refetchPage();
    }
    if (!services?.length) {
      refetchServices();
    }
    if (!recentPosts?.length) {
      refetchPosts();
    }
  }, [
    pageData,
    services,
    recentPosts,
    refetchPage,
    refetchServices,
    refetchPosts,
  ]);

  // Show loading state with bright white background
  if (pageLoading || servicesLoading || !pageData) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center text-center">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Extract the services specific fields from the ACF data
  const {
    services_title,
    services_label,
    services_subtitle,
    services_description,
    services_background_image,
    services_cta_button_text,
    services_cta_button_link,
    services_process_title,
    services_process_subtitle,
    services_process_steps,
    services_stats,
    services_testimonials,
  } = pageData.acf || {};

  // Use services_title if available, otherwise fall back to services_label
  const heroTitle =
    services_title || services_label || "Our Professional Services";
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <SharedHero
        title={heroTitle}
        subtitle={
          services_subtitle || "Expert Solutions for Modern Business Challenges"
        }
        description={
          services_description ||
          "We offer a comprehensive range of professional services designed to help businesses grow, transform, and succeed in today's competitive landscape."
        }
        backgroundImage={services_background_image || "/images/services.avif"}
        ctaText={services_cta_button_text || "Explore Our Services"}
        ctaLink={services_cta_button_link || "#services-grid"}
        showScrollIndicator={true}
        scrollText="Scroll down to explore our services"
      />

      {/* Services Grid */}
      {services?.length > 0 && (
        <section id="services-grid" className="py-24 bg-white">
          <ServiceCards services={services} />
        </section>
      )}

      {/* Tech Services Showcase */}
      <div className="bg-gray-50">
        <TechServices />
      </div>

      {/* Service Process Section */}
      <div className="bg-white">
        <ServiceProcess
          title={services_process_title || "Our Proven Process"}
          subtitle={services_process_subtitle || "How We Deliver Results"}
          steps={services_process_steps || []}
        />
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50">
        <WhyChoseUs data={pageData.acf} />
      </div>

      {/* Recent Blog Posts */}
      {recentPosts?.length > 0 && (
        <div className="bg-white">
          <Blogs
            title="Read our latest"
            colorTitle="Blog posts"
            label="Blogs"
            data={recentPosts}
          />
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
