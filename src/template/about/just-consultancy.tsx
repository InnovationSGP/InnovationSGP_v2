import Label from "@/components/ui/label";
import React from "react";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import List from "@/components/ui/list";
import Button from "@/components/ui/button";
import { fixedUrls } from "@/components/header/nav-items";
import {
  Rocket,
  BarChart2,
  Lightbulb,
  Building,
  FileText,
  Shield,
  TrendingUp,
  LucideIcon,
  Search,
  Lock,
  Zap,
  Target,
} from "lucide-react";

function JustConsultancy({ data }: any) {
  // Map to associate icon names with Lucide components
  const iconMap: Record<string, LucideIcon> = {
    rocket: Rocket,
    chart: BarChart2,
    idea: Lightbulb,
    building: Building,
    file: FileText,
    shield: Shield,
    trending: TrendingUp,
    search: Search,
    lock: Lock,
    zap: Zap,
    target: Target,
  };

  // Function to determine which icon to use based on text or icon URL
  const getIconComponent = (item: any) => {
    // Use item text or icon URL to determine which icon to use
    const iconText = item?.text?.toLowerCase() || "";
    let IconComponent: LucideIcon;

    if (iconText.includes("strategy") || iconText.includes("target")) {
      IconComponent = Target;
    } else if (iconText.includes("analy") || iconText.includes("data")) {
      IconComponent = BarChart2;
    } else if (iconText.includes("security") || iconText.includes("protect")) {
      IconComponent = Shield;
    } else if (iconText.includes("innova") || iconText.includes("idea")) {
      IconComponent = Lightbulb;
    } else if (iconText.includes("consult") || iconText.includes("solution")) {
      IconComponent = Building;
    } else {
      // Default icon
      IconComponent = Rocket;
    }

    return (
      <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 border border-blue-100/50">
        <IconComponent
          className="h-10 w-10 text-indigo-600"
          strokeWidth={1.5}
        />
      </div>
    );
  };
  return (
    <section className="py-24">
      <div className="grid container mx-auto px-3 grid-cols-1 md:grid-cols-2 gap-10">
        {/* Right Section  */}
        <div className="flex flex-col items-start mt-12 md:mt-0">
          <Label>{data?.about_label}</Label>
          <Heading
            colorText={data?.about_color_title}
            className="mt-3 text-black-20"
          >
            {data?.about_plain_title}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12">
            {data?.about_icon_list?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center font-medium gap-5 font-sans group hover:translate-x-1 transition-all duration-300 cursor-default"
              >
                {getIconComponent(item)}
                <p className="text-blue-700 group-hover:text-indigo-700 transition-colors duration-300">
                  {item?.text}
                </p>
              </div>
            ))}
          </div>
          {/* border  */}
          <div className="h-px w-full my-8 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <ul className="flex flex-col gap-3">
            {data?.about_list?.map((item: any, idx: number) => (
              <List key={idx}>{item?.text}</List>
            ))}
          </ul>

          <div className="max-w-[190px] w-full mt-8">
            <Button href={fixedUrls.letsTalk} className="hidden md:flex">
              Contact Us
            </Button>
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center">
          <div className="bg-primary p-6 rounded-2xl w-full  mx-auto relative ml-10">
            {data?.about_images?.[0] && (
              <Image
                src={data?.about_images?.[0]}
                width={500}
                height={500}
                alt="Main"
                className="w-full h-auto object-cover min-h-[566px] rounded-2xl "
              />
            )}
            {data?.about_images?.[1] && (
              <Image
                src={data?.about_images?.[1]}
                width={200}
                height={300}
                alt="Overlay"
                className="absolute bottom-12 -left-8 object-cover h-72 rounded-2xl hidden sm:block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JustConsultancy;
