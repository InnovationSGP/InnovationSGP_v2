import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import Link from 'next/link';
import React from 'react';

function FeatureTopics() {
  return (
    <div className="bg-[#EFF7FF] pt-14">
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
            <Link
              href=""
              className="bg-[#486EC4] px-4 py-1 rounded-[9px] text-white text-sm"
            >
              Energy
            </Link>
            <Link
              href=""
              className="bg-white px-4 py-1 rounded-[9px] text-black text-sm"
            >
              Life style
            </Link>
            <Link
              href=""
              className="bg-white px-4 py-1 rounded-[9px] text-black text-sm"
            >
              Broadband
            </Link>
            <Link
              href=""
              className="bg-white px-4 py-1 rounded-[9px] text-black text-sm"
            >
              Insurance
            </Link>
            <Link
              href=""
              className="bg-white px-4 py-1 rounded-[9px] text-black text-sm"
            >
              News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureTopics;
