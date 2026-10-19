import React from "react";
import Link from "next/link";
import { Shield, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LotusOrnament, GoldDividerWithLotus } from "@/components/ui/Ornaments";

export const metadata = {
  title: "Privacy Notice — Charchit Studios",
  description: "Privacy policy and client data handling principles of Charchit Studios.",
};

export default function PrivacyPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span>LEGAL PROTOCOLS</span>
              <LotusOrnament className="w-3.5 h-3.5" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#14224A]">
              Privacy & Data Stewardship Notice
            </h1>
            <p className="text-xs sm:text-sm text-[#585C6D]">
              Last updated: October 2026 // Applicable to Charchit Studios digital engagements
            </p>
          </div>

          {/* Legal Notice Banner as specified in requirements */}
          <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block uppercase tracking-wider text-[11px]">
                Owner Review Notice
              </span>
              <p className="leading-relaxed mt-0.5">
                The following document outlines our studio's actual technical data stewardship
                practices. It is intended to be transparent and operational, but should be
                reviewed by qualified legal counsel to meet specific statutory jurisdictions.
              </p>
            </div>
          </div>

          <div className="prose prose-slate text-[#14224A]/90 text-sm leading-relaxed space-y-8 font-sans">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                1. Core Stewardship Ethos
              </h2>
              <p>
                At <strong>Charchit Studios</strong>, we do not monetize user data, sell contact
                ledgers, or deploy intrusive surveillance cookies. Any information submitted
                through our contact forms or Project Brief Builder is treated as a private
                commercial inquiry.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                2. Information We Receive
              </h2>
              <p>
                We only gather details you intentionally share with us:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li>Your name and business email address for correspondence.</li>
                <li>Enterprise information, industry details, and project objectives.</li>
                <li>Selected craft disciplines, estimated timelines, and budget ranges.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                3. Storage & Protection
              </h2>
              <p>
                Inquiries are persisted into an encrypted PostgreSQL ledger (Supabase) protected
                by strict Row-Level Security (RLS). Public visitors cannot access, inspect, or query
                other clients’ submissions under any circumstance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                4. Data Erasure & Rectification
              </h2>
              <p>
                You may request complete removal of your business inquiry from our studio ledger
                at any time by emailing <strong>namaste@charchitstudios.com</strong> with the
                subject line “Data Archival Removal Request”.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
