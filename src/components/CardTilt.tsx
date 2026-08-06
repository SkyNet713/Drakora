"use client";

import { useRef } from "react";

export default function CardTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease",
      }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        cardRef.current.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
      }}
      onMouseLeave={() => {
        if (cardRef.current) {
          cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg) translateY(0)";
        }
      }}
    >
      {children}
    </div>
  );
}
