import React from "react";
import Image from "next/image";

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
 * Official Charchit Studios Brand Seal
 * Renders the authentic hand-painted Charchit Kalamkari brandmark
 */
export function StudioSeal({
  year = "2026",
  city = "ONLINE",
  className = "w-24 h-24",
}: {
  year?: string;
  city?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center p-2 border border-[#C5A059]/40 bg-[#FAF7F2] shadow-sm select-none overflow-hidden ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src="/brand/charchit-logo-transparent.png"
          alt="Charchit Studios"
          fill
          className="object-contain p-0.5"
        />
      </div>
    </div>
  );
}

/* ========================================================================= */
/* ROYAL INDIAN LUXURY ICON & MOTIF SUITE (REPLACES GENERIC TECH ICONS)      */
/* ========================================================================= */

/**
 * 1. Royal Kalam Icon (Calligraphy Nib / Brass Stylus with Glowing Jyoti Tip)
 * Represents Dialogue, Writing, Craft, and Precision
 */
export function RoyalKalamIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 21L7.5 20L19.5 8L16 4.5L4 16.5L3 21Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M14 6.5L17.5 10" stroke="currentColor" strokeWidth="1.2" />
      <line x1="3" y1="21" x2="8.5" y2="15.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="20.5" cy="3.5" r="1.5" fill="#DEB868" />
    </svg>
  );
}

/**
 * 2. Royal Diya Icon (Traditional Sacred Brass Oil Lamp with Radiant Flame)
 * Represents Enlightenment, Discovery, Idea, and Auspicious Beginnings
 */
export function RoyalDiyaIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Lamp Bowl */}
      <path d="M3 13C3 17.5 7 21 12 21C17 21 21 17.5 21 13H3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" />
      {/* Pedestal Base */}
      <path d="M8 21L7 23H17L16 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Sacred Jyoti Flame */}
      <path d="M12 2C12 2 9 6.5 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 6.5 12 2 12 2Z" fill="currentColor" stroke="#DEB868" strokeWidth="1" />
      <circle cx="12" cy="9" r="1" fill="#FAF7F2" />
    </svg>
  );
}

/**
 * 3. Royal Mayur Icon (Classical Peacock Crest & Mor Pankh Feather)
 * Represents Beauty, Flight, Launch, and Royalty
 */
export function RoyalMayurIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Feather Silhouette */}
      <path d="M4 21C4 21 9 18 13 14C17 10 20 5 20 2C17 2 12 5 8 9C4 13 4 21 4 21Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      {/* Central Quill Spine */}
      <line x1="4" y1="21" x2="18" y2="4" stroke="currentColor" strokeWidth="1.2" />
      {/* Inlaid Peacock Eye */}
      <circle cx="14" cy="7.5" r="3.2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      <circle cx="14" cy="7.5" r="1.5" fill="#14224A" />
      <circle cx="14" cy="7.5" r="0.6" fill="#DEB868" />
    </svg>
  );
}

/**
 * 4. Royal Kalash Icon (Auspicious Sacred Vessel with Coconut & Mango Foliage)
 * Represents Abundance, Heritage, Disciplines, and Services
 */
export function RoyalKalashIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Coconut on top */}
      <circle cx="12" cy="5" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.1" />
      {/* Mango Leaves radiating */}
      <path d="M7 8C9 6.5 12 6.5 12 6.5C12 6.5 15 6.5 17 8" stroke="currentColor" strokeWidth="1.2" />
      {/* Kalash Vessel Body */}
      <path d="M6 10H18L19.5 16C19.5 19 16.5 21 12 21C7.5 21 4.5 19 4.5 16L6 10Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" />
      {/* Sacred Swastika / Cross Mark */}
      <path d="M12 12V17M9.5 14.5H14.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 5. Royal Jharokha Icon (Architectural Scalloped Palace Archway)
 * Represents Structure, Construction, Engineering, and Portfolio Work
 */
export function RoyalJharokhaIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer Arch Frame */}
      <path d="M4 22V10C4 5.5 8 2 12 2C16 2 20 5.5 20 10V22H4Z" stroke="currentColor" strokeWidth="1.3" />
      {/* Inner Scalloped Profile */}
      <path d="M7 22V12C7 8 9 5 12 5C15 5 17 8 17 12V22" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      {/* Finial Crown */}
      <circle cx="12" cy="2" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 6. Royal Chhatri Icon (Domed Heritage Royal Pavilion / Studio Emblem)
 * Represents Independence, Legacy, Prestige, and Studio Ethos
 */
export function RoyalChhatriIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Kalasa Pinnacle */}
      <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="1.5" r="1" fill="currentColor" />
      {/* Scalloped Dome */}
      <path d="M3 11C4 7 7.5 4 12 4C16.5 4 20 7 21 11H3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" />
      {/* Hanging Bell drops */}
      <circle cx="5" cy="12" r="0.8" fill="currentColor" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      <circle cx="19" cy="12" r="0.8" fill="currentColor" />
      {/* Carved Pillars */}
      <line x1="6" y1="11" x2="6" y2="21" stroke="currentColor" strokeWidth="1.2" />
      <line x1="18" y1="11" x2="18" y2="21" stroke="currentColor" strokeWidth="1.2" />
      {/* Base Plinth */}
      <rect x="3" y="21" width="18" height="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/**
 * 7. Royal Grantha Icon (Classical Palm Leaf Manuscript / Sacred Ledger)
 * Represents Journal, Literature, Archives, and Thought
 */
export function RoyalGranthaIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Bound Folio */}
      <rect x="3" y="5" width="18" height="14" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      {/* Sacred Binding Ribbon / Sutra */}
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="#FAF7F2" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      {/* Inscriptions */}
      <line x1="6" y1="8.5" x2="18" y2="8.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="6" y1="15.5" x2="18" y2="15.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/**
 * 8. Royal Surya Icon (Radiant 12-Ray Solar Medallion)
 * Represents Glory, Vitality, Innovation, and Distinction
 */
export function RoyalSuryaIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="2"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

/**
 * 9. Royal Mudrika Icon (Royal Signet Seal / Rajmudra Stamp)
 * Represents Authenticity, Authority, and Verification
 */
export function RoyalMudrikaIcon({ className = "w-5 h-5 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="6.8" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
      {/* Central Devanagari 'च' motif */}
      <path d="M9 9.5H13C14.5 9.5 15.5 10.5 15.5 12C15.5 13.5 14.5 14.5 13 14.5H9.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 10. Royal Tara Icon (Sacred Vedic 8-Point Swarna-Tara / Star)
 * Replaces modern Sparkles with authentic Vedic celestial radiance
 */
export function RoyalTaraIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 2L14.2 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.8 8.5L12 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/**
 * 11. Royal Arrow Up-Right (Ishanya Teer / Ancient Indian Feather Arrow)
 * Replaces modern ArrowUpRight with royal calligraphic arrow
 */
export function RoyalArrowUpRight({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="6" y1="18" x2="17.5" y2="6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9.5 6.5H17.5V14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 12. Royal Arrow Right (Dhanush Teer)
 * Replaces modern ArrowRight
 */
export function RoyalArrowRight({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="4" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13.5 6.5L19.5 12L13.5 17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 13. Royal Arrow Left (Prati-Teer)
 * Replaces modern ArrowLeft
 */
export function RoyalArrowLeft({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="20" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10.5 6.5L4.5 12L10.5 17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 14. Royal Chevron Right (Jharokha Scallop Chevron)
 */
export function RoyalChevronRight({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 15. Royal Chevron Left
 */
export function RoyalChevronLeft({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 16. Royal Patra Icon (Royal Firman Scroll & Letter)
 * Replaces modern Mail icon
 */
export function RoyalPatraIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="4" width="18" height="15" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 6L12 13L21 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="2.2" fill="#FAF7F2" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 17. Royal Sthala Icon (Palace Sthambha / Royal Pillar Marker)
 * Replaces modern MapPin icon
 */
export function RoyalSthalaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2C8 2 5 5 5 9C5 14.5 12 21 12 21C12 21 19 14.5 19 9C19 5 16 2 12 2Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 18. Royal Satya Icon (Royal Rajmudra Stamp of Truth & Verification)
 * Replaces modern Check & CheckCircle2
 */
export function RoyalSatyaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 19. Royal Sanrakshan Icon (Kshatriya Royal Kavach Shield)
 * Replaces modern Shield & ShieldCheck
 */
export function RoyalSanrakshanIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5.5L12 2Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="11.5" r="3.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="11.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 20. Royal Pattika Icon (Wasli Folio Duplicate)
 * Replaces modern Copy icon
 */
export function RoyalPattikaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7" y="7" width="13" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="3" width="13" height="14" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="7" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * 21. Royal Dhan Icon (Ancient Gold Mohur / Nishka)
 * Replaces modern IndianRupee
 */
export function RoyalDhanIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="6.8" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
      <path d="M8.5 7.5H15M8.5 10.5H14C15 10.5 15.5 11.2 15.5 12C15.5 13 14.8 13.8 13.5 13.8H9L14.5 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 22. Royal Kala Chakra Icon (Surya Ghatika / Astronomical Clock)
 * Replaces modern Clock
 */
export function RoyalKalaChakraIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
      <line x1="12" y1="4" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="18" x2="12" y2="20" stroke="currentColor" strokeWidth="1.2" />
      <line x1="4" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2" />
      <line x1="18" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 23. Royal Sandesh Icon (Royal Messenger Hamsa with Scroll)
 * Replaces modern Send
 */
export function RoyalSandeshIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 12L21 3L14 21L11 13L3 12Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="11" y1="13" x2="21" y2="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="21" cy="3" r="1" fill="#FAF7F2" />
    </svg>
  );
}

/**
 * 24. Royal Mahal Icon (Haveli Palace Arch & Dome)
 * Replaces modern Building
 */
export function RoyalMahalIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 8C8 5 10 3 12 3C14 3 16 5 16 8H8Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12" cy="2" r="0.8" fill="currentColor" />
      <rect x="4" y="8" width="16" height="13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 21V14C9 12.5 10.3 11.5 12 11.5C13.7 11.5 15 12.5 15 14V21" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6.5" cy="12" r="1" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 25. Royal Lakshya Icon (Dhanush Target Mandala)
 * Replaces modern Target
 */
export function RoyalLakshyaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2" />
      <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.2" />
      <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * 26. Royal Talapatra Icon (Stacked Manuscripts & Layers)
 * Replaces modern Layers
 */
export function RoyalTalapatraIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 27. Royal Sutra Link Icon (Sacred Golden Thread Link)
 * Replaces modern ExternalLink and Share2
 */
export function RoyalSutraLinkIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 13C10.5 13.8 11.2 14.5 12 14.8C12.8 15.2 13.8 15.2 14.6 14.7L18 11.3C19.3 10 19.3 7.9 18 6.6C16.7 5.3 14.6 5.3 13.3 6.6L12 7.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 11C13.5 10.2 12.8 9.5 12 9.2C11.2 8.8 10.2 8.8 9.4 9.3L6 12.7C4.7 14 4.7 16.1 6 17.4C7.3 18.7 9.4 18.7 10.7 17.4L12 16.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 28. Royal Darshan Icon (Sacred Lotus Vision / Third Eye)
 * Replaces modern Eye
 */
export function RoyalDarshanIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 29. Royal Nyaya Icon (Nyaya Tula / Scales of Truth)
 * Replaces modern Scale
 */
export function RoyalNyayaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.3" />
      <line x1="7" y1="21" x2="17" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <path d="M4 7L2 14H6L4 7Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M20 7L18 14H22L20 7Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/**
 * 30. Royal Shankha Icon (Sacred Announcement Horn & Warning Emblem)
 * Replaces modern AlertCircle / AlertTriangle
 */
export function RoyalShankhaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2C8 2 4 6 4 11C4 16 8 20 12 21C16 20 20 16 20 11C20 6 16 2 12 2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      <line x1="12" y1="7" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * 31. Royal Download Icon (Royal Firman Descent)
 * Replaces modern Download
 */
export function RoyalDownloadIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3V15M12 15L7.5 10.5M12 15L16.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18V20C4 20.5 4.5 21 5 21H19C19.5 21 20 20.5 20 20V18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 32. Royal Pravaha Icon (Pradakshina Swirl)
 * Replaces modern RotateCcw & Move
 */
export function RoyalPravahaIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21C8 21 5 18.5 4 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3 8V12H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * 33. Royal Lock Icon (Ancient Indian Brass Padlock with Rajmudra Keyhole)
 * Replaces modern Lock & KeyRound
 */
export function RoyalLockIcon({ className = "w-4 h-4 text-[#C5A059]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 10V6.5C8 4.3 9.8 2.5 12 2.5C14.2 2.5 16 4.3 16 6.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="1.5" fill="currentColor" />
      <line x1="12" y1="16" x2="12" y2="18.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
/**
 * RoyalCharchitBrandLogo
 * Renders the authentic uploaded Charchit brandmark
 */
export function RoyalCharchitBrandLogo({
  variant = "dark",
  className = "",
  showTagline = true,
}: {
  variant?: "dark" | "light";
  className?: string;
  showTagline?: boolean;
}) {
  const isLight = variant === "light";
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative h-11 sm:h-12 w-40 sm:w-48 flex items-center">
        <Image
          src={isLight ? "/brand/charchit-wordmark-light.png" : "/brand/charchit-wordmark.png"}
          alt="Charchit Studios — Estd. 2026"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}

