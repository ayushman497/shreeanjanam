"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, Recipe, FAQ, DistributorLead, ContactInquiry, DashboardOverview } from "@/types";
import { api } from "@/lib/api";
import {
  INITIAL_PRODUCTS, INITIAL_RECIPES, INITIAL_FAQS, BRAND_INFO
} from "@/lib/constants";
import {
  LayoutDashboard, Package, Utensils, Users, MessageSquare, HelpCircle,
  Settings, LogOut, Plus, Trash2, Edit, Check, X, ExternalLink, Phone,
  TrendingUp, Eye, MessageCircle, ShieldCheck, Sparkles, Building2, MapPin
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Data States
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS as any);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES as any);
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS as any);
  const [leads, setLeads] = useState<DistributorLead[]>([
    {
      id: 1,
      business_name: "Shree Mahalakshmi Kirana",
      owner_name: "Ramesh Chandra Sharma",
      phone: "9826012345",
      city: "Indore",
      state: "Madhya Pradesh",
      business_type: "Retail Store / Kirana",
      estimated_volume: "100-200 kg / month",
      message: "Interested in stocking Rajgira and Singhada aata for upcoming festival season.",
      status: "Contacted",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      business_name: "Malwa Organic Mart",
      owner_name: "Gaurav Joshi",
      phone: "9425098765",
      city: "Ujjain",
      state: "Madhya Pradesh",
      business_type: "Organic Grocery Store",
      estimated_volume: "250-500 kg / month",
      message: "Looking for distributor pricing and sample kits.",
      status: "New",
      created_at: new Date().toISOString()
    }
  ]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([
    {
      id: 1,
      name: "Sunita Verma",
      phone: "9893011223",
      email: "sunita.v@gmail.com",
      subject: "Vrat Flour Delivery in Palasia",
      message: "Can you deliver 2 packs of Rajgira Aata and 1 pack of Mix Fariyali Aata by tomorrow morning in Palasia?",
      status: "Unread",
      created_at: new Date().toISOString()
    }
  ]);

  // Modals
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    hindi_name: "",
    slug: "",
    category_id: 1,
    tagline: "",
    short_description: "",
    description: "",
    benefits: "100% Gluten-Free, High in Protein",
    purity_highlights: "Traditional Stone Milled, No Preservatives",
    image_url: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    is_featured: true,
    variants: [
      { size_label: "500g", price: 60, discounted_price: 55, in_stock: true },
      { size_label: "1kg", price: 110, discounted_price: 100, in_stock: true }
    ]
  });

  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", category: "General" });

  useEffect(() => {
    const savedToken = localStorage.getItem("anjanam_admin_token");
    if (!savedToken) {
      router.push("/admin/login");
      return;
    }
    setToken(savedToken);

    // Fetch initial admin data from API if connected
    async function loadAdminData() {
      try {
        const [prods, recs, faqList] = await Promise.all([
          api.getProducts(),
          api.getRecipes(),
          api.getFAQs(),
        ]);
        if (prods && prods.length > 0) setProducts(prods);
        if (recs && recs.length > 0) setRecipes(recs);
        if (faqList && faqList.length > 0) setFaqs(faqList);

        if (savedToken) {
          const ov = await api.getAdminOverview(savedToken).catch(() => null);
          if (ov) setOverview(ov);
          const lds = await api.getAdminLeads(savedToken).catch(() => null);
          if (lds && lds.length > 0) setLeads(lds);
        }
      } catch (e) {}
    }

    loadAdminData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("anjanam_admin_token");
    localStorage.removeItem("anjanam_admin_user");
    router.push("/admin/login");
  };

  // Product Actions
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: Date.now(),
      name: newProduct.name,
      hindi_name: newProduct.hindi_name,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/\s+/g, "-"),
      category_id: Number(newProduct.category_id),
      tagline: newProduct.tagline,
      short_description: newProduct.short_description,
      description: newProduct.description,
      benefits: newProduct.benefits.split(",").map((s) => s.trim()),
      purity_highlights: newProduct.purity_highlights.split(",").map((s) => s.trim()),
      image_url: newProduct.image_url,
      badge: newProduct.badge,
      is_featured: newProduct.is_featured,
      is_active: true,
      variants: newProduct.variants
    };

    setProducts([created, ...products]);
    setShowAddProductModal(false);
    alert(`Product '${created.name}' created successfully!`);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // FAQ Actions
  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FAQ = {
      id: Date.now(),
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category,
      is_active: true
    };
    setFaqs([...faqs, created]);
    setShowAddFaqModal(false);
    setNewFaq({ question: "", answer: "", category: "General" });
  };

  const handleDeleteFaq = (id: number) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  // Lead Status Toggle
  const handleUpdateLeadStatus = (leadId: number, status: string) => {
    setLeads(leads.map((l) => (l.id === leadId ? { ...l, status } : l)));
  };

  const navItems = [
    { id: "overview", label: "Overview & Metrics", icon: LayoutDashboard },
    { id: "products", label: "Products & Variants", icon: Package, count: products.length },
    { id: "recipes", label: "Recipes Manager", icon: Utensils, count: recipes.length },
    { id: "leads", label: "Distributor B2B Leads", icon: Building2, count: leads.length },
    { id: "inquiries", label: "Contact Messages", icon: MessageSquare, count: inquiries.length },
    { id: "faqs", label: "FAQ Management", icon: HelpCircle, count: faqs.length },
    { id: "settings", label: "SEO & Store Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col md:flex-row">
      {/* Sidebar Navigation (Light Theme) */}
      <aside className="w-full md:w-64 bg-white text-[#1F2937] flex flex-col justify-between p-5 border-r border-[#C9A24A]/25 shadow-sm flex-shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#5B4524]/10 mb-6">
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-[#DFBA67] to-[#C9A24A] shadow-md flex-shrink-0 overflow-hidden bg-white">
              <img src="/logo.png" alt="Anjanam Foods" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif font-black text-base text-[#1F2937] leading-tight">
                Anjanam Admin
              </h2>
              <p className="text-[10px] text-[#355E2C] font-bold">Indore Management Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#355E2C] text-[#FAF7F0] shadow-md font-bold"
                      : "text-[#5B4524] hover:bg-[#FAF7F0] hover:text-[#1F2937]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive ? "bg-[#DFBA67] text-[#1F2937]" : "bg-[#FAF7F0] text-[#5B4524] border border-[#C9A24A]/25"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar Actions */}
        <div className="pt-6 border-t border-[#5B4524]/10 space-y-2">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-[#5B4524] hover:bg-[#FAF7F0] hover:text-[#355E2C] transition-colors font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>Open Public Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#5B4524]/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#1F2937]">
              {navItems.find((i) => i.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-[#5B4524] mt-0.5">
              Live data from Indore flagship facility • 576 Tilak Nagar Main Road
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#355E2C]/10 text-[#355E2C] text-xs font-bold border border-[#355E2C]/20">
              <span className="w-2 h-2 rounded-full bg-[#355E2C] animate-pulse" />
              API Connected
            </span>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW & METRICS ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 4 Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#5B4524]">
                  <span className="text-xs font-bold uppercase tracking-wider">WhatsApp Clicks</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-black text-[#1F2937]">
                  {overview?.total_whatsapp_clicks || 48}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> High Conversion Traffic
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#5B4524]">
                  <span className="text-xs font-bold uppercase tracking-wider">Distributor Leads</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-black text-[#1F2937]">
                  {leads.length}
                </div>
                <div className="text-[11px] text-amber-600 font-semibold">
                  Indore & Regional Partners
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#5B4524]">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Flours</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-black text-[#1F2937]">
                  {products.length}
                </div>
                <div className="text-[11px] text-blue-600 font-semibold">
                  Across 3 Signature Categories
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#5B4524]">
                  <span className="text-xs font-bold uppercase tracking-wider">Contact Inquiries</span>
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-black text-[#1F2937]">
                  {inquiries.length}
                </div>
                <div className="text-[11px] text-purple-600 font-semibold">
                  Direct Customer Requests
                </div>
              </div>
            </div>

            {/* Top WhatsApp Products & Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Top Products */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1F2937]">
                  Most Inquired Flours (WhatsApp)
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Rajgira Aata (200g, 500g, 1kg)", clicks: 28, pct: 85 },
                    { name: "Singhada Aata (200g, 500g, 1kg)", clicks: 22, pct: 70 },
                    { name: "Mix Fariyali Aata (Master Blend)", clicks: 19, pct: 60 },
                    { name: "Makka Aata (Yellow Corn)", clicks: 14, pct: 45 },
                    { name: "Bajra Aata (Pearl Millet)", clicks: 11, pct: 35 },
                  ].map((it) => (
                    <div key={it.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#1F2937]">{it.name}</span>
                        <span className="text-[#355E2C]">{it.clicks} clicks</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#DFBA67] to-[#355E2C] rounded-full"
                          style={{ width: `${it.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Distributor Inquiries */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[#1F2937]">
                    Recent Distributor Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-bold text-[#355E2C] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400">
                        <th className="pb-2">Business</th>
                        <th className="pb-2">Owner / City</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-medium">
                      {leads.slice(0, 3).map((lead) => (
                        <tr key={lead.id}>
                          <td className="py-2.5 font-bold text-[#1F2937]">
                            {lead.business_name}
                          </td>
                          <td className="py-2.5 text-[#5B4524]">
                            {lead.owner_name} ({lead.city})
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7F0] text-[#355E2C] border border-[#C9A24A]/30">
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <a
                              href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.owner_name)},%20thank%20you%20for%20contacting%20Anjanam%20Foods.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                            >
                              <MessageCircle className="w-3 h-3" /> Chat
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS MANAGER ================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#1F2937]">
                  Product Catalog ({products.length})
                </h3>
                <p className="text-xs text-[#5B4524]">Manage sizes, prices, and fastings badges.</p>
              </div>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#355E2C] hover:bg-[#24411E] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#DFBA67]" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl p-5 border border-[#C9A24A]/25 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="flex gap-4">
                    <img
                      src={p.image_url || "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"}
                      alt={p.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-[#C9A24A]/20 bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF7F0] text-[#355E2C] border border-[#C9A24A]/30">
                            {p.badge}
                          </span>
                        )}
                        {p.is_featured && (
                          <span className="text-[10px] font-bold text-amber-600">★ Featured</span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-[#1F2937] text-base truncate mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#5B4524] truncate">{p.hindi_name}</p>
                    </div>
                  </div>

                  {/* Variants Pills */}
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#C9A24A]/20 space-y-1">
                    <div className="text-[11px] font-bold text-[#355E2C]">Pack Sizes & Pricing:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.variants.map((v) => (
                        <span key={v.size_label} className="text-[11px] px-2 py-0.5 bg-white rounded border border-[#C9A24A]/30 text-[#1F2937] font-semibold">
                          {v.size_label}: ₹{v.discounted_price || v.price}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400 font-mono">ID: {p.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: RECIPES MANAGER ================= */}
        {activeTab === "recipes" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#1F2937]">
                  Traditional Recipes ({recipes.length})
                </h3>
                <p className="text-xs text-[#5B4524]">Culinary instructions for customer kitchen guidance.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((r) => (
                <div key={r.id} className="bg-white rounded-3xl p-5 border border-[#C9A24A]/25 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF7F0] text-[#355E2C] border border-[#C9A24A]/30">
                      {r.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{r.total_time}</span>
                  </div>
                  <h4 className="font-serif font-bold text-[#1F2937] text-base">
                    {r.title}
                  </h4>
                  <p className="text-xs text-[#5B4524] line-clamp-2 leading-relaxed">
                    {r.description}
                  </p>
                  <div className="text-[11px] text-gray-500">
                    <strong>Ingredients:</strong> {r.ingredients.length} items • <strong>Steps:</strong> {r.instructions.length} steps
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: DISTRIBUTOR LEADS ================= */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1F2937]">
                Distributor & Wholesale Leads ({leads.length})
              </h3>
              <p className="text-xs text-[#5B4524]">Inquiries received through the Partner form.</p>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-white p-6 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-lg text-[#1F2937]">
                          {lead.business_name}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF7F0] text-[#355E2C] border border-[#C9A24A]/30">
                          {lead.business_type}
                        </span>
                      </div>
                      <p className="text-xs text-[#5B4524]">
                        Owner: <strong>{lead.owner_name}</strong> • City: <strong>{lead.city}, {lead.state}</strong>
                      </p>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] font-bold text-[#1F2937]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Converted">Converted Partner</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FAF7F0] p-4 rounded-2xl border border-[#C9A24A]/20">
                    <div>
                      <span className="font-bold text-[#355E2C]">Phone:</span> {lead.phone}
                    </div>
                    <div>
                      <span className="font-bold text-[#355E2C]">Est. Volume:</span> {lead.estimated_volume || "Not specified"}
                    </div>
                    {lead.message && (
                      <div className="sm:col-span-2">
                        <span className="font-bold text-[#355E2C]">Message:</span> {lead.message}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-gray-400">
                      Received: {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.owner_name)},%20I%20am%20from%20Anjanam%20Foods%20Indore.%20Regarding%20your%20distributor%20inquiry%20for%20${encodeURIComponent(lead.business_name)}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFBA67] via-[#C9A24A] to-[#A98028] text-[#1F2937] font-bold text-xs shadow-sm flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Talk on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CONTACT INQUIRIES ================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1F2937]">
                Customer Inquiries Inbox ({inquiries.length})
              </h3>
              <p className="text-xs text-[#5B4524]">Messages submitted via website contact form.</p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-6 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1F2937]">{inq.name}</h4>
                      <p className="text-xs text-[#5B4524]">Phone: {inq.phone} {inq.email && `• ${inq.email}`}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF7F0] text-[#355E2C] border border-[#C9A24A]/30">
                      {inq.subject}
                    </span>
                  </div>
                  <div className="p-3.5 bg-[#FAF7F0] rounded-xl text-xs text-[#1F2937] border border-[#C9A24A]/20">
                    {inq.message}
                  </div>
                  <div className="text-right">
                    <a
                      href={`https://wa.me/91${inq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Anjanam%20Foods%20Indore.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Reply on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: FAQS MANAGER ================= */}
        {activeTab === "faqs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#1F2937]">
                  FAQ Management ({faqs.length})
                </h3>
                <p className="text-xs text-[#5B4524]">Edit customer questions & answers.</p>
              </div>
              <button
                onClick={() => setShowAddFaqModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#355E2C] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#DFBA67]" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white p-5 rounded-2xl border border-[#C9A24A]/25 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base text-[#1F2937]">
                      {faq.question}
                    </h4>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#5B4524] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: SEO & SETTINGS ================= */}
        {activeTab === "settings" && (
          <div className="bg-white p-8 rounded-3xl border border-[#C9A24A]/25 shadow-sm space-y-6 max-w-3xl">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1F2937]">
                Store Coordinates & SEO Meta
              </h3>
              <p className="text-xs text-[#5B4524]">Official brand details published to search engines.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Brand Name</label>
                <input
                  type="text"
                  disabled
                  value={BRAND_INFO.name}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Brand Tagline</label>
                <input
                  type="text"
                  disabled
                  value={BRAND_INFO.tagline}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Primary WhatsApp Number</label>
                <input
                  type="text"
                  disabled
                  value={BRAND_INFO.whatsappNumber}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Store Phone</label>
                <input
                  type="text"
                  disabled
                  value={BRAND_INFO.phone}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#1F2937] mb-1">Indore Address</label>
                <input
                  type="text"
                  disabled
                  value={BRAND_INFO.address}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#1F2937] mb-1">Target Search Keywords</label>
                <textarea
                  rows={2}
                  disabled
                  value="Vrat Aata Indore, Rajgira Aata Indore, Singhada Aata Indore, Natural Flour Indore, Fariyali Aata Indore, Anjanam Foods"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#C9A24A]/30 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="font-serif font-bold text-lg text-[#1F2937]">Create New Flour Product</h3>
                <button onClick={() => setShowAddProductModal(false)}><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Samo (Moraiyo) Flour"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#1F2937] mb-1">Hindi Title</label>
                    <input
                      type="text"
                      value={newProduct.hindi_name}
                      onChange={(e) => setNewProduct({ ...newProduct, hindi_name: e.target.value })}
                      placeholder="e.g. सामो / मोरधन आटा"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#1F2937] mb-1">Category</label>
                    <select
                      value={newProduct.category_id}
                      onChange={(e) => setNewProduct({ ...newProduct, category_id: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    >
                      <option value={1}>Vrat Collection</option>
                      <option value={2}>Traditional Grain Collection</option>
                      <option value={3}>Healthy Staples</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Short Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={newProduct.short_description}
                    onChange={(e) => setNewProduct({ ...newProduct, short_description: e.target.value })}
                    placeholder="Freshly milled fasting grain for fluffy texture..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#355E2C] text-white font-bold text-xs shadow-md mt-2"
                >
                  Save Product to Catalog
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add FAQ */}
        {showAddFaqModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#C9A24A]/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="font-serif font-bold text-lg text-[#1F2937]">Add New FAQ</h3>
                <button onClick={() => setShowAddFaqModal(false)}><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Question *</label>
                  <input
                    type="text"
                    required
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    placeholder="e.g. Can we customize the milling coarseness?"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Answer *</label>
                  <textarea
                    rows={3}
                    required
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    placeholder="Yes, we can prepare custom coarse or fine milling upon WhatsApp request..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#355E2C] text-white font-bold text-xs shadow-md"
                >
                  Publish FAQ
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
