"use client";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

function FeatureTopics() {
  const [activeCategory, setActiveCategory] = useState(categories?.[0].label);
  console.log(activeCategory, "activeCategory");
  return (
    <div className="pt-14">
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-8 justify-between">
          {/* Left Column: Label and Heading */}
          <div>
            <Label>BLOGS</Label>
            <Heading colorText="Topics" className="mt-5 text-black-20">
              Feature
            </Heading>
          </div>

          {/* Right Column: Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(item.label)}
                className={`leading-[15px] font-medium bgwhite cursor-pointer border border-[#E4E4E4] px-4 py-3 rounded-[9px]
                  ${item.label === activeCategory ? 
                    "bg-[#486EC4] text-white" : 
                    "bg-[#F5F5F5] text-[#5F5F5F]"} 
                  `}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureTopics;

const categories = [
  {
    label: "Energy",
    href: "",
    styleType: "primary",
  },
  {
    label: "Life style",
    href: "",
    styleType: "secondary",
  },
  {
    label: "Broadband",
    href: "",
    styleType: "secondary",
  },
  {
    label: "Insurance",
    href: "",
    styleType: "secondary",
  },
  {
    label: "News",
    href: "",
    styleType: "secondary",
  },
];
