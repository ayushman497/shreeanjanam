export interface ProductVariant {
  id?: number;
  product_id?: number;
  size_label: string; // e.g. "200g", "500g", "1kg"
  weight_grams?: number;
  price?: number;
  discounted_price?: number;
  in_stock: boolean;
  sku?: string;
  order_index?: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  badge?: string;
  image_url?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface Product {
  id: number;
  name: string;
  hindi_name?: string;
  slug: string;
  category_id?: number;
  category?: ProductCategory;
  tagline?: string;
  short_description?: string;
  description?: string;
  benefits: string[];
  purity_highlights: string[];
  ingredients?: string;
  shelf_life?: string;
  image_url?: string;
  gallery_images?: string[];
  badge?: string;
  is_featured?: boolean;
  is_active?: boolean;
  order_index?: number;
  variants: ProductVariant[];
  created_at?: string;
  updated_at?: string;
}

export interface Recipe {
  id: number;
  title: string;
  hindi_title?: string;
  slug: string;
  product_id?: number;
  product?: Product;
  description?: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  servings: string;
  difficulty: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  chef_tips?: string;
  image_url?: string;
  is_featured?: boolean;
  is_active?: boolean;
  order_index?: number;
  created_at?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order_index?: number;
  is_active?: boolean;
}

export interface DistributorLead {
  id: number;
  business_name: string;
  owner_name: string;
  phone: string;
  email?: string;
  city: string;
  state: string;
  business_type: string;
  estimated_volume?: string;
  message?: string;
  status: string;
  notes?: string;
  created_at: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface WhatsAppClick {
  id?: number;
  product_name?: string;
  variant?: string;
  quantity?: number;
  source_page: string;
  order_items_json?: any;
  created_at?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  is_admin: boolean;
}

export interface DashboardOverview {
  total_products: number;
  total_recipes: number;
  total_distributor_leads: number;
  total_contact_inquiries: number;
  total_whatsapp_clicks: number;
  recent_leads: DistributorLead[];
  recent_inquiries: ContactInquiry[];
  top_whatsapp_products: { product: string; clicks: number }[];
}
