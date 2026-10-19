"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, FolderArchive, Layers, Plus } from "lucide-react";
import { Project } from "@/lib/types";
import { LotusOrnament, GoldDividerWithLotus, StudioSeal } from "@/components/ui/Ornaments";

interface WorkGalleryProps {
  projects: Project[];
  showHeading?: boolean;
}

export function WorkGallery({ projects, showHeading = true }: WorkGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Works" },
    { id: "Digital Flagships", name: "Digital Flagships" },
    { id: "Brand Systems", name: "Brand Systems" },
    { id: "Editorial Platforms", name: "Editorial Platforms" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category_name === selectedCategory);

  return (
    <div className="w-full">
      {showHeading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARCHIVAL REPERTORY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#14224A]">
            Selected Works
          </h2>
          <p className="text-xs sm:text-sm text-[#585C6D] mt-2 max-w-xl mx-auto font-sans">
            Bespoke web architecture, digital flagships, and identity systems
            curated for discerning enterprises.
          </p>

          {/* Category Filter Tabs */}
          {projects.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#14224A] text-[#FAF7F2] border border-[#C5A059] font-medium shadow-sm"
                      : "bg-[#FAF7F2] text-[#14224A] border border-[#DCCEBA] hover:border-[#C5A059]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Grid or Honest Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          /* Intentional Editorial Empty State (Strict No Dummy Data Rule) */
          <div className="max-w-3xl mx-auto my-12 p-8 sm:p-14 bg-[#FAF7F2] border border-[#C5A059]/40 text-center space-y-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            <div className="mx-auto flex justify-center">
              <StudioSeal year="2026" city="BHARAT" className="w-20 h-20" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
                ARCHIVAL CURATION IN PROGRESS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#14224A]">
                The Archival Ledger is Being Prepared
              </h3>
              <p className="text-xs sm:text-sm text-[#585C6D] max-w-md mx-auto leading-relaxed">
                We believe in total authenticity. In accordance with our studio ethos, we do
                not publish fabricated case studies or synthetic client testimonials.
                Our inaugural commissions are actively under production.
              </p>
            </div>

            <GoldDividerWithLotus />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/studio#process"
                className="px-5 py-2.5 border border-[#14224A] text-[#14224A] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#14224A] hover:text-[#FAF7F2] transition-colors"
              >
                Inspect Craft Process
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
              >
                Commission Inaugural Project
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Real Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group block bg-[#FAF7F2] border border-[#DCCEBA] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
              >
                {/* Image Cover */}
                <div className="relative aspect-[4/3] bg-[#E9E0CE] overflow-hidden">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#8E7036] bg-[#F4EFE6]">
                      <FolderArchive className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-[11px] uppercase tracking-widest font-mono">
                        Plate // {project.category_name}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#14224A] font-semibold border border-[#C5A059]/30">
                    {project.category_name}
                  </div>

                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#14224A] text-[#FAF7F2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8E7036]">
                    <span>{project.client_name || "Confidential Partner"}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#14224A] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#585C6D] line-clamp-2 leading-relaxed">
                    {project.excerpt}
                  </p>

                  {project.deliverables?.length > 0 && (
                    <div className="pt-3 border-t border-[#E0D4C0] flex flex-wrap gap-1.5">
                      {project.deliverables.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#F4EFE6] text-[#14224A] border border-[#DCCEBA]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
