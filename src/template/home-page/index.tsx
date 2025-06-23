"use client";
import React from "react";
import Hero from "./hero";
import AboutUs from "./about-us";
import WhyChoseUs from "./why-chose-us";
import OurServices from "./our-services";
import Clients from "./clients";
import Testimonials from "./testimonials";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blogs from "./blogs";

const HomePageTemplate = ({ homepage, testimonials, blogs }: any) => {
  const {
    about_caption,
    about_color_title,
    about_icon_list,
    about_images,
    about_label,
    about_list,
    about_plain_title,
      about_customers_impacted,
      button_link,
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
    hero_background_image,
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
  } = homepage?.acf;
  return (
    <>
      <Hero
        data={{
          hero_background_image,
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
            about_customers_impacted

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
          our_service_button_url,
          our_service_color_title,
          our_service_label,
          our_service_plain_title,
          our_service_service,
        }}
      />
      <Clients data={{ home_client }} />
      <Testimonials data={{ testimonials }} />
      <Blogs
        title="Read our latest"
        colorTitle="Blog posts"
        label="Blogs"
        data={blogs.slice(0, 3)}
      />
    </>
  );
};

export default HomePageTemplate;
