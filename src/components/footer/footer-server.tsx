import Link from "next/link";
import React from "react";
import Logo from "../header/logo";
import { fixedUrls, footerLinks } from "../header/nav-items";
import { getCurrentYear } from "@/utils";
import dynamic from "next/dynamic";
import { FooterSocialLinks, NewsletterSignup } from "./footer-client";
import { getFooterData } from "./footer-data";

// Dynamically import client components with proper loading and error states
const CTASection = dynamic(() => import("./cta-section"), {
  ssr: true,
  loading: () => (
    <div className="py-8 text-center text-white bg-slate-900">
      <p className="animate-pulse">Loading call to action section...</p>
    </div>
  ),
});

const Footer = async () => {
  const { data } = await getFooterData();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* CTA Section */}
      <section className="relative">
        <CTASection footerData={data} />
      </section>

      {/* Main Footer Section */}
      <section className="relative">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Grid background overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>

        <div className="container relative mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Logo and Description */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <Logo />
              <p className="text-gray-300 text-center md:text-left mt-6 max-w-sm">
                {data?.acf?.footer_description ||
                  "Project Management as a Service. Built for Complexity. Focused on Results."}
              </p>

              <FooterSocialLinks />
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h5 className="font-medium text-white text-xl mb-6">Company</h5>
              <ul className="space-y-4">
                {footerLinks?.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Link href={item.href} className="inline-flex items-center">
                      <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-2">
              <h5 className="font-medium text-white text-xl mb-6">Services</h5>
              <ul className="space-y-4">
                <li className="text-gray-400 hover:text-white transition-colors">
                  <Link href="#" className="inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Business Intelligence
                  </Link>
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                  <Link href="#" className="inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Risk Management
                  </Link>
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                  <Link href="#" className="inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Finance Advisory
                  </Link>
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                  <Link href="#" className="inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Portfolio Management
                  </Link>
                </li>
                <li className="text-gray-400 hover:text-white transition-colors">
                  <Link href="#" className="inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Consulting Network
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-4">
              <h5 className="font-medium text-white text-xl mb-6">
                Get In Touch
              </h5>
              <div className="space-y-4">
                <p className="text-gray-400 flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-400 mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {data?.acf?.contact_address ||
                      "1234 Innovation Way, Suite 500, Anytown, USA 12345"}
                  </span>
                </p>
                <p className="text-gray-400 flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-400 mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {data?.acf?.contact_email || "sales@innovationsgp.com"}
                  </span>
                </p>
                <p className="text-gray-400 flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-400 mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{data?.acf?.contact_phone || "+1 (555) 123-4567"}</span>
                </p>
              </div>

              {/* Newsletter Signup */}
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="relative border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                Copyright © {getCurrentYear()} Innovation Strategy Group LLC dba
                InnovationSGP. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="hover:text-white transition-colors">
                    <Link href="/terms-of-service">Terms of Service</Link>
                  </li>
                  <li className="hover:text-white transition-colors">
                    <Link href="/sitemap">Sitemap</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
