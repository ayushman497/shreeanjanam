"use client";

import React, { useState } from "react";
import { MessageCircle, X, Sparkles, Send } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function StickyWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateGeneralWhatsAppUrl(
      quickMsg.trim() || "Hello Anjanam Foods, I would like to order fresh flour in Indore."
    );
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setQuickMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-[#C9A24A]/40 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Popover Header */}
          <div className="bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#DFBA67] p-4 text-[#1F2937] flex items-center justify-between border-b border-[#C9A24A]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#355E2C] bg-white flex-shrink-0 shadow-xs">
                <img src="/logo.png" alt="Anjanam Foods" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif font-black text-sm leading-tight text-[#1F2937]">Anjanam Foods</h4>
                <p className="text-[10px] text-[#355E2C] font-bold">Shuddh Vrat Ka Aata • Indore</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#1F2937]/80 hover:text-[#1F2937] p-1 rounded-full hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Popover Body */}
          <div className="p-4 bg-[#FAF7F0] space-y-3">
            <div className="bg-white p-3 rounded-2xl border border-[#C9A24A]/20 text-xs text-[#1F2937] leading-relaxed shadow-sm">
              🙏 <strong>Namaste!</strong> Looking for fresh Rajgira, Singhada, Makka or Bajra flour delivered at your home in Indore?
            </div>

            <form onSubmit={handleSend} className="space-y-2">
              <input
                type="text"
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                placeholder="Type your message or locality..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#C9A24A]/40 bg-white text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] text-[#1F2937] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-all duration-300 pulse-whatsapp border-2 border-white"
        aria-label="Order on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
        
        {/* Floating Tooltip / Badge */}
        {!isOpen && (
          <span className="hidden sm:inline-flex absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-[#1F2937]/90 text-white text-xs font-bold whitespace-nowrap shadow-lg backdrop-blur-sm border border-[#C9A24A]/40 items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            Order on WhatsApp
          </span>
        )}
      </button>
    </div>
  );
}
