"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SimpleFallbackFooter from "./simple-fallback-footer";

// Client wrapper component for any interactive elements that need to be
// in a client component but don't require async data fetching
const FooterClientWrapper = (props: any) => {
  const [mounted, setMounted] = useState(false);

  // Only show the interactive components after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // This ensures hydration matches what was rendered on the server
  if (!mounted) {
    return <SimpleFallbackFooter />;
  }

  return <div className="footer-client-wrapper">{props.children}</div>;
};

export default FooterClientWrapper;
