import { fetchAPI } from "@/config/api";
import { Metadata } from "next";
import { generateMetadata } from "./metadata";
import React from "react";

export { generateMetadata };

export default function NewsHighlightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
