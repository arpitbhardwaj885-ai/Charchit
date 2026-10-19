import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WorkGallery } from "@/components/work/WorkGallery";
import { db } from "@/lib/store";

export const metadata = {
  title: "Selected Work — Charchit Studios",
  description:
    "Explore the curated repository of digital flagships, brand systems, and editorial web experiences from Charchit Studios.",
};

export default async function WorkPage() {
  const projects = await db.getProjects();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] text-[#14224A] relative overflow-hidden wasli-texture pt-32 pb-24 sm:pt-40 sm:pb-32">
        <WorkGallery projects={projects} showHeading={true} />
      </main>

      <Footer />
    </>
  );
}
