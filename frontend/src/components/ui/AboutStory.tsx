"use client";

import React from "react";
import { BRAND_INFO } from "@/lib/constants";
import { ShieldCheck, Sparkles, Heart, MapPin, Award, CheckCircle2 } from "lucide-react";

export function AboutStory() {
  const stats = [
    { value: "100%", label: "Natural Purity", sub: "Zero Additives or Fillers" },
    { value: "2025", label: "Founded in Indore", sub: "576 Tilak Nagar Heritage" },
    { value: "9+", label: "Signature Flours", sub: "Vrat & Heritage Grains" },
    { value: "FSSAI", label: "Govt Certified", sub: "Strict Sanitation Standards" },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Decorative Ornaments */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#DFBA67]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#355E2C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Heritage Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80"
                alt="Purity of Anjanam Foods Grains"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24411E]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-xs font-bold text-[#DFBA67] uppercase tracking-wider">
                  Our Sacred Pledge
                </span>
                <h4 className="text-xl font-serif font-bold text-white">
                  "Purity in every grain, sanctity in every meal."
                </h4>
                <p className="text-xs text-gray-200">
                  576 Tilak Nagar Main Road, Indore (M.P.)
                </p>
              </div>
            </div>

            {/* Floating Certified Emblem */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#C9A24A]/40 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C9A24A]/40 flex-shrink-0">
                <img src="/logo.png" alt="Anjanam Foods" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-serif font-black text-[#1F2937]">ANJANAM FOODS</div>
                <div className="text-[11px] text-[#355E2C] font-semibold">100% Pavitra Vrat Unit</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Storytelling */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A24A]/15 border border-[#C9A24A]/30 text-[#5B4524] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
              <span>About Anjanam Foods</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] tracking-tight leading-tight">
              Rooted in Tradition, <br />
              <span className="text-[#355E2C]">Crafted with Care</span> in Indore.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5B4524] leading-relaxed">
              <p>
                <strong>Anjanam Foods</strong> was established in 2025 with a singular mission: to provide natural, high-quality flour products that Indian families can trust unconditionally.
              </p>
              <p>
                We believe purity begins with selecting quality grains and processing them with care while preserving their natural goodness, vital germ oils, and wholesome dietary fibers.
              </p>
              <p>
                For fasting days (Navratri, Ekadashi, Shivratri, Janmashtami), we maintain dedicated processing equipment strictly isolated from non-vrat grains so you can observe your sacred rituals with complete peace of mind.
              </p>
              <p className="font-medium text-[#355E2C]">
                Every product is crafted to deliver authentic taste, nutrition, and trust for modern Indian households across Indore.
              </p>
            </div>

            {/* Key Purity Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F2937]">
                <CheckCircle2 className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Single-origin MP grain sourcing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F2937]">
                <CheckCircle2 className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Stone milling at gentle heat</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F2937]">
                <CheckCircle2 className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Strict batch microbiological tests</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F2937]">
                <CheckCircle2 className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Fresh packing on direct order</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#F8FAF8] p-3.5 rounded-2xl border border-[#355E2C]/15 text-center shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-serif font-black text-[#355E2C]">
                    {s.value}
                  </div>
                  <div className="text-xs font-bold text-[#1F2937] mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-gray-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
