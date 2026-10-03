"use client";

import React, { useState } from "react";
import { Recipe } from "@/types";
import { RecipeModal } from "./RecipeModal";
import { Sparkles, Clock, ChefHat, ArrowRight, Utensils } from "lucide-react";

interface RecipesSectionProps {
  recipes: Recipe[];
}

export function RecipesSection({ recipes }: RecipesSectionProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = ["all", "Vrat Specials", "Traditional Rotis", "Healthy Staples"];

  const filteredRecipes = filterCategory === "all"
    ? recipes
    : recipes.filter((r) => r.category.toLowerCase().includes(filterCategory.toLowerCase().slice(0, 4)));

  return (
    <section id="recipes" className="py-20 bg-white relative overflow-hidden border-t border-[#C9A24A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A24A]/15 border border-[#C9A24A]/30 text-[#5B4524] text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>Traditional Kitchen Recipes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1F2937] tracking-tight">
            Authentic Dishes with <span className="text-[#355E2C]">Anjanam Flours</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5B4524] font-medium leading-relaxed">
            Discover time-honored Malwi and fasting delicacies crafted to perfection with our pure stone-milled flours.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                filterCategory === c
                  ? "bg-[#355E2C] text-[#FAF7F0] shadow-md ring-2 ring-[#C9A24A]/50"
                  : "bg-[#FAF7F0] text-[#1F2937] hover:bg-[#C9A24A]/15 border border-[#C9A24A]/25"
              }`}
            >
              {c === "all" ? "All Recipes" : c}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group cursor-pointer bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#C9A24A]/25 luxury-card flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img
                  src={recipe.image_url || "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#355E2C] text-[#FAF7F0] shadow-md">
                    {recipe.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#DFBA67]" />
                  <span>{recipe.total_time}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1F2937] group-hover:text-[#355E2C] transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  {recipe.hindi_title && (
                    <div className="text-xs text-[#5B4524] font-medium mt-0.5">
                      {recipe.hindi_title}
                    </div>
                  )}
                  <p className="text-xs text-[#5B4524] mt-2 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#5B4524]/10 flex items-center justify-between text-xs font-bold text-[#355E2C]">
                  <span>View Full Recipe & Prep</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A24A] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </section>
  );
}
