import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import {
  LotusOrnament,
  GoldDividerWithLotus,
  RoyalShankhaIcon,
  RoyalNyayaIcon,
} from "@/components/ui/Ornaments";

export const metadata = {
  title: "Terms of Engagement — Charchit Studios",
  description: "Terms and conditions governing studio commissions with Charchit Studios.",
};

export default function TermsPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span>ENGAGEMENT CANONS</span>
              <LotusOrnament className="w-3.5 h-3.5" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#14224A]">
              Terms of Engagement
            </h1>
            <p className="text-xs sm:text-sm text-[#585C6D]">
              Last updated: October 2026 // Commercial Principles of Charchit Studios
            </p>
          </div>

          {/* Legal Notice Banner */}
          <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3">
            <RoyalShankhaIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block uppercase tracking-wider text-[11px]">
                Owner Review Notice
              </span>
              <p className="leading-relaxed mt-0.5">
                These terms govern the use of this digital platform and the initial commission
                intake. Formal commercial contracts, milestone schedules, and intellectual
                property assignments are established under separate, signed Master Services
                Agreements (MSA) tailored to each commission.
              </p>
            </div>
          </div>

          <div className="prose prose-slate text-[#14224A]/90 text-sm leading-relaxed space-y-8 font-sans">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                1. Nature of the Digital Craft House
              </h2>
              <p>
                <strong>Charchit Studios</strong> operates as an independent digital craft
                house. Submission of a project brief or contact inquiry constitutes an
                invitation to treat and does not create a binding commercial obligation until
                a bespoke Master Services Agreement has been formally countersigned.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                2. Intellectual Property & Brand Assets
              </h2>
              <p>
                All brand identity marks, typography specimens, custom SVG ornaments, and
                authored essays hosted on this website are the proprietary intellectual property
                of Charchit Studios. Client brand assets shared during discovery remain the
                exclusive property of the respective client.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                3. Commission Estimates & Scope
              </h2>
              <p>
                Budget brackets indicated on the Project Brief Builder are guidance ranges
                intended to align creative depth with commercial expectations. They do not
                constitute automated quotes or final commercial contracts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#14224A]">
                4. Governing Jurisdiction
              </h2>
              <p>
                Studio engagements are governed by the commercial laws of Bharat (India), with
                disputes subject to the exclusive jurisdiction of the competent courts in
                New Delhi, unless specified otherwise in a tailored agreement.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
