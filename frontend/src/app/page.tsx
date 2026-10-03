"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductCategory, Recipe, FAQ } from "@/types";
import { api } from "@/lib/api";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_RECIPES, INITIAL_FAQS } from "@/lib/constants";
import { Hero } from "@/components/ui/Hero";
import { WhyChooseUs } from "@/components/ui/WhyChooseUs";
import { CategoriesSection } from "@/components/ui/CategoriesSection";
import { AboutStory } from "@/components/ui/AboutStory";
import { RecipesSection } from "@/components/ui/RecipesSection";
import { DistributorSection } from "@/components/ui/DistributorSection";
import { FAQSection } from "@/components/ui/FAQSection";
import { ContactSection } from "@/components/ui/ContactSection";
import { ProductOrderModal } from "@/components/ui/ProductOrderModal";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [categories, setCategories] = useState<ProductCategory[]>(INITIAL_CATEGORIES as any);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS as any);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES as any);
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS as any);

  const { selectedProductForModal, setSelectedProductForModal } = useCart();

  useEffect(() => {
    // Track Page View
    api.trackPageView(window.location.href);

    // Fetch dynamic live data from backend if running
    async function loadData() {
      try {
        const [cats, prods, recs, faqList] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
          api.getRecipes(),
          api.getFAQs(),
        ]);

        if (cats && cats.length > 0) setCategories(cats);
        if (prods && prods.length > 0) setProducts(prods);
        if (recs && recs.length > 0) setRecipes(recs);
        if (faqList && faqList.length > 0) setFaqs(faqList);
      } catch (e) {
        // Fallbacks already initialized
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Why Choose Us */}
      <WhyChooseUs />

      {/* 3. Products & Categories Section */}
      <CategoriesSection
        categories={categories}
        products={products}
        onOpenProductDetails={(prod) => setSelectedProductForModal(prod)}
      />

      {/* 4. About Us Storytelling Section */}
      <AboutStory />

      {/* 5. Traditional Recipes Section */}
      <RecipesSection recipes={recipes} />

      {/* 6. Distributor & B2B Section */}
      <DistributorSection />

      {/* 7. FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* 8. Contact & Store Section */}
      <ContactSection />

      {/* Product Detail & Custom Order Dialog */}
      <ProductOrderModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  );
}
