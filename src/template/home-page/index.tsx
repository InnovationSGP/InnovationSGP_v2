"use client";
import React from "react";
import Hero from "./hero";
import AboutUs from "./about-us";
import WhyChoseUs from "./why-chose-us";
import OurServices from "./our-services";
import Clients from "./clients";
import Testimonials from "./testimonials";
import TechServices from "./tech-services";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blogs from "./blogs";
import Logo from "../about/logo";
import { useWordPress, useHomePage } from "@/services/wordpress";
import { useWordPressStore } from "@/store/wordpress";

const HomePageTemplate = () => {
  const testimonials = useWordPressStore((state) => state.testimonials);
  const posts = useWordPressStore((state) => state.posts);
  const { page: homepage, loading, refetch: refetchHomepage } = useHomePage();


  // Fetch homepage data when component mounts
  React.useEffect(() => {
    if (!homepage) {
      refetchHomepage();
    }
  }, [homepage, refetchHomepage]);


  const testimonialsData = testimonials;
  const blogsData = posts.slice(0, 3);

  // Show loading state if homepage data is not yet available
  if (loading || !homepage) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }
  const {
    about_caption,
    about_color_title,
    about_icon_list,
    about_images,
    about_label,
    about_list,
    about_plain_title,
    about_customers_impacted,
    chose_us_button_link,
    chose_us_color_title,
    chose_us_description,
    chose_us_icon_list,
    chose_us_image,
    chose_us_label,
    chose_us_list,
    chose_us_plain_title,
    chose_us_sub_color_title,
    chose_us_sub_plain_title,
    hero_caption,
    hero_label,
    hero_title,
    hero_button_link,
    home_client,
    our_service_button_url,
    our_service_color_title,
    our_service_label,
    our_service_plain_title,
    our_service_service,
  } = homepage?.acf || {};
  return (
    <>
      <Hero
        data={{
          hero_caption,
          hero_label,
          hero_title,
          hero_button_link,
        }}
      />
      <AboutUs
        data={{
          about_caption,
          about_color_title,
          about_icon_list,
          about_images,
          about_label,
          about_list,
          about_plain_title,
          about_customers_impacted,
        }}
      />
      <WhyChoseUs
        data={{
          chose_us_button_link,
          chose_us_color_title,
          chose_us_description,
          chose_us_icon_list,
          chose_us_image,
          chose_us_label,
          chose_us_list,
          chose_us_plain_title,
          chose_us_sub_color_title,
          chose_us_sub_plain_title,
        }}
      />
      <OurServices
        data={{
          cta_url: our_service_button_url,
          our_service_color_title,
          our_service_label,
          our_service_plain_title,
          our_service_service,
        }}
      />
      {/* <Clients data={{ home_client }} /> */}
      <Logo data={home_client} />
      <Testimonials data={{ testimonials: testimonialsData }} />
      <Blogs
        title="Read our latest"
        colorTitle="Blog posts"
        label="Blogs"
        data={Array.isArray(blogsData) ? blogsData : []}
      />
    </>
  );
};

export default HomePageTemplate;
