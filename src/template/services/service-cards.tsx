"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getMediaURL } from "@/utils";

interface ServiceCardProps {
  services: any[];
}

function ServiceCards({ services }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [serviceImages, setServiceImages] = useState<Record<number, string>>(
    {}
  );

  useEffect(() => {
    // Add animation on mount with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Fetch media URLs for all services
    const fetchMediaUrls = async () => {
      if (!services || services.length === 0) {
        return;
      }

      try {
        const imagePromises = services.map(async (service) => {
          if (service) {
            const url = await getMediaURL(service);
            return { id: service.id, url };
          }
          return { id: 0, url: "" };
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce((acc, { id, url }) => {
          if (id) acc[id] = url;
          return acc;
        }, {} as Record<number, string>);

        setServiceImages(imageMap);
      } catch (error) {
        console.error("Error fetching service images:", error);
      }
    };

    fetchMediaUrls();

    return () => clearTimeout(timer);
  }, [services]);

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No services available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Our Professional Services
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Browse our comprehensive range of specialized services designed to
          meet your business needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const imageUrl =
            serviceImages[service.id] || "/images/service-image.jpg";

          return (
            <div
              key={service.id || index}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-slate-100 h-full flex flex-col transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${
                  150 + (index % 3) * 100 + Math.floor(index / 3) * 150
                }ms`,
              }}
            >
              {/* Service Image */}
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={service.title?.rendered || "Service"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-70"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title?.rendered}
                </h3>

                <div
                  className="text-slate-600 mb-5 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: service.excerpt?.rendered,
                  }}
                />

                {/* Service features - optional */}
                {service.acf?.service_features && (
                  <div className="mb-5">
                    <ul className="space-y-2">
                      {service.acf.service_features
                        .slice(0, 3)
                        .map((feature: any, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700">
                              {feature.text}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors gap-1.5 text-sm"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceCards;
