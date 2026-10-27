import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CraftProcess } from "@/components/features/CraftProcess";
import { StudioScrollEffects } from "@/components/studio/StudioScrollEffects";
import {
  LotusOrnament,
  GoldDividerWithLotus,
  StudioSeal,
  RoyalKalamIcon,
  RoyalDiyaIcon,
  RoyalMudrikaIcon,
  RoyalChhatriIcon,
} from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export const metadata = {
  title: "Studio & Philosophy — Charchit Studios",
  description:
    "The story, ethos, and principles of Charchit Studios. Uniting classical Indian craftsmanship with modern digital engineering.",
};

export default async function StudioPage() {
  const settings = await db.getSettings();

  return (
    <>
      <CustomCursor />
      <StudioScrollEffects />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture pb-20 md:pb-0">
        {/* Editorial Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span>THE STUDIO ORIGIN & ETHOS</span>
              <LotusOrnament className="w-3.5 h-3.5" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#14224A] font-normal leading-tight">
              An Independent Craft House Rooted in Discourse & Devotion
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-[#8E7036] max-w-2xl mx-auto">
              “To be <span className="font-semibold text-[#14224A]">Charchit</span> is to be remembered through word of mouth, celebrated in discourse, and enduring in impression.”
            </p>
          </div>
        </section>

        {/* Studio Origin Story & Editorial Columns */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 space-y-6">
              <div className="p-8 bg-[#F4EFE6] border border-[#C5A059]/40 jharokha-arch text-center space-y-4">
                <div className="relative w-44 h-16 mx-auto">
                  <Image
                    src="/brand/charchit-wordmark.png"
                    alt="Charchit Studios"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-serif text-2xl text-[#14224A]">
                  The Meaning of Charchit
                </h3>
                <p className="text-xs text-[#585C6D] leading-relaxed font-sans text-left">
                  In Sanskrit and Hindi, <span className="font-semibold text-[#14224A]">चर्चित (Charchit)</span> means that which is spoken of, widely discussed, and celebrated for its distinction.
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-widest text-[#8E7036] border-t border-[#DCCEBA]">
                  Online Web Studio // Estd. 2026
                </div>
              </div>

              <div className="p-6 bg-[#080E21] text-[#FAF7F2] border border-[#C5A059]/30 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A059] font-medium block">
                  DIGITAL & ONLINE STUDIO MODEL
                </span>
                <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                  Charchit Studios operates entirely online across the modern web. We do not maintain physical corporate offices—we collaborate directly with visionary founders worldwide to design and engineer bespoke web flagships.
                </p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6 text-sm text-[#14224A]/90 leading-relaxed font-sans">
              <h2 className="font-serif text-3xl text-[#14224A]">
                The Convergence of Two Traditions
              </h2>

              <p>
                The digital web has largely become a landscape of prefabricated templates.
                Businesses spending millions on their physical retail or executive offices settle
                for websites that look identical to a hundred others.
              </p>

              <p>
                <strong>Charchit Studios</strong> was founded to offer an alternative: a digital
                craft house that views web engineering through the lens of Indian artistic heritage.
                We look to the patience of <em>wasli</em> papermakers, the geometry of Rajasthani
                <em>jharokhas</em>, the restraint of Mughal calligraphic margins, and the vibrant
                vitality of hand block-printing.
              </p>

              <p>
                Yet, we are equally rigorous technologists. Classical proportion is paired with
                modern Next.js architecture, edge rendering, accessible semantics, and
                sub-second response times. The result is a digital experience that feels warm,
                tangible, and undeniably prestigious.
              </p>

              <div className="pt-4 border-t border-[#C5A059]/30">
                <GoldDividerWithLotus title="Studio Principles" />
              </div>
            </div>
          </div>
        </section>

        {/* The 4 Principles Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25 bg-[#F4EFE6]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                FOUNDATIONAL CANONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#14224A]">
                Our Four Canons of Craft
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-[#FAF7F2] border border-[#DCCEBA] space-y-3 jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036]">
                  <span className="text-xs font-mono font-medium">Canon 01 // साधना</span>
                  <RoyalKalamIcon className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-2xl text-[#14224A]">
                  Handcrafted Devotion Over Assembly Lines
                </h3>
                <p className="text-xs text-[#585C6D] leading-relaxed">
                  Every typography scale, grid ratio, and interactive transition is selected
                  specifically for the commission. We do not use turnkey agency templates.
                </p>
              </div>

              <div className="p-8 bg-[#FAF7F2] border border-[#DCCEBA] space-y-3 jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036]">
                  <span className="text-xs font-mono font-medium">Canon 02 // स्पर्श</span>
                  <RoyalDiyaIcon className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-2xl text-[#14224A]">
                  Tactility in a Virtual Medium
                </h3>
                <p className="text-xs text-[#585C6D] leading-relaxed">
                  A digital interface should stimulate the senses. Through paper grain, ink
                  press states, and architectural framing, we evoke physical materiality.
                </p>
              </div>

              <div className="p-8 bg-[#FAF7F2] border border-[#DCCEBA] space-y-3 jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036]">
                  <span className="text-xs font-mono font-medium">Canon 03 // सत्य</span>
                  <RoyalMudrikaIcon className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-2xl text-[#14224A]">
                  Honesty in Architecture & Discourse
                </h3>
                <p className="text-xs text-[#585C6D] leading-relaxed">
                  We believe truth is the highest form of luxury. No synthetic metrics, no
                  dark patterns, and no inflated promises.
                </p>
              </div>

              <div className="p-8 bg-[#FAF7F2] border border-[#DCCEBA] space-y-3 jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036]">
                  <span className="text-xs font-mono font-medium">Canon 04 // सामर्थ्य</span>
                  <RoyalChhatriIcon className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-2xl text-[#14224A]">
                  Performant Endurance
                </h3>
                <p className="text-xs text-[#585C6D] leading-relaxed">
                  Beauty must never compromise utility. Our digital systems load instantly,
                  respect accessibility standards, and function reliably across all screens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Anchor Section */}
        <CraftProcess />

        {/* CTA */}
        <section className="py-20 px-4 text-center bg-[#FAF7F2]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#14224A]">
              Engage the Studio
            </h3>
            <p className="text-xs sm:text-sm text-[#585C6D]">
              Whether seeking a full digital flagship or an editorial brand system, we welcome your inquiry.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
              >
                Commission an Inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
