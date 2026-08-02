"use client";

export default function SafeImage({ src, alt, ...rest }: { src: string; alt: string; [key: string]: any }) {
  return <img src={src} alt={alt} onError={(e: any) => { e.target.src = "/placeholder.png"; }} {...rest} />;
}
