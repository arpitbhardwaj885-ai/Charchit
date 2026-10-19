import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";
import { LotusOrnament, StudioSeal } from "@/components/ui/Ornaments";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080E21] text-[#FAF7F2] overflow-hidden">
      {/* Decorative Traditional Toran Border Across the Top */}
      <div className="w-full overflow-hidden opacity-90 h-10 sm:h-12 border-b border-[#C5A059]/30 relative">
        <Image
          src="/brand/charchit-top-border.png"
          alt="Traditional Kalamkari Pattern Border"
          fill
          className="object-cover object-top opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080E21]/20 to-[#080E21]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Studio Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-14">
                <Image
                  src="/brand/charchit-wordmark-light.png"
                  alt="Charchit Studios"
                  width={240}
                  height={80}
                  className="object-contain object-left max-h-12 w-auto"
                />
              </div>
            </Link>

            <p className="font-serif italic text-2xl text-[#E9E0CE] max-w-md leading-relaxed">
              “Make your business worth talking about.”
            </p>

            <p className="text-xs text-[#FAF7F2]/65 leading-relaxed font-sans max-w-sm">
              An independent Indian digital craft house uniting classical
              craftsmanship, editorial typography, and high-performance engineering
              for ambitious businesses worldwide.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <StudioSeal year="2026" city="BHARAT" className="w-20 h-20" />
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                  <Sparkles className="w-3 h-3" />
                  HANDCRAFTED IN BHARAT
                </span>
                <p className="text-xs text-[#FAF7F2]/60">
                  Rooted in heritage. Engineered for the modern web.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-[#C5A059]">
              <LotusOrnament className="w-3.5 h-3.5" />
              <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold">
                Studio Index
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link
                  href="/studio"
                  className="text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
                >
                  Philosophy & Ethos
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
                >
                  Craft Disciplines (Services)
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
                >
                  Selected Work Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/studio#process"
                  className="text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
                >
                  The Fourfold Process
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
                >
                  The Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
                >
                  Commission a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Presence & Direct Inquiries */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-[#C5A059]">
              <LotusOrnament className="w-3.5 h-3.5" />
              <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold">
                Inquiries & Presence
              </h4>
            </div>

            <div className="space-y-3 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#FAF7F2]/50 uppercase tracking-widest">
                    Direct Studio Desk
                  </span>
                  <a
                    href="mailto:namaste@charchitstudios.com"
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    namaste@charchitstudios.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#FAF7F2]/50 uppercase tracking-widest">
                    Studio Locations
                  </span>
                  <span>New Delhi & Mumbai, Bharat</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C5A059]/20">
              <span className="block text-[10px] text-[#FAF7F2]/50 uppercase tracking-widest mb-2">
                Social Archives
              </span>
              <div className="flex items-center gap-4 text-xs">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2]/70 hover:text-[#C5A059] transition-colors flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2]/70 hover:text-[#C5A059] transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2]/70 hover:text-[#C5A059] transition-colors flex items-center gap-1"
                >
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Fine Gold Rules */}
        <div className="mt-16 pt-8 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/50">
          <p>© {currentYear} Charchit Studios. All rights reserved. Estd. 2026.</p>

          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/privacy" className="hover:text-[#C5A059] transition-colors">
              Privacy Notice
            </Link>
            <Link href="/terms" className="hover:text-[#C5A059] transition-colors">
              Terms of Engagement
            </Link>
            <Link
              href="/admin"
              className="text-[#C5A059]/80 hover:text-[#C5A059] transition-colors border-b border-[#C5A059]/30 pb-0.5"
            >
              Curator Portal (Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
