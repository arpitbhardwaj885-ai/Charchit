import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LotusOrnament, GoldDividerWithLotus } from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export const metadata = {
  title: "Craft Disciplines & Services — Charchit Studios",
  description:
    "Explore the five craft disciplines of Charchit Studios: Website Design & Development, Content Creation, Digital Marketing, Lead Generation, and Business Automation.",
};

export default async function ServicesPage() {
  const services = await db.getServices();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture">
        {/* Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span>THE FIVE DISCIPLINES</span>
              <LotusOrnament className="w-3.5 h-3.5" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#14224A] font-normal leading-tight">
              Bespoke Digital Disciplines
            </h1>

            <p className="text-sm sm:text-base text-[#585C6D] max-w-2xl mx-auto font-sans">
              Each discipline is approached with classical rigor and modern technical depth.
              We do not offer commodity packages; every engagement is tailored to your brand’s commercial ambition.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#DCCEBA] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 space-y-3">
                    <span className="text-xs font-mono font-semibold text-[#8E7036] tracking-wider">
                      Discipline 0{index + 1}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#14224A]">
                      {service.title}
                    </h2>
                    {service.subtitle && (
                      <p className="font-serif italic text-sm text-[#8E7036]">
                        {service.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-sm text-[#14224A]/85 leading-relaxed font-sans">
                      {service.short_description}
                    </p>

                    {service.business_problem && (
                      <div className="p-4 bg-[#F4EFE6] border-l-2 border-[#C5A059] space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E7036] font-semibold block">
                          The Enterprise Dilemma Addressed
                        </span>
                        <p className="text-xs text-[#585C6D] leading-relaxed">
                          {service.business_problem}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#E0D4C0]">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#14224A] hover:text-[#C5A059] transition-colors"
                      >
                        <span>Examine Approach & Deliverables</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/contact"
                        className="px-5 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
                      >
                        Commission This Discipline
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
