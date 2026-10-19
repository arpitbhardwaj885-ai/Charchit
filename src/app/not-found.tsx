import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LotusOrnament, StudioSeal, GoldDividerWithLotus } from "@/components/ui/Ornaments";

export const metadata = {
  title: "Archival Plate Not Found — Charchit Studios",
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] flex items-center justify-center px-4 py-32 wasli-texture">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#C5A059]/40 p-8 sm:p-12 text-center space-y-6 shadow-xl relative">
          <StudioSeal year="2026" city="BHARAT" className="w-24 h-24 mx-auto" />

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold block">
              ERROR 404 // DISCOURSE VOID
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#14224A]">
              Archival Plate Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[#585C6D] leading-relaxed">
              The page or archival manuscript you requested does not exist or has been
              relocated within the studio ledger.
            </p>
          </div>

          <GoldDividerWithLotus />

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
            >
              <span>Return to Flagship</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
