"use client";

import Image from "next/image";
import { useState } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  sizes,
  fallbackSrc = "/images/blog-read.png",
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => {
        console.log("Image loading error, falling back to default");
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
