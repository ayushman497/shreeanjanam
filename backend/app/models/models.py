import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float, Index, JSON
)
from sqlalchemy.orm import relationship
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_admin = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class ProductCategory(Base):
    __tablename__ = "product_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    tagline = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    badge = Column(String(100), nullable=True)
    image_url = Column(String(500), nullable=True)
    order_index = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True, nullable=False)
    hindi_name = Column(String(200), nullable=True)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    category_id = Column(Integer, ForeignKey("product_categories.id", ondelete="SET NULL"), nullable=True)
    
    tagline = Column(String(255), nullable=True)
    short_description = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    
    benefits = Column(JSON, default=list)  # List of strings e.g. ["Rich in Protein", "100% Gluten-Free", "Ideal for Ekadashi & Navratri"]
    purity_highlights = Column(JSON, default=list)  # e.g. ["Traditional Stone Milled", "No Preservatives", "FSSAI Batch Tested"]
    ingredients = Column(String(255), default="100% Pure Grains")
    shelf_life = Column(String(100), default="6 Months from packaging")
    
    image_url = Column(String(500), nullable=True)
    gallery_images = Column(JSON, default=list)
    badge = Column(String(100), nullable=True)  # "Bestseller", "Vrat Special", "Traditional"
    
    is_featured = Column(Boolean, default=False, index=True)
    is_active = Column(Boolean, default=True, index=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    category = relationship("ProductCategory", back_populates="products")
    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete-orphan")
    recipes = relationship("Recipe", back_populates="product")


class ProductVariant(Base):
    __tablename__ = "product_variants"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    size_label = Column(String(50), nullable=False)  # "200g", "500g", "1kg"
    weight_grams = Column(Integer, nullable=True)    # 200, 500, 1000
    price = Column(Float, nullable=True)             # e.g. 90.0
    discounted_price = Column(Float, nullable=True)  # e.g. 80.0
    in_stock = Column(Boolean, default=True)
    sku = Column(String(100), nullable=True)
    order_index = Column(Integer, default=0)
    
    product = relationship("Product", back_populates="variants")


class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True, nullable=False)
    hindi_title = Column(String(200), nullable=True)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    
    description = Column(Text, nullable=True)
    prep_time = Column(String(50), default="15 mins")
    cook_time = Column(String(50), default="15 mins")
    total_time = Column(String(50), default="30 mins")
    servings = Column(String(50), default="4 Persons")
    difficulty = Column(String(50), default="Easy")
    category = Column(String(100), default="Vrat Recipe")
    
    ingredients = Column(JSON, default=list)  # List of ingredients
    instructions = Column(JSON, default=list) # List of steps
    chef_tips = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    
    is_featured = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    product = relationship("Product", back_populates="recipes")


class FAQ(Base):
    __tablename__ = "faqs"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(500), nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(100), default="General")  # "Ordering", "Purity", "Delivery", "Wholesale"
    order_index = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class DistributorLead(Base):
    __tablename__ = "distributor_leads"
    
    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(255), nullable=False)
    owner_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False, index=True)
    email = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False, index=True)
    state = Column(String(100), default="Madhya Pradesh")
    business_type = Column(String(100), default="Retail Store / Kirana")  # Supermarket, Wholesaler, Retailer
    estimated_volume = Column(String(100), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(50), default="New")  # New, Contacted, In Discussion, Converted, Closed
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)


class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    subject = Column(String(255), default="General Inquiry")
    message = Column(Text, nullable=False)
    status = Column(String(50), default="Unread")  # Unread, Read, Responded
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)


class WhatsAppClick(Base):
    __tablename__ = "whatsapp_clicks"
    
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(200), nullable=True)
    variant = Column(String(100), nullable=True)
    quantity = Column(Integer, default=1)
    source_page = Column(String(100), default="product_card")  # product_card, hero_cta, floating_button, distributor_section, cart_tray
    order_items_json = Column(JSON, nullable=True)
    user_ip = Column(String(50), nullable=True)
    user_agent = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"
    
    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(100), nullable=False, index=True)  # page_view, view_product, recipe_view, distributor_click, whatsapp_trigger
    page_url = Column(String(500), nullable=True)
    meta_info = Column(JSON, default=dict)
    user_ip = Column(String(50), nullable=True)
    user_agent = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)


class WebsiteContent(Base):
    __tablename__ = "website_content"
    
    id = Column(Integer, primary_key=True, index=True)
    section_key = Column(String(100), unique=True, index=True, nullable=False)  # hero, about, why_us, contact, trust_badges
    title = Column(String(255), nullable=True)
    subtitle = Column(String(500), nullable=True)
    content_json = Column(JSON, default=dict)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class SEOSettings(Base):
    __tablename__ = "seo_settings"
    
    id = Column(Integer, primary_key=True, index=True)
    page_slug = Column(String(100), unique=True, index=True, nullable=False)  # home, products, recipes, contact
    meta_title = Column(String(255), nullable=False)
    meta_description = Column(Text, nullable=False)
    keywords = Column(Text, nullable=True)
    og_image_url = Column(String(500), nullable=True)
    canonical_url = Column(String(500), nullable=True)
    structured_data = Column(JSON, default=dict)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
