"use client";
import { useEffect, useState } from 'react';

const useScrollTrigger = (triggerHeight = 200) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsTriggered(scrollTop > triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerHeight]);

  return isTriggered;
};

export default useScrollTrigger;
