"use client";
import React, { useEffect, useState } from "react";

interface AnimatedHeroWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedHeroWrapper: React.FC<AnimatedHeroWrapperProps> = ({
  children,
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedHeroWrapper;
