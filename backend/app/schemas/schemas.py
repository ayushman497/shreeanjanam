from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Any, Dict
from datetime import datetime

# ================= USER / AUTH =================
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    is_admin: bool = True
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class UserOut(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class LoginRequest(BaseModel):
    username: str
    password: str

# ================= PRODUCT CATEGORY =================
class ProductCategoryBase(BaseModel):
    name: str
    slug: str
    tagline: Optional[str] = None
    description: Optional[str] = None
    badge: Optional[str] = None
    image_url: Optional[str] = None
    order_index: int = 0
    is_active: bool = True

class ProductCategoryCreate(ProductCategoryBase):
    pass

class ProductCategoryOut(ProductCategoryBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# ================= PRODUCT VARIANT =================
class ProductVariantBase(BaseModel):
    size_label: str
    weight_grams: Optional[int] = None
    price: Optional[float] = None
    discounted_price: Optional[float] = None
    in_stock: bool = True
    sku: Optional[str] = None
    order_index: int = 0

class ProductVariantCreate(ProductVariantBase):
    product_id: Optional[int] = None

class ProductVariantOut(ProductVariantBase):
    id: int
    product_id: int
    class Config:
        from_attributes = True

# ================= PRODUCT =================
class ProductBase(BaseModel):
    name: str
    hindi_name: Optional[str] = None
    slug: str
    category_id: Optional[int] = None
    tagline: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    benefits: List[str] = []
    purity_highlights: List[str] = []
    ingredients: str = "100% Pure Grains"
    shelf_life: str = "6 Months from packaging"
    image_url: Optional[str] = None
    gallery_images: List[str] = []
    badge: Optional[str] = None
    is_featured: bool = False
    is_active: bool = True
    order_index: int = 0

class ProductCreate(ProductBase):
    variants: Optional[List[ProductVariantBase]] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    hindi_name: Optional[str] = None
    slug: Optional[str] = None
    category_id: Optional[int] = None
    tagline: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    benefits: Optional[List[str]] = None
    purity_highlights: Optional[List[str]] = None
    ingredients: Optional[str] = None
    shelf_life: Optional[str] = None
    image_url: Optional[str] = None
    gallery_images: Optional[List[str]] = None
    badge: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    order_index: Optional[int] = None

class ProductOut(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    variants: List[ProductVariantOut] = []
    category: Optional[ProductCategoryOut] = None
    class Config:
        from_attributes = True

# ================= RECIPE =================
class RecipeBase(BaseModel):
    title: str
    hindi_title: Optional[str] = None
    slug: str
    product_id: Optional[int] = None
    description: Optional[str] = None
    prep_time: str = "15 mins"
    cook_time: str = "15 mins"
    total_time: str = "30 mins"
    servings: str = "4 Persons"
    difficulty: str = "Easy"
    category: str = "Vrat Recipe"
    ingredients: List[str] = []
    instructions: List[str] = []
    chef_tips: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = True
    is_active: bool = True
    order_index: int = 0

class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(BaseModel):
    title: Optional[str] = None
    hindi_title: Optional[str] = None
    slug: Optional[str] = None
    product_id: Optional[int] = None
    description: Optional[str] = None
    prep_time: Optional[str] = None
    cook_time: Optional[str] = None
    total_time: Optional[str] = None
    servings: Optional[str] = None
    difficulty: Optional[str] = None
    category: Optional[str] = None
    ingredients: Optional[List[str]] = None
    instructions: Optional[List[str]] = None
    chef_tips: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    order_index: Optional[int] = None

class RecipeOut(RecipeBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# ================= FAQ =================
class FAQBase(BaseModel):
    question: str
    answer: str
    category: str = "General"
    order_index: int = 0
    is_active: bool = True

class FAQCreate(FAQBase):
    pass

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    order_index: Optional[int] = None
    is_active: Optional[bool] = None

class FAQOut(FAQBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# ================= LEADS =================
class DistributorLeadCreate(BaseModel):
    business_name: str
    owner_name: str
    phone: str
    email: Optional[str] = None
    city: str
    state: str = "Madhya Pradesh"
    business_type: str = "Retail Store / Kirana"
    estimated_volume: Optional[str] = None
    message: Optional[str] = None

class DistributorLeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class DistributorLeadOut(DistributorLeadCreate):
    id: int
    status: str
    notes: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class ContactInquiryCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    subject: str = "General Inquiry"
    message: str

class ContactInquiryUpdate(BaseModel):
    status: Optional[str] = None

class ContactInquiryOut(ContactInquiryCreate):
    id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

# ================= ANALYTICS =================
class WhatsAppClickCreate(BaseModel):
    product_name: Optional[str] = None
    variant: Optional[str] = None
    quantity: int = 1
    source_page: str = "product_card"
    order_items_json: Optional[Any] = None

class WhatsAppClickOut(WhatsAppClickCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class AnalyticsEventCreate(BaseModel):
    event_type: str
    page_url: Optional[str] = None
    meta_info: Optional[Dict[str, Any]] = None

# ================= CONTENT & SEO =================
class WebsiteContentCreate(BaseModel):
    section_key: str
    title: Optional[str] = None
    subtitle: Optional[str] = None
    content_json: Dict[str, Any] = {}

class WebsiteContentOut(WebsiteContentCreate):
    id: int
    updated_at: datetime
    class Config:
        from_attributes = True

class SEOSettingsCreate(BaseModel):
    page_slug: str
    meta_title: str
    meta_description: str
    keywords: Optional[str] = None
    og_image_url: Optional[str] = None
    canonical_url: Optional[str] = None
    structured_data: Dict[str, Any] = {}

class SEOSettingsOut(SEOSettingsCreate):
    id: int
    updated_at: datetime
    class Config:
        from_attributes = True

class DashboardOverview(BaseModel):
    total_products: int
    total_recipes: int
    total_distributor_leads: int
    total_contact_inquiries: int
    total_whatsapp_clicks: int
    recent_leads: List[DistributorLeadOut]
    recent_inquiries: List[ContactInquiryOut]
    top_whatsapp_products: List[Dict[str, Any]]
