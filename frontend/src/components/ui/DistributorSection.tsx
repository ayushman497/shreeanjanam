"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { generateDistributorWhatsAppUrl } from "@/lib/whatsapp";
import { Building2, User, Phone, MapPin, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, TrendingUp, Truck, Award } from "lucide-react";
import confetti from "canvas-confetti";

export function DistributorSection() {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Indore");
  const [businessType, setBusinessType] = useState("Retail Store / Kirana");
  const [estimatedVolume, setEstimatedVolume] = useState("50-100 kg / month");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !phone || !city) return;

    setIsSubmitting(true);

    try {
      // 1. Store lead in database
      await api.submitDistributorLead({
        business_name: businessName,
        owner_name: ownerName,
        phone,
        city,
        state: "Madhya Pradesh",
        business_type: businessType,
        estimated_volume: estimatedVolume,
        message: message || "Interested in stocking Anjanam Foods products.",
      });

      // 2. Fire celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C9A24A", "#355E2C", "#FAF7F0"]
        });
      } catch (e) {}

      setIsSuccess(true);

      // 3. Open WhatsApp Partner chat directly
      const waUrl = generateDistributorWhatsAppUrl({
        businessName,
        ownerName,
        phone,
        city,
        businessType,
        estimatedVolume,
      });

      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="distributor" className="py-24 bg-gradient-to-b from-[#F7F3E9] via-[#FAF7F0] to-[#FAF7F0] text-[#1F2937] relative overflow-hidden border-t border-[#C9A24A]/25">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFBA67]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#355E2C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: B2B Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A24A]/15 border border-[#C9A24A]/30 text-[#5B4524] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
              <span>B2B & Retail Distribution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] leading-tight">
              Become an <span className="text-[#355E2C]">Anjanam Foods</span> Partner
            </h2>

            <p className="text-lg text-[#5B4524] font-medium leading-relaxed">
              Looking to stock Anjanam Foods products in your store, supermarket, or retail chain in Indore & across Madhya Pradesh?
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#C9A24A]/30 shadow-xs">
                <div className="p-2 rounded-xl bg-[#355E2C]/10 text-[#355E2C] flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1F2937]">Attractive Wholesale Margins</div>
                  <div className="text-xs text-[#5B4524] mt-0.5">Lucrative distributor pricing and recurring margin structure for stores.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#C9A24A]/30 shadow-xs">
                <div className="p-2 rounded-xl bg-[#C9A24A]/15 text-[#5B4524] flex-shrink-0">
                  <Award className="w-5 h-5 text-[#C9A24A]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1F2937]">High Festive Demand</div>
                  <div className="text-xs text-[#5B4524] mt-0.5">Tremendous brand pull for pure Rajgira, Singhada & Fariyali flours during fasts.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#C9A24A]/30 shadow-xs">
                <div className="p-2 rounded-xl bg-[#355E2C]/10 text-[#355E2C] flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1F2937]">Guaranteed Fresh Batch Delivery</div>
                  <div className="text-xs text-[#5B4524] mt-0.5">Fast restocking directly from our 576 Tilak Nagar, Indore milling facility.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Partner Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#C9A24A]/35 text-[#1F2937]">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-[#1F2937]">
                  Partner Inquiry Form
                </h3>
                <p className="text-xs text-[#5B4524] mt-1">
                  Fill details below to connect directly on WhatsApp with our wholesale team.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-6 bg-[#FAF7F0] border border-[#355E2C]/30 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#355E2C] text-[#DFBA67] mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#1F2937]">Inquiry Received!</h4>
                  <p className="text-xs text-[#5B4524]">
                    Our wholesale team is connecting with you on WhatsApp. We look forward to a rewarding partnership!
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-bold text-[#355E2C] underline pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Business Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#355E2C]" />
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Mahalakshmi Kirana Store / Organic Mart"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                    />
                  </div>

                  {/* Owner Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#355E2C]" />
                        Owner / Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#355E2C]" />
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9826012345"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* City & Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#355E2C]" />
                        City / Locality *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Indore, Ujjain, Dewas..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Est. Monthly Requirement
                      </label>
                      <select
                        value={estimatedVolume}
                        onChange={(e) => setEstimatedVolume(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      >
                        <option value="25-50 kg / month">25-50 kg / month</option>
                        <option value="50-100 kg / month">50-100 kg / month</option>
                        <option value="100-250 kg / month">100-250 kg / month</option>
                        <option value="250-500 kg / month">250-500 kg / month</option>
                        <option value="500+ kg / month">500+ kg / month (Super Distributor)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1">
                      Message / Special Query (Optional):
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Please share price list and samples for Vijay Nagar store..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] hover:from-[#E6C475] hover:to-[#B38728] text-[#1F2937] font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 pulse-whatsapp"
                  >
                    <MessageCircle className="w-5 h-5 text-[#1F2937]" />
                    <span>{isSubmitting ? "Submitting..." : "Talk on WhatsApp"}</span>
                  </button>

                  <div className="text-[10px] text-center text-gray-500">
                    🔒 Lead is securely stored in database and connected directly to WhatsApp.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
