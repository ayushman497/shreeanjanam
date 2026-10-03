"use client";

import React from "react";
import Link from "next/link";
import { BRAND_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, ShieldCheck, ArrowUp, Heart } from "lucide-react";
import { InstagramIcon } from "./Icons";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-[#FAF7F0] via-[#F5EFE4] to-[#EDE7DB] text-[#1F2937] pt-16 pb-12 border-t-2 border-[#C9A24A]/30 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C9A24A]/20">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />

            <p className="text-xs text-[#5B4524] leading-relaxed max-w-sm">
              {BRAND_INFO.mission} Freshly stone-milled in Tilak Nagar, Indore with 100% purity guarantee.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#C9A24A]/35 text-xs text-[#355E2C] font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#355E2C]" />
              <span>{BRAND_INFO.fssai}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1F2937] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#5B4524] font-medium">
              <li>
                <a href="#products" className="hover:text-[#355E2C] transition-colors">Our Flours</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#355E2C] transition-colors">Categories</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#355E2C] transition-colors">Why Purity</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#355E2C] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-[#355E2C] transition-colors">Traditional Recipes</a>
              </li>
              <li>
                <a href="#distributor" className="hover:text-[#355E2C] transition-colors">Distributor / B2B</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#355E2C] transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Flour Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1F2937] uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#5B4524] font-medium">
              <li>
                <a href="#products" className="hover:text-[#355E2C] transition-colors">Vrat Collection (Rajgira & Singhada)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#355E2C] transition-colors">Mix Fariyali Aata (Master Fasting Blend)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#355E2C] transition-colors">Traditional Grains (Makka, Bajra, Jowar)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#355E2C] transition-colors">Healthy Daliya & Khichda</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#355E2C] transition-colors">Superfine Rice (Chawal) Aata</a>
              </li>
            </ul>
          </div>

          {/* Indore Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1F2937] uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#5B4524]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#355E2C] flex-shrink-0 mt-0.5" />
                <span>{BRAND_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-[#355E2C] font-bold text-[#1F2937]">
                  +91 {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#355E2C] flex-shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-[#355E2C]">
                  {BRAND_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                <a href={BRAND_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#355E2C] font-semibold text-[#1F2937]">
                  {BRAND_INFO.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B4524]">
          <div>
            © {new Date().getFullYear()} <strong>Anjanam Foods</strong>. All rights reserved. • Founded 2025, Tilak Nagar, Indore.
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <Link href="/admin/login" className="text-[#5B4524] hover:text-[#355E2C] transition-colors">
              Admin Portal
            </Link>
            <button
              onClick={scrollToTop}
              className="px-3 py-1 rounded-full bg-white border border-[#C9A24A]/30 hover:bg-[#FAF7F0] text-[#1F2937] transition-colors flex items-center gap-1 text-xs shadow-xs"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#355E2C]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
