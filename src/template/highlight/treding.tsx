import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const HoverCard = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="mb-[50px] mt-[98px]">
        <Label>Trending</Label>
        <Heading colorText="News" className="mt-7">
          Featured
        </Heading>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="grid grid-cols-1 gap-4">
          <div className="relative w-full min-h-[344px] rounded-xl overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/trading.1.jpg')`,
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition duration-300 z-10  flex flex-col justify-between">
              {/* Top Title */}
              <div className="text-white  ">
                <h3 className="text-xl font-bold">
                  HomeMade App and Web Development
                </h3>
                <p className="text-sm text-white max-w-md mt-8">
                  App & Web Development
                </p>
              </div>

              {/* Middle Description */}
              <div className="">
                <p className="text-sm text-white max-w-md ">
                  HomeMade is website for culinary in Jakarta City. We use web
                  for founding food place nearly. Make easy for imigrant in
                  Jakarta to explore food there. Keep exploring your favourite
                  foods and enjoy!
                </p>
              </div>

              {/* Bottom Link */}
              <div className="">
                <Link
                  href="#"
                  className="text-white underline hover:text-white"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full min-h-[500px] rounded-xl overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/trading.1.jpg')`,
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition duration-300 z-10  flex flex-col justify-between">
              {/* Top Title */}
              <div className="text-white  ">
                <h3 className="text-xl font-bold">
                  HomeMade App and Web Development
                </h3>
                <p className="text-sm text-white max-w-md mt-8">
                  App & Web Development
                </p>
              </div>

              {/* Middle Description */}
              <div className="">
                <p className="text-sm text-white max-w-md ">
                  HomeMade is website for culinary in Jakarta City. We use web
                  for founding food place nearly. Make easy for imigrant in
                  Jakarta to explore food there. Keep exploring your favourite
                  foods and enjoy!
                </p>
              </div>

              {/* Bottom Link */}
              <div className="">
                <Link
                  href="#"
                  className="text-white underline hover:text-white"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="relative w-full min-h-[500px] rounded-xl overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/trading.1.jpg')`,
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition duration-300 z-10  flex flex-col justify-between">
              {/* Top Title */}
              <div className="text-white  ">
                <h3 className="text-xl font-bold">
                  HomeMade App and Web Development
                </h3>
                <p className="text-sm text-white max-w-md mt-8">
                  App & Web Development
                </p>
              </div>

              {/* Middle Description */}
              <div className="">
                <p className="text-sm text-white max-w-md ">
                  HomeMade is website for culinary in Jakarta City. We use web
                  for founding food place nearly. Make easy for imigrant in
                  Jakarta to explore food there. Keep exploring your favourite
                  foods and enjoy!
                </p>
              </div>

              {/* Bottom Link */}
              <div className="">
                <Link
                  href="#"
                  className="text-white underline hover:text-white"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full min-h-[344px] rounded-xl overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/trading.1.jpg')`,
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition duration-300 z-10  flex flex-col justify-between">
              {/* Top Title */}
              <div className="text-white  ">
                <h3 className="text-xl font-bold">
                  HomeMade App and Web Development
                </h3>
                <p className="text-sm text-white max-w-md mt-8">
                  App & Web Development
                </p>
              </div>

              {/* Middle Description */}
              <div className="">
                <p className="text-sm text-white max-w-md ">
                  HomeMade is website for culinary in Jakarta City. We use web
                  for founding food place nearly. Make easy for imigrant in
                  Jakarta to explore food there. Keep exploring your favourite
                  foods and enjoy!
                </p>
              </div>

              {/* Bottom Link */}
              <div className="">
                <Link
                  href="#"
                  className="text-white underline hover:text-white"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative w-full min-h-[544px] rounded-xl overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/trading.1.jpg')`,
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition duration-300 z-10  flex flex-col justify-between">
              {/* Top Title */}
              <div className="text-white  ">
                <h3 className="text-xl font-bold">
                  HomeMade App and Web Development
                </h3>
                <p className="text-sm text-white max-w-md mt-8">
                  App & Web Development
                </p>
              </div>

              {/* Middle Description */}
              <div className="">
                <p className="text-sm text-white max-w-md ">
                  HomeMade is website for culinary in Jakarta City. We use web
                  for founding food place nearly. Make easy for imigrant in
                  Jakarta to explore food there. Keep exploring your favourite
                  foods and enjoy!
                </p>
              </div>

              {/* Bottom Link */}
              <div className="">
                <Link
                  href="#"
                  className="text-white underline hover:text-white"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full min-h-[300px] rounded-xl overflow-hidden group">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/trading.1.jpg')`,
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition duration-300 z-10  flex flex-col justify-between">
              {/* Top Title */}
              <div className="text-white  ">
                <h3 className="text-xl font-bold">
                  HomeMade App and Web Development
                </h3>
                <p className="text-sm text-white max-w-md mt-8">
                  App & Web Development
                </p>
              </div>

              {/* Middle Description */}
              <div className="">
                <p className="text-sm text-white max-w-md ">
                  HomeMade is website for culinary in Jakarta City. We use web
                  for founding food place nearly. Make easy for imigrant in
                  Jakarta to explore food there. Keep exploring your favourite
                  foods and enjoy!
                </p>
              </div>

              {/* Bottom Link */}
              <div className="">
                <Link
                  href="#"
                  className="text-white underline hover:text-white"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoverCard;
