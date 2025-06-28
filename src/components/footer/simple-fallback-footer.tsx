"use client";
import React from "react";
import Link from "next/link";
import { getCurrentYear } from "@/utils";

/**
 * SimpleFallbackFooter - A lightweight footer component used as a fallback
 * when the main footer is loading or encounters an error.
 */
const SimpleFallbackFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo and Description */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <div className="font-bold text-white text-2xl">InnovationSGP</div>
            <p className="text-gray-300 text-center md:text-left mt-6 max-w-sm">
              Project Management as a Service. Built for Complexity. Focused on
              Results.
            </p>

            {/* Simple social links */}
            <div className="mt-8 flex space-x-4">
              {["facebook", "twitter", "linkedin"].map((social) => (
                <div
                  key={social}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <span className="text-white text-sm">
                    {social[0].toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h5 className="font-medium text-white text-xl mb-6">Company</h5>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li
                  key={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Link href={link.href} className="inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-5">
            <h5 className="font-medium text-white text-xl mb-6">
              Get In Touch
            </h5>
            <div className="space-y-4">
              <p className="text-gray-400">info@innovationsgp.com</p>

              {/* Simple newsletter form */}
              <div className="mt-6 bg-white/5 rounded-lg p-4">
                <h6 className="text-white font-medium mb-2">Newsletter</h6>
                <div className="flex">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-l-md px-4 py-2 text-gray-400">
                    your@email.com
                  </div>
                  <div className="bg-teal-500 text-white rounded-r-md px-4 py-2">
                    Subscribe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative border-t border-white/10 mt-10">
        <div className="container mx-auto px-6 py-6">
          <p className="text-gray-400 text-sm text-center">
            Copyright © {getCurrentYear()} Innovation Strategy Group LLC dba
            InnovationSGP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFallbackFooter;
