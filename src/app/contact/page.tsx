import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ProjectBriefBuilder } from "@/components/features/ProjectBriefBuilder";
import { DigitalCallingCard } from "@/components/features/DigitalCallingCard";
import { ContactFormClient } from "@/components/features/ContactFormClient";
import { LotusOrnament, GoldDividerWithLotus, StudioSeal } from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export const metadata = {
  title: "Commission & Inquiries — Charchit Studios",
  description:
    "Initiate a dialogue with Charchit Studios. Build an interactive project brief or contact our studio directors directly.",
};

export default async function ContactPage() {
  const settings = await db.getSettings();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture">
        {/* Editorial Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span>THE STUDIO LEDGER</span>
              <LotusOrnament className="w-3.5 h-3.5" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#14224A] font-normal leading-tight">
              Initiate a Commission Dialogue
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-[#8E7036] max-w-2xl mx-auto">
              “Make your business worth talking about.”
            </p>

            <p className="text-xs sm:text-sm text-[#585C6D] max-w-xl mx-auto font-sans leading-relaxed">
              We review every commission inquiry with personal attention. You can use our
              interactive Project Brief Builder below or submit an inquiry directly.
            </p>
          </div>
        </section>

        {/* Section 1: Interactive Project Brief Builder */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          <ProjectBriefBuilder />
        </section>

        {/* Section 2: Direct Inquiry Form & Digital Calling Card */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFE6] border-b border-[#C5A059]/25">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-10 border border-[#DCCEBA] shadow-md">
              <div className="space-y-2 mb-6">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8E7036] font-semibold block">
                  FAST-TRACK INQUIRY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#14224A]">
                  Direct Studio Desk Message
                </h3>
                <p className="text-xs text-[#585C6D]">
                  Prefer a concise message? Send your coordinates directly to our partners.
                </p>
              </div>

              <ContactFormClient />
            </div>

            {/* Right: Digital Calling Card & Studio Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <DigitalCallingCard settings={settings} />

              <div className="p-6 bg-[#FAF7F2] border border-[#C5A059]/30 space-y-3">
                <h4 className="font-serif text-lg text-[#14224A]">
                  Our Commitment to Dialogue
                </h4>
                <p className="text-xs text-[#585C6D] leading-relaxed">
                  We believe in thoughtful communication without aggressive sales tactics.
                  All submitted briefs are preserved securely in our database ledger and
                  answered within 24 to 48 business hours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
