from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.core.config import settings
from app.db.session import engine, Base, SessionLocal
from app.db.seed import seed_database
from app.api.routers import auth, products, recipes, faqs, leads, analytics, content, admin

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("anjanam-foods")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Production-Ready API for Anjanam Foods - Shuddh Vrat Ka Aata (Indore)",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup Event
@app.on_event("startup")
def on_startup():
    logger.info("Initializing Database and Seeding initial data...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
        logger.info("Database initialized successfully!")
    finally:
        db.close()

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(recipes.router, prefix=settings.API_V1_STR)
app.include_router(faqs.router, prefix=settings.API_V1_STR)
app.include_router(leads.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(content.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "brand": settings.BRAND_NAME,
        "tagline": settings.BRAND_TAGLINE,
        "status": "online",
        "documentation": f"{settings.API_V1_STR}/docs",
        "city": "Indore, Madhya Pradesh",
        "phone": settings.CONTACT_PHONE,
        "whatsapp": settings.WHATSAPP_PHONE
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "anjanam-foods-backend"}
