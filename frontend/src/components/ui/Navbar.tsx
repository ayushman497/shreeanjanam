"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, ShoppingBag, Menu, X, Phone, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Categories", href: "#categories" },
    { name: "Why Purity", href: "#why-us" },
    { name: "About Us", href: "#about" },
    { name: "Recipes", href: "#recipes" },
    { name: "B2B Partner", href: "#distributor" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar (Light Pure & Fresh) */}
      <div className="bg-[#F2F8F0] text-[#1F2937] text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-[#355E2C]/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center justify-center bg-[#355E2C] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Indore Special
            </span>
            <span className="text-[#1F2937] font-semibold">🌾 Fast Doorstep Delivery Across Tilak Nagar & All Indore | 100% Shuddh Vrat Ka Aata</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-[#57606A]">
            <span className="flex items-center gap-1 font-semibold text-[#355E2C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#355E2C]" /> FSSAI Certified
            </span>
            <a href={`tel:${BRAND_INFO.phone}`} className="flex items-center gap-1 hover:text-[#355E2C] transition-colors font-bold text-[#1F2937]">
              <Phone className="w-3.5 h-3.5 text-[#C9A24A]" /> {BRAND_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar (Crisp White & Blur) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100"
            : "bg-white py-4 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#1F2937]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#355E2C] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C9A24A] after:absolute after:bottom-0 after:left-0 after:transition-all font-semibold"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Order Tray Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#F4F8F3] border border-[#355E2C]/20 text-[#355E2C] hover:bg-[#355E2C]/10 transition-all shadow-xs"
              title="View WhatsApp Order Tray"
            >
              <ShoppingBag className="w-5 h-5 text-[#355E2C]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C9A24A] text-[#1F2937] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Quick Chat CTA */}
            <a
              href={generateGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#355E2C] hover:bg-[#24411E] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all border border-[#C9A24A]/30 group"
            >
              <MessageCircle className="w-4 h-4 text-[#DFBA67] group-hover:scale-110 transition-transform" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1F2937] hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-[#1F2937] hover:bg-[#F4F8F3] hover:text-[#355E2C] transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={generateGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#355E2C] text-white text-sm font-semibold shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBA67]" />
                <span>Chat & Order on WhatsApp</span>
              </a>
              <Link
                href="/admin/login"
                className="text-center text-xs text-gray-500 hover:text-[#355E2C] py-1 font-medium"
              >
                Admin Management Portal →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
