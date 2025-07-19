"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import silhouette from "../../public/images/placeholderMember.png";
import { FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

interface TeamMember {
  title: { rendered: string };
  acf: {
    member_designation: string;
    member_picture?: string;
    member_bio?: string;
    member_linkedin?: string;
    member_twitter?: string;
    member_email?: string;
  };
  _links?: {
    [key: string]: any;
    "wp:featuredmedia"?: { href: string }[];
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          full?: { source_url?: string };
          large?: { source_url?: string };
          medium?: { source_url?: string };
        };
      };
    }>;
  };
}

// Modern and streamlined team component
export default function SimpleTeam({ data }: { data: TeamMember[] }) {
  const validData = Array.isArray(data) ? data : [];
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Sort team members by designation hierarchy (if needed)
  const sortedTeamMembers = validData.slice().sort((a, b) => {
    // You can customize the sorting logic based on your needs
    return (
      a.acf?.member_designation?.localeCompare(
        b.acf?.member_designation || ""
      ) || 0
    );
  });

  // Function to get member image with proper fallbacks
  const getMemberImage = (member: TeamMember): string => {
    // Try to get the image from the member_picture field first (as requested)
    if (member.acf?.member_picture) {
      return member.acf.member_picture;
    }

    // Fall back to embedded media
    if (member._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return member._embedded["wp:featuredmedia"][0].source_url;
    }

    // Check for media sizes
    if (member._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes) {
      const sizes = member._embedded["wp:featuredmedia"][0].media_details.sizes;
      const url =
        sizes.full?.source_url ||
        sizes.large?.source_url ||
        sizes.medium?.source_url;
      if (url) return url;
    }

    // Final fallback to placeholder
    return silhouette.src;
  };

  if (validData.length === 0) {
    return (
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Label>Our People</Label>
          <Heading
            colorText="Team"
            className="mt-3 text-black-20"
            secondColor="gradient"
          >
            Expert
          </Heading>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            No team members found. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-50/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-50/20 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-16 relative">
        <Label>Our People</Label>
        <Heading
          colorText="Team"
          className="mt-3 text-black-20"
          secondColor="gradient"
        >
          The
        </Heading>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Meet our diverse team of experts who bring innovation and excellence
          to every project
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {sortedTeamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2"
            onClick={() => setSelectedMember(member)}
          >
            <div className="aspect-[3/4] relative overflow-hidden rounded-xl">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${getMemberImage(member)})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-300">
              <h3 className="text-xl font-bold mb-1 group-hover:text-blue-200">
                {member.title?.rendered}
              </h3>
              <p className="text-sm font-medium text-blue-100">
                {member.acf.member_designation}
              </p>

              <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {member.acf.member_linkedin && (
                  <a
                    href={member.acf.member_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-blue-600/80 flex items-center justify-center hover:bg-blue-500 backdrop-blur-sm transition-colors"
                  >
                    <FaLinkedinIn className="text-white" />
                  </a>
                )}
                {member.acf.member_twitter && (
                  <a
                    href={member.acf.member_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-blue-600/80 flex items-center justify-center hover:bg-blue-500 backdrop-blur-sm transition-colors"
                  >
                    <FaTwitter className="text-white" />
                  </a>
                )}
                {member.acf.member_email && (
                  <a
                    href={`mailto:${member.acf.member_email}`}
                    className="w-8 h-8 rounded-full bg-blue-600/80 flex items-center justify-center hover:bg-blue-500 backdrop-blur-sm transition-colors"
                  >
                    <FaEnvelope className="text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for member details */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 h-80 md:h-auto relative">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${getMemberImage(selectedMember)})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-30" />
              </div>
              <div className="md:w-3/5 p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedMember.title?.rendered}
                    </h2>
                    <p className="text-blue-600 font-medium">
                      {selectedMember.acf.member_designation}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl p-2"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>

                <div className="mt-6">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedMember.acf.member_bio || "No bio available."}
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  {selectedMember.acf.member_linkedin && (
                    <a
                      href={selectedMember.acf.member_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center hover:from-blue-500 hover:to-blue-400 transition-colors"
                    >
                      <FaLinkedinIn className="text-white" />
                    </a>
                  )}
                  {selectedMember.acf.member_twitter && (
                    <a
                      href={selectedMember.acf.member_twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center hover:from-blue-500 hover:to-blue-400 transition-colors"
                    >
                      <FaTwitter className="text-white" />
                    </a>
                  )}
                  {selectedMember.acf.member_email && (
                    <a
                      href={`mailto:${selectedMember.acf.member_email}`}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center hover:from-blue-500 hover:to-blue-400 transition-colors"
                    >
                      <FaEnvelope className="text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
