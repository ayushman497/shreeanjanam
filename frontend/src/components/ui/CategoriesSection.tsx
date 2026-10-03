"use client";

import React, { useState } from "react";
import { Product, ProductCategory } from "@/types";
import { ProductCard } from "./ProductCard";
import { Sparkles, Flame, HeartPulse, Wheat, ArrowRight } from "lucide-react";

interface CategoriesSectionProps {
  categories: ProductCategory[];
  products: Product[];
  onOpenProductDetails: (product: Product) => void;
}

export function CategoriesSection({ categories, products, onOpenProductDetails }: CategoriesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter((p) => {
        const cat = categories.find((c) => c.id === p.category_id);
        return cat?.slug === activeTab;
      });

  const categoryCards = [
    {
      slug: "vrat-collection",
      title: "Vrat Collection",
      hindi: "पवित्र व्रत एवं फलाहारी आटा",
      icon: Flame,
      tagline: "100% Pavitra for Navratri, Ekadashi & Shivratri",
      description: "Dedicated sanitized milling lines isolated from regular grains. Triple-sifted Rajgira, Singhada & signature Fariyali blends.",
      badge: "Fasting Specials",
      items: ["Rajgira Aata", "Singhada Aata", "Mix Fariyali Aata"],
      accentBorder: "border-[#C9A24A]/40",
      accentBadge: "bg-[#355E2C] text-[#FAF7F0]",
      iconBg: "bg-[#355E2C]/10 text-[#355E2C]"
    },
    {
      slug: "traditional-grain-collection",
      title: "Traditional Grain Collection",
      hindi: "पारंपरिक देसी अनाज आटा",
      icon: Wheat,
      tagline: "Authentic Slow-Milled Malwa Kitchen Flavours",
      description: "Stone-ground yellow maize (Makka), winter pearl millet (Bajra), and cooling white sorghum (Jowar) from MP farms.",
      badge: "Malwa Heritage",
      items: ["Makka Aata", "Bajra Aata", "Jowar Aata"],
      accentBorder: "border-[#C9A24A]/40",
      accentBadge: "bg-[#5B4524] text-white",
      iconBg: "bg-[#C9A24A]/15 text-[#5B4524]"
    },
    {
      slug: "healthy-staples",
      title: "Healthy Staples",
      hindi: "पौष्टिक दलिया एवं विशेष आटा",
      icon: HeartPulse,
      tagline: "High Fiber & Wholesome Kitchen Essentials",
      description: "Cracked Makka Daliya, de-husked Bajra Khichda, and superfine silky aged Chawal Aata for breakfast & daily wellness.",
      badge: "Daily Wellness",
      items: ["Makka Daliya", "Bajra Khichda", "Chawal Aata"],
      accentBorder: "border-[#C9A24A]/40",
      accentBadge: "bg-[#355E2C] text-[#FAF7F0]",
      iconBg: "bg-[#355E2C]/10 text-[#355E2C]"
    }
  ];

  return (
    <section id="products" className="py-20 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#355E2C]/10 border border-[#355E2C]/20 text-[#355E2C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>Farm Fresh & 100% Pavitra</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] tracking-tight">
            Our Pure <span className="text-[#355E2C]">Grain & Flour</span> Collections
          </h2>
          <p className="text-base sm:text-lg text-[#5B4524] font-medium leading-relaxed">
            Order your preferred variant directly on WhatsApp. Every pack is freshly milled in Indore and packed with hygiene seals.
          </p>
        </div>

        {/* 3 Premium Category Spotlight Cards (Light Luxury Design) */}
        <div id="categories" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.slug;
            return (
              <div
                key={cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                className={`cursor-pointer rounded-3xl p-7 bg-white text-[#1F2937] relative overflow-hidden transition-all duration-300 border-2 luxury-card flex flex-col justify-between ${
                  isSelected
                    ? "border-[#C9A24A] shadow-xl ring-2 ring-[#C9A24A]/30 scale-[1.02]"
                    : "border-[#C9A24A]/25 hover:border-[#C9A24A]/60"
                }`}
              >
                {/* Subtle Top Gold Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#355E2C]" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center border border-[#C9A24A]/20`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.accentBadge} shadow-xs`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#1F2937] mb-1">
                    {cat.title}
                  </h3>
                  <div className="text-xs text-[#C9A24A] font-bold mb-3">
                    {cat.hindi}
                  </div>

                  <p className="text-xs text-[#5B4524] mb-5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Items Pill List */}
                  <div className="space-y-1.5 pt-3 border-t border-[#5B4524]/10">
                    <div className="text-[11px] uppercase font-bold text-[#355E2C] tracking-wider">
                      Featured Flours:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((it) => (
                        <span
                          key={it}
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#C9A24A]/25 text-[#1F2937]"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#355E2C]">
                  <span>{isSelected ? "● Viewing Collection" : "Click to Filter Flours"}</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A24A]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#355E2C] text-[#FAF7F0] shadow-md ring-2 ring-[#C9A24A]/50"
                : "bg-white text-[#1F2937] hover:bg-[#C9A24A]/10 border border-[#C9A24A]/25"
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === cat.slug
                  ? "bg-[#355E2C] text-[#FAF7F0] shadow-md ring-2 ring-[#C9A24A]/50"
                  : "bg-white text-[#1F2937] hover:bg-[#C9A24A]/10 border border-[#C9A24A]/25"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProductDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
