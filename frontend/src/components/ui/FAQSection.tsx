"use client";

import React, { useState } from "react";
import { FAQ } from "@/types";
import { ChevronDown, HelpCircle, Search, Sparkles, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-[#FAF7F0] relative overflow-hidden border-t border-[#C9A24A]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A24A]/15 border border-[#C9A24A]/30 text-[#5B4524] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] tracking-tight">
            Frequently Asked <span className="text-[#355E2C]">Questions</span>
          </h2>
          <p className="text-base text-[#5B4524] font-medium leading-relaxed">
            Everything you need to know about our fasting flour purity, stone milling, and Indore doorstep delivery.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. Indore delivery, FSSAI, Vrat purity)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#C9A24A]/35 bg-white text-xs text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none shadow-sm"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-[#C9A24A] shadow-md ring-1 ring-[#C9A24A]/30" : "border-[#C9A24A]/20 hover:border-[#C9A24A]/50"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#1F2937] hover:text-[#355E2C] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-sans font-bold px-2 py-0.5 rounded bg-[#FAF7F0] text-[#355E2C] border border-[#C9A24A]/20">
                      Q
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A24A] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#355E2C]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5B4524] leading-relaxed border-t border-gray-50 bg-[#FAF7F0]/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? WhatsApp CTA (Light Theme) */}
        <div className="mt-12 p-6 rounded-3xl bg-white text-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C9A24A]/35 shadow-md">
          <div>
            <h4 className="font-serif font-bold text-lg text-[#1F2937]">Still have a question?</h4>
            <p className="text-xs text-[#5B4524] mt-0.5">Our Tilak Nagar team in Indore is active on WhatsApp to assist you.</p>
          </div>
          <a
            href={generateGeneralWhatsAppUrl("Hello Anjanam Foods, I have a question regarding your products and delivery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] hover:from-[#E6C475] hover:to-[#B38728] text-[#1F2937] font-bold text-xs shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#1F2937]" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
