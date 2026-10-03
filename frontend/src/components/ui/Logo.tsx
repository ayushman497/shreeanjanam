"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_INFO } from "@/lib/constants";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "stacked" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  asLink?: boolean;
}

export function Logo({
  className = "",
  variant = "full",
  size = "md",
  showTagline = true,
  asLink = true,
}: LogoProps) {
  const sizeMap = {
    sm: { img: 36, text: "text-lg", sub: "text-[10px]" },
    md: { img: 48, text: "text-xl sm:text-2xl", sub: "text-[11px] sm:text-xs" },
    lg: { img: 64, text: "text-2xl sm:text-3xl", sub: "text-xs sm:text-sm" },
    xl: { img: 80, text: "text-3xl sm:text-4xl", sub: "text-sm sm:text-base" },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Official Circular Logo Graphic */}
      <div
        className="relative rounded-full p-0.5 bg-gradient-to-br from-[#DFBA67] via-[#C9A24A] to-[#355E2C] shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: currentSize.img + 4, height: currentSize.img + 4 }}
      >
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Anjanam Foods Official Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div
            className={`font-serif font-black tracking-tight leading-tight ${
              variant === "light" ? "text-white" : "text-[#1F2937]"
            } ${currentSize.text} group-hover:text-[#355E2C] transition-colors`}
          >
            ANJANAM
          </div>
          {showTagline && (
            <span
              className={`font-semibold tracking-wider uppercase ${
                variant === "light" ? "text-[#DFBA67]" : "text-[#5B4524]"
              } ${currentSize.sub}`}
            >
              {BRAND_INFO.tagline} • इंदौर
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
