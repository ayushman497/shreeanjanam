from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.models import FAQ
from app.schemas.schemas import FAQOut

router = APIRouter(prefix="/faqs", tags=["FAQs"])

@router.get("", response_model=List[FAQOut])
def get_faqs(db: Session = Depends(get_db)):
    return db.query(FAQ).filter(FAQ.is_active == True).order_by(FAQ.order_index.asc(), FAQ.id.asc()).all()
