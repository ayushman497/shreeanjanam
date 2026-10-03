from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from typing import List, Optional, Dict, Any
import os
import shutil

from app.db.session import get_db
from app.api.deps import get_current_admin
from app.models.models import (
    User, Product, ProductCategory, ProductVariant, Recipe,
    FAQ, DistributorLead, ContactInquiry, WhatsAppClick, AnalyticsEvent,
    WebsiteContent, SEOSettings
)
from app.schemas.schemas import (
    DashboardOverview,
    ProductCreate, ProductUpdate, ProductOut,
    ProductVariantCreate, ProductVariantOut,
    ProductCategoryCreate, ProductCategoryOut,
    RecipeCreate, RecipeUpdate, RecipeOut,
    FAQCreate, FAQUpdate, FAQOut,
    DistributorLeadUpdate, DistributorLeadOut,
    ContactInquiryUpdate, ContactInquiryOut,
    WebsiteContentCreate, WebsiteContentOut,
    SEOSettingsCreate, SEOSettingsOut,
    UserOut
)

router = APIRouter(prefix="/admin", tags=["Admin Portal"], dependencies=[Depends(get_current_admin)])

# ================= DASHBOARD OVERVIEW =================
@router.get("/overview", response_model=DashboardOverview)
def get_admin_dashboard(db: Session = Depends(get_db)):
    total_products = db.query(Product).count()
    total_recipes = db.query(Recipe).count()
    total_distributor_leads = db.query(DistributorLead).count()
    total_contact_inquiries = db.query(ContactInquiry).count()
    total_whatsapp_clicks = db.query(WhatsAppClick).count()
    
    recent_leads = db.query(DistributorLead).order_by(DistributorLead.created_at.desc()).limit(5).all()
    recent_inquiries = db.query(ContactInquiry).order_by(ContactInquiry.created_at.desc()).limit(5).all()
    
    top_products_raw = db.query(
        WhatsAppClick.product_name,
        func.count(WhatsAppClick.id).label("clicks")
    ).filter(
        WhatsAppClick.product_name != None
    ).group_by(
        WhatsAppClick.product_name
    ).order_by(
        func.count(WhatsAppClick.id).desc()
    ).limit(5).all()
    
    top_whatsapp_products = [
        {"product": r[0], "clicks": r[1]} for r in top_products_raw
    ]
    
    return {
        "total_products": total_products,
        "total_recipes": total_recipes,
        "total_distributor_leads": total_distributor_leads,
        "total_contact_inquiries": total_contact_inquiries,
        "total_whatsapp_clicks": total_whatsapp_clicks,
        "recent_leads": recent_leads,
        "recent_inquiries": recent_inquiries,
        "top_whatsapp_products": top_whatsapp_products
    }

# ================= PRODUCT CRUD =================
@router.get("/products", response_model=List[ProductOut])
def admin_list_products(db: Session = Depends(get_db)):
    return db.query(Product).options(
        joinedload(Product.variants),
        joinedload(Product.category)
    ).order_by(Product.order_index.asc(), Product.id.asc()).all()

@router.post("/products", response_model=ProductOut)
def admin_create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    # Check slug uniqueness
    existing = db.query(Product).filter(Product.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="A product with this slug already exists.")
    
    product_data = payload.dict(exclude={"variants"})
    product = Product(**product_data)
    db.add(product)
    db.commit()
    db.refresh(product)
    
    # Add variants
    if payload.variants:
        for v in payload.variants:
            var_data = v.dict()
            variant = ProductVariant(product_id=product.id, **var_data)
            db.add(variant)
        db.commit()
        db.refresh(product)
        
    return product

@router.put("/products/{product_id}", response_model=ProductOut)
def admin_update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).options(joinedload(Product.variants)).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    update_data = payload.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(product, field, val)
        
    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
def admin_delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"status": "success", "message": f"Product '{product.name}' deleted"}

# ================= VARIANT CRUD =================
@router.post("/products/{product_id}/variants", response_model=ProductVariantOut)
def admin_add_variant(product_id: int, payload: ProductVariantCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    variant = ProductVariant(product_id=product_id, **payload.dict(exclude={"product_id"}))
    db.add(variant)
    db.commit()
    db.refresh(variant)
    return variant

@router.delete("/variants/{variant_id}")
def admin_delete_variant(variant_id: int, db: Session = Depends(get_db)):
    variant = db.query(ProductVariant).filter(ProductVariant.id == variant_id).first()
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")
    db.delete(variant)
    db.commit()
    return {"status": "success", "message": "Variant deleted"}

# ================= RECIPES CRUD =================
@router.get("/recipes", response_model=List[RecipeOut])
def admin_list_recipes(db: Session = Depends(get_db)):
    return db.query(Recipe).options(joinedload(Recipe.product)).order_by(Recipe.order_index.asc()).all()

@router.post("/recipes", response_model=RecipeOut)
def admin_create_recipe(payload: RecipeCreate, db: Session = Depends(get_db)):
    existing = db.query(Recipe).filter(Recipe.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="A recipe with this slug already exists.")
    recipe = Recipe(**payload.dict())
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe

@router.put("/recipes/{recipe_id}", response_model=RecipeOut)
def admin_update_recipe(recipe_id: int, payload: RecipeUpdate, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(recipe, k, v)
    db.commit()
    db.refresh(recipe)
    return recipe

@router.delete("/recipes/{recipe_id}")
def admin_delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(recipe)
    db.commit()
    return {"status": "success", "message": f"Recipe '{recipe.title}' deleted"}

# ================= FAQS CRUD =================
@router.get("/faqs", response_model=List[FAQOut])
def admin_list_faqs(db: Session = Depends(get_db)):
    return db.query(FAQ).order_by(FAQ.order_index.asc()).all()

@router.post("/faqs", response_model=FAQOut)
def admin_create_faq(payload: FAQCreate, db: Session = Depends(get_db)):
    faq = FAQ(**payload.dict())
    db.add(faq)
    db.commit()
    db.refresh(faq)
    return faq

@router.put("/faqs/{faq_id}", response_model=FAQOut)
def admin_update_faq(faq_id: int, payload: FAQUpdate, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(faq, k, v)
    db.commit()
    db.refresh(faq)
    return faq

@router.delete("/faqs/{faq_id}")
def admin_delete_faq(faq_id: int, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    db.delete(faq)
    db.commit()
    return {"status": "success", "message": "FAQ deleted"}

# ================= LEADS & INQUIRIES =================
@router.get("/leads", response_model=List[DistributorLeadOut])
def admin_list_distributor_leads(db: Session = Depends(get_db)):
    return db.query(DistributorLead).order_by(DistributorLead.created_at.desc()).all()

@router.put("/leads/{lead_id}", response_model=DistributorLeadOut)
def admin_update_distributor_lead(lead_id: int, payload: DistributorLeadUpdate, db: Session = Depends(get_db)):
    lead = db.query(DistributorLead).filter(DistributorLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(lead, k, v)
    db.commit()
    db.refresh(lead)
    return lead

@router.get("/inquiries", response_model=List[ContactInquiryOut])
def admin_list_contact_inquiries(db: Session = Depends(get_db)):
    return db.query(ContactInquiry).order_by(ContactInquiry.created_at.desc()).all()

@router.put("/inquiries/{inquiry_id}", response_model=ContactInquiryOut)
def admin_update_contact_inquiry(inquiry_id: int, payload: ContactInquiryUpdate, db: Session = Depends(get_db)):
    inq = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inq:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(inq, k, v)
    db.commit()
    db.refresh(inq)
    return inq

# ================= WHATSAPP CLICKS LOG =================
@router.get("/whatsapp-clicks")
def admin_list_whatsapp_clicks(limit: int = 100, db: Session = Depends(get_db)):
    clicks = db.query(WhatsAppClick).order_by(WhatsAppClick.created_at.desc()).limit(limit).all()
    return clicks

# ================= CONTENT & SEO =================
@router.post("/content/sections", response_model=WebsiteContentOut)
def admin_upsert_section_content(payload: WebsiteContentCreate, db: Session = Depends(get_db)):
    section = db.query(WebsiteContent).filter(WebsiteContent.section_key == payload.section_key).first()
    if section:
        section.title = payload.title
        section.subtitle = payload.subtitle
        section.content_json = payload.content_json
    else:
        section = WebsiteContent(**payload.dict())
        db.add(section)
    db.commit()
    db.refresh(section)
    return section

@router.post("/seo", response_model=SEOSettingsOut)
def admin_upsert_seo(payload: SEOSettingsCreate, db: Session = Depends(get_db)):
    seo = db.query(SEOSettings).filter(SEOSettings.page_slug == payload.page_slug).first()
    if seo:
        seo.meta_title = payload.meta_title
        seo.meta_description = payload.meta_description
        seo.keywords = payload.keywords
        seo.og_image_url = payload.og_image_url
        seo.canonical_url = payload.canonical_url
        seo.structured_data = payload.structured_data
    else:
        seo = SEOSettings(**payload.dict())
        db.add(seo)
    db.commit()
    db.refresh(seo)
    return seo
