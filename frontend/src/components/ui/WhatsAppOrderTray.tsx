"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";

export function WhatsAppOrderTray() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemCount,
    totalEstimatedPrice,
    orderCartOnWhatsApp,
  } = useCart();

  const [deliveryArea, setDeliveryArea] = useState("");
  const [notes, setNotes] = useState("");

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    orderCartOnWhatsApp(deliveryArea, notes);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#C9A24A]/30 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 bg-[#FAF7F0] border-b border-[#C9A24A]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#355E2C] text-[#DFBA67] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#1F2937] text-lg">
                  WhatsApp Order Tray
                </h3>
                <p className="text-xs text-[#5B4524]">
                  {totalItemCount} {totalItemCount === 1 ? "pack" : "packs"} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-gray-400 hover:text-[#1F2937] hover:bg-gray-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border border-[#C9A24A]/30 text-[#C9A24A] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-[#355E2C]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-[#1F2937]">Your Tray is Empty</h4>
                  <p className="text-xs text-[#5B4524] max-w-xs mx-auto">
                    Explore our pure Vrat and traditional flours to build your custom Indore delivery order.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#355E2C] text-[#FAF7F0] text-xs font-bold shadow-md hover:bg-[#24411E]"
                >
                  Browse Flours
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-[#5B4524] pb-2 border-b border-gray-100">
                  <span>Selected Products</span>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => {
                  const unitPrice = item.variant.discounted_price || item.variant.price || 0;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${item.variant.size_label}`}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F0] border border-[#C9A24A]/25 relative group"
                    >
                      <img
                        src={item.product.image_url || "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#C9A24A]/20 bg-white flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#1F2937] truncate font-serif">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-[#5B4524] font-medium">
                          Pack: <span className="text-[#355E2C] font-bold">{item.variant.size_label}</span>
                        </div>
                        <div className="text-xs font-bold text-[#1F2937] mt-1">
                          ₹{itemTotal} {unitPrice > 0 && <span className="text-gray-400 font-normal">(@₹{unitPrice})</span>}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#C9A24A]/40 rounded-lg bg-white p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant.size_label, -1)}
                          className="p-1 text-gray-500 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1F2937]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant.size_label, 1)}
                          className="p-1 text-gray-500 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant.size_label)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}

                {/* Delivery Locality in Indore */}
                <div className="pt-2 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#355E2C]" />
                      Indore Delivery Locality / Address:
                    </label>
                    <input
                      type="text"
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      placeholder="e.g. 576 Tilak Nagar / Palasia / Saket..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#C9A24A]/40 focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1">
                      Order Notes (Optional):
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Please deliver before evening Aarti..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#C9A24A]/40 focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-[#FAF7F0] border-t border-[#C9A24A]/25 space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#5B4524]">
                  <span>Total Items:</span>
                  <span className="font-bold text-[#1F2937]">{totalItemCount} Packs</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#1F2937] pt-1 border-t border-[#5B4524]/10">
                  <span>Estimated Total:</span>
                  <span className="text-[#355E2C]">₹{totalEstimatedPrice}</span>
                </div>
                <div className="text-[10px] text-gray-500 text-center pt-1">
                  ⚡ Final confirmation and payment method discussed directly on WhatsApp.
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] hover:from-[#E6C475] hover:to-[#B38728] text-[#1F2937] font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 pulse-whatsapp"
              >
                <MessageCircle className="w-5 h-5 text-[#1F2937]" />
                <span>Send WhatsApp Order ({totalItemCount} Items)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
