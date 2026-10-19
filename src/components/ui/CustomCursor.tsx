"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches || reducedMotion.matches) {
      return;
    }

    setIsFinePointer(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[data-cursor-hover]") ||
          target.closest("[role='button']"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth trailing animation loop
    let animId: number;
    const updateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y, isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <>
      {/* Central Ink Droplet */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isMouseDown ? 0.7 : isHovered ? 1.5 : 1
          })`,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            isHovered
              ? "bg-[#C5A059]"
              : "bg-[#14224A]"
          }`}
        />
      </div>

      {/* Trailing Craft Halo Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-[width,height,opacity,border-color] duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovered
              ? "w-10 h-10 border-[#C5A059]/60 bg-[#C5A059]/5 scale-110"
              : "w-6 h-6 border-[#14224A]/25 scale-100"
          } ${isMouseDown ? "scale-90 opacity-70" : "opacity-100"}`}
        />
      </div>
    </>
  );
}
