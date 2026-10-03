"use client";

import React from "react";
import { Leaf, Award, ShieldCheck, Cog, MapPin, Sparkles, HeartHandshake } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Leaf,
      title: "100% Natural Ingredients",
      hindi: "100% प्राकृतिक घटक",
      description: "Zero synthetic additives, zero chemical preservatives, and zero artificial coloring. Pure unadulterated whole grains only.",
      highlight: "Pure & Unbleached"
    },
    {
      icon: Award,
      title: "Premium Quality Grains",
      hindi: "उत्कृष्ट श्रेणी के अनाज",
      description: "Single-origin grains sourced from trusted regional farms. Graded, sorted, and triple-sifted for optimum texture and nutritional density.",
      highlight: "Hand-Selected"
    },
    {
      icon: ShieldCheck,
      title: "FSSAI Certified Facility",
      hindi: "FSSAI प्रमाणित निर्माण",
      description: "Manufactured in a spotless, hygienic environment complying with stringent government food safety and sanitation norms.",
      highlight: "Strict Hygiene"
    },
    {
      icon: Cog,
      title: "Freshly Processed & Slow Milled",
      hindi: "पारंपरिक धीमी पिसाई",
      description: "Stone-milled at low temperatures to protect essential germ oils, wheatgrass vitamins, aromatic sweetness, and dietary fiber.",
      highlight: "Nutrient Preserved"
    },
    {
      icon: MapPin,
      title: "Trusted Local Indore Brand",
      hindi: "इंदौर का अपना विश्वसनीय ब्रांड",
      description: "Rooted in Tilak Nagar, Indore. We understand traditional Malwi fasting customs and local tastes with personalized care.",
      highlight: "576 Tilak Nagar"
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F9FAF8] relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#355E2C]/10 border border-[#355E2C]/20 text-[#355E2C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>The Anjanam Purity Promise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] tracking-tight">
            Why Choose <span className="text-[#355E2C]">Anjanam Foods?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#57606A] font-medium leading-relaxed">
            We preserve the sacred sanctity of your fasts and the everyday health of your family with uncompromised traditional milling.
          </p>
        </div>

        {/* 5 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isWide = index === 3 || index === 4;
            return (
              <div
                key={item.title}
                className={`group relative bg-white rounded-2xl p-7 border border-[#C9A24A]/25 luxury-card overflow-hidden flex flex-col justify-between ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Subtle Card Accent Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#355E2C] opacity-80 group-hover:h-1.5 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#355E2C]/10 border border-[#355E2C]/20 flex items-center justify-center group-hover:bg-[#355E2C] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#355E2C] group-hover:text-[#DFBA67] transition-colors" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#C9A24A]/30 text-[#5B4524]">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1F2937] group-hover:text-[#355E2C] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-[#C9A24A] mb-3">
                    {item.hindi}
                  </div>
                  <p className="text-sm text-[#5B4524] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#5B4524]/10 flex items-center text-xs font-semibold text-[#355E2C] group-hover:text-[#24411E]">
                  <span>Purity Guaranteed</span>
                  <span className="ml-auto text-[#C9A24A]">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
