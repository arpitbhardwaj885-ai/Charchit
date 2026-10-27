import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import {
  LotusOrnament,
  GoldDividerWithLotus,
  StudioSeal,
  RoyalGranthaIcon,
  RoyalDiyaIcon,
  RoyalKalaChakraIcon,
  RoyalArrowUpRight,
} from "@/components/ui/Ornaments";
import { db } from "@/lib/store";

export const metadata = {
  title: "The Journal — Studio Insights & Craft Canons — Charchit Studios",
  description:
    "Essays on Indian design heritage, typography, digital wasli paper, and high-performance digital engineering from Charchit Studios.",
};

export default async function JournalPage() {
  const articles = await db.getArticles();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture pb-20 md:pb-0">
        {/* Editorial Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/25 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold">
              <RoyalGranthaIcon className="w-4 h-4 text-[#C5A059]" />
              <span>THE STUDIO JOURNAL</span>
              <RoyalGranthaIcon className="w-4 h-4 text-[#C5A059]" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#14224A] font-normal leading-tight">
              Essays on Craft, Materiality & Engineering
            </h1>

            <p className="text-sm sm:text-base text-[#585C6D] max-w-2xl mx-auto font-sans leading-relaxed">
              Reflections from our design desk on classical Indian architecture,
              editorial typography, and building enduring digital spaces.
            </p>
          </div>
        </section>

        {/* Article Grid or Empty State */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {articles.length === 0 ? (
              <div className="max-w-2xl mx-auto p-12 bg-[#FAF7F2] border border-[#C5A059]/40 text-center space-y-4 shadow-sm">
                <StudioSeal year="2026" city="BHARAT" className="w-20 h-20 mx-auto" />
                <h3 className="font-serif text-2xl text-[#14224A]">
                  The Journal Ledger is Being Penned
                </h3>
                <p className="text-xs text-[#585C6D] max-w-md mx-auto">
                  Our forthcoming editorial essays on classical typography and
                  architecture are in preparation. Check back shortly.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/journal/${article.slug}`}
                    className="group block bg-[#FAF7F2] border border-[#DCCEBA] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {article.cover_image && (
                        <div className="relative aspect-[16/9] w-full bg-[#E9E0CE] overflow-hidden border-b border-[#DCCEBA]">
                          <Image
                            src={article.cover_image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#14224A] font-semibold border border-[#C5A059]/30">
                            {article.category_name}
                          </div>
                        </div>
                      )}

                      <div className="p-6 sm:p-8 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-[#8E7036] font-mono">
                          <span className="flex items-center gap-1">
                            <RoyalKalaChakraIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                            {article.reading_time_minutes} min read
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(article.published_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <h2 className="font-serif text-2xl sm:text-3xl text-[#14224A] group-hover:text-[#C5A059] transition-colors leading-snug">
                          {article.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-[#585C6D] line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-[#E0D4C0]/50 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#14224A] group-hover:text-[#C5A059]">
                      <span>Read Essay</span>
                      <RoyalArrowUpRight className="w-4 h-4 text-[#C5A059]" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
