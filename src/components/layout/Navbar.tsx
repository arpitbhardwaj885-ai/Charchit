"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LotusOrnament,
  StudioSeal,
  RoyalKalashIcon,
  RoyalJharokhaIcon,
  RoyalChhatriIcon,
  RoyalGranthaIcon,
  RoyalArrowUpRight,
  RoyalCharchitBrandLogo,
  RoyalPatraIcon,
} from "@/components/ui/Ornaments";

const NAV_LINKS = [
  { name: "Studio", sanskrit: "शिल्प", href: "/studio" },
  { name: "Services", sanskrit: "सेवाएं", href: "/services" },
  { name: "Selected Work", sanskrit: "कृतियाँ", href: "/work" },
  { name: "The Craft", sanskrit: "प्रक्रिया", href: "/studio#process" },
  { name: "Journal", sanskrit: "पत्रिका", href: "/journal" },
  { name: "Contact", sanskrit: "संवाद", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C5A059]/25 shadow-[0_4px_20px_rgba(20,34,74,0.04)] py-2.5 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        {/* Subtle Traditional Indian Toran Gold Rim on Mobile */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Studio Identity / Logo with Royal Indian Luxury Finishing */}
            <Link
              href="/"
              className="group flex items-center transition-opacity hover:opacity-95"
              aria-label="Charchit Studios Home"
            >
              <RoyalCharchitBrandLogo variant="dark" showTagline={true} />
            </Link>

            {/* Desktop Editorial Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 py-1 ${
                      isActive
                        ? "text-[#14224A] font-semibold"
                        : "text-[#14224A]/75 hover:text-[#14224A]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/charchit.studios?rpxt=MW5rNDh0Z3R1ZTZnMg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#14224A]/75 hover:text-[#C5A059] transition-colors font-mono tracking-wider px-2 py-1"
                title="Follow on Instagram"
              >
                <span>Instagram</span>
                <RoyalArrowUpRight className="w-3 h-3 text-[#C5A059]" />
              </a>

              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-[#14224A] bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#060B18] shadow-sm tactile-button"
              >
                <span>Commission Brief</span>
                <RoyalArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>

              {/* Bespoke Mobile Indian Medallion Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative flex items-center gap-2 px-3 py-1.5 border border-[#C5A059]/60 bg-[#FAF7F2] shadow-xs active:scale-95 transition-transform"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#14224A] font-semibold">
                  {mobileMenuOpen ? "Close" : "Menu"}
                </span>
                {mobileMenuOpen ? (
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#14224A]" stroke="currentColor" strokeWidth="1.5">
                    <line x1="3" y1="3" x2="13" y2="13" strokeLinecap="round" />
                    <line x1="13" y1="3" x2="3" y2="13" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#14224A]" stroke="currentColor" strokeWidth="1.5">
                    <line x1="2" y1="4" x2="14" y2="4" strokeLinecap="round" />
                    <line x1="4" y1="8" x2="14" y2="8" strokeLinecap="round" />
                    <line x1="2" y1="12" x2="14" y2="12" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* FULLSCREEN MOBILE EDITORIAL PAVILION (ROYAL INDIAN SALON) */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#080E21] text-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10 pt-24 md:hidden overflow-y-auto animate-in fade-in zoom-in-95 duration-200 wasli-texture">
          {/* Background Rotating Jaali Mandala Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
            <div className="w-[120vw] h-[120vw] border border-[#C5A059] rounded-full animate-spin-mandala flex items-center justify-center">
              <div className="w-[80vw] h-[80vw] border border-[#C5A059]/40 rounded-full" />
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-4">
              <div className="flex items-center gap-2">
                <LotusOrnament className="w-4 h-4 text-[#C5A059]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                  THE DIGITAL CRAFT HOUSE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 border border-[#C5A059]/40 text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="3" x2="13" y2="13" strokeLinecap="round" />
                  <line x1="13" y1="3" x2="3" y2="13" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Menu Links with Sanskrit Cultural Typography */}
            <nav className="flex flex-col space-y-3 pt-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`py-2 px-3 border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#14224A] border-[#C5A059] text-[#FAF7F2]"
                        : "border-[#C5A059]/20 hover:border-[#C5A059]/50 hover:bg-[#14224A]/40 text-[#FAF7F2]/90"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-[#C5A059]/70">
                        0{idx + 1}
                      </span>
                      <span className="font-serif text-2xl tracking-wide">
                        {link.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-serif italic text-sm text-[#C5A059]/80">
                        {link.sanskrit}
                      </span>
                      <RoyalArrowUpRight className="w-4 h-4 text-[#C5A059] opacity-75" />
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Cultural Mark & Commission Button */}
          <div className="relative z-10 pt-6 border-t border-[#C5A059]/30 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#C5A059]/80 font-mono">
              <span>ONLINE WEB // ESTD. 2026</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ACCEPTING COMMISSIONS
              </span>
            </div>

            {/* Direct Studio Desk Email & Instagram Access */}
            <div className="grid grid-cols-1 gap-2 pt-1 font-mono text-xs">
              <a
                href="mailto:arpitbhardwaj885@gmail.com"
                className="flex items-center justify-between p-2.5 bg-[#FAF7F2]/5 border border-[#C5A059]/30 text-[#FAF7F2] hover:border-[#DEB868] transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <RoyalPatraIcon className="w-3.5 h-3.5 text-[#DEB868] shrink-0" />
                  <span className="truncate text-[11px]">arpitbhardwaj885@gmail.com</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#DEB868] shrink-0">Email Desk</span>
              </a>

              <a
                href="https://www.instagram.com/charchit.studios?rpxt=MW5rNDh0Z3R1ZTZnMg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#FAF7F2]/5 border border-[#C5A059]/30 text-[#FAF7F2] hover:border-[#DEB868] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <RoyalArrowUpRight className="w-3.5 h-3.5 text-[#DEB868] shrink-0" />
                  <span className="text-[11px]">@charchit.studios</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#DEB868] shrink-0">Instagram</span>
              </a>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#C5A059] text-[#080E21] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#DEB868] transition-colors shadow-lg shadow-[#C5A059]/20"
            >
              <span>Initiate Studio Brief</span>
              <RoyalArrowUpRight className="w-4 h-4 text-[#080E21]" />
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FLOATING MOBILE ACTION DOCK (ROYAL INDIAN FINISH) */}
      {/* ========================================================= */}
      <aside
        aria-label="Mobile quick actions"
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 mobile-action-dock py-2 px-3 flex items-center justify-around shadow-2xl rounded-full"
      >
        <Link
          href="/services"
          className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider text-[#14224A]/80 hover:text-[#C5A059] transition-colors py-1 px-2"
        >
          <RoyalKalashIcon className="w-4 h-4 text-[#C5A059]" />
          <span>Services</span>
        </Link>

        <Link
          href="/work"
          className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider text-[#14224A]/80 hover:text-[#C5A059] transition-colors py-1 px-2"
        >
          <RoyalJharokhaIcon className="w-4 h-4 text-[#C5A059]" />
          <span>Work</span>
        </Link>

        {/* Highlighted Commission Button in Dock */}
        <Link
          href="/contact"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#14224A] text-[#FAF7F2] rounded-full border border-[#C5A059]/60 shadow-md active:scale-95 transition-transform"
        >
          <LotusOrnament className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#DEB868]">
            Brief
          </span>
        </Link>

        <Link
          href="/studio"
          className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider text-[#14224A]/80 hover:text-[#C5A059] transition-colors py-1 px-2"
        >
          <RoyalChhatriIcon className="w-4 h-4 text-[#C5A059]" />
          <span>Studio</span>
        </Link>

        <Link
          href="/journal"
          className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider text-[#14224A]/80 hover:text-[#C5A059] transition-colors py-1 px-2"
        >
          <RoyalGranthaIcon className="w-4 h-4 text-[#C5A059]" />
          <span>Journal</span>
        </Link>
      </aside>
    </>
  );
}

