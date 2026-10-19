import React from "react";

/**
 * Traditional Indian Lotus Ornament (Medallion)
 * Sourced from traditional stone jaali and Mughal architectural carvings
 */
export function LotusOrnament({ className = "w-6 h-6 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 2C20 8 16 14 10 18C16 18 19 23 20 28C21 23 24 18 30 18C24 14 20 8 20 2Z"
        fill="currentColor"
        opacity="0.95"
      />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      <path
        d="M20 28C17 33 13 36 7 37C12 34 16 31 18 26C19 27 20 28 20 28Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M20 28C23 33 27 36 33 37C28 34 24 31 22 26C21 27 20 28 20 28Z"
        fill="currentColor"
        opacity="0.75"
      />
      <circle cx="20" cy="36" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/**
 * Fine Dual Gold Divider with central floral medallion
 */
export function GoldDividerWithLotus({
  title,
  dark = false,
}: {
  title?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-4 my-8 w-full max-w-2xl mx-auto px-4">
      <div
        className={`h-[1px] flex-1 ${
          dark
            ? "bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]"
            : "bg-gradient-to-r from-transparent via-[#C5A059]/50 to-[#C5A059]"
        }`}
      />
      <div className="flex items-center gap-2 px-2 shrink-0">
        <LotusOrnament className="w-4 h-4 text-[#C5A059]" />
        {title && (
          <span
            className={`text-xs uppercase tracking-[0.25em] font-medium ${
              dark ? "text-[#C5A059]" : "text-[#8E7036]"
            }`}
          >
            {title}
          </span>
        )}
        <LotusOrnament className="w-4 h-4 text-[#C5A059]" />
      </div>
      <div
        className={`h-[1px] flex-1 ${
          dark
            ? "bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]"
            : "bg-gradient-to-l from-transparent via-[#C5A059]/50 to-[#C5A059]"
        }`}
      />
    </div>
  );
}

/**
 * Indian Toran / Scalloped Floral Border (SVG repeat)
 * Inspired by the kalamkari textile border in the Charchit brand artwork
 */
export function ToranBorderSVG({ className = "w-full text-[#14224A]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="toran-repeat"
          width="60"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          {/* Triangular scalloped drop */}
          <path
            d="M0 0 H60 V12 L30 42 L0 12 Z"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <path
            d="M0 12 Q15 22 30 42 Q45 22 60 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            fill="none"
          />
          {/* Inner teardrop / floral bud */}
          <path
            d="M30 16 C26 22 26 28 30 33 C34 28 34 22 30 16 Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <circle cx="30" cy="44" r="2" fill="currentColor" fillOpacity="0.4" />
          <line
            x1="0"
            y1="0"
            x2="60"
            y2="0"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="1200" height="48" fill="url(#toran-repeat)" />
    </svg>
  );
}

/**
 * Authentic Jharokha Arch SVG Frame Outline
 */
export function JharokhaArchOutline({
  className = "w-full h-full text-[#C5A059]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Outer scalloped arch profile */}
      <path
        d="M20 390 V140 C20 70 70 20 150 10 C230 20 280 70 280 140 V390 H20 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {/* Inner offset border */}
      <path
        d="M28 382 V142 C28 80 75 32 150 22 C225 32 272 80 272 142 V382 H28 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.25"
        strokeDasharray="4 3"
      />
      {/* Top crown jewel ornament */}
      <circle cx="150" cy="10" r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * Traditional Indian Wax Seal / Studio Badge
 */
export function StudioSeal({
  year = "2026",
  city = "BHARAT",
  className = "w-24 h-24",
}: {
  year?: string;
  city?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center p-2 border border-[#C5A059]/40 bg-[#FAF7F2] shadow-sm select-none ${className}`}
    >
      <div className="absolute inset-1.5 rounded-full border border-dashed border-[#C5A059]/30" />
      <div className="text-center">
        <span className="block text-[8px] uppercase tracking-[0.28em] text-[#C5A059] font-medium">
          CHARCHIT
        </span>
        <span className="block text-xs font-serif italic text-[#14224A] font-semibold my-0.5">
          Estd. {year}
        </span>
        <span className="block text-[7px] tracking-[0.2em] text-[#8E7036] uppercase">
          {city}
        </span>
      </div>
    </div>
  );
}
