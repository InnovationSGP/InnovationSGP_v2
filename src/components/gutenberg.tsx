// Simplified Gutenberg Renderer for use with Tailwind Typography
import DOMPurify from "isomorphic-dompurify";
import React from "react";

interface GutenbergRendererProps {
  content?: string;
}

/**
 * A simplified Gutenberg renderer that relies on Tailwind Typography for styling
 * This component sanitizes the WordPress content and uses dangerouslySetInnerHTML to render it
 */
function GutenbergRenderer({ content }: GutenbergRendererProps) {
  if (!content) return null;

  // Sanitize the content before rendering
  const sanitizedContent = DOMPurify.sanitize(content);

  // Use dangerouslySetInnerHTML to render the sanitized content
  // This is safe because we're sanitizing with DOMPurify first
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}

export default GutenbergRenderer;
