import React from "react";
import Image from "next/image";
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
  RoyalKalaChakraIcon,
} from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export async function generateStaticParams() {
  const articles = await db.getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db.getArticleBySlug(slug);
  if (!article) return { title: "Essay Not Found — Charchit Studios" };

  return {
    title: `${article.title} — The Journal — Charchit Studios`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture">
        {/* Header */}
        <section className="pt-32 pb-14 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8E7036] hover:text-[#14224A] transition-colors"
            >
              <RoyalArrowLeft className="w-4 h-4 text-[#C5A059]" />
              <span>Back to The Journal</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8E7036]">
              <span className="px-2.5 py-1 bg-[#F4EFE6] border border-[#DCCEBA] uppercase tracking-wider text-[#14224A] font-semibold">
                {article.category_name}
              </span>
              <span className="flex items-center gap-1">
                <RoyalKalaChakraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                {article.reading_time_minutes} min read
              </span>
              <span>•</span>
              <span>
                {new Date(article.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14224A] leading-tight">
              {article.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-[#585C6D] leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* Cover Asset */}
        {article.cover_image && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-16 relative z-10">
            <div className="relative aspect-[16/9] w-full bg-[#E9E0CE] border border-[#C5A059]/40 shadow-xl overflow-hidden">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1000px"
              />
            </div>
          </section>
        )}

        {/* Essay Body */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg text-[#14224A]/90 font-sans leading-relaxed space-y-6 text-sm sm:text-base">
              {article.content.split("\n\n").map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Author / Studio Desk Signoff */}
            <div className="mt-16 pt-8 border-t border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F4EFE6] p-6 border border-[#DCCEBA]">
              <div className="flex items-center gap-4">
                <StudioSeal year="2026" city="BHARAT" className="w-16 h-16 shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E7036] font-semibold">
                    AUTHORED BY
                  </span>
                  <h4 className="font-serif text-lg text-[#14224A]">
                    Charchit Studios Editorial Desk
                  </h4>
                  <p className="text-xs text-[#585C6D]">
                    Discourses on Indian craftsmanship, typography, and web engineering.
                  </p>
                </div>
              </div>

              <Link
                href="/journal"
                className="px-4 py-2 border border-[#14224A] text-xs uppercase tracking-wider text-[#14224A] hover:bg-[#14224A] hover:text-[#FAF7F2] transition-colors shrink-0"
              >
                More Essays
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
