import React, { Suspense } from "react";
import SimpleFallbackFooter from "./simple-fallback-footer";
import FooterServer from "./footer-server";

// This is a server component wrapper that provides Suspense and error handling
// Note: No "use client" directive as this needs to be a server component
const Footer = () => {
  return (
    <Suspense fallback={<SimpleFallbackFooter />}>
      <FooterServer />
    </Suspense>
  );
};

export default Footer;
