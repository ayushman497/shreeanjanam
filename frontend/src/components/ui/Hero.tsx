"use client";

import React from "react";
import { MessageCircle, ArrowDown, ShieldCheck, Sparkles, CheckCircle, Wheat, Star } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-8 pb-16">
      {/* Soft Light Aura Glows (No Brown Background) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#DFBA67]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#355E2C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2F8F0] border border-[#355E2C]/20 text-[#355E2C] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
              <span>Est. 2025 • Indore, Madhya Pradesh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A]" />
              <span>FSSAI Certified</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#1F2937] leading-[1.12] tracking-tight">
                Shuddh Vrat <br className="hidden sm:inline" />
                <span className="text-[#355E2C]">Ka Aata</span>{" "}
                <span className="font-serif italic font-normal text-[#C9A24A] block sm:inline">
                  (शुद्ध व्रत का आटा)
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#4B5563] font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Natural, Pure and Trusted Grain Products for Every Home. Milled from single-origin grains with absolute purity for your sacred fasts & daily family nourishment.
              </p>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-semibold text-[#1F2937] max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>100% Chemical-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Stone Cold Milled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Dedicated Vrat Line</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>FSSAI Lab Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Zero Adulteration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <span>Direct Indore Delivery</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#355E2C] hover:bg-[#24411E] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 border border-[#C9A24A]/40 group"
              >
                <span>Explore Products</span>
                <Wheat className="w-4 h-4 text-[#DFBA67] group-hover:rotate-12 transition-transform" />
              </a>

              <a
                href={generateGeneralWhatsAppUrl("Hello Anjanam Foods, I would like to order fresh flour in Indore.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] hover:from-[#E6C475] hover:to-[#B38728] text-[#1F2937] font-black text-base shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2.5 pulse-whatsapp"
              >
                <MessageCircle className="w-5 h-5 text-[#1F2937]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Local Trust Testimonial Bar */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#57606A]">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-[#DFBA67] to-[#355E2C] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold"
                  >
                    ★
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-black text-[#1F2937]">4.9/5</span>
                <span>• Trusted by 10,000+ Indore families for Purity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C9A24A] via-[#355E2C] to-[#DFBA67] rounded-3xl opacity-20 blur-lg animate-pulse" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1000&q=85"
                  alt="Anjanam Foods Shuddh Vrat Ka Aata"
                  className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Official Logo Brand Hologram Emblem on top right */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-[#C9A24A]/40 flex items-center gap-2.5 z-20">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C9A24A]/30">
                    <img src="/logo.png" alt="Anjanam Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="pr-1 text-left">
                    <div className="text-[11px] font-serif font-black text-[#1F2937] leading-tight">ANJANAM</div>
                    <div className="text-[9px] font-bold text-[#355E2C]">Purity Hallmark</div>
                  </div>
                </div>

                {/* Floating FSSAI Seal — top-left, no overlap with logo */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl border border-[#C9A24A]/40 flex items-center gap-2 z-20">
                  <ShieldCheck className="w-5 h-5 text-[#355E2C] flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-[#1F2937]">FSSAI Certified</div>
                    <div className="text-[9px] text-gray-500">100% Tested Hygiene</div>
                  </div>
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/90 via-transparent to-transparent" />

                {/* Floating Product Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24A] text-[#1F2937] text-xs font-bold tracking-wide">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Pure Fasting Guarantee
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                    Rajgira, Singhada & Fariyali Aata
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200">
                    Handpicked whole grains • Separate milling • Pure taste
                  </p>
                </div>
              </div>

              {/* Floating Indore Delivery Chip */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white px-4 py-3 rounded-2xl shadow-xl border border-[#C9A24A]/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#355E2C] text-white flex items-center justify-center font-bold text-lg">
                  📍
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2937]">576 Tilak Nagar, Indore</div>
                  <div className="text-[11px] text-[#355E2C] font-semibold">Instant WhatsApp Delivery</div>
                </div>
              </div>



            </div>
          </div>
        </div>

        {/* Scrolling Indicator */}
        <div className="pt-12 text-center flex flex-col items-center justify-center">
          <a
            href="#why-us"
            className="inline-flex flex-col items-center gap-1 text-xs font-bold text-[#355E2C] hover:text-[#24411E] transition-colors group"
          >
            <span>DISCOVER OUR PURITY</span>
            <ArrowDown className="w-4 h-4 text-[#C9A24A] animate-bounce group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
