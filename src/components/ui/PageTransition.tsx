"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LotusOrnament, RoyalDiyaIcon, RoyalSatyaIcon } from "@/components/ui/Ornaments";

interface StudioThought {
  sanskrit: string;
  thought: string;
  canon: string;
}

const STUDIO_THOUGHTS: StudioThought[] = [
  {
    sanskrit: "चर्चित // CHARCHIT",
    thought:
      "“An independent web studio designing bespoke digital experiences. We combine thoughtful Indian aesthetics, refined typography, and modern Next.js engineering.”",
    canon: "ABOUT THE STUDIO // REAL WEB CRAFT",
  },
  {
    sanskrit: "सत्यम् // HONEST DESIGN",
    thought:
      "“We don't use prefabricated agency templates or synthetic hype. Every typography scale, grid structure, and code pipeline is built cleanly from scratch.”",
    canon: "ABOUT THE STUDIO // BESPOKE ARCHITECTURE",
  },
  {
    sanskrit: "संवाद // COLLABORATION",
    thought:
      "“An online studio operating directly with founders worldwide. Direct communication with the craftsperson, without agency bureaucracy or middle layers.”",
    canon: "ABOUT THE STUDIO // DIRECT DIALOGUE",
  },
  {
    sanskrit: "गुणवत्ता // ENDURING QUALITY",
    thought:
      "“Great digital products are memorable, lightning-fast, and durable. We build websites designed to command trust and drive organic word of mouth.”",
    canon: "ABOUT THE STUDIO // ATTENTION TO DETAIL",
  },
  {
    sanskrit: "सामर्थ्य // HIGH PERFORMANCE",
    thought:
      "“Clean TypeScript, server-rendered edge speed, responsive layouts, and zero-bloat code. Beautiful on screen, rigorous under the hood.”",
    canon: "ABOUT THE STUDIO // MODERN ENGINEERING",
  },
  {
    sanskrit: "दृष्टिकोण // OUR ETHOS",
    thought:
      "“Make your business worth talking about. True digital presence is earned through distinct identity, clear storytelling, and reliable performance.”",
    canon: "ABOUT THE STUDIO // ENDURING DISTINCTION",
  },
];

export function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentThought, setCurrentThought] = useState<StudioThought>(STUDIO_THOUGHTS[0]);
  const [progress, setProgress] = useState(0);

  const prevPath = useRef(pathname);
  const thoughtIndex = useRef(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startTransition = useCallback(() => {
    // Pick next inspiring reflection about ourselves
    thoughtIndex.current = (thoughtIndex.current + 1) % STUDIO_THOUGHTS.length;
    setCurrentThought(STUDIO_THOUGHTS[thoughtIndex.current]);

    setIsExiting(false);
    setProgress(15);
    setIsTransitioning(true);

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    // Smoothly advance progress up to 88% while route is loading
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          if (progressTimerRef.current) clearInterval(progressTimerRef.current);
          return 88;
        }
        return prev + Math.floor(Math.random() * 8 + 6);
      });
    }, 60);

    // Safety timeout in case navigation is cancelled or hits same route
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      finishTransition();
    }, 1800);
  }, []);

  const finishTransition = useCallback(() => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

    // Complete to 100% to indicate destination page loaded
    setProgress(100);

    // Gracefully unveil the loaded page
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setIsExiting(false);
        setProgress(0);
      }, 350);
    }, 220);
  }, []);

  // Intercept click on internal links so curtain activates IMMEDIATELY
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only internal route links that change the page
      if (
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !href.startsWith("#") &&
        !anchor.getAttribute("download") &&
        anchor.target !== "_blank" &&
        !e.defaultPrevented &&
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        // Only trigger if destination is a different path
        const targetPath = href.split("?")[0].split("#")[0];
        const currentPath = window.location.pathname;

        if (targetPath !== currentPath) {
          startTransition();
        }
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [startTransition]);

  // When pathname changes, Next.js has rendered the new page!
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      finishTransition();
    }
  }, [pathname, finishTransition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  if (!isTransitioning) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] pointer-events-none flex flex-col justify-between overflow-hidden transition-opacity duration-300 ${
        isExiting ? "opacity-0" : "opacity-100 animate-page-curtain"
      }`}
    >
      {/* Top Scalloped Kalamkari Gold Foil Border */}
      <div className="w-full h-8 bg-gradient-to-r from-[#8E7036] via-[#C5A059] to-[#8E7036] flex items-center justify-around overflow-hidden shadow-md">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
          <LotusOrnament key={i} className="w-3.5 h-3.5 text-[#080E21] opacity-75" />
        ))}
      </div>

      {/* Central Regal Royal Indigo Wasli Silk Curtain */}
      <div className="flex-1 bg-[#080E21] wasli-texture flex flex-col items-center justify-center p-6 sm:p-10 text-center relative">
        {/* Background Rotating Sacred Mandala */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-96 sm:w-[500px] h-96 sm:h-[500px] border border-[#C5A059] rounded-full animate-spin-mandala flex items-center justify-center">
            <div className="w-64 sm:w-80 h-64 sm:h-80 border border-[#DEB868]/60 rounded-full" />
          </div>
        </div>

        {/* Content Box with Thought & Seal */}
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Authentic Charchit Studios Brandmark */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-full overflow-hidden border border-[#C5A059]/40 bg-[#FAF7F2] p-2 shadow-2xl flex items-center justify-center">
              <Image
                src="/brand/charchit-logo-transparent.png"
                alt="Charchit Studios"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
          </div>

          {/* Thought / Canon Display */}
          <div className="space-y-3 px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#C5A059]/40 bg-[#FAF7F2]/5">
              <RoyalDiyaIcon className="w-3.5 h-3.5 text-[#DEB868]" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#DEB868] font-mono">
                {currentThought.canon}
              </span>
            </div>

            <div className="font-serif italic text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-relaxed">
              {currentThought.thought}
            </div>

            <span className="block font-serif text-sm text-[#C5A059]/80 tracking-widest pt-1">
              — {currentThought.sanskrit} —
            </span>
          </div>

          {/* Golden Sutra Loading Progress Thread */}
          <div className="w-52 sm:w-72 space-y-2 pt-3">
            <div className="h-[2.5px] w-full bg-[#FAF7F2]/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#8E7036] via-[#DEB868] to-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.9)] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A059]/85 uppercase tracking-widest">
              <span>{progress === 100 ? "ARCHIVE LOADED" : "PREPARING ARCHIVES"}</span>
              <span className="inline-flex items-center gap-1 font-bold">
                {progress === 100 && <RoyalSatyaIcon className="w-2.5 h-2.5 text-[#DEB868]" />}
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scalloped Kalamkari Gold Foil Border */}
      <div className="w-full h-8 bg-gradient-to-r from-[#8E7036] via-[#C5A059] to-[#8E7036] flex items-center justify-around overflow-hidden shadow-md">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
          <LotusOrnament key={i} className="w-3.5 h-3.5 text-[#080E21] opacity-75" />
        ))}
      </div>
    </div>
  );
}
