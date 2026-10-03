"use client";

import React from "react";
import { Recipe } from "@/types";
import { X, Clock, Users, ChefHat, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  const handleOrderFlour = () => {
    const url = generateGeneralWhatsAppUrl(
      `Hello Anjanam Foods, I saw your recipe for *${recipe.title}* on your website and would like to order the authentic pure flour for it in Indore.`
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#C9A24A]/30 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with Background Photo */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#FAF7F0] flex-shrink-0">
          <img
            src={recipe.image_url || "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Recipe Title & Category */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-[#C9A24A] text-[#1F2937]">
              {recipe.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
              {recipe.title}
            </h3>
            {recipe.hindi_title && (
              <p className="text-xs text-[#DFBA67] font-medium">{recipe.hindi_title}</p>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#1F2937]">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 bg-[#FAF7F0] p-4 rounded-2xl border border-[#C9A24A]/25 text-center text-xs font-semibold">
            <div className="flex flex-col items-center gap-1">
              <Clock className="w-4 h-4 text-[#355E2C]" />
              <span className="text-gray-500 text-[10px]">Prep / Cook Time</span>
              <span className="text-[#1F2937] font-bold">{recipe.prep_time} / {recipe.cook_time}</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-[#C9A24A]/20">
              <Users className="w-4 h-4 text-[#355E2C]" />
              <span className="text-gray-500 text-[10px]">Servings</span>
              <span className="text-[#1F2937] font-bold">{recipe.servings}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ChefHat className="w-4 h-4 text-[#355E2C]" />
              <span className="text-gray-500 text-[10px]">Difficulty</span>
              <span className="text-[#355E2C] font-bold">{recipe.difficulty}</span>
            </div>
          </div>

          <p className="text-sm text-[#5B4524] leading-relaxed">
            {recipe.description}
          </p>

          {/* Ingredients & Instructions 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Ingredients */}
            <div className="md:col-span-5 bg-[#FAF7F0] p-5 rounded-2xl border border-[#C9A24A]/20 space-y-3">
              <h4 className="font-serif font-bold text-[#355E2C] text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C9A24A]" /> Ingredients
              </h4>
              <ul className="space-y-2 text-xs text-[#1F2937]">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24A] flex-shrink-0 mt-0.5" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="font-serif font-bold text-[#1F2937] text-sm uppercase tracking-wider">
                Step-by-Step Method
              </h4>
              <div className="space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#355E2C] text-[#FAF7F0] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-[#5B4524]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chef's Secret Tip */}
          {recipe.chef_tips && (
            <div className="bg-[#FAF7F0] border-l-4 border-[#C9A24A] p-4 rounded-r-2xl">
              <div className="text-xs font-bold text-[#355E2C] mb-1 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#C9A24A]" /> Chef's Purity Tip:
              </div>
              <p className="text-xs text-[#5B4524] leading-relaxed">
                {recipe.chef_tips}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-[#FAF7F0] border-t border-[#C9A24A]/20 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-[#5B4524]">
            Want the purest flour for this recipe?
          </div>
          <button
            onClick={handleOrderFlour}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] text-[#1F2937] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#1F2937]" />
            <span>Order Required Flour on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
