from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.models import DistributorLead, ContactInquiry
from app.schemas.schemas import (
    DistributorLeadCreate, DistributorLeadOut,
    ContactInquiryCreate, ContactInquiryOut
)

router = APIRouter(prefix="/leads", tags=["Leads & Inquiries"])

@router.post("/distributor", response_model=DistributorLeadOut)
def create_distributor_lead(payload: DistributorLeadCreate, db: Session = Depends(get_db)):
    lead = DistributorLead(
        business_name=payload.business_name.strip(),
        owner_name=payload.owner_name.strip(),
        phone=payload.phone.strip(),
        email=payload.email.strip() if payload.email else None,
        city=payload.city.strip(),
        state=payload.state.strip(),
        business_type=payload.business_type,
        estimated_volume=payload.estimated_volume,
        message=payload.message.strip() if payload.message else None,
        status="New"
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead

@router.post("/contact", response_model=ContactInquiryOut)
def create_contact_inquiry(payload: ContactInquiryCreate, db: Session = Depends(get_db)):
    inquiry = ContactInquiry(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        email=payload.email.strip() if payload.email else None,
        subject=payload.subject.strip(),
        message=payload.message.strip(),
        status="Unread"
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry
