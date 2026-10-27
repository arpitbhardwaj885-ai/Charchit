"use client";

import React, { useState } from "react";
import {
  LotusOrnament,
  StudioSeal,
  RoyalPatraIcon,
  RoyalSthalaIcon,
  RoyalPattikaIcon,
  RoyalSatyaIcon,
  RoyalDownloadIcon,
  RoyalArrowUpRight,
} from "@/components/ui/Ornaments";
import { SiteSettings } from "@/lib/types";

export function DigitalCallingCard({ settings }: { settings: SiteSettings }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.studio_email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${settings.studio_name}
ORG:${settings.studio_name}
TITLE:The Digital Craft House
EMAIL;TYPE=PREF,INTERNET:${settings.studio_email}
TEL;TYPE=WORK,VOICE:${settings.studio_phone}
ADR;TYPE=WORK:;;${settings.studio_location};;;Bharat
NOTE:${settings.tagline}
URL:${settings.instagram_url || "https://charchitstudios.com"}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "charchit-studios.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#FAF7F2] border border-[#C5A059]/40 p-6 sm:p-8 shadow-xl relative overflow-hidden jharokha-corners wasli-texture">
      {/* Decorative Top Hairline */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#14224A] via-[#C5A059] to-[#14224A]" />

      <div className="text-center space-y-4">
        {/* Seal / Logo */}
        <div className="flex justify-center">
          <StudioSeal year="2026" city="BHARAT" className="w-20 h-20" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
            OFFICIAL DIGITAL CALLING CARD
          </span>
          <h4 className="font-serif text-2xl text-[#14224A]">
            {settings.studio_name}
          </h4>
          <p className="font-serif italic text-sm text-[#8E7036]">
            “{settings.tagline}”
          </p>
        </div>

        {/* Coordinates List */}
        <div className="pt-4 border-t border-[#C5A059]/25 space-y-3 text-left text-xs">
          <div className="flex items-center justify-between p-2.5 bg-[#F4EFE6] border border-[#DCCEBA]">
            <div className="flex items-center gap-2 text-[#14224A] min-w-0">
              <RoyalPatraIcon className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a
                href={`mailto:${settings.studio_email}`}
                className="font-mono text-[11px] truncate hover:text-[#C5A059] transition-colors"
                title="Send Email"
              >
                {settings.studio_email}
              </a>
            </div>
            <button
              onClick={handleCopyEmail}
              className="text-[#8E7036] hover:text-[#14224A] p-1 transition-colors shrink-0"
              title="Copy Email to Clipboard"
            >
              {copied ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono">
                  <RoyalSatyaIcon className="w-3.5 h-3.5 text-emerald-700" />
                  COPIED
                </span>
              ) : (
                <RoyalPattikaIcon className="w-3.5 h-3.5 text-[#C5A059]" />
              )}
            </button>
          </div>

          {settings.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 bg-[#F4EFE6] border border-[#DCCEBA] text-[#14224A] hover:border-[#C5A059] hover:bg-[#FAF7F2] transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <RoyalArrowUpRight className="w-4 h-4 text-[#C5A059] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="font-mono text-[11px] truncate">
                  @charchit.studios
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E7036]">
                Instagram
              </span>
            </a>
          )}

          <div className="flex items-center gap-2 p-2.5 bg-[#F4EFE6] border border-[#DCCEBA] text-[#14224A]">
            <RoyalSthalaIcon className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="text-[11px]">{settings.studio_location}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-col gap-2">
          <button
            onClick={downloadVCard}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors shadow-xs tactile-button"
          >
            <RoyalDownloadIcon className="w-3.5 h-3.5 text-[#DEB868]" />
            <span>Save vCard to Contacts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
