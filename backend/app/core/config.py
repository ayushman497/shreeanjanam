from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Anjanam Foods API"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Secret Key for JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "anjanam_foods_super_secure_secret_key_2025_indore_flour_brand")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    # Default to sqlite local file; will use PostgreSQL if DATABASE_URL is provided (e.g. on Railway/Supabase/Render)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./anjanam.db")
    
    # CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "https://anjanamfoods.com",
        "https://www.anjanamfoods.com",
        "*"
    ]
    
    # Brand Information
    BRAND_NAME: str = "Anjanam Foods"
    BRAND_TAGLINE: str = "Shuddh Vrat Ka Aata"
    WHATSAPP_PHONE: str = "9243129300"
    CONTACT_PHONE: str = "8827685003"
    CONTACT_EMAIL: str = "anjanamfood@gmail.com"
    STORE_ADDRESS: str = "576 Tilak Nagar Main Road, Indore, Madhya Pradesh, India"
    INSTAGRAM_HANDLE: str = "@anjanamfoods"
    
    # Default Admin
    DEFAULT_ADMIN_USERNAME: str = os.getenv("DEFAULT_ADMIN_USERNAME", "admin")
    DEFAULT_ADMIN_PASSWORD: str = os.getenv("DEFAULT_ADMIN_PASSWORD", "Anjanam@2025!")
    DEFAULT_ADMIN_EMAIL: str = os.getenv("DEFAULT_ADMIN_EMAIL", "admin@anjanamfoods.com")
    
    # Cloudinary / Image Storage (Optional)
    CLOUDINARY_CLOUD_NAME: Optional[str] = os.getenv("CLOUDINARY_CLOUD_NAME", None)
    CLOUDINARY_API_KEY: Optional[str] = os.getenv("CLOUDINARY_API_KEY", None)
    CLOUDINARY_API_SECRET: Optional[str] = os.getenv("CLOUDINARY_API_SECRET", None)

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
