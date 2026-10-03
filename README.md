# 🌾 Anjanam Foods — Shuddh Vrat Ka Aata
**Production-Ready, Premium, Mobile-First Website & WhatsApp Commerce System**

> **Brand**: Anjanam Foods  
> **Tagline**: Shuddh Vrat Ka Aata (*शुद्ध व्रत का आटा*)  
> **Origin**: 576 Tilak Nagar Main Road, Indore, Madhya Pradesh, India  
> **Phone**: 8827685003 | **WhatsApp**: 9243129300  
> **Email**: [anjanamfood@gmail.com](mailto:anjanamfood@gmail.com) | **Instagram**: [@anjanamfoods](https://instagram.com/anjanamfoods)  
> **Certification**: FSSAI Certified Unit  

---

## 🌟 Overview
**Anjanam Foods** is a premium Indian flour and grain brand specializing in sacred fasting (*vrat*) flours and heritage grain-based foods. 

This project delivers a **conversion-focused WhatsApp commerce web application** designed with luxury Indian heritage aesthetics, warm ivory tones, primary gold accents, and deep forest green textures.

Instead of generic, high-friction traditional e-commerce cart checkouts, visitors can:
1. Select their desired flour variant (`200g`, `500g`, `1kg`) and quantity.
2. Generate instant, perfectly formatted WhatsApp orders with dynamic price calculations.
3. Use the **WhatsApp Order Tray** to bundle multiple grains and request doorstep delivery in Indore with one click.
4. Submit B2B distributor inquiries directly into the database and connect with the wholesale team.

---

## 🎨 Design System & Brand Palette

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Gold** | `#C9A24A` | Accents, badges, glowing borders, CTAs |
| **Dark Green** | `#355E2C` | Brand identity, buttons, trust badges |
| **Earth Brown** | `#5B4524` | Secondary text, subtle borders, heritage tones |
| **Warm Ivory** | `#FAF7F0` | Primary page background, card surfaces |
| **White** | `#FFFFFF` | Elevated card surfaces, inputs, modal dialogs |
| **Text Main** | `#1F2937` | High-contrast readable typography |

**Typography**:
- **Headings**: `Playfair Display` (Classic Indian heritage luxury)
- **Body & Buttons**: `Inter` (Clean, modern readability)

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design System
- **Animation**: Framer Motion & CSS Micro-Interactions
- **Icons**: Lucide React
- **Delight FX**: Canvas Confetti for order confirmations

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database ORM**: SQLAlchemy 2.0 (SQLite for local zero-config, PostgreSQL ready)
- **Authentication**: JWT (JSON Web Tokens) with direct `bcrypt` hashing
- **Data Validation**: Pydantic v2
- **Documentation**: Swagger UI (`/api/docs`) & ReDoc (`/api/redoc`)

---

## 📦 Signature Catalog & Seed Data

### 1. Vrat Collection (Fasting Specials)
- **Rajgira Aata** (Amaranth Flour) — `200g`, `500g`, `1kg`
- **Singhada Aata** (Water Chestnut Flour) — `200g`, `500g`, `1kg`
- **Mix Fariyali Aata** (Master Fasting Blend) — `200g`, `500g`, `1kg`

### 2. Traditional Grain Collection (Malwa Heritage)
- **Makka Aata** (Yellow Corn Flour) — `500g`, `1kg`
- **Bajra Aata** (Pearl Millet Flour) — `500g`, `1kg`
- **Jowar Aata** (White Sorghum Flour) — `500g`, `1kg`

### 3. Healthy Staples (Daily Wellness)
- **Makka Daliya** (Cracked Corn / Grits) — `250g`, `500g`
- **Bajra Khichda** (Cracked Pearl Millet) — `250g`, `500g`
- **Chawal Aata** (Superfine Rice Flour) — `500g`, `1kg`

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- Python 3.10+

### Option A: Automatic Launch (Windows)
Double-click `start.bat` in the root folder, or run:
```cmd
start.bat
```

### Option B: Manual Launch

#### 1. Start the FastAPI Backend
```bash
cd backend
python -m pip install -r requirements.txt
python run.py
```
- API is live at: `http://localhost:8000`
- Swagger Documentation: `http://localhost:8000/api/docs`

#### 2. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
- Website is live at: `http://localhost:3000`
- Admin Portal: `http://localhost:3000/admin/login`

---

## 🔐 Admin Portal & Management

Access the secure management portal at **`/admin/login`**:

- **Default Username**: `admin`
- **Default Password**: `Anjanam@2025!`
- **Capabilities**:
  - **Overview & Analytics**: Total WhatsApp clicks, top converted products, lead counts.
  - **Product Manager**: Create flours, configure variants (`200g`, `500g`, `1kg`), set prices, toggle featured tags.
  - **Recipe Manager**: Manage 7 traditional recipes, ingredients, and preparation steps.
  - **Distributor B2B Leads**: Review partner requests from Indore & MP with 1-click WhatsApp chat.
  - **FAQ Manager**: Update customer questions and answers.
  - **SEO & Store Settings**: Manage keywords and schema.

---

## 📱 WhatsApp Order Message Format

When visitors click **"Order on WhatsApp"**, the application automatically generates and opens the pre-filled message formatted exactly per specifications:

```
Hello Anjanam Foods,

I would like to order:
Product: Rajgira Aata
Size: 500g
Quantity: 2
Delivery Location: 576 Tilak Nagar, Indore

Please share pricing and delivery details.

Thank you.
```

---

## 🚢 Production Deployment

### Frontend → Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set the root directory to `frontend`.
3. Set the Environment Variable:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-domain.up.railway.app/api`
4. Deploy!

### Backend → Railway
1. Connect your repository to [Railway](https://railway.app).
2. Set the root directory to `backend`.
3. Add a PostgreSQL database in Railway.
4. Set Environment Variables:
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `SECRET_KEY`: `your_secure_random_production_secret`
5. Railway will automatically build via `backend/Dockerfile` or standard Python buildpacks.

---

## 🛡️ License
© 2025–2026 **Anjanam Foods**. All Rights Reserved.  
576 Tilak Nagar Main Road, Indore, Madhya Pradesh, India.
