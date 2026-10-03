"use client";

import React, { useState } from "react";
import { Product, ProductVariant } from "@/types";
import { MessageCircle, Plus, Minus, Check, ShoppingBag, Eye, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToCart, orderSingleOnWhatsApp } = useCart();
  
  // Select first variant as default
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants && product.variants.length > 0
      ? product.variants[0]
      : { size_label: "500g", price: 50, discounted_price: 45, in_stock: true }
  );
  
  const [quantity, setQuantity] = useState(1);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    orderSingleOnWhatsApp(product, selectedVariant, quantity);
  };

  const currentPrice = selectedVariant.discounted_price || selectedVariant.price || 0;
  const originalPrice = selectedVariant.price;
  const hasDiscount = originalPrice && selectedVariant.discounted_price && originalPrice > selectedVariant.discounted_price;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#C9A24A]/25 luxury-card flex flex-col justify-between transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F0]">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#355E2C] text-[#FAF7F0] shadow-md border border-[#C9A24A]/30">
              {product.badge}
            </span>
          )}
          {product.category_id === 1 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A24A] text-[#1F2937] shadow-sm">
              ✨ 100% Vrat Pavitra
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#1F2937] hover:text-[#355E2C] flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Purity Guarantee Ribbon */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2.5 text-[11px] text-white font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#DFBA67]" />
          <span>FSSAI Certified • Fresh Stone Milled</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Product Name & Hindi Subtitle */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1F2937] group-hover:text-[#355E2C] transition-colors leading-snug">
                {product.name}
              </h3>
              {product.hindi_name && (
                <div className="text-xs font-medium text-[#5B4524]">
                  {product.hindi_name}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-[#5B4524] mt-2 line-clamp-2 leading-relaxed">
            {product.short_description || product.tagline}
          </p>

          {/* Benefits Tags */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.benefits.slice(0, 2).map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F0] border border-[#C9A24A]/25 text-[#355E2C]"
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Variant Selector (200g, 500g, 1kg) */}
        <div className="pt-2 border-t border-[#5B4524]/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#5B4524]">Select Pack Size:</span>
            {selectedVariant.sku && (
              <span className="text-[10px] text-gray-400 font-mono">{selectedVariant.sku}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.size_label === v.size_label;
              return (
                <button
                  key={v.size_label}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[#355E2C] text-[#FAF7F0] shadow-sm ring-2 ring-[#C9A24A]/50"
                      : "bg-[#FAF7F0] text-[#1F2937] hover:bg-[#C9A24A]/15 border border-[#C9A24A]/25"
                  }`}
                >
                  {v.size_label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Price & Quantity Row */}
        <div className="pt-2 border-t border-[#5B4524]/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estimated Price</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#1F2937]">
                ₹{currentPrice > 0 ? currentPrice * quantity : "On Request"}
              </span>
              {hasDiscount && currentPrice > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice! * quantity}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#C9A24A]/30 rounded-xl bg-[#FAF7F0] p-0.5">
            <button
              onClick={handleDecrement}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5B4524] hover:bg-[#C9A24A]/20 transition-colors"
              aria-label="Decrease Quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-[#1F2937]">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5B4524] hover:bg-[#C9A24A]/20 transition-colors"
              aria-label="Increase Quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons: WhatsApp Order (Primary) & Add to Tray (Secondary) */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {/* Primary Direct WhatsApp Order Button */}
          <button
            onClick={handleWhatsAppOrder}
            className="col-span-4 py-3 px-3 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] hover:from-[#E6C475] hover:to-[#B38728] text-[#1F2937] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn"
          >
            <MessageCircle className="w-4 h-4 text-[#1F2937] group-hover/btn:scale-110 transition-transform" />
            <span>Order on WhatsApp</span>
          </button>

          {/* Secondary Add to Order Tray Button */}
          <button
            onClick={handleAddToCart}
            className={`col-span-1 py-3 rounded-xl border flex items-center justify-center transition-all ${
              isAddedRecently
                ? "bg-[#355E2C] border-[#355E2C] text-white"
                : "bg-[#FAF7F0] border-[#C9A24A]/35 text-[#355E2C] hover:bg-[#C9A24A]/15"
            }`}
            title="Add to Order Tray"
          >
            {isAddedRecently ? (
              <Check className="w-4 h-4 text-[#DFBA67] animate-scale-in" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
