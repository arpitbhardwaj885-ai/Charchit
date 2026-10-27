"use client";

import React, { useState } from "react";
import {
  LotusOrnament,
  GoldDividerWithLotus,
  RoyalDiyaIcon,
  RoyalKalamIcon,
  RoyalJharokhaIcon,
  RoyalMayurIcon,
  RoyalMudrikaIcon,
  RoyalTaraIcon,
  RoyalSatyaIcon,
} from "@/components/ui/Ornaments";

const STAGES = [
  {
    step: "01",
    sanskrit: "संवाद",
    name: "Samvad",
    subtitle: "Discovery & Philosophical Dialogue",
    icon: RoyalDiyaIcon,
    overview:
      "Before ink touches paper or code meets the compiler, we listen. We uncover what makes your enterprise genuinely distinctive, separating foundational truth from passing trends.",
    deliverables: [
      "In-depth Founder & Stakeholder Dialogue",
      "Competitive Landscape & Cultural Positioning",
      "Core Editorial Narrative & Manifesto Draft",
      "Scope Architecture & Technical Feasibility Roadmap",
    ],
    duration: "Week 01 – 02",
  },
  {
    step: "02",
    sanskrit: "कला",
    name: "Kala",
    subtitle: "Art Direction & Aesthetic Architecture",
    icon: RoyalKalamIcon,
    overview:
      "We build a cohesive visual language rooted in classical craftsmanship. Bespoke typography hierarchies, architectural jharokha frames, curated color palettes, and editorial layouts.",
    deliverables: [
      "Bespoke Design Token Matrix (Type, Color, Grid)",
      "High-Fidelity Editorial Page Layouts",
      "Tactile Asset & Ornament Direction",
      "Interactive Motion & Transition Studies",
    ],
    duration: "Week 03 – 05",
  },
  {
    step: "03",
    sanskrit: "निर्माण",
    name: "Nirman",
    subtitle: "Digital Construction & High-Performance Engineering",
    icon: RoyalJharokhaIcon,
    overview:
      "The aesthetic vision is translated into robust, maintainable code. Next.js App Router, accessible semantics, responsive geometry, database integrity, and smooth hardware-accelerated motion.",
    deliverables: [
      "Production-Ready Next.js & TypeScript Architecture",
      "Server-Side Rendering & Core Web Vitals Optimization",
      "Supabase Database Layer & Row-Level Security",
      "Comprehensive Accessibility & Cross-Device QA",
    ],
    duration: "Week 06 – 08",
  },
  {
    step: "04",
    sanskrit: "विस्तार",
    name: "Vistar",
    subtitle: "Amplification, Launch & Operations",
    icon: RoyalMayurIcon,
    overview:
      "Launch is the beginning of discourse. We orchestrate seamless domain migration, search visibility, high-touch inquiry capture, and automated operational workflows.",
    deliverables: [
      "Zero-Downtime Production Deployment",
      "Metadata, Canonical SEO & Structured Data",
      "Lead Capture & CRM Automation Pipelines",
      "Admin Portal Training & Archival Handover",
    ],
    duration: "Week 09+",
  },
];

export function CraftProcess() {
  const [activeStage, setActiveStage] = useState(0);
  const [isShimmering, setIsShimmering] = useState(false);
  const [isStamped, setIsStamped] = useState(false);

  const current = STAGES[activeStage];
  const IconComponent = current.icon;

  const handleStageClick = (idx: number) => {
    if (idx === activeStage) return;
    setActiveStage(idx);
    setIsShimmering(true);
    setIsStamped(true);
    setTimeout(() => setIsShimmering(false), 600);
    setTimeout(() => setIsStamped(false), 900);
  };

  return (
    <section id="process" className="py-20 bg-[#F4EFE6] relative overflow-hidden select-none">
      {/* Subtle Background Ornamentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-2">
            <RoyalTaraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>THE FOURFOLD DISCIPLINE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#14224A] leading-tight">
            The Craft Process
          </h2>
          <p className="text-sm text-[#585C6D] mt-3 font-sans leading-relaxed">
            Every studio engagement progresses through four deliberate stages, combining
            philosophical clarity with technical precision. Select any stage to inspect the cadence.
          </p>
        </div>

        {/* Stage Selector Grid with Click Event Listeners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
          {STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => handleStageClick(idx)}
                className={`p-3.5 sm:p-5 text-left border transition-all duration-300 relative tactile-button active:scale-95 ${
                  isActive
                    ? "bg-[#14224A] text-[#FAF7F2] border-[#C5A059] shadow-xl scale-[1.02]"
                    : "bg-[#FAF7F2] text-[#14224A] border-[#DCCEBA] hover:border-[#C5A059]/60 hover:bg-[#FAF7F2]/90"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8E7036] via-[#DEB868] to-[#8E7036]" />
                )}
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-medium ${
                      isActive ? "text-[#C5A059]" : "text-[#8E7036]"
                    }`}
                  >
                    Stage {stage.step}
                  </span>
                  <span
                    className={`font-serif text-base sm:text-lg transition-transform ${
                      isActive ? "text-[#DEB868] font-medium scale-110" : "opacity-40"
                    }`}
                  >
                    {stage.sanskrit}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-semibold">{stage.name}</h4>
                <p
                  className={`text-[10px] sm:text-[11px] mt-0.5 line-clamp-1 ${
                    isActive ? "text-[#FAF7F2]/80" : "text-[#585C6D]"
                  }`}
                >
                  {stage.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Showcase Card with Animated Sanskrit Watermark */}
        <div
          className="bg-[#FAF7F2] border border-[#C5A059]/50 shadow-2xl p-5 sm:p-10 md:p-12 relative overflow-hidden jharokha-corners wasli-texture transition-all"
        >
          {/* Shimmer Light Sweep Effect on Click */}
          {isShimmering && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/25 to-transparent pointer-events-none animate-shimmer-sweep z-20" />
          )}

          {/* Ethereal Blooming Sanskrit Stage Watermark */}
          <div className="absolute -right-6 -bottom-10 pointer-events-none opacity-[0.07] font-serif text-[120px] sm:text-[180px] text-[#14224A] select-none leading-none">
            {current.sanskrit}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Philosophy & Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#14224A] text-[#C5A059] flex items-center justify-center border border-[#C5A059]/40 shadow-sm shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8E7036] font-medium block">
                    STAGE {current.step} — {current.sanskrit}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#14224A] font-medium">
                    {current.name}: {current.subtitle}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#14224A]/85 leading-relaxed font-sans">
                {current.overview}
              </p>

              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-3">
                  Tangible Deliverables
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[#14224A] font-medium"
                    >
                      <LotusOrnament className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Architectural Jharokha Framing */}
            <div className="lg:col-span-5 flex justify-center">
              <div className={`w-full max-w-sm p-6 sm:p-8 bg-[#080E21] text-[#FAF7F2] jharokha-arch border transition-all duration-300 shadow-2xl relative text-center flex flex-col justify-between min-h-[340px] overflow-hidden ${
                isStamped ? "border-[#DEB868] shadow-[0_0_24px_rgba(222,184,104,0.35)] scale-[1.01]" : "border-[#C5A059]/40"
              }`}>

                {/* Crown Accent */}
                <div className="mx-auto text-[#C5A059] pt-2">
                  <LotusOrnament className="w-6 h-6 mx-auto" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-medium block mt-2">
                    CADENCE & INTENSITY
                  </span>
                </div>

                <div className="my-6 space-y-2 relative">
                  <span className="font-serif italic text-4xl text-[#E9E0CE] block">
                    {current.duration}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/15 border border-[#C5A059]/30 rounded-none text-[10px] text-[#DEB868] font-mono tracking-wider">
                    <RoyalSatyaIcon className="w-3 h-3 text-[#DEB868]" />
                    <span>ROYAL STUDIO CADENCE</span>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/65 max-w-xs mx-auto pt-1">
                    Focused sprint with dedicated senior craft architects.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C5A059]/30 flex items-center justify-between text-xs text-[#C5A059]">
                  <span className="uppercase tracking-widest text-[10px]">
                    Stage {current.step} of 04
                  </span>
                  <span className="font-serif italic text-sm">Charchit Ethos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
