"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

/**
 * CustomCursor Companion:
 * The primary cursor is rendered natively via hardware CSS in globals.css (cursor: url('/brand/cursor-traditional.svg')),
 * ensuring there is ONLY ONE CURSOR on the entire screen with 0ms latency.
 * This component provides:
 * 1. Mobile touch mandala burst and golden zari spark effects on tap.
 * 2. Subtle gold stamp ripple on click.
 */
export function CustomCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>([]);
  const [clickRipples, setClickRipples] = useState<TouchRipple[]>([]);

  const nextSparkleId = useRef(0);

  // Handle desktop click ripples
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const newRipple: TouchRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Handle mobile touch events
  const handleTouch = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const newRipple: TouchRipple = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
      };
      setTouchRipples((prev) => [...prev.slice(-3), newRipple]);

      // Spawn 3 subtle gold zari embers on touch
      const goldTones = ["#C5A059", "#DEB868", "#F8F3E6", "#A6472D"];
      const sparks: Sparkle[] = [0, 1, 2].map((i) => ({
        id: nextSparkleId.current++,
        x: touch.clientX + (Math.random() * 24 - 12),
        y: touch.clientY + (Math.random() * 24 - 12),
        size: Math.random() * 3.5 + 2.5,
        opacity: 0.9,
        color: goldTones[i % goldTones.length],
        rotation: Math.random() * 360,
      }));
      setSparkles((prev) => [...prev.slice(-9), ...sparks]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, [handleTouch]);

  // Fade out sparkles over time
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.15, y: s.y + 0.5 }))
          .filter((s) => s.opacity > 0.05)
      );
    }, 45);
    return () => clearInterval(timer);
  }, [sparkles.length]);

  // Clean up click and touch ripples
  useEffect(() => {
    if (clickRipples.length === 0) return;
    const timeout = setTimeout(() => {
      setClickRipples((prev) => prev.slice(1));
    }, 550);
    return () => clearTimeout(timeout);
  }, [clickRipples]);

  useEffect(() => {
    if (touchRipples.length === 0) return;
    const timeout = setTimeout(() => {
      setTouchRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timeout);
  }, [touchRipples]);

  return (
    <div className="pointer-events-none select-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Mobile Touch Blooming Lotus Mandala */}
      {touchRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-touch-mandala"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        >
          <svg width="68" height="68" viewBox="0 0 72 72" fill="none">
            <circle
              cx="36"
              cy="36"
              r="24"
              stroke="#C5A059"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              className="opacity-70"
            />
            <circle
              cx="36"
              cy="36"
              r="14"
              stroke="#DEB868"
              strokeWidth="1"
              className="opacity-80"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <path
                key={deg}
                d="M36 36 L36 20 Q38 28 36 36"
                stroke="#C5A059"
                strokeWidth="1"
                transform={`rotate(${deg} 36 36)`}
                opacity="0.6"
              />
            ))}
            <circle cx="36" cy="36" r="3" fill="#C5A059" />
          </svg>
        </div>
      ))}

      {/* 2. Desktop Click Golden Stamp Ripple */}
      {clickRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-stamp-ripple"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        >
          <div className="w-12 h-12 rounded-full border border-[#C5A059] bg-[#C5A059]/15 shadow-[0_0_12px_rgba(197,160,89,0.4)]" />
        </div>
      ))}

      {/* 3. Golden Zari Dust on Touch */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none transition-transform duration-75"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 10 10" className="w-full h-full" fill={s.color}>
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}


