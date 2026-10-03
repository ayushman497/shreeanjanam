"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { X, MessageCircle, ShoppingBag, ShieldCheck, CheckCircle2, Sparkles, MapPin, Plus, Minus } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";

interface ProductOrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductOrderModal({ product, onClose }: ProductOrderModalProps) {
  const { addToCart, orderSingleOnWhatsApp } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      setDeliveryArea("");
      setNotes("");
    }
  }, [product]);

  if (!product || !selectedVariant) return null;

  const currentPrice = selectedVariant.discounted_price || selectedVariant.price || 0;
  const originalPrice = selectedVariant.price;
  const hasDiscount = originalPrice && selectedVariant.discounted_price && originalPrice > selectedVariant.discounted_price;

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    orderSingleOnWhatsApp(product, selectedVariant, quantity, deliveryArea, notes);
    onClose();
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#C9A24A]/30 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#FAF7F0] p-5 border-b border-[#C9A24A]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#355E2C] text-[#DFBA67] flex items-center justify-center font-bold text-sm">
              🌾
            </span>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#1F2937]">
                {product.name}
              </h3>
              <p className="text-xs text-[#5B4524]">{product.hindi_name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-[#1F2937] hover:bg-gray-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Product Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-[#C9A24A]/30 bg-[#FAF7F0] aspect-square">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#355E2C]/10 text-[#355E2C] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24A]" />
                <span>{BRAND_INFO.fssai}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5B4524] leading-relaxed">
                {product.description || product.short_description}
              </p>
              <div className="text-xs text-[#1F2937] space-y-1 bg-[#FAF7F0] p-3 rounded-xl border border-[#C9A24A]/20">
                <div><strong className="text-[#355E2C]">Ingredients:</strong> {product.ingredients || "100% Pure Grains"}</div>
                <div><strong className="text-[#355E2C]">Shelf Life:</strong> {product.shelf_life || "6 Months from packing"}</div>
                <div><strong className="text-[#355E2C]">Origin:</strong> Tilak Nagar, Indore (M.P.)</div>
              </div>
            </div>
          </div>

          {/* Benefits & Purity Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#C9A24A]/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#355E2C] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" /> Nutritional Benefits
              </h4>
              <ul className="text-xs space-y-1.5 text-[#1F2937]">
                {product.benefits && product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#355E2C] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#C9A24A]/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B4524] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24A]" /> Purity & Milling
              </h4>
              <ul className="text-xs space-y-1.5 text-[#1F2937]">
                {product.purity_highlights && product.purity_highlights.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24A] flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Custom Order Form Options */}
          <form onSubmit={handleWhatsAppOrder} className="space-y-4 pt-2 border-t border-[#5B4524]/10">
            {/* Pack Size Selection */}
            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-2">
                1. Select Pack Size Variant:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.size_label === v.size_label;
                  return (
                    <button
                      type="button"
                      key={v.size_label}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-[#355E2C] border-[#355E2C] text-white shadow-md ring-2 ring-[#C9A24A]/50"
                          : "bg-[#FAF7F0] border-[#C9A24A]/30 text-[#1F2937] hover:bg-[#C9A24A]/10"
                      }`}
                    >
                      <div className="text-sm font-bold">{v.size_label}</div>
                      <div className={`text-xs ${isSelected ? "text-[#DFBA67]" : "text-[#5B4524]"}`}>
                        ₹{v.discounted_price || v.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Price Calculation */}
            <div className="grid grid-cols-2 gap-4 items-center bg-[#FAF7F0] p-4 rounded-2xl border border-[#C9A24A]/20">
              <div>
                <div className="text-xs font-bold text-[#5B4524] mb-1">2. Quantity (Packs):</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-[#C9A24A]/40 flex items-center justify-center text-[#1F2937] font-bold hover:bg-[#C9A24A]/20"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-black text-[#1F2937] text-base">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#C9A24A]/40 flex items-center justify-center text-[#1F2937] font-bold hover:bg-[#C9A24A]/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500 font-medium">Estimated Price</div>
                <div className="text-2xl font-black text-[#1F2937]">
                  ₹{currentPrice * quantity}
                </div>
                {hasDiscount && (
                  <div className="text-xs text-gray-400 line-through">
                    ₹{originalPrice! * quantity}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Locality in Indore (Optional) */}
            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#355E2C]" />
                Delivery Locality in Indore (Optional):
              </label>
              <input
                type="text"
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                placeholder="e.g. 576 Tilak Nagar, Palasia, Vijay Nagar, Scheme 54..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#C9A24A]/35 text-xs text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#355E2C]"
              />
            </div>

            {/* Actions Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] text-[#1F2937] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-[#1F2937]" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="py-3.5 px-4 rounded-xl bg-[#355E2C] text-[#FAF7F0] font-semibold text-sm shadow-md hover:bg-[#24411E] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#DFBA67]" />
                <span>Add to Order Tray</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
