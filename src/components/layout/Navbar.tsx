"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LotusOrnament } from "@/components/ui/Ornaments";

const NAV_LINKS = [
  { name: "Studio", href: "/studio" },
  { name: "Services", href: "/services" },
  { name: "Selected Work", href: "/work" },
  { name: "The Craft", href: "/studio#process" },
  { name: "Journal", href: "/journal" },
  { name: "Contact", href: "/contact" },
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
            ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C5A059]/25 shadow-[0_4px_20px_rgba(20,34,74,0.04)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Studio Identity / Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="Charchit Studios Home"
            >
              <div className="relative w-36 sm:w-44 h-12 flex items-center">
                <Image
                  src="/brand/charchit-wordmark.png"
                  alt="Charchit Studios — Estd. 2026"
                  width={240}
                  height={80}
                  priority
                  className="object-contain object-left max-h-11 w-auto"
                />
              </div>
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
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-[#14224A] bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#060B18] shadow-sm tactile-button"
              >
                <span>Commission Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded text-[#14224A] hover:bg-[#E9E0CE]/50 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#14224A]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#14224A]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Editorial Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10 pt-28 md:hidden overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#C5A059] mb-4">
              <LotusOrnament className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">
                THE DIGITAL CRAFT HOUSE
              </span>
            </div>

            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-serif text-3xl text-[#14224A] hover:text-[#C5A059] transition-colors py-1 flex items-center justify-between border-b border-[#E0D4C0]/40"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-sans tracking-widest text-[#8E7036] opacity-60">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#C5A059]/30 space-y-5">
            <p className="font-serif italic text-lg text-[#14224A]/80">
              “Make your business worth talking about.”
            </p>

            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
            >
              <span>Initiate Brief</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
