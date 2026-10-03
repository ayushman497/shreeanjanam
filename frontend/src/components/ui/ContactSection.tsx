"use client";

import React, { useState } from "react";
import { BRAND_INFO } from "@/lib/constants";
import { api } from "@/lib/api";
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { InstagramIcon } from "./Icons";

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setIsSubmitting(true);
    try {
      await api.submitContactInquiry({
        name,
        phone,
        email: email || undefined,
        subject,
        message,
      });
      setIsSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden border-t border-[#C9A24A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#355E2C]/10 border border-[#355E2C]/20 text-[#355E2C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>Connect with Anjanam Foods</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] tracking-tight">
            Visit Us or <span className="text-[#355E2C]">Get in Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5B4524] font-medium leading-relaxed">
            We are based in Tilak Nagar, Indore. Drop by our facility, place a WhatsApp order, or send an inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-[#FAF7F0] border border-[#C9A24A]/25 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#355E2C] text-[#DFBA67] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1F2937]">Store & Processing Facility</h4>
                  <div className="text-xs text-[#355E2C] font-semibold">Tilak Nagar, Indore</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5B4524] leading-relaxed pl-13">
                {BRAND_INFO.address}
              </p>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#C9A24A]/25 hover:border-[#355E2C] transition-all group block"
              >
                <div className="w-8 h-8 rounded-xl bg-[#355E2C]/10 flex items-center justify-center text-[#355E2C] mb-2 group-hover:bg-[#355E2C] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-gray-500 font-bold uppercase">Call Us</div>
                <div className="text-sm font-bold text-[#1F2937] mt-0.5">{BRAND_INFO.phone}</div>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#C9A24A]/25 hover:border-[#355E2C] transition-all group block"
              >
                <div className="w-8 h-8 rounded-xl bg-[#355E2C]/10 flex items-center justify-center text-[#355E2C] mb-2 group-hover:bg-[#355E2C] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-gray-500 font-bold uppercase">Email Us</div>
                <div className="text-xs font-bold text-[#1F2937] mt-0.5 truncate">{BRAND_INFO.email}</div>
              </a>
            </div>

            {/* Instagram & Social */}
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 border border-[#C9A24A]/30 flex items-center justify-between hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2937]">Follow @anjanamfoods</div>
                  <div className="text-[11px] text-gray-500">Daily recipe videos, purity updates & offers</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#355E2C]">Follow →</span>
            </a>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-[#C9A24A]/30 shadow-md h-52 bg-gray-100">
              <iframe
                title="Anjanam Foods Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.897371900115!2d75.88219195!3d22.7208466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd23ef6f4b37%3A0x6a0a03bbbfd0c32!2sTilak%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F0] rounded-3xl p-8 border border-[#C9A24A]/30 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-[#1F2937]">
                  Send a Message
                </h3>
                <p className="text-xs text-[#5B4524] mt-1">
                  Have a custom request or question? Fill out the form and we'll reply promptly.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 bg-white border border-[#355E2C]/30 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#355E2C] text-[#DFBA67] mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#1F2937]">Message Sent Successfully!</h4>
                  <p className="text-xs text-[#5B4524]">
                    Thank you for reaching out to Anjanam Foods. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-bold text-[#355E2C] underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarti Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-white text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 8827685003"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-white text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-white text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-white text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                      >
                        <option value="General Inquiry">General Product Inquiry</option>
                        <option value="Fasting Flour Questions">Fasting (Vrat) Flour Questions</option>
                        <option value="Home Delivery Indore">Home Delivery in Indore</option>
                        <option value="Wholesale Inquiry">Wholesale / Bulk Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message or inquiry here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-white text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#355E2C] hover:bg-[#24411E] text-[#FAF7F0] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#DFBA67]" />
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
