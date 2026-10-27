import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import {
  LotusOrnament,
  GoldDividerWithLotus,
  StudioSeal,
  RoyalArrowLeft,
} from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export async function generateStaticParams() {
  const services = await db.getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await db.getServiceBySlug(slug);
  if (!service) return { title: "Discipline Not Found — Charchit Studios" };

  return {
    title: `${service.title} — Charchit Studios`,
    description: service.short_description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, faqs, allServices] = await Promise.all([
    db.getServiceBySlug(slug),
    db.getFAQs(slug),
    db.getServices(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture">
        {/* Back Link & Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8E7036] hover:text-[#14224A] transition-colors"
            >
              <RoyalArrowLeft className="w-4 h-4 text-[#C5A059]" />
              <span>All Disciplines</span>
            </Link>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold block">
                CRAFT DISCIPLINE
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14224A] leading-tight">
                {service.title}
              </h1>
              {service.subtitle && (
                <p className="font-serif italic text-lg sm:text-xl text-[#8E7036]">
                  {service.subtitle}
                </p>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#585C6D] leading-relaxed font-sans max-w-2xl">
              {service.short_description}
            </p>
          </div>
        </section>

        {/* Core Content Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-14">
            {/* 1. Business Problem */}
            {service.business_problem && (
              <div className="p-8 bg-[#F4EFE6] border border-[#DCCEBA] space-y-3">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <LotusOrnament className="w-4 h-4" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[#14224A]">
                    The Enterprise Challenge We Address
                  </h3>
                </div>
                <p className="text-sm text-[#585C6D] leading-relaxed font-sans">
                  {service.business_problem}
                </p>
              </div>
            )}

            {/* 2. Approach & Deliverables */}
            {service.approach_and_deliverables && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#14224A]">
                  Our Studio Approach & Deliverables
                </h3>
                <p className="text-sm sm:text-base text-[#14224A]/85 leading-relaxed font-sans">
                  {service.approach_and_deliverables}
                </p>
              </div>
            )}

            {/* 3. Expected Client Inputs */}
            {service.client_inputs_needed && (
              <div className="p-6 bg-[#FAF7F2] border border-[#C5A059]/40 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7036] font-semibold block">
                  COLLABORATIVE PREREQUISITES
                </span>
                <h4 className="font-serif text-xl text-[#14224A]">
                  What We Require From Your Team
                </h4>
                <p className="text-xs sm:text-sm text-[#585C6D] leading-relaxed font-sans">
                  {service.client_inputs_needed}
                </p>
              </div>
            )}

            {/* 4. FAQs if configured */}
            {faqs.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-[#E0D4C0]">
                <h3 className="font-serif text-2xl text-[#14224A]">
                  Frequently Addressed Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] space-y-2">
                      <h4 className="font-serif text-lg text-[#14224A]">{faq.question}</h4>
                      <p className="text-xs text-[#585C6D] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="p-8 sm:p-12 bg-[#080E21] text-[#FAF7F2] jharokha-arch text-center space-y-6 shadow-2xl">
              <StudioSeal year="2026" city="BHARAT" className="w-20 h-20 mx-auto" />
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
                  COMMISSION THIS DISCIPLINE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2]">
                  Elevate Your Business With {service.title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/70 max-w-md mx-auto leading-relaxed">
                  Every commission begins with a thoughtful discovery dialogue.
                  Submit your brief or speak directly with our creative directors.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-[#C5A059] text-[#060B18] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#DEB868] transition-colors shadow-md"
                >
                  Initiate Brief
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-3 border border-[#FAF7F2]/40 text-[#FAF7F2] text-xs uppercase tracking-[0.2em] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
                >
                  Explore Other Disciplines
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
