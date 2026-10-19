import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LotusOrnament, GoldDividerWithLotus, StudioSeal } from "@/components/ui/Ornaments";
import { db } from "@/lib/store";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await db.getProjectBySlug(slug);
  if (!project) return { title: "Case Study Not Found — Charchit Studios" };

  return {
    title: `${project.title} — Case Study — Charchit Studios`,
    description: project.excerpt,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await db.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture">
        {/* Editorial Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          <div className="max-w-5xl mx-auto space-y-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8E7036] hover:text-[#14224A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Archival Repertory</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8E7036]">
              <span className="px-2.5 py-1 bg-[#F4EFE6] border border-[#DCCEBA] uppercase tracking-wider text-[#14224A] font-semibold">
                {project.category_name}
              </span>
              <span>Year // {project.year}</span>
              {project.client_name && <span>Client // {project.client_name}</span>}
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#14224A] leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#585C6D] max-w-3xl leading-relaxed font-sans">
              {project.excerpt}
            </p>

            {project.live_url && (
              <div className="pt-2">
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
                >
                  <span>Visit Live Flagship</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Featured Cover Asset */}
        {project.cover_image && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-16 relative z-10">
            <div className="relative aspect-[16/9] w-full bg-[#E9E0CE] border border-[#C5A059]/40 shadow-2xl overflow-hidden">
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </section>
        )}

        {/* Case Study Editorial Narrative */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* The Brief & Challenge */}
            {(project.brief || project.challenge) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-[#F4EFE6] border border-[#DCCEBA]">
                {project.brief && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7036] font-semibold block">
                      The Commission Brief
                    </span>
                    <p className="text-xs sm:text-sm text-[#14224A]/90 leading-relaxed font-sans">
                      {project.brief}
                    </p>
                  </div>
                )}
                {project.challenge && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7036] font-semibold block">
                      The Strategic Dilemma
                    </span>
                    <p className="text-xs sm:text-sm text-[#585C6D] leading-relaxed font-sans">
                      {project.challenge}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* The Approach */}
            {project.approach && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <LotusOrnament className="w-4 h-4" />
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#14224A]">
                    The Studio Approach & Architecture
                  </h3>
                </div>
                <div className="text-sm sm:text-base text-[#14224A]/90 leading-relaxed font-sans whitespace-pre-line">
                  {project.approach}
                </div>
              </div>
            )}

            {/* Deliverables Matrix */}
            {project.deliverables?.length > 0 && (
              <div className="p-6 bg-[#FAF7F2] border border-[#C5A059]/40 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7036] font-semibold block">
                  DELIVERABLE SPECIFICATIONS
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-xs bg-[#F4EFE6] text-[#14224A] border border-[#DCCEBA] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div className="p-8 bg-[#080E21] text-[#FAF7F2] border border-[#C5A059]/40 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
                  APPROVED STRATEGIC OUTCOMES
                </span>
                <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed font-sans">
                  {project.outcomes}
                </p>
              </div>
            )}

            {/* End of Case Study CTA */}
            <div className="pt-8 text-center space-y-4">
              <GoldDividerWithLotus />
              <h4 className="font-serif text-2xl text-[#14224A]">
                Inspired by this Case Study?
              </h4>
              <p className="text-xs text-[#585C6D]">
                Discuss how similar craftsmanship can elevate your digital flagship.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-6 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
                >
                  Commission Similar Project
                </Link>
                <Link
                  href="/work"
                  className="px-6 py-2.5 border border-[#14224A] text-[#14224A] text-xs uppercase tracking-widest hover:bg-[#14224A] hover:text-[#FAF7F2] transition-colors"
                >
                  View All Works
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
