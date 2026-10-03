from sqlalchemy.orm import Session
from app.db.session import Base, engine, SessionLocal
from app.models.models import (
    User, ProductCategory, Product, ProductVariant, Recipe, FAQ,
    WebsiteContent, SEOSettings, DistributorLead
)
from app.core.security import get_password_hash
from app.core.config import settings

def seed_database(db: Session):
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    
    # 1. Admin User
    admin = db.query(User).filter(User.username == settings.DEFAULT_ADMIN_USERNAME).first()
    if not admin:
        admin = User(
            username=settings.DEFAULT_ADMIN_USERNAME,
            email=settings.DEFAULT_ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.DEFAULT_ADMIN_PASSWORD),
            full_name="Anjanam Admin",
            is_admin=True,
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("[OK] Default admin user seeded (username: admin)")
    
    # 2. Product Categories
    categories_data = [
        {
            "name": "Vrat Collection",
            "slug": "vrat-collection",
            "tagline": "100% Pavitra & Shuddh Fariyali Flours for Navratri, Ekadashi & Holy Fasts",
            "description": "Processed in dedicated clean equipment to preserve sacred fasting purity. High in natural nutrition and dietary energy.",
            "badge": "Fasting Specials",
            "order_index": 1,
            "image_url": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"
        },
        {
            "name": "Traditional Grain Collection",
            "slug": "traditional-grain-collection",
            "tagline": "Authentic Desi Grains - Slow Milled for Classic Malwa & Desi Kitchen Flavours",
            "description": "Stone milled from premium selected grains. Retains natural dietary fibers, nutty aromas, and authentic golden texture.",
            "badge": "Malwa Heritage",
            "order_index": 2,
            "image_url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
        },
        {
            "name": "Healthy Staples",
            "slug": "healthy-staples",
            "tagline": "Wholesome Daily Nutrition, Daliya & Specialty Kitchen Flours",
            "description": "Nutrient-dense coarse grains and fine kitchen staples for gut wellness, fitness, and comforting home-style meals.",
            "badge": "Daily Wellness",
            "order_index": 3,
            "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
        }
    ]
    
    cat_map = {}
    for c_data in categories_data:
        cat = db.query(ProductCategory).filter(ProductCategory.slug == c_data["slug"]).first()
        if not cat:
            cat = ProductCategory(**c_data)
            db.add(cat)
            db.commit()
            db.refresh(cat)
        cat_map[c_data["slug"]] = cat
        
    print("[OK] Product Categories seeded")
    
    # 3. Products and Variants
    products_data = [
        # --- Vrat Collection ---
        {
            "name": "Rajgira Aata",
            "hindi_name": "राजगिरा आटा (Amaranth Flour)",
            "slug": "rajgira-aata",
            "category_slug": "vrat-collection",
            "tagline": "Superfood Amaranth Flour with high calcium and iron",
            "short_description": "Finely ground premium grade Rajgira (Amaranth) seeds. Perfectly soft for rolling fluffy puris and parathas during fasts.",
            "description": "Anjanam Foods Rajgira Aata is prepared from triple-cleaned, naturally harvested amaranth grains. Renowned for its rich protein, calcium, and amino acid profile, it keeps you energized throughout long fasts without causing heaviness. Zero chemicals, zero mixing.",
            "benefits": ["Rich in Complete Protein & Calcium", "Easy to Digest & Energizing", "Ideal for Navratri, Ekadashi & Janmashtami", "100% Gluten-Free"],
            "purity_highlights": ["Separate Fasting Milling Setup", "No Artificial Starch Added", "FSSAI Tested Batch by Batch"],
            "ingredients": "100% Pure Rajgira (Amaranth) Grains",
            "shelf_life": "6 Months",
            "badge": "Vrat Bestseller",
            "is_featured": True,
            "order_index": 1,
            "image_url": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "200g", "weight_grams": 200, "price": 45.0, "discounted_price": 40.0, "sku": "AF-RAJ-200G"},
                {"size_label": "500g", "weight_grams": 500, "price": 105.0, "discounted_price": 95.0, "sku": "AF-RAJ-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 200.0, "discounted_price": 185.0, "sku": "AF-RAJ-1KG"}
            ]
        },
        {
            "name": "Singhada Aata",
            "hindi_name": "सिंघाड़ा आटा (Water Chestnut Flour)",
            "slug": "singhada-aata",
            "category_slug": "vrat-collection",
            "tagline": "Pure dried water chestnut flour for crispy pakodas and halwa",
            "short_description": "Crisp and cooling flour prepared from sun-dried premium Singhada nuts. Outstanding texture for puris, cheelas, and sweet halwa.",
            "description": "Our Singhada Aata is processed from hand-selected dried water chestnuts that undergo thorough washing and gentle slow pulverization. Rich in potassium and antioxidants, it provides instantaneous satiety and cooling benefits during holy fasts.",
            "benefits": ["High in Potassium & Minerals", "Cooling & Satiating for Vrat", "Crispy texture for Pakodas & Fritters", "Naturally Gluten-Free"],
            "purity_highlights": ["No Wheat Contamination", "Slow Cold Milled", "100% Natural Whiteness"],
            "ingredients": "100% Pure Sun-Dried Singhada (Water Chestnut)",
            "shelf_life": "6 Months",
            "badge": "Fasting Essential",
            "is_featured": True,
            "order_index": 2,
            "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "200g", "weight_grams": 200, "price": 50.0, "discounted_price": 45.0, "sku": "AF-SNG-200G"},
                {"size_label": "500g", "weight_grams": 500, "price": 115.0, "discounted_price": 105.0, "sku": "AF-SNG-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 220.0, "discounted_price": 200.0, "sku": "AF-SNG-1KG"}
            ]
        },
        {
            "name": "Mix Fariyali Aata",
            "hindi_name": "मिक्स फरियाली आटा (Signature Fasting Blend)",
            "slug": "mix-fariyali-aata",
            "category_slug": "vrat-collection",
            "tagline": "Balanced proprietary blend of Rajgira, Singhada, Sama & Sabudana",
            "short_description": "Our chef-crafted master blend for soft rotis, thalipeeth, and crispy pooris without tearing or sticking.",
            "description": "Crafted with the golden ratio of Rajgira, Singhada, and Sama rice, Anjanam Mix Fariyali Aata solves the classic kitchen problem of tearing fasting dough. Yields soft, pliable, aromatic rotis and puffed puris that stay fresh for hours.",
            "benefits": ["Dough Rolls Easily Without Breaking", "Balanced Nutritive Energy", "Delicious Traditional Malwa Flavour", "Zero Preservatives"],
            "purity_highlights": ["100% Pavitra Vrat Ingredients", "Laboratory Certified Purity", "Dedicated Milling Line"],
            "ingredients": "Rajgira, Singhada, Moraiyo (Sama), Sabudana Flour",
            "shelf_life": "6 Months",
            "badge": "Chef's Special",
            "is_featured": True,
            "order_index": 3,
            "image_url": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "200g", "weight_grams": 200, "price": 50.0, "discounted_price": 45.0, "sku": "AF-MF-200G"},
                {"size_label": "500g", "weight_grams": 500, "price": 110.0, "discounted_price": 100.0, "sku": "AF-MF-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 210.0, "discounted_price": 190.0, "sku": "AF-MF-1KG"}
            ]
        },

        # --- Traditional Grain Collection ---
        {
            "name": "Makka Aata",
            "hindi_name": "मक्का आटा (Yellow Maize Flour)",
            "slug": "makka-aata",
            "category_slug": "traditional-grain-collection",
            "tagline": "Golden sweet corn flour for Malwa & Punjabi Makki di Roti",
            "short_description": "Sweet, golden, slow-milled maize flour with the signature earthy aroma. Ideal partner for Sarson ka Saag.",
            "description": "Sourced from sun-ripened indigenous yellow maize cobs. Our slow milling method protects the natural sweetness and fiber of the grain, creating pliable dough for authentic, hearty winter rotis and flatbreads.",
            "benefits": ["Rich in Dietary Fiber & Beta-Carotene", "Heart Healthy & Vitamin B Packed", "Authentic Golden Malwa Aroma", "100% Natural"],
            "purity_highlights": ["No Artificial Food Color", "Traditional Stone Ground", "Fresh Grain Sourcing"],
            "ingredients": "100% Selected Yellow Corn Grains",
            "shelf_life": "4 Months",
            "badge": "Winter Favourite",
            "is_featured": True,
            "order_index": 4,
            "image_url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "500g", "weight_grams": 500, "price": 40.0, "discounted_price": 35.0, "sku": "AF-MAK-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 75.0, "discounted_price": 65.0, "sku": "AF-MAK-1KG"}
            ]
        },
        {
            "name": "Bajra Aata",
            "hindi_name": "बाजरा आटा (Pearl Millet Flour)",
            "slug": "bajra-aata",
            "category_slug": "traditional-grain-collection",
            "tagline": "Iron-dense rustic millet flour for warm winter rotis and bhakri",
            "short_description": "Earthy, mineral-dense flour from prime pearl millet grains. Provides comforting warmth, sustained energy, and low glycemic index.",
            "description": "Anjanam Bajra Aata is freshly milled in small batches to preserve its natural wholesome oils without developing bitterness. Packed with magnesium, iron, and fiber, it is an ancestral superfood for gut wellness and diabetic-friendly diets.",
            "benefits": ["Immense Iron & Magnesium Content", "Supports Healthy Blood Sugar Balance", "Naturally Warming & Nourishing", "Gluten-Free Grain"],
            "purity_highlights": ["Fresh Batch Milling", "Zero Adulteration", "Unbleached & Unrefined"],
            "ingredients": "100% Cleaned Desi Bajra Grains",
            "shelf_life": "4 Months",
            "badge": "Heritage Millet",
            "is_featured": True,
            "order_index": 5,
            "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "500g", "weight_grams": 500, "price": 42.0, "discounted_price": 38.0, "sku": "AF-BAJ-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 80.0, "discounted_price": 70.0, "sku": "AF-BAJ-1KG"}
            ]
        },
        {
            "name": "Jowar Aata",
            "hindi_name": "ज्वार आटा (Sorghum Flour)",
            "slug": "jowar-aata",
            "category_slug": "traditional-grain-collection",
            "tagline": "Light, cooling, diabetic-friendly white sorghum flour",
            "short_description": "Fine-textured white sorghum flour for soft rotis and bhakris. Naturally cool for round-the-year wellness.",
            "description": "Crafted from selected whole grain white jowar. High in dietary fiber and essential minerals, Jowar Aata promotes healthy digestion and heart health while providing a light, fluffy texture to every meal.",
            "benefits": ["Low Glycemic Index for Glucose Management", "High Dietary Fiber for Gut Health", "Light on Stomach & Refreshing", "Zero Additives"],
            "purity_highlights": ["Triple Sifted Clean Grain", "Nutrient-Preserving Milling", "FSSAI Guaranteed"],
            "ingredients": "100% Desi White Jowar",
            "shelf_life": "4 Months",
            "badge": "Diabetic Friendly",
            "is_featured": False,
            "order_index": 6,
            "image_url": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "500g", "weight_grams": 500, "price": 48.0, "discounted_price": 42.0, "sku": "AF-JOW-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 90.0, "discounted_price": 80.0, "sku": "AF-JOW-1KG"}
            ]
        },

        # --- Healthy Staples ---
        {
            "name": "Makka Daliya",
            "hindi_name": "मक्का दलिया (Cracked Corn / Grits)",
            "slug": "makka-daliya",
            "category_slug": "healthy-staples",
            "tagline": "Evenly cracked golden corn kernels for soothing morning porridge & khichdi",
            "short_description": "Clean, uniformly cut maize daliya that cooks into a creamy, golden, fiber-rich porridge or savory breakfast bowl.",
            "description": "Produced by precision cracking of clean dried corn kernels. Free from powder dust, it provides an exquisite texture and rich natural fiber to energize your mornings and soothe your digestive system.",
            "benefits": ["High Satiety & Sustained Energy", "Zero Cholesterol & Low Fat", "Quick & Easy to Cook", "Gut Friendly Fiber"],
            "purity_highlights": ["No Husk & Dust Free", "Uniform Granules", "Hygienically Packed"],
            "ingredients": "100% Pure Maize Grits",
            "shelf_life": "6 Months",
            "badge": "Breakfast Favourite",
            "is_featured": False,
            "order_index": 7,
            "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "250g", "weight_grams": 250, "price": 25.0, "discounted_price": 22.0, "sku": "AF-MKD-250G"},
                {"size_label": "500g", "weight_grams": 500, "price": 45.0, "discounted_price": 40.0, "sku": "AF-MKD-500G"}
            ]
        },
        {
            "name": "Bajra Khichda",
            "hindi_name": "बाजरा खिचड़ा (Cracked Pearl Millet)",
            "slug": "bajra-khichda",
            "category_slug": "healthy-staples",
            "tagline": "De-husked and cracked pearl millet for traditional warming khichda",
            "short_description": "Traditional de-husked cracked pearl millet for cooking rich, comforting winter khichda with pure ghee and jaggery.",
            "description": "An authentic Malwa & Rajasthani staple. Our Bajra Khichda undergoes a special mechanical de-husking and cracking process so that every bowl cooks to a velvety, creamy consistency without bitterness.",
            "benefits": ["Immunity Booster & Warming", "High Iron Content for Anemia Prevention", "Authentic Village-Style Texture", "Nourishing Comfort Food"],
            "purity_highlights": ["Precision De-Husked", "Fresh Aroma Guaranteed", "Zero Preservatives"],
            "ingredients": "100% De-husked Broken Pearl Millet",
            "shelf_life": "6 Months",
            "badge": "Traditional Comfort",
            "is_featured": False,
            "order_index": 8,
            "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "250g", "weight_grams": 250, "price": 28.0, "discounted_price": 25.0, "sku": "AF-BJK-250G"},
                {"size_label": "500g", "weight_grams": 500, "price": 50.0, "discounted_price": 45.0, "sku": "AF-BJK-500G"}
            ]
        },
        {
            "name": "Chawal Aata",
            "hindi_name": "चावल आटा (Fine Rice Flour)",
            "slug": "chawal-aata",
            "category_slug": "healthy-staples",
            "tagline": "Superfine silky rice flour for crispy dosas, modaks, snacks & rotis",
            "short_description": "Silky-smooth, snow-white rice flour milled from aged non-sticky grains. The secret behind crispy snacks and delicate steamed modaks.",
            "description": "Milled to an ultra-fine micron consistency, Anjanam Chawal Aata is your kitchen companion for crunchy pakodas, crispy dosas, ukadiche modaks, and soothing rice rotis.",
            "benefits": ["Silky Smooth & Lump-Free", "Adds Supreme Crispiness to Snacks", "100% Gluten-Free Alternative", "Pure White & Clean"],
            "purity_highlights": ["Aged Grain Milling", "Zero Artificial Starch", "Moisture Controlled"],
            "ingredients": "100% Pure Aged Rice",
            "shelf_life": "6 Months",
            "badge": "Crispy Delights",
            "is_featured": False,
            "order_index": 9,
            "image_url": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80",
            "variants": [
                {"size_label": "500g", "weight_grams": 500, "price": 40.0, "discounted_price": 35.0, "sku": "AF-CHW-500G"},
                {"size_label": "1kg", "weight_grams": 1000, "price": 75.0, "discounted_price": 68.0, "sku": "AF-CHW-1KG"}
            ]
        }
    ]
    
    prod_map = {}
    for p_data in products_data:
        prod = db.query(Product).filter(Product.slug == p_data["slug"]).first()
        cat = cat_map.get(p_data["category_slug"])
        
        if not prod:
            prod = Product(
                name=p_data["name"],
                hindi_name=p_data["hindi_name"],
                slug=p_data["slug"],
                category_id=cat.id if cat else None,
                tagline=p_data["tagline"],
                short_description=p_data["short_description"],
                description=p_data["description"],
                benefits=p_data["benefits"],
                purity_highlights=p_data["purity_highlights"],
                ingredients=p_data["ingredients"],
                shelf_life=p_data["shelf_life"],
                image_url=p_data["image_url"],
                badge=p_data["badge"],
                is_featured=p_data["is_featured"],
                order_index=p_data["order_index"]
            )
            db.add(prod)
            db.commit()
            db.refresh(prod)
            
            # Add variants
            for v_data in p_data["variants"]:
                variant = ProductVariant(
                    product_id=prod.id,
                    size_label=v_data["size_label"],
                    weight_grams=v_data.get("weight_grams"),
                    price=v_data.get("price"),
                    discounted_price=v_data.get("discounted_price"),
                    sku=v_data.get("sku"),
                    in_stock=True
                )
                db.add(variant)
            db.commit()
            db.refresh(prod)
        prod_map[p_data["slug"]] = prod
        
    print("[OK] Products and Variants seeded (9 products)")
    
    # 4. Recipes
    recipes_data = [
        {
            "title": "Rajgira Paratha",
            "hindi_title": "राजगिरा पराठा",
            "slug": "rajgira-paratha",
            "product_slug": "rajgira-aata",
            "category": "Vrat Specials",
            "description": "Soft, golden fasting flatbread prepared with Anjanam Rajgira Aata, mashed boiled potatoes, green chillies, and rock salt.",
            "prep_time": "15 mins",
            "cook_time": "10 mins",
            "total_time": "25 mins",
            "servings": "4 Persons",
            "difficulty": "Easy",
            "ingredients": [
                "2 cups Anjanam Rajgira Aata",
                "2 medium boiled & mashed potatoes (alu)",
                "1 tsp Sendha Namak (Rock Salt)",
                "2 finely chopped green chillies",
                "1 tsp roasted cumin (jeera) powder",
                "2 tbsp freshly chopped coriander",
                "2 tbsp Pure Desi Ghee for roasting",
                "Warm water as needed"
            ],
            "instructions": [
                "In a wide mixing bowl, add Anjanam Rajgira Aata, mashed boiled potatoes, green chillies, sendha namak, and cumin powder.",
                "Gently mix with hands. The moisture from potatoes helps bind the dough. Add 1-2 tbsp warm water if needed to form a soft, pliable dough.",
                "Divide into equal lemon-sized balls. Dust a rolling board with dry Rajgira Aata or use butter paper to roll gently without tearing.",
                "Heat a tawa on medium flame. Place the paratha and cook for 1 minute until small bubbles appear.",
                "Flip and apply pure desi ghee on both sides. Roast until crisp and golden brown on both sides.",
                "Serve piping hot with chilled curd, peanut chutney, or aloo sabji."
            ],
            "chef_tips": "Mashing the potatoes finely without lumps is the key to getting tear-free, soft Rajgira parathas.",
            "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
            "is_featured": True,
            "order_index": 1
        },
        {
            "title": "Crispy Singhada Puri",
            "hindi_title": "सिंघाड़ा पूरी",
            "slug": "singhada-puri",
            "product_slug": "singhada-aata",
            "category": "Vrat Specials",
            "description": "Deep-fried golden, puffed fasting puris with a delicate crunch made with pure Singhada Aata.",
            "prep_time": "15 mins",
            "cook_time": "15 mins",
            "total_time": "30 mins",
            "servings": "4 Persons",
            "difficulty": "Medium",
            "ingredients": [
                "2 cups Anjanam Singhada Aata",
                "2 boiled & grated potatoes",
                "1 tsp Sendha Namak",
                "1/2 tsp crushed black pepper",
                "Groundnut oil or pure ghee for deep frying"
            ],
            "instructions": [
                "Combine Singhada Aata with grated potatoes, sendha namak, and black pepper.",
                "Knead without extra water into a semi-firm dough. Let it rest for 5 minutes.",
                "Grease a plastic sheet with oil and gently pat a small portion into a 4-inch round disc with your fingers.",
                "Heat groundnut oil in a deep kadhai on medium-high heat.",
                "Gently slide the puri into the hot oil. Press softly with a slotted spoon till it puffs up magnificently.",
                "Fry until golden and crisp. Drain on paper towels and serve with Vrat ki Aloo Sabzi."
            ],
            "chef_tips": "Patting with fingers on greased parchment paper is much easier than using a rolling pin for Singhada dough.",
            "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
            "is_featured": True,
            "order_index": 2
        },
        {
            "title": "Fariyali Roti & Thalipeeth",
            "hindi_title": "फरियाली रोटी एवं थालीपीठ",
            "slug": "fariyali-roti",
            "product_slug": "mix-fariyali-aata",
            "category": "Vrat Specials",
            "description": "Wholesome, soft fasting rotis made effortless with Anjanam Mix Fariyali Aata. Perfect with curd and sabudana khichdi.",
            "prep_time": "10 mins",
            "cook_time": "10 mins",
            "total_time": "20 mins",
            "servings": "3 Persons",
            "difficulty": "Easy",
            "ingredients": [
                "2 cups Anjanam Mix Fariyali Aata",
                "1/2 cup warm milk or water",
                "1 tsp Sendha Namak",
                "1 tsp Cumin Seeds",
                "1 tbsp Desi Ghee"
            ],
            "instructions": [
                "Take Anjanam Mix Fariyali Aata in a bowl and add salt and cumin seeds.",
                "Slowly add warm milk or water and knead into a very smooth, soft dough.",
                "Roll smoothly using dry flour dusting. Notice how smoothly it rolls compared to single grain flours!",
                "Cook on a medium-hot iron tawa, flipping once. Smear with desi ghee.",
                "Enjoy soft, wholesome rotis during your sacred fasting days."
            ],
            "chef_tips": "Using warm milk instead of water makes the fariyali rotis melt-in-the-mouth soft.",
            "image_url": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
            "is_featured": True,
            "order_index": 3
        },
        {
            "title": "Traditional Makka Roti",
            "hindi_title": "मक्के की रोटी",
            "slug": "makka-roti",
            "product_slug": "makka-aata",
            "category": "Traditional Rotis",
            "description": "Authentic thick, rustic yellow corn flatbread with charred golden edges, served with rich butter and gur.",
            "prep_time": "15 mins",
            "cook_time": "15 mins",
            "total_time": "30 mins",
            "servings": "4 Persons",
            "difficulty": "Medium",
            "ingredients": [
                "2 cups Anjanam Makka Aata",
                "1 cup warm water",
                "1/2 tsp salt",
                "1 tsp ajwain (carom seeds)",
                "Desi Ghee / White Butter (Makhan)"
            ],
            "instructions": [
                "Add salt and ajwain to Anjanam Makka Aata. Pour hot water little by little.",
                "Knead with the base of your palm for 4-5 minutes until elastic and smooth.",
                "Take a portion, flatten between palms or on a moist polythene sheet into a round disc.",
                "Transfer to a hot cast iron tawa. Cook on low-medium flame so the interior cooks completely.",
                "Flip and roast over open flame for the signature rustic charred aroma. Smear with generous butter."
            ],
            "chef_tips": "Always knead with warm water and work the dough with the palm of your hand for elasticity.",
            "image_url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
            "is_featured": True,
            "order_index": 4
        },
        {
            "title": "Desi Bajra Roti",
            "hindi_title": "बाजरे की रोटी",
            "slug": "bajra-roti",
            "product_slug": "bajra-aata",
            "category": "Traditional Rotis",
            "description": "Mineral-rich rustic pearl millet flatbread, hand-patted and flame-roasted to golden perfection.",
            "prep_time": "15 mins",
            "cook_time": "15 mins",
            "total_time": "30 mins",
            "servings": "4 Persons",
            "difficulty": "Medium",
            "ingredients": [
                "2 cups Anjanam Bajra Aata",
                "Lukewarm water as required",
                "Pinch of salt",
                "Fresh Desi Ghee & Jaggery (Gur)"
            ],
            "instructions": [
                "Take Anjanam Bajra Aata and add a pinch of salt.",
                "Knead portion-by-portion using lukewarm water till soft and pliable.",
                "Dust rolling surface with bajra flour and pat gently with hands to spread into a disc.",
                "Place on a hot earthen (mitti) or iron tawa, apply a light smear of water on the top surface.",
                "Cook, flip, and puff over direct flame. Serve warm with desi ghee and garlic chutney."
            ],
            "chef_tips": "Knead only 1-2 rotis worth of dough at a time for optimal hand-patting texture.",
            "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
            "is_featured": False,
            "order_index": 5
        },
        {
            "title": "Jowar Bhakri",
            "hindi_title": "ज्वार भाकरी",
            "slug": "jowar-bhakri",
            "product_slug": "jowar-aata",
            "category": "Traditional Rotis",
            "description": "Soft, wholesome white sorghum flatbreads. High in fiber, low glycemic, and gentle on the stomach.",
            "prep_time": "15 mins",
            "cook_time": "12 mins",
            "total_time": "27 mins",
            "servings": "3 Persons",
            "difficulty": "Easy",
            "ingredients": [
                "2 cups Anjanam Jowar Aata",
                "1 cup boiling water",
                "Pinch of salt",
                "1 tsp Ghee"
            ],
            "instructions": [
                "Pour boiling water into the Jowar Aata and mix with a spoon. Cover for 5 minutes.",
                "Once warm enough to handle, knead into a very soft, pliable dough.",
                "Pat smoothly into a thin bhakri. Place on a hot tawa and spread water on top.",
                "Flip and roast until the bhakri puffs up like a balloon.",
                "Serve with spicy Pitla, Sev Tamatar, or green vegetable curries."
            ],
            "chef_tips": "Using boiling water pre-gelatinizes the starch, yielding unbelievable puffing and softness.",
            "image_url": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
            "is_featured": False,
            "order_index": 6
        },
        {
            "title": "Nourishing Bajra Khichdi",
            "hindi_title": "पौष्टिक बाजरा खिचड़ी / खिचड़ा",
            "slug": "bajra-khichdi",
            "product_slug": "bajra-khichda",
            "category": "Healthy Staples",
            "description": "Slow-cooked pearl millet and yellow moong dal khichdi infused with hing, cumin, and fragrant desi ghee.",
            "prep_time": "15 mins",
            "cook_time": "30 mins",
            "total_time": "45 mins",
            "servings": "4 Persons",
            "difficulty": "Easy",
            "ingredients": [
                "1 cup Anjanam Bajra Khichda (rinsed & soaked 30 mins)",
                "1/2 cup yellow moong dal",
                "4 cups water",
                "2 tbsp Pure Desi Ghee",
                "1 tsp Cumin seeds (Jeera)",
                "1/4 tsp Hing (Asafoetida)",
                "1 tsp Turmeric powder & Sendha namak to taste",
                "1 inch grated ginger & 2 green chillies"
            ],
            "instructions": [
                "Soak Anjanam Bajra Khichda in warm water for 30 minutes for faster cooking.",
                "In a pressure cooker, heat 1 tbsp ghee. Add cumin seeds, hing, ginger, and green chillies.",
                "Add drained Bajra Khichda, moong dal, turmeric, salt, and 4 cups of water.",
                "Pressure cook on medium heat for 4-5 whistles, then simmer for 5 minutes.",
                "Let pressure release naturally. Open, stir to creamy consistency, and top with remaining ghee.",
                "Serve warm with fresh curd, papad, and pickle."
            ],
            "chef_tips": "A gentle soak in warm water softens the grain outer layer for a melt-in-mouth creamy texture.",
            "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
            "is_featured": True,
            "order_index": 7
        }
    ]
    
    for r_data in recipes_data:
        rec = db.query(Recipe).filter(Recipe.slug == r_data["slug"]).first()
        prod = prod_map.get(r_data["product_slug"])
        if not rec:
            rec = Recipe(
                title=r_data["title"],
                hindi_title=r_data["hindi_title"],
                slug=r_data["slug"],
                product_id=prod.id if prod else None,
                category=r_data["category"],
                description=r_data["description"],
                prep_time=r_data["prep_time"],
                cook_time=r_data["cook_time"],
                total_time=r_data["total_time"],
                servings=r_data["servings"],
                difficulty=r_data["difficulty"],
                ingredients=r_data["ingredients"],
                instructions=r_data["instructions"],
                chef_tips=r_data["chef_tips"],
                image_url=r_data["image_url"],
                is_featured=r_data["is_featured"],
                order_index=r_data["order_index"]
            )
            db.add(rec)
            db.commit()
    print("[OK] Recipes seeded (7 recipes)")
    
    # 5. FAQs
    faqs_data = [
        {
            "question": "Do you deliver in Indore?",
            "answer": "Yes! We provide prompt, fresh doorstep delivery across all areas of Indore, including Tilak Nagar, Palasia, Vijay Nagar, Annapurna, Saket, Scheme 54, Rajendra Nagar, and surrounding localities. Orders are dispatched quickly upon WhatsApp confirmation.",
            "category": "Delivery",
            "order_index": 1
        },
        {
            "question": "Are your products FSSAI certified?",
            "answer": "Yes, Anjanam Foods is 100% FSSAI certified and strictly adheres to national food safety, hygiene, and grain processing standards. Every batch undergoes stringent quality testing.",
            "category": "Purity & Quality",
            "order_index": 2
        },
        {
            "question": "Which products are suitable for vrat (fasting)?",
            "answer": "Our dedicated Vrat Collection includes Rajgira Aata (Amaranth Flour), Singhada Aata (Water Chestnut Flour), and Mix Fariyali Aata. These are processed in specialized, sanitized milling lines strictly isolated from non-vrat grains to preserve sanctity.",
            "category": "Vrat Sanctity",
            "order_index": 3
        },
        {
            "question": "Do you provide wholesale supply for retailers & distributors?",
            "answer": "Absolutely! We supply bulk packs, distributor cartons, and custom wholesale consignments for supermarkets, kirana stores, caterers, and temple trusts. You can submit our Partner form or connect directly on WhatsApp at +91 8827685003.",
            "category": "Wholesale & B2B",
            "order_index": 4
        },
        {
            "question": "How can I place an order?",
            "answer": "Ordering is instant and hassle-free! Simply select your favorite product, size variant (200g, 500g, 1kg), and quantity on this website, then click 'Order on WhatsApp'. A pre-filled message will open directly in your WhatsApp. Confirm your address and our team will handle the rest!",
            "category": "Ordering",
            "order_index": 5
        },
        {
            "question": "What is the shelf life of Anjanam flours?",
            "answer": "Since our flours are 100% natural with zero preservatives or chemical bleaches, we recommend consuming them within 4 to 6 months of packaging. Store in an airtight container in a cool, dry place.",
            "category": "Storage",
            "order_index": 6
        }
    ]
    
    for f_data in faqs_data:
        faq = db.query(FAQ).filter(FAQ.question == f_data["question"]).first()
        if not faq:
            faq = FAQ(**f_data)
            db.add(faq)
            db.commit()
    print("[OK] FAQs seeded")
    
    # 6. Sample Distributor Inquiries
    sample_leads = [
        {
            "business_name": "Shree Mahalakshmi Kirana Stores",
            "owner_name": "Ramesh Chandra Sharma",
            "phone": "9826012345",
            "email": "sharma.kirana@gmail.com",
            "city": "Indore",
            "state": "Madhya Pradesh",
            "business_type": "Supermarket / Retail Store",
            "estimated_volume": "100-200 kg / month",
            "message": "We have two stores in Vijay Nagar and Palasia. Interested in stocking Rajgira and Singhada aata for upcoming festival season.",
            "status": "Contacted"
        },
        {
            "business_name": "Malwa Organic Mart",
            "owner_name": "Gaurav Joshi",
            "phone": "9425098765",
            "email": "malwaorganic@gmail.com",
            "city": "Ujjain",
            "state": "Madhya Pradesh",
            "business_type": "Organic Grocery Store",
            "estimated_volume": "250-500 kg / month",
            "message": "Looking for distributor pricing and sample kits for Ujjain retail distribution.",
            "status": "New"
        }
    ]
    for s_lead in sample_leads:
        lead = db.query(DistributorLead).filter(DistributorLead.phone == s_lead["phone"]).first()
        if not lead:
            lead = DistributorLead(**s_lead)
            db.add(lead)
            db.commit()
    print("[OK] Sample Leads seeded")
    
    # 7. SEO Settings
    seo_data = [
        {
            "page_slug": "home",
            "meta_title": "Anjanam Foods | Shuddh Vrat Ka Aata | 100% Pure Natural Flours Indore",
            "meta_description": "Buy 100% pure Rajgira Aata, Singhada Aata, Mix Fariyali Aata, Makka, Bajra & Jowar Aata in Indore. FSSAI certified, stone milled, fast WhatsApp delivery.",
            "keywords": "Vrat Aata Indore, Rajgira Aata Indore, Singhada Aata Indore, Natural Flour Indore, Fariyali Aata Indore, Anjanam Foods, Pure Grain Flour Indore",
            "og_image_url": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80",
            "canonical_url": "https://anjanamfoods.com",
            "structured_data": {
                "@context": "https://schema.org",
                "@type": "FoodEstablishment",
                "name": "Anjanam Foods",
                "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df",
                "telephone": "+918827685003",
                "email": "anjanamfood@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "576 Tilak Nagar Main Road",
                    "addressLocality": "Indore",
                    "addressRegion": "Madhya Pradesh",
                    "postalCode": "452018",
                    "addressCountry": "IN"
                },
                "priceRange": "₹₹",
                "servesCuisine": "Indian, Fasting, Organic Flours",
                "foundingDate": "2025"
            }
        }
    ]
    for s_item in seo_data:
        seo = db.query(SEOSettings).filter(SEOSettings.page_slug == s_item["page_slug"]).first()
        if not seo:
            seo = SEOSettings(**s_item)
            db.add(seo)
            db.commit()
    print("[OK] SEO Settings seeded")

if __name__ == "__main__":
    db = SessionLocal()
    seed_database(db)
    db.close()
