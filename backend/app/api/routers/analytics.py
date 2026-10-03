from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, Any, List

from app.db.session import get_db
from app.models.models import WhatsAppClick, AnalyticsEvent
from app.schemas.schemas import WhatsAppClickCreate, WhatsAppClickOut, AnalyticsEventCreate

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.post("/track-whatsapp", response_model=WhatsAppClickOut)
def track_whatsapp_click(
    payload: WhatsAppClickCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent", "")
    
    click = WhatsAppClick(
        product_name=payload.product_name,
        variant=payload.variant,
        quantity=payload.quantity,
        source_page=payload.source_page,
        order_items_json=payload.order_items_json,
        user_ip=client_ip,
        user_agent=user_agent[:500] if user_agent else None
    )
    db.add(click)
    db.commit()
    db.refresh(click)
    return click

@router.post("/track-event")
def track_event(
    payload: AnalyticsEventCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent", "")
    
    event = AnalyticsEvent(
        event_type=payload.event_type,
        page_url=payload.page_url,
        meta_info=payload.meta_info or {},
        user_ip=client_ip,
        user_agent=user_agent[:500] if user_agent else None
    )
    db.add(event)
    db.commit()
    return {"status": "success", "event_id": event.id}

@router.get("/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    total_clicks = db.query(WhatsAppClick).count()
    total_views = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "page_view").count()
    
    top_products = db.query(
        WhatsAppClick.product_name,
        func.count(WhatsAppClick.id).label("click_count")
    ).filter(
        WhatsAppClick.product_name != None
    ).group_by(
        WhatsAppClick.product_name
    ).order_by(
        func.count(WhatsAppClick.id).desc()
    ).limit(6).all()
    
    clicks_by_source = db.query(
        WhatsAppClick.source_page,
        func.count(WhatsAppClick.id).label("source_count")
    ).group_by(
        WhatsAppClick.source_page
    ).all()
    
    return {
        "total_whatsapp_clicks": total_clicks,
        "total_page_views": total_views,
        "top_products": [{"product": r[0], "count": r[1]} for r in top_products],
        "clicks_by_source": [{"source": r[0], "count": r[1]} for r in clicks_by_source]
    }
