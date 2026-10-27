"use client";

import React, { useEffect, useState } from "react";

export function StudioScrollEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const percentage = Math.round(scrollProgress * 100);

  return (
    <>
      {/* 1. Sleek Top Reading Progress Hairline */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#8E7036] via-[#DEB868] to-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.7)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 2. Refined Editorial Side Scroll Indicator */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex-col items-center space-y-4 select-none">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E7036] font-mono rotate-90 origin-center mb-3">
          READ
        </span>

        {/* 1px Gold Line Tracker */}
        <div className="relative w-[1.5px] h-32 bg-[#E0D4C0] rounded-full overflow-hidden">
          <div
            className="w-full bg-[#C5A059] rounded-full transition-all duration-75"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        <span className="font-mono text-[10px] text-[#14224A] font-semibold mt-1">
          {percentage}%
        </span>
      </div>
    </>
  );
}
