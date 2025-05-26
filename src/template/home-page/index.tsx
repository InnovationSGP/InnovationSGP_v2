import React from 'react'
import Hero from './hero'
import AboutUs from './about-us'
import WhyChoseUs from './why-chose-us'
import OurServices from './our-services'
import Clients from './clients'
import Testimonials from './testimonials'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePageTemplate = () => {
  return (
    <>
      <Hero/>
      <AboutUs/>
      <WhyChoseUs/>
      <OurServices/>
      <Clients/>
      <Testimonials/>
    </>
  )
}

export default HomePageTemplate