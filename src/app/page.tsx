import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { StudioCanvas } from "@/components/features/StudioCanvas";
import { CraftProcess } from "@/components/features/CraftProcess";
import { WorkGallery } from "@/components/work/WorkGallery";
import {
  LotusOrnament,
  GoldDividerWithLotus,
  StudioSeal,
  RoyalKalamIcon,
  RoyalJharokhaIcon,
  RoyalDiyaIcon,
  RoyalSuryaIcon,
  RoyalArrowUpRight,
  RoyalTaraIcon,
  RoyalChevronRight,
  RoyalCharchitBrandLogo,
} from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export const metadata = {
  title: "Charchit Studios — The Digital Craft House",
  description:
    "Make your business worth talking about. An independent digital craft house uniting classical Indian craftsmanship, editorial typography, and high-performance digital engineering.",
};

export default async function HomePage() {
  const [services, projects, settings] = await Promise.all([
    db.getServices(),
    db.getProjects(),
    db.getSettings(),
  ]);

  const featuredProjects = projects.filter((p) => p.is_featured);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture pb-20 md:pb-0">
        {/* ========================================================= */}
        {/* 1. HERO SECTION: EDITORIAL ART-DIRECTED CROWN */}
        {/* ========================================================= */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          {/* Top Traditional Kalamkari Toran Pattern Frame */}
          <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 overflow-hidden pointer-events-none opacity-40">
            <Image
              src="/brand/charchit-top-border.png"
              alt="Indian Kalamkari Border Pattern"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/50 to-[#FAF7F2]" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
            {/* Studio Badge / Cultural Mark */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C5A059]/40 bg-[#FAF7F2]/90 shadow-xs">
              <LotusOrnament className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#8E7036] font-semibold">
                THE DIGITAL CRAFT HOUSE // ESTD. 2026
              </span>
              <LotusOrnament className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>

            {/* Central Charchit Artwork / Identity Reference */}
            <div className="flex justify-center my-2">
              <div className="relative w-64 sm:w-80 h-24 sm:h-28 flex items-center justify-center">
                <Image
                  src="/brand/charchit-wordmark.png"
                  alt="Charchit Studios Script Wordmark"
                  width={340}
                  height={120}
                  priority
                  className="object-contain max-h-24 w-auto drop-shadow-xs"
                />
              </div>
            </div>

            {/* Primary Headline & Philosophical Tagline */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-normal leading-[1.12] sm:leading-[1.08] text-[#14224A] tracking-tight">
                “Make your business{" "}
                <span className="italic font-normal underline decoration-[#C5A059]/50 underline-offset-8">
                  worth talking about
                </span>
                .”
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-[#585C6D] max-w-2xl mx-auto font-sans leading-relaxed pt-2">
                We combine classical Indian craftsmanship, editorial typography,
                and high-performance digital engineering to build flagship websites
                and brand systems that command cultural prestige.
              </p>
            </div>

            {/* Tactile CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#C5A059] hover:text-[#060B18] shadow-md tactile-button flex items-center justify-center gap-2"
              >
                <span>Commission Studio Brief</span>
                <RoyalArrowUpRight className="w-4 h-4 text-[#DEB868]" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 border border-[#14224A]/40 text-[#14224A] text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:border-[#14224A] hover:bg-[#E9E0CE]/40 flex items-center justify-center gap-2"
              >
                <span>Explore Disciplines</span>
                <RoyalArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>
            </div>

            {/* Mobile Cultural Pillars: 3-Pillar Authentic Indian Heritage Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 sm:pt-6 max-w-4xl mx-auto text-left">
              <div className="p-3.5 sm:p-4 bg-[#FAF7F2] border border-[#C5A059]/40 shadow-xs relative overflow-hidden jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036] text-[9px] font-mono mb-1">
                  <span>DISCIPLINE 01</span>
                  <LotusOrnament className="w-3 h-3 text-[#C5A059]" />
                </div>
                <div className="font-serif text-sm sm:text-base text-[#14224A] font-semibold">शास्त्रीय शिल्प // Craft</div>
                <div className="text-[10px] sm:text-[11px] text-[#585C6D] mt-0.5 leading-snug">Wasli paper, Kalamkari block motifs & gold leaf foil.</div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#FAF7F2] border border-[#C5A059]/40 shadow-xs relative overflow-hidden jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036] text-[9px] font-mono mb-1">
                  <span>DISCIPLINE 02</span>
                  <LotusOrnament className="w-3 h-3 text-[#C5A059]" />
                </div>
                <div className="font-serif text-sm sm:text-base text-[#14224A] font-semibold">संपादकीय भव्यता // Editorial</div>
                <div className="text-[10px] sm:text-[11px] text-[#585C6D] mt-0.5 leading-snug">Jharokha arch framing & classical Cormorant typography.</div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#FAF7F2] border border-[#C5A059]/40 shadow-xs relative overflow-hidden jharokha-corners wasli-texture">
                <div className="flex items-center justify-between text-[#8E7036] text-[9px] font-mono mb-1">
                  <span>DISCIPLINE 03</span>
                  <LotusOrnament className="w-3 h-3 text-[#C5A059]" />
                </div>
                <div className="font-serif text-sm sm:text-base text-[#14224A] font-semibold">आधुनिक निर्माण // Code</div>
                <div className="text-[10px] sm:text-[11px] text-[#585C6D] mt-0.5 leading-snug">High-performance Next.js App Router, Supabase & fluid motion.</div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <GoldDividerWithLotus />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. THE STUDIO CANVAS (SIGNATURE FEATURE 1) */}
        {/* ========================================================= */}
        <section className="border-b border-[#C5A059]/25 bg-[#FAF7F2] relative">
          <StudioCanvas />
        </section>

        {/* ========================================================= */}
        {/* 3. PHILOSOPHY & MANIFESTO SECTION */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25 bg-[#F4EFE6]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Architectural Jharokha Framing */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-8 sm:p-10 bg-[#FAF7F2] jharokha-frame jharokha-arch relative space-y-6 text-center">
                <div className="flex justify-center">
                  <StudioSeal year="2026" city="BHARAT" className="w-24 h-24" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
                    THE STUDIO THESIS
                  </span>
                  <h3 className="font-serif italic text-2xl text-[#14224A]">
                    Digital Wasli & The Handcrafted Web
                  </h3>
                </div>

                <p className="text-xs text-[#585C6D] leading-relaxed font-sans">
                  In classical Indian art, wasli paper was primed with agate stone
                  and layered with patience. We apply this devotion to web design:
                  sculpting bespoke type scales, intentional negative space, and
                  architectural balance.
                </p>

                <div className="pt-2 text-[10px] uppercase tracking-[0.2em] text-[#8E7036] font-medium border-t border-[#C5A059]/30">
                  Uncompromising Standards // Zero Templates
                </div>
              </div>
            </div>

            {/* Right: Core Studio Principles */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                  <RoyalTaraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>CRAFT PHILOSOPHY</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#14224A] leading-tight">
                  Why settle for a template when your vision deserves reverence?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] space-y-2 jharokha-corners wasli-texture">
                  <div className="flex items-center gap-2.5 text-[#C5A059]">
                    <RoyalKalamIcon className="w-5 h-5" />
                    <h4 className="font-serif text-lg font-semibold text-[#14224A]">
                      Handcrafted, Never Generic
                    </h4>
                  </div>
                  <p className="text-xs text-[#585C6D] leading-relaxed">
                    No purple gradient SaaS clones. Every typeface, rule, and margin
                    is art-directed to honor your industry standing.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] space-y-2 jharokha-corners wasli-texture">
                  <div className="flex items-center gap-2.5 text-[#C5A059]">
                    <RoyalJharokhaIcon className="w-5 h-5" />
                    <h4 className="font-serif text-lg font-semibold text-[#14224A]">
                      Rooted In Heritage
                    </h4>
                  </div>
                  <p className="text-xs text-[#585C6D] leading-relaxed">
                    We channel the architectural clarity of Indian jharokhas and
                    textile geometry into responsive, modern digital systems.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] space-y-2 jharokha-corners wasli-texture">
                  <div className="flex items-center gap-2.5 text-[#C5A059]">
                    <RoyalDiyaIcon className="w-5 h-5" />
                    <h4 className="font-serif text-lg font-semibold text-[#14224A]">
                      Conversation as Currency
                    </h4>
                  </div>
                  <p className="text-xs text-[#585C6D] leading-relaxed">
                    The Sanskrit root of 'Charchit' is discourse. We build websites
                    that people naturally share, reference, and admire.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] space-y-2 jharokha-corners wasli-texture">
                  <div className="flex items-center gap-2.5 text-[#C5A059]">
                    <RoyalSuryaIcon className="w-5 h-5" />
                    <h4 className="font-serif text-lg font-semibold text-[#14224A]">
                      High-Yield Engineering
                    </h4>
                  </div>
                  <p className="text-xs text-[#585C6D] leading-relaxed">
                    Next.js App Router, sub-second load times, headless database
                    integrity, and accessibility that never fails.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. STUDIO DISCIPLINES (SERVICES OVERVIEW) */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                <RoyalTaraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>STUDIO DISCIPLINES</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#14224A]">
                Disciplines of the Digital Craft House
              </h2>
              <p className="text-xs sm:text-sm text-[#585C6D] font-sans">
                Comprehensive, end-to-end execution across five core areas of digital excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-[#FAF7F2] border border-[#DCCEBA] hover:border-[#C5A059] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E0D4C0] pb-3">
                      <span className="text-xs font-mono font-medium text-[#8E7036]">
                        Discipline 0{index + 1}
                      </span>
                      <LotusOrnament className="w-3.5 h-3.5 text-[#C5A059]" />
                    </div>

                    <h3 className="font-serif text-2xl text-[#14224A] group-hover:text-[#C5A059] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-[#585C6D] leading-relaxed">
                      {service.short_description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E0D4C0]/60 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs uppercase tracking-widest text-[#14224A] font-semibold hover:text-[#C5A059] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Examine Approach</span>
                      <RoyalChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#14224A] text-[#14224A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#14224A] hover:text-[#FAF7F2] transition-colors shadow-xs tactile-button"
              >
                <span>View Full Disciplines Portfolio</span>
                <RoyalArrowUpRight className="w-4 h-4 text-[#C5A059]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. THE CRAFT PROCESS (SIGNATURE FEATURE 3) */}
        {/* ========================================================= */}
        <CraftProcess />

        {/* ========================================================= */}
        {/* 6. SELECTED WORK ARCHIVE (SIGNATURE FEATURE 4) */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-28 border-b border-[#C5A059]/25 bg-[#FAF7F2]">
          <WorkGallery
            projects={featuredProjects.length > 0 ? featuredProjects : projects}
          />
        </section>

        {/* ========================================================= */}
        {/* 7. CONVERSION SECTION: COMMISSION YOUR BRIEF */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#080E21] text-[#FAF7F2] relative overflow-hidden">
          {/* Subtle Toran Border in Dark Indigo */}
          <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden opacity-30 pointer-events-none">
            <Image
              src="/brand/charchit-top-border.png"
              alt="Indigo Toran"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#C5A059] font-medium">
              <RoyalTaraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>THE INVITATION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal leading-tight">
              Ready to create a digital presence{" "}
              <span className="italic text-[#E9E0CE]">worth talking about</span>?
            </h2>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-xl mx-auto font-sans leading-relaxed">
              We take on a limited number of commissions each quarter to preserve
              the depth and fidelity of our craft. Initiate an inquiry or outline
              your scope with our interactive brief builder.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] text-[#060B18] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#DEB868] transition-colors shadow-lg"
              >
                Initiate Project Brief
              </Link>
              <a
                href={`mailto:${settings.studio_email}`}
                className="w-full sm:w-auto px-8 py-3.5 border border-[#FAF7F2]/30 text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                Direct Studio Desk
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
