import React from 'react'
import Hero from './hero'
import AboutUs from './about-us'
import WhyChoseUs from './why-chose-us'
import OurServices from './our-services'
import Clients from './clients'
import Testimonials from './testimonials'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blogs from './blogs'
import { blogPosts } from '../services/blogs'

const HomePageTemplate = () => {
  return (
    <>
      <Hero/>
      <AboutUs/>
      <WhyChoseUs/>
      <OurServices/>
      <Clients/>
      <Testimonials/>
      <Blogs 
        title="Read our latest"
        colorTitle="Blog posts"
        label="Blogs"
      data={blogPosts.slice(0,3)}/>
    </>
  )
}

export default HomePageTemplate