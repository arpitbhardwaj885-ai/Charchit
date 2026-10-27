"use client";

import React, { useState } from "react";
import { submitProjectBriefAction } from "@/actions/enquiry";
import {
  LotusOrnament,
  StudioSeal,
  RoyalSatyaIcon,
  RoyalChevronRight,
  RoyalChevronLeft,
  RoyalSanrakshanIcon,
  RoyalSandeshIcon,
  RoyalTaraIcon,
} from "@/components/ui/Ornaments";

const CRAFT_SERVICES = [
  {
    id: "web-craft",
    name: "Website Design & Development",
    desc: "Bespoke digital flagships, art-directed editorial layouts, and Next.js engineering.",
    conditionalQuestion: "What is your primary website expectation?",
    options: ["Brand Flagship / Editorial", "Commercial Catalog / E-commerce", "SaaS / Digital Platform"],
  },
  {
    id: "content-craft",
    name: "Content Creation & Editorial Direction",
    desc: "Authoritative voice, strategic brand narratives, and visual asset direction.",
    conditionalQuestion: "What kind of editorial support do you seek?",
    options: ["Foundational Brand Manifesto", "Complete Website Editorial Copy", "Visual Asset & Art Direction"],
  },
  {
    id: "marketing-craft",
    name: "Digital Marketing & Positioning",
    desc: "Targeted campaigns, distribution strategies, and authentic brand prestige.",
    conditionalQuestion: "What is your key growth priority?",
    options: ["Organic Prestige & Authority", "Targeted Audience Acquisition", "Launch Campaign Orchestration"],
  },
  {
    id: "lead-craft",
    name: "Lead Generation & High-Touch Inquiries",
    desc: "Bespoke brief builders, qualifying funnels, and high-value conversion pathways.",
    conditionalQuestion: "What is the typical scale of your client engagements?",
    options: ["Boutique Consultations", "High-Value Enterprise Contracts", "Direct-to-Consumer Commissions"],
  },
  {
    id: "automation-craft",
    name: "Business Automation & Operations",
    desc: "Connecting your digital front-end with CRM, databases, and client workflows.",
    conditionalQuestion: "Where is the largest operational bottleneck?",
    options: ["Client Onboarding & Intake", "Database & CRM Synchronization", "Workflow & Notification Pipelines"],
  },
];

const BUDGET_TIERS = [
  { id: "tier-1", label: "Emerging Enterprise", range: "₹2,50,000 – ₹5,00,000", desc: "Focused flagship or brand system" },
  { id: "tier-2", label: "Flagship Commission", range: "₹5,00,000 – ₹12,00,000", desc: "Full-scale editorial & engineering build" },
  { id: "tier-3", label: "Enterprise Transformation", range: "₹12,00,000+", desc: "Multi-discipline comprehensive partnership" },
  { id: "tier-custom", label: "To Be Determined", range: "Flexible", desc: "Let us define scope through discovery" },
];

const TIMELINE_OPTIONS = [
  "Immediate (Within 4-6 weeks)",
  "Standard Studio Cycle (2-3 months)",
  "Comprehensive Strategic Rollout (3-6 months)",
  "Flexible / Long-term Roadmap",
];

export function ProjectBriefBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    websiteUrl: "",
    primaryGoal: "",
    selectedServices: [] as string[],
    conditionalAnswers: {} as Record<string, string>,
    budgetBracket: "",
    timelineExpectation: "",
    clientName: "",
    clientEmail: "",
    projectBrief: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    id?: string;
    message?: string;
    error?: string;
  } | null>(null);

  const toggleService = (name: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(name);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== name)
          : [...prev.selectedServices, name],
      };
    });
  };

  const handleConditionalSelect = (serviceName: string, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      conditionalAnswers: {
        ...prev.conditionalAnswers,
        [serviceName]: answer,
      },
    }));
  };

  const canProceedStep1 = formData.businessName.trim().length >= 2;
  const canProceedStep2 = formData.selectedServices.length > 0;
  const canProceedStep3 = true; // Budget/timeline optional or selected
  const canProceedStep4 =
    formData.clientName.trim().length >= 2 &&
    formData.clientEmail.includes("@") &&
    formData.projectBrief.trim().length >= 10;

  const handleSubmit = async () => {
    if (!canProceedStep4) return;
    setIsSubmitting(true);
    setSubmissionResult(null);

    // Format detailed brief
    const conditionalNotes = Object.entries(formData.conditionalAnswers)
      .map(([srv, ans]) => `${srv}: ${ans}`)
      .join(" | ");

    const compiledBrief = `${formData.projectBrief}\n\n[Studio Brief Specifications]\n- Business: ${formData.businessName} (${formData.industry || "Unspecified"})\n- Current Site: ${formData.websiteUrl || "None"}\n- Primary Objective: ${formData.primaryGoal || "General Elevation"}\n- Timeline: ${formData.timelineExpectation || "Not specified"}\n- Scope Details: ${conditionalNotes || "Standard"}`;

    try {
      const res = await submitProjectBriefAction({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        businessName: formData.businessName,
        industry: formData.industry,
        selectedServices: formData.selectedServices,
        budgetBracket: formData.budgetBracket,
        timelineExpectation: formData.timelineExpectation,
        projectBrief: compiledBrief,
      });

      if (res.success) {
        setSubmissionResult({
          success: true,
          id: res.id,
          message: res.message,
        });
      } else {
        setSubmissionResult({
          success: false,
          error: res.error,
        });
      }
    } catch {
      setSubmissionResult({
        success: false,
        error: "Failed to connect to the studio ledger. Please verify your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-[#FAF7F2] border border-[#C5A059]/40 shadow-xl overflow-hidden relative">
      {/* Top Heritage Border */}
      <div className="h-2 w-full bg-gradient-to-r from-[#14224A] via-[#C5A059] to-[#14224A]" />

      <div className="p-6 sm:p-10 md:p-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#C5A059]/25">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-[11px] uppercase tracking-[0.25em] font-semibold mb-1">
              <LotusOrnament className="w-3.5 h-3.5" />
              <span>THE PROJECT BRIEF BUILDER</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#14224A]">
              Architect Your Studio Commission
            </h3>
            <p className="text-xs text-[#585C6D] mt-1 font-sans">
              Define your enterprise requirements, craft disciplines, and milestones with clarity.
            </p>
          </div>

          {/* Step Progress Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif transition-colors ${
                  currentStep === step
                    ? "bg-[#14224A] text-[#FAF7F2] border border-[#C5A059]"
                    : currentStep > step
                    ? "bg-[#C5A059] text-[#060B18]"
                    : "bg-[#E9E0CE] text-[#585C6D]"
                }`}
              >
                {currentStep > step ? <RoyalSatyaIcon className="w-3.5 h-3.5" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Successful Submission View */}
        {submissionResult?.success ? (
          <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto flex justify-center">
              <StudioSeal year="2026" city="BHARAT" className="w-24 h-24" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold">
                BRIEF ARCHIVED IN STUDIO LEDGER
              </span>
              <h4 className="font-serif text-3xl text-[#14224A]">
                Namaste, {formData.clientName}.
              </h4>
              <p className="text-sm text-[#585C6D] leading-relaxed">
                {submissionResult.message}
              </p>
              {submissionResult.id && (
                <div className="pt-2 text-[11px] font-mono text-[#8E7036] bg-[#F4EFE6] py-1.5 px-3 inline-block border border-[#C5A059]/30">
                  Archival Reference ID: {submissionResult.id}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmissionResult(null);
                  setCurrentStep(1);
                  setFormData({
                    businessName: "",
                    industry: "",
                    websiteUrl: "",
                    primaryGoal: "",
                    selectedServices: [],
                    conditionalAnswers: {},
                    budgetBracket: "",
                    timelineExpectation: "",
                    clientName: "",
                    clientEmail: "",
                    projectBrief: "",
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
              >
                <span>Draft Another Commission Brief</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step-by-Step Interactive Form */
          <div className="py-8 space-y-8">
            {/* STEP 1: Enterprise Profile */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E7036] font-medium">
                    Step 01 / 04
                  </span>
                  <h4 className="font-serif text-2xl text-[#14224A]">
                    Tell Us About Your Enterprise
                  </h4>
                  <p className="text-xs text-[#585C6D]">
                    We work with businesses whose ambition warrants thoughtful attention.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                      Enterprise / Brand Name <span className="text-[#A6472D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Veda Heritage, Artisan & Co."
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                      Industry / Domain
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Luxury Retail, Architecture, Advisory"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                      Current Website (if applicable)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                      Primary Commercial Objective
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Redefine brand prestige, elevate conversions"
                      value={formData.primaryGoal}
                      onChange={(e) =>
                        setFormData({ ...formData, primaryGoal: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Craft Disciplines */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E7036] font-medium">
                    Step 02 / 04
                  </span>
                  <h4 className="font-serif text-2xl text-[#14224A]">
                    Select Your Required Craft Disciplines
                  </h4>
                  <p className="text-xs text-[#585C6D]">
                    Choose one or more areas. Specific contextual options will unfold below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CRAFT_SERVICES.map((srv) => {
                    const isSelected = formData.selectedServices.includes(srv.name);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.name)}
                        className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#14224A] text-[#FAF7F2] border-[#C5A059] shadow-md"
                            : "bg-[#FAF7F2] text-[#14224A] border-[#DCCEBA] hover:border-[#C5A059]/60"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h5 className="font-serif text-base font-semibold">
                              {srv.name}
                            </h5>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "border-[#C5A059] bg-[#C5A059] text-[#060B18]"
                                  : "border-[#DCCEBA]"
                              }`}
                            >
                              {isSelected && <RoyalSatyaIcon className="w-3.5 h-3.5 text-[#060B18]" />}
                            </div>
                          </div>
                          <p
                            className={`text-xs leading-relaxed ${
                              isSelected ? "text-[#FAF7F2]/80" : "text-[#585C6D]"
                            }`}
                          >
                            {srv.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Conditional Sub-questions */}
                {formData.selectedServices.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#C5A059]/30 space-y-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block">
                      Contextual Scope Nuances
                    </span>
                    {formData.selectedServices.map((srvName) => {
                      const match = CRAFT_SERVICES.find((s) => s.name === srvName);
                      if (!match) return null;
                      return (
                        <div key={match.id} className="p-4 bg-[#F4EFE6] border border-[#DCCEBA] space-y-2">
                          <label className="block text-xs font-serif text-[#14224A] font-medium">
                            {match.name}: {match.conditionalQuestion}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {match.options.map((opt) => {
                              const active =
                                formData.conditionalAnswers[match.name] === opt;
                              return (
                                <button
                                  type="button"
                                  key={opt}
                                  onClick={() => handleConditionalSelect(match.name, opt)}
                                  className={`px-3 py-1.5 text-xs transition-colors ${
                                    active
                                      ? "bg-[#14224A] text-[#FAF7F2] font-medium"
                                      : "bg-[#FAF7F2] text-[#14224A] border border-[#DCCEBA] hover:border-[#C5A059]"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Timeline & Budget Bracket */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E7036] font-medium">
                    Step 03 / 04
                  </span>
                  <h4 className="font-serif text-2xl text-[#14224A]">
                    Engagement Scope & Cadence
                  </h4>
                  <p className="text-xs text-[#585C6D]">
                    Transparency allows us to configure the right team and architectural depth.
                  </p>
                </div>

                {/* Budget Bracket */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-[#14224A] font-semibold">
                    Approximate Investment Bracket (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUDGET_TIERS.map((tier) => {
                      const isSelected = formData.budgetBracket === tier.range;
                      return (
                        <div
                          key={tier.id}
                          onClick={() =>
                            setFormData({ ...formData, budgetBracket: tier.range })
                          }
                          className={`p-4 border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#14224A] text-[#FAF7F2] border-[#C5A059]"
                              : "bg-[#FAF7F2] text-[#14224A] border-[#DCCEBA] hover:border-[#C5A059]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold uppercase tracking-wider">
                              {tier.label}
                            </span>
                            <span
                              className={`text-xs font-mono font-medium ${
                                isSelected ? "text-[#C5A059]" : "text-[#8E7036]"
                              }`}
                            >
                              {tier.range}
                            </span>
                          </div>
                          <p
                            className={`text-xs ${
                              isSelected ? "text-[#FAF7F2]/70" : "text-[#585C6D]"
                            }`}
                          >
                            {tier.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3 pt-4 border-t border-[#C5A059]/20">
                  <label className="block text-xs uppercase tracking-wider text-[#14224A] font-semibold">
                    Desired Delivery Target
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TIMELINE_OPTIONS.map((time) => {
                      const isSelected = formData.timelineExpectation === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, timelineExpectation: time })
                          }
                          className={`px-4 py-2.5 text-left text-xs transition-colors border ${
                            isSelected
                              ? "bg-[#14224A] text-[#FAF7F2] border-[#C5A059] font-medium"
                              : "bg-[#FAF7F2] text-[#14224A] border-[#DCCEBA] hover:border-[#C5A059]"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Client Coordinates & Vision Notes */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E7036] font-medium">
                    Step 04 / 04
                  </span>
                  <h4 className="font-serif text-2xl text-[#14224A]">
                    Primary Dialogue & Vision Details
                  </h4>
                  <p className="text-xs text-[#585C6D]">
                    Who from your team will lead this dialogue with our creative directors?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                      Your Full Name <span className="text-[#A6472D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                      Official Email Address <span className="text-[#A6472D]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@brand.com"
                      value={formData.clientEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, clientEmail: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
                    Project Brief & Expectations <span className="text-[#A6472D]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your current challenge, brand vision, reference aesthetics, or specific outcomes you require..."
                    value={formData.projectBrief}
                    onChange={(e) =>
                      setFormData({ ...formData, projectBrief: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
                  />
                  <p className="text-[11px] text-[#585C6D]">
                    Minimum 10 characters. Every brief is reviewed personally by our partners.
                  </p>
                </div>

                {/* Brief Summary Box */}
                <div className="p-4 bg-[#F4EFE6] border border-[#C5A059]/40 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#8E7036] font-semibold uppercase tracking-wider text-[10px]">
                    <RoyalSanrakshanIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Brief Archival Preview</span>
                  </div>
                  <p className="text-[#14224A]">
                    <strong>Enterprise:</strong> {formData.businessName || "Pending"} |{" "}
                    <strong>Disciplines:</strong>{" "}
                    {formData.selectedServices.join(", ") || "None"}
                  </p>
                  <p className="text-[#585C6D] text-[11px]">
                    Submitting this brief creates an official ledger inquiry. It is not an automated automated commercial commitment.
                  </p>
                </div>

                {submissionResult?.error && (
                  <div className="p-3 bg-[#A6472D]/10 border border-[#A6472D] text-[#A6472D] text-xs">
                    {submissionResult.error}
                  </div>
                )}
              </div>
            )}

            {/* Navigation & Submission Controls */}
            <div className="pt-6 border-t border-[#C5A059]/25 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider text-[#14224A] border border-[#DCCEBA] hover:border-[#C5A059] transition-colors"
                >
                  <RoyalChevronLeft className="w-4 h-4 text-[#C5A059]" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <span>Continue</span>
                  <RoyalChevronRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canProceedStep4 || isSubmitting}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] disabled:opacity-40 transition-colors shadow-md"
                >
                  {isSubmitting ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Submit Commission Brief</span>
                      <RoyalSandeshIcon className="w-4 h-4 text-[#C5A059]" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
