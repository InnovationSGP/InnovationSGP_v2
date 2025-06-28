"use client";
import React from "react";
import Hero from "./hero";
import AnimatedHeroWrapper from "./animated-hero-wrapper";

interface AnimatedHeroProps {
  title: string;
  excerpt: string;
  backgroundImage?: string;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = (props) => {
  return (
    <AnimatedHeroWrapper>
      <Hero {...props} />
    </AnimatedHeroWrapper>
  );
};

export default AnimatedHero;
