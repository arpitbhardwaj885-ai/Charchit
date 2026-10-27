"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/actions/admin";
import {
  LotusOrnament,
  StudioSeal,
  RoyalLockIcon,
  RoyalShankhaIcon,
  RoyalArrowRight,
} from "@/components/ui/Ornaments";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await adminLogin(formData);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error || "Authentication failed.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 wasli-texture">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#C5A059]/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Top Heritage Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#14224A] via-[#C5A059] to-[#14224A]" />

        <div className="text-center space-y-4 mb-8">
          <StudioSeal year="2026" city="BHARAT" className="w-20 h-20 mx-auto" />

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold block">
              RESTRICTED REPOSITORY
            </span>
            <h1 className="font-serif text-3xl text-[#14224A]">
              Curator Portal
            </h1>
            <p className="text-xs text-[#585C6D]">
              Administrative access to inquiries, repertory, and studio settings.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-[#14224A] font-medium">
              Administrative Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                placeholder="Enter studio passkey..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DCCEBA] focus:border-[#C5A059] focus:outline-none text-sm text-[#14224A]"
              />
              <RoyalLockIcon className="w-4 h-4 text-[#8E7036] absolute left-3 top-3" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
              <RoyalShankhaIcon className="w-4 h-4 text-red-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059] hover:text-[#060B18] disabled:opacity-50 transition-colors shadow-sm tactile-button"
            >
              {isLoading ? (
                <span>Verifying Passkey...</span>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <RoyalArrowRight className="w-4 h-4 text-[#DEB868]" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#C5A059]/20 text-center text-[11px] text-[#585C6D]">
          <p>Default development passkey: <code className="bg-[#E9E0CE] px-1.5 py-0.5 font-mono text-[#14224A]">charchit2026!</code></p>
        </div>
      </div>
    </main>
  );
}
