"use client";

import React, { useState } from "react";
import { submitContactEnquiry } from "@/actions/enquiry";
import {
  LotusOrnament,
  RoyalSandeshIcon,
  RoyalSatyaIcon,
  RoyalShankhaIcon,
} from "@/components/ui/Ornaments";

export function ContactFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await submitContactEnquiry(formData);
      setResult(res);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setResult({
        success: false,
        error: "Failed to transmit message. Please email us directly at arpitbhardwaj885@gmail.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field for spam prevention */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url_hp">Leave this empty</label>
        <input
          type="text"
          id="website_url_hp"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
            Your Name <span className="text-[#A6472D]">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. Vikramaditya Singhania"
            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-xs text-[#14224A]"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
            Email Address <span className="text-[#A6472D]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="vikram@enterprise.com"
            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-xs text-[#14224A]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
            Business / Brand Name
          </label>
          <input
            type="text"
            name="businessName"
            placeholder="e.g. Atelier Veda"
            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-xs text-[#14224A]"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
            Service of Interest <span className="text-[#A6472D]">*</span>
          </label>
          <select
            name="serviceInterest"
            required
            defaultValue="Website Design & Development"
            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-xs text-[#14224A]"
          >
            <option value="Website Design & Development">Website Design & Development</option>
            <option value="Content Creation & Editorial Direction">Content Creation & Editorial Direction</option>
            <option value="Digital Marketing & Brand Positioning">Digital Marketing & Brand Positioning</option>
            <option value="Lead Generation & High-Touch Inquiries">Lead Generation & High-Touch Inquiries</option>
            <option value="Business Automation & Operations">Business Automation & Operations</option>
            <option value="Comprehensive Studio Engagement">Comprehensive Studio Engagement</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
          Investment Bracket (Optional)
        </label>
        <select
          name="budgetRange"
          defaultValue="₹5,00,000 – ₹12,00,000"
          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-xs text-[#14224A]"
        >
          <option value="₹2,50,000 – ₹5,00,000">₹2,50,000 – ₹5,00,000 (Emerging Enterprise)</option>
          <option value="₹5,00,000 – ₹12,00,000">₹5,00,000 – ₹12,00,000 (Flagship Commission)</option>
          <option value="₹12,00,000+">₹12,00,000+ (Enterprise Transformation)</option>
          <option value="Flexible / Scope-dependent">Flexible / Scope-dependent</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
          Project Brief / Message <span className="text-[#A6472D]">*</span>
        </label>
        <textarea
          name="projectBrief"
          required
          rows={4}
          placeholder="Tell us about your brand, current milestones, and what you aim to achieve..."
          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-xs text-[#14224A]"
        />
      </div>

      {result?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
          <RoyalSatyaIcon className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{result.message}</p>
        </div>
      )}

      {result?.error && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs flex items-start gap-2.5">
          <RoyalShankhaIcon className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{result.error}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm tactile-button"
        >
          {isSubmitting ? (
            <span>Transmitting to Studio Desk...</span>
          ) : (
            <>
              <span>Dispatch Message</span>
              <RoyalSandeshIcon className="w-3.5 h-3.5 text-[#DEB868]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
