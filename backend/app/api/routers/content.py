from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any, List

from app.db.session import get_db
from app.models.models import WebsiteContent, SEOSettings
from app.schemas.schemas import WebsiteContentOut, SEOSettingsOut

router = APIRouter(prefix="/content", tags=["Content & SEO"])

@router.get("/sections", response_model=List[WebsiteContentOut])
def get_website_sections(db: Session = Depends(get_db)):
    return db.query(WebsiteContent).all()

@router.get("/sections/{section_key}", response_model=WebsiteContentOut)
def get_section_by_key(section_key: str, db: Session = Depends(get_db)):
    section = db.query(WebsiteContent).filter(WebsiteContent.section_key == section_key).first()
    if not section:
        raise HTTPException(status_code=404, detail="Section content not found")
    return section

@router.get("/seo", response_model=List[SEOSettingsOut])
def get_all_seo_settings(db: Session = Depends(get_db)):
    return db.query(SEOSettings).all()

@router.get("/seo/{page_slug}", response_model=SEOSettingsOut)
def get_seo_for_page(page_slug: str, db: Session = Depends(get_db)):
    seo = db.query(SEOSettings).filter(SEOSettings.page_slug == page_slug).first()
    if not seo:
        raise HTTPException(status_code=404, detail="SEO settings not found")
    return seo
