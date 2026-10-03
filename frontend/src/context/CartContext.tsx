"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant, CartItem } from "@/types";
import { generateSingleOrderWhatsAppUrl, generateMultiOrderWhatsAppUrl } from "@/lib/whatsapp";
import { api } from "@/lib/api";
import confetti from "canvas-confetti";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: number, variantLabel: string) => void;
  updateQuantity: (productId: number, variantLabel: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemCount: number;
  totalEstimatedPrice: number;
  orderSingleOnWhatsApp: (
    product: Product,
    variant: ProductVariant,
    quantity: number,
    deliveryArea?: string,
    notes?: string
  ) => void;
  orderCartOnWhatsApp: (deliveryArea?: string, notes?: string) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("anjanam_cart_items");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("anjanam_cart_items", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.variant.size_label === variant.size_label
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, variant, quantity }];
      }
    });

    // Fire subtle burst confetti
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#C9A24A", "#355E2C", "#FAF7F0"]
      });
    } catch (e) {}
  };

  const removeFromCart = (productId: number, variantLabel: string) => {
    setItems((prev) =>
      prev.filter(
        (it) => !(it.product.id === productId && it.variant.size_label === variantLabel)
      )
    );
  };

  const updateQuantity = (productId: number, variantLabel: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((it) => {
          if (it.product.id === productId && it.variant.size_label === variantLabel) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  const totalEstimatedPrice = items.reduce((acc, it) => {
    const unitPrice = it.variant.discounted_price || it.variant.price || 0;
    return acc + unitPrice * it.quantity;
  }, 0);

  const orderSingleOnWhatsApp = (
    product: Product,
    variant: ProductVariant,
    quantity: number,
    deliveryArea?: string,
    notes?: string
  ) => {
    // Track click
    api.trackWhatsAppClick({
      product_name: product.name,
      variant: variant.size_label,
      quantity,
      source_page: "product_modal"
    });

    // Trigger Festive Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#C9A24A", "#355E2C", "#5B4524"]
      });
    } catch (e) {}

    const url = generateSingleOrderWhatsAppUrl({
      productName: product.name,
      variant: variant.size_label,
      quantity,
      price: variant.discounted_price || variant.price,
      deliveryArea,
      notes
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const orderCartOnWhatsApp = (deliveryArea?: string, notes?: string) => {
    if (items.length === 0) return;

    api.trackWhatsAppClick({
      source_page: "cart_tray",
      quantity: totalItemCount,
      order_items_json: items.map((i) => ({
        name: i.product.name,
        size: i.variant.size_label,
        quantity: i.quantity,
      }))
    });

    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#C9A24A", "#355E2C", "#FAF7F0"]
      });
    } catch (e) {}

    const url = generateMultiOrderWhatsAppUrl(items, deliveryArea, notes);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItemCount,
        totalEstimatedPrice,
        orderSingleOnWhatsApp,
        orderCartOnWhatsApp,
        selectedProductForModal,
        setSelectedProductForModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
