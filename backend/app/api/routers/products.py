from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional

from app.db.session import get_db
from app.models.models import Product, ProductCategory, ProductVariant
from app.schemas.schemas import ProductOut, ProductCategoryOut

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/categories", response_model=List[ProductCategoryOut])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(ProductCategory).filter(
        ProductCategory.is_active == True
    ).order_index = ProductCategory.order_index
    return db.query(ProductCategory).filter(ProductCategory.is_active == True).order_by(ProductCategory.order_index.asc()).all()

@router.get("", response_model=List[ProductOut])
def get_products(
    category_slug: Optional[str] = None,
    is_featured: Optional[bool] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product).options(
        joinedload(Product.variants),
        joinedload(Product.category)
    ).filter(Product.is_active == True)
    
    if category_slug:
        cat = db.query(ProductCategory).filter(ProductCategory.slug == category_slug).first()
        if cat:
            query = query.filter(Product.category_id == cat.id)
            
    if is_featured is not None:
        query = query.filter(Product.is_featured == is_featured)
        
    if search:
        query = query.filter(
            (Product.name.ilike(f"%{search}%")) | 
            (Product.hindi_name.ilike(f"%{search}%")) |
            (Product.short_description.ilike(f"%{search}%"))
        )
        
    return query.order_by(Product.order_index.asc(), Product.id.asc()).all()

@router.get("/slug/{slug}", response_model=ProductOut)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).options(
        joinedload(Product.variants),
        joinedload(Product.category)
    ).filter(Product.slug == slug, Product.is_active == True).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/{product_id}", response_model=ProductOut)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).options(
        joinedload(Product.variants),
        joinedload(Product.category)
    ).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
