"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  LotusOrnament,
  StudioSeal,
  RoyalTaraIcon,
  RoyalPravahaIcon,
  RoyalChevronLeft,
  RoyalChevronRight,
} from "@/components/ui/Ornaments";

interface CanvasItem {
  id: string;
  type: "paper" | "pattern" | "typography" | "specimen" | "seal";
  title: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

export function StudioCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mobile specific active slide
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const initialItems: CanvasItem[] = [
    {
      id: "paper-1",
      type: "paper",
      title: "Wasli Paper Layer 01",
      x: 10,
      y: 12,
      rotation: -3,
      zIndex: 1,
    },
    {
      id: "pattern-1",
      type: "pattern",
      title: "Indigo Kalamkari Toran",
      x: 48,
      y: 8,
      rotation: 2,
      zIndex: 2,
    },
    {
      id: "typography-1",
      type: "typography",
      title: "Cormorant Serif Specimen",
      x: 18,
      y: 42,
      rotation: -1,
      zIndex: 3,
    },
    {
      id: "seal-1",
      type: "seal",
      title: "Charchit Estd. 2026 Seal",
      x: 68,
      y: 48,
      rotation: 5,
      zIndex: 4,
    },
  ];

  const [items, setItems] = useState<CanvasItem[]>(initialItems);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const bringToFront = (id: string) => {
    setActiveItem(id);
    setItems((prev) => {
      const maxZ = Math.max(...prev.map((i) => i.zIndex), 0);
      return prev.map((item) =>
        item.id === id ? { ...item, zIndex: maxZ + 1 } : item
      );
    });
  };

  const resetCanvas = () => {
    setItems(initialItems);
    setActiveItem(null);
    setMousePos({ x: 0, y: 0 });
  };

  const mobileSlides = [
    {
      id: "paper-1",
      tag: "PLATE 01 // SUBSTRATE",
      sanskrit: "वसली",
      title: "Wasli Archival Paper",
      quote: "“Archival paper layered by hand, prepared to hold ink for generations.”",
      details: ["Handmade Sanganer Pulp", "100% Cotton Rag", "Acid-Free Sizing"],
      theme: "light",
    },
    {
      id: "pattern-1",
      tag: "PLATE 02 // MOTIF",
      sanskrit: "कलमकारी",
      title: "Indigo Kalamkari Toran",
      quote: "“Architectural archways and scalloped floral borders carved by hand.”",
      details: ["Natural Indigo Ink", "Teak Wood Block Print", "Kalamkari Geometry"],
      theme: "image",
    },
    {
      id: "typography-1",
      tag: "PLATE 03 // TYPE",
      sanskrit: "लिपि",
      title: "Cormorant Serif Specimen",
      quote: "“Display serif pairing inspired by classical stone carvings & high editorial print.”",
      details: ["Cormorant Garamond", "Plus Jakarta Sans", "Devanagari Inscriptions"],
      theme: "dark",
    },
    {
      id: "seal-1",
      tag: "PLATE 04 // HALLMARK",
      sanskrit: "मुद्रा",
      title: "Official Studio Seal",
      quote: "“The enduring mark of classical craftsmanship and modern digital precision.”",
      details: ["Estd. 2026", "Bharat & Global", "Archival Quality"],
      theme: "seal",
    },
  ];

  return (
    <div id="canvas" className="w-full relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 max-w-6xl mx-auto">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            <RoyalTaraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Interactive Worktable</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#14224A]">
            The Artisan’s Canvas
          </h3>
          <p className="text-xs text-[#585C6D] max-w-md">
            Layered wasli paper, classical typography specimens, indigo block-print
            fragments, and seal marks. Explore the tactile ingredients of our digital craft.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetCanvas}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#14224A]/70 hover:text-[#14224A] bg-[#FAF7F2] border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors tactile-button"
            title="Reset artisan worktable"
          >
            <RoyalPravahaIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Reset Table</span>
          </button>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#8E7036] tracking-wider uppercase font-mono">
            <RoyalPravahaIcon className="w-3 h-3 text-[#C5A059]" />
            <span>Hover or Click items</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE EXCLUSIVE: BESPOKE ARTISAN SPECIMEN DECK */}
      {/* ========================================================= */}
      <div className="block md:hidden max-w-md mx-auto space-y-4">
        {/* Specimen Category Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#F4EFE6] border border-[#C5A059]/30 rounded-none">
          {mobileSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setMobileActiveIndex(idx)}
              className={`py-2 px-1 text-center transition-all ${
                mobileActiveIndex === idx
                  ? "bg-[#14224A] text-[#FAF7F2] font-semibold shadow-xs"
                  : "text-[#14224A]/70 hover:text-[#14224A]"
              }`}
            >
              <span className="block text-[9px] uppercase tracking-wider">
                0{idx + 1}
              </span>
              <span className="block text-[11px] font-serif italic">
                {slide.sanskrit}
              </span>
            </button>
          ))}
        </div>

        {/* Active Specimen Showcase Card */}
        <div className="relative overflow-hidden bg-[#FAF7F2] border border-[#C5A059]/50 shadow-xl p-5 jharokha-corners wasli-texture min-h-[380px] flex flex-col justify-between">
          {/* Top Tag & Sanskrit Badge */}
          <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2.5">
            <div className="flex items-center gap-1.5 text-[#C5A059]">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-[#8E7036]">
                {mobileSlides[mobileActiveIndex].tag}
              </span>
            </div>
            <span className="text-xs font-serif text-[#14224A] font-semibold px-2 py-0.5 border border-[#C5A059]/40 bg-[#FAF7F2]">
              {mobileSlides[mobileActiveIndex].sanskrit}
            </span>
          </div>

          {/* Card Middle: Rich Cultural Artifact */}
          <div className="my-4">
            {mobileActiveIndex === 0 && (
              <div className="p-4 bg-[#FAF7F2] border border-[#DCCEBA] shadow-inner space-y-3">
                <p className="font-serif italic text-lg text-[#14224A] leading-relaxed">
                  {mobileSlides[0].quote}
                </p>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
                <p className="text-[11px] text-[#585C6D]">
                  Crafted sheet by sheet using traditional sun-drying frames in Rajasthan.
                </p>
              </div>
            )}

            {mobileActiveIndex === 1 && (
              <div className="space-y-3">
                <div className="relative w-full h-36 border border-[#C5A059]/40 overflow-hidden shadow-sm">
                  <Image
                    src="/brand/charchit-top-border.png"
                    alt="Indigo Kalamkari Block Print Motif"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className="font-serif italic text-sm text-[#14224A]">
                  {mobileSlides[1].quote}
                </p>
              </div>
            )}

            {mobileActiveIndex === 2 && (
              <div className="p-4 bg-[#080E21] text-[#FAF7F2] border border-[#C5A059]/50 shadow-lg space-y-3">
                <div className="flex items-center justify-between text-[#C5A059]">
                  <span className="text-[9px] uppercase tracking-widest">
                    Display Serif Specimen
                  </span>
                  <span className="font-serif italic text-xs">Aa — Zz</span>
                </div>
                <div className="font-serif text-3xl text-[#FAF7F2] tracking-wide">
                  चर्चित Charchit
                </div>
                <p className="text-[11px] text-[#FAF7F2]/75 leading-relaxed">
                  {mobileSlides[2].quote}
                </p>
              </div>
            )}

            {mobileActiveIndex === 3 && (
              <div className="p-4 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="animate-float-gentle">
                  <StudioSeal year="2026" city="BHARAT" className="w-24 h-24" />
                </div>
                <p className="font-serif italic text-sm text-[#14224A]">
                  {mobileSlides[3].quote}
                </p>
              </div>
            )}
          </div>

          {/* Card Footer: Metadata and Prev/Next Steppers */}
          <div className="pt-3 border-t border-[#C5A059]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {mobileSlides[mobileActiveIndex].details.map((detail, i) => (
                <span
                  key={detail}
                  className={`text-[8px] uppercase tracking-wider font-medium ${
                    i === 0 ? "text-[#14224A]" : "hidden xs:inline text-[#8E7036]"
                  }`}
                >
                  {detail} {i < 1 && "•"}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveIndex((prev) =>
                    prev === 0 ? mobileSlides.length - 1 : prev - 1
                  )
                }
                className="p-1.5 border border-[#C5A059]/40 bg-[#FAF7F2] text-[#14224A] hover:bg-[#C5A059] transition-colors active:scale-95"
                aria-label="Previous specimen"
              >
                <RoyalChevronLeft className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setMobileActiveIndex((prev) =>
                    prev === mobileSlides.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-1.5 border border-[#C5A059]/40 bg-[#FAF7F2] text-[#14224A] hover:bg-[#C5A059] transition-colors active:scale-95"
                aria-label="Next specimen"
              >
                <RoyalChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP VIEW: MAIN ARTISAN FREEFORM WORKTABLE */}
      {/* ========================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        className="hidden md:block relative w-full max-w-6xl mx-auto h-[500px] lg:h-[540px] bg-[#F4EFE6] rounded-sm border border-[#C5A059]/30 shadow-[inset_0_2px_12px_rgba(20,34,74,0.04)] overflow-hidden select-none paper-grain"
      >
        {/* Subtle Background Guidelines & Jaali grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#14224A_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Center Jharokha Arch Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-80 h-96 border-2 border-[#14224A] rounded-t-full" />
        </div>

        {/* Item 1: Wasli Paper Specimen */}
        {items.find((i) => i.id === "paper-1") && (
          <div
            onClick={() => bringToFront("paper-1")}
            tabIndex={0}
            role="button"
            aria-label="Wasli Paper Layer 01"
            className="absolute p-6 bg-[#FAF7F2] border border-[#DCCEBA] shadow-lg cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
            style={{
              left: "8%",
              top: "14%",
              width: "280px",
              zIndex: items.find((i) => i.id === "paper-1")?.zIndex,
              transform: `translate3d(${mousePos.x * -18}px, ${
                mousePos.y * -18
              }px, 0) rotate(${
                activeItem === "paper-1" ? 0 : -3
              }deg)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2 mb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#8E7036] font-medium">
                Plate 01 // Wasli Substrate
              </span>
              <LotusOrnament className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>
            <p className="font-serif italic text-lg text-[#14224A] leading-snug">
              “Archival paper layered by hand, prepared to hold ink for generations.”
            </p>
            <div className="mt-4 pt-3 border-t border-[#E0D4C0] flex items-center justify-between text-[9px] text-[#585C6D] uppercase tracking-wider">
              <span>Handmade Sanganer Pulp</span>
              <span>100% Cotton Rag</span>
            </div>
          </div>
        )}

        {/* Item 2: Authentic Indigo Kalamkari Pattern Fragment */}
        {items.find((i) => i.id === "pattern-1") && (
          <div
            onClick={() => bringToFront("pattern-1")}
            tabIndex={0}
            role="button"
            aria-label="Indigo Kalamkari Toran Fragment"
            className="absolute p-3 bg-[#FAF7F2] border border-[#C5A059]/40 shadow-xl cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
            style={{
              left: "44%",
              top: "10%",
              width: "320px",
              zIndex: items.find((i) => i.id === "pattern-1")?.zIndex,
              transform: `translate3d(${mousePos.x * 22}px, ${
                mousePos.y * 22
              }px, 0) rotate(${activeItem === "pattern-1" ? 0 : 2}deg)`,
            }}
          >
            <div className="relative w-full h-36 overflow-hidden border border-[#DCCEBA]">
              <Image
                src="/brand/charchit-top-border.png"
                alt="Indigo Kalamkari Block Print Motif"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-widest text-[#14224A] font-semibold">
                Indigo Kalamkari Motif
              </span>
              <span className="text-[9px] text-[#8E7036] uppercase tracking-wider">
                Natural Indigo Ink
              </span>
            </div>
          </div>
        )}

        {/* Item 3: Typography Specimen */}
        {items.find((i) => i.id === "typography-1") && (
          <div
            onClick={() => bringToFront("typography-1")}
            tabIndex={0}
            role="button"
            aria-label="Cormorant Serif Specimen"
            className="absolute p-5 bg-[#080E21] text-[#FAF7F2] border border-[#C5A059]/50 shadow-2xl cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
            style={{
              left: "15%",
              top: "46%",
              width: "300px",
              zIndex: items.find((i) => i.id === "typography-1")?.zIndex,
              transform: `translate3d(${mousePos.x * -12}px, ${
                mousePos.y * -12
              }px, 0) rotate(${
                activeItem === "typography-1" ? 0 : -1.5
              }deg)`,
            }}
          >
            <div className="flex items-center justify-between text-[#C5A059] mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em]">
                Typography Specimen
              </span>
              <span className="text-xs font-serif italic">Aa — Zz</span>
            </div>
            <div className="font-serif text-3xl text-[#FAF7F2] tracking-wide my-1">
              चर्चित Charchit
            </div>
            <p className="text-[11px] text-[#FAF7F2]/70 leading-relaxed font-sans">
              Display serif pairing inspired by classical stone carvings & high editorial print.
            </p>
          </div>
        )}

        {/* Item 4: Authentic Brand Seal */}
        {items.find((i) => i.id === "seal-1") && (
          <div
            onClick={() => bringToFront("seal-1")}
            tabIndex={0}
            role="button"
            aria-label="Charchit Estd. 2026 Seal"
            className="absolute cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
            style={{
              left: "64%",
              top: "42%",
              zIndex: items.find((i) => i.id === "seal-1")?.zIndex,
              transform: `translate3d(${mousePos.x * 28}px, ${
                mousePos.y * 28
              }px, 0) rotate(${activeItem === "seal-1" ? 0 : 6}deg)`,
            }}
          >
            <div className="p-4 bg-[#FAF7F2] border border-[#C5A059] shadow-xl flex flex-col items-center">
              <StudioSeal year="2026" city="BHARAT" className="w-28 h-28" />
              <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#8E7036] font-medium">
                Official Studio Mark
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

