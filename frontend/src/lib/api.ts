import {
  Product, ProductCategory, Recipe, FAQ, DistributorLead, ContactInquiry,
  WhatsAppClick, DashboardOverview, AdminUser
} from "@/types";
import {
  INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_RECIPES, INITIAL_FAQS
} from "./constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

async function fetchWithFallback<T>(url: string, fallbackData: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      return fallbackData;
    }
    return await res.json();
  } catch (err) {
    // Return fallback silently if backend is offline/starting
    return fallbackData;
  }
}

export const api = {
  // Public Products & Categories
  async getCategories(): Promise<ProductCategory[]> {
    return fetchWithFallback<ProductCategory[]>("/products/categories", INITIAL_CATEGORIES as any);
  },

  async getProducts(params?: { categorySlug?: string; isFeatured?: boolean; search?: string }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.categorySlug) query.set("category_slug", params.categorySlug);
    if (params?.isFeatured !== undefined) query.set("is_featured", String(params.isFeatured));
    if (params?.search) query.set("search", params.search);

    const qs = query.toString() ? `?${query.toString()}` : "";
    return fetchWithFallback<Product[]>(`/products${qs}`, INITIAL_PRODUCTS as any);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const fallback = INITIAL_PRODUCTS.find((p) => p.slug === slug) || null;
    return fetchWithFallback<Product | null>(`/products/slug/${slug}`, fallback as any);
  },

  // Recipes
  async getRecipes(params?: { category?: string; isFeatured?: boolean; search?: string }): Promise<Recipe[]> {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.isFeatured !== undefined) query.set("is_featured", String(params.isFeatured));
    if (params?.search) query.set("search", params.search);

    const qs = query.toString() ? `?${query.toString()}` : "";
    return fetchWithFallback<Recipe[]>(`/recipes${qs}`, INITIAL_RECIPES as any);
  },

  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    const fallback = INITIAL_RECIPES.find((r) => r.slug === slug) || null;
    return fetchWithFallback<Recipe | null>(`/recipes/slug/${slug}`, fallback as any);
  },

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    return fetchWithFallback<FAQ[]>("/faqs", INITIAL_FAQS as any);
  },

  // Leads
  async submitDistributorLead(data: {
    business_name: string;
    owner_name: string;
    phone: string;
    email?: string;
    city: string;
    state?: string;
    business_type?: string;
    estimated_volume?: string;
    message?: string;
  }): Promise<DistributorLead> {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/distributor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit lead");
      return await res.json();
    } catch (e) {
      // Return a simulated saved response if offline
      return {
        id: Date.now(),
        business_name: data.business_name,
        owner_name: data.owner_name,
        phone: data.phone,
        city: data.city,
        state: data.state || "Madhya Pradesh",
        business_type: data.business_type || "Retail Store",
        status: "New",
        created_at: new Date().toISOString()
      };
    }
  },

  async submitContactInquiry(data: {
    name: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
  }): Promise<ContactInquiry> {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit contact");
      return await res.json();
    } catch (e) {
      return {
        id: Date.now(),
        name: data.name,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: "Unread",
        created_at: new Date().toISOString()
      };
    }
  },

  // Analytics
  async trackWhatsAppClick(data: {
    product_name?: string;
    variant?: string;
    quantity?: number;
    source_page: string;
    order_items_json?: any;
  }): Promise<void> {
    try {
      fetch(`${API_BASE_URL}/analytics/track-whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    } catch (e) {}
  },

  async trackPageView(pageUrl: string): Promise<void> {
    try {
      fetch(`${API_BASE_URL}/analytics/track-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "page_view",
          page_url: pageUrl,
        }),
      }).catch(() => {});
    } catch (e) {}
  },

  // Admin API Methods
  async adminLogin(username: string, password: string): Promise<{ access_token: string; user: AdminUser }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Invalid credentials" }));
      throw new Error(err.detail || "Authentication failed");
    }
    return await res.json();
  },

  async getAdminOverview(token: string): Promise<DashboardOverview> {
    const res = await fetch(`${API_BASE_URL}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Unauthorized");
    return await res.json();
  },

  async getAdminProducts(token: string): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch admin products");
    return await res.json();
  },

  async createProduct(token: string, productData: any): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error("Failed to create product");
    return await res.json();
  },

  async updateProduct(token: string, id: number, productData: any): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error("Failed to update product");
    return await res.json();
  },

  async deleteProduct(token: string, id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete product");
  },

  async getAdminRecipes(token: string): Promise<Recipe[]> {
    const res = await fetch(`${API_BASE_URL}/admin/recipes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return await res.json();
  },

  async getAdminLeads(token: string): Promise<DistributorLead[]> {
    const res = await fetch(`${API_BASE_URL}/admin/leads`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch leads");
    return await res.json();
  },

  async updateLeadStatus(token: string, id: number, status: string, notes?: string): Promise<DistributorLead> {
    const res = await fetch(`${API_BASE_URL}/admin/leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error("Failed to update lead");
    return await res.json();
  },

  async getAdminInquiries(token: string): Promise<ContactInquiry[]> {
    const res = await fetch(`${API_BASE_URL}/admin/inquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch inquiries");
    return await res.json();
  }
};
