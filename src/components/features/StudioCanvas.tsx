"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, Move, RotateCcw, Layers } from "lucide-react";
import { LotusOrnament, StudioSeal } from "@/components/ui/Ornaments";

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

  return (
    <div className="w-full relative py-12">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-4 max-w-6xl mx-auto">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#14224A]/70 hover:text-[#14224A] bg-[#FAF7F2] border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors"
            title="Reset artisan worktable"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Table</span>
          </button>
          <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#8E7036] tracking-wider uppercase">
            <Move className="w-3 h-3" />
            <span>Touch or Click items</span>
          </div>
        </div>
      </div>

      {/* Main Artisan Board */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        className="relative w-full max-w-6xl mx-auto h-[480px] sm:h-[520px] bg-[#F4EFE6] rounded-sm border border-[#C5A059]/30 shadow-[inset_0_2px_12px_rgba(20,34,74,0.04)] overflow-hidden select-none paper-grain"
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
