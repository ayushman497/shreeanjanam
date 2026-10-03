export const BRAND_INFO = {
  name: "Anjanam Foods",
  tagline: "Shuddh Vrat Ka Aata",
  taglineHindi: "शुद्ध व्रत का आटा",
  founded: "2025",
  mission: "Provide high-quality natural flour products made from carefully selected grains while preserving purity, nutrition, and authentic taste.",
  address: "576 Tilak Nagar Main Road, Indore, Madhya Pradesh, India",
  phone: "8827685003",
  whatsappNumber: "9243129300",
  email: "anjanamfood@gmail.com",
  instagram: "@anjanamfoods",
  instagramUrl: "https://instagram.com/anjanamfoods",
  fssai: "FSSAI Certified Unit",
  fssaiNumber: "FSSAI Lic. No. 21425850000123",
  deliveryArea: "Across Indore (Tilak Nagar, Palasia, Vijay Nagar, Annapurna, Saket, etc.)",
};

export const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Vrat Collection",
    slug: "vrat-collection",
    tagline: "100% Pavitra & Shuddh Fariyali Flours for Navratri, Ekadashi & Sacred Fasts",
    description: "Milled in dedicated clean equipment to preserve sacred fasting sanctity. Rich in protein, calcium & natural vitality.",
    badge: "Fasting Specials",
    image_url: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    name: "Traditional Grain Collection",
    slug: "traditional-grain-collection",
    tagline: "Slow-Milled Desi Grains for Classic Malwa & Desi Kitchen Flavours",
    description: "Stone milled from premium selected grains. Retains natural dietary fibers, nutty aromas, and authentic golden texture.",
    badge: "Malwa Heritage",
    image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    name: "Healthy Staples",
    slug: "healthy-staples",
    tagline: "Wholesome Daily Nutrition, Daliya & Specialty Kitchen Flours",
    description: "Nutrient-dense coarse grains and fine kitchen staples for gut wellness, fitness, and comforting home-style meals.",
    badge: "Daily Wellness",
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    order_index: 3,
    is_active: true
  }
];

export const INITIAL_PRODUCTS = [
  // --- Vrat Collection ---
  {
    id: 1,
    name: "Rajgira Aata",
    hindi_name: "राजगिरा आटा (Amaranth Flour)",
    slug: "rajgira-aata",
    category_id: 1,
    tagline: "Superfood Amaranth Flour rich in complete protein & calcium",
    short_description: "Finely ground premium grade Rajgira (Amaranth) seeds. Perfectly soft for rolling fluffy puris and parathas during fasts.",
    description: "Anjanam Foods Rajgira Aata is prepared from triple-cleaned, naturally harvested amaranth grains. Renowned for its rich protein, calcium, and amino acid profile, it keeps you energized throughout long fasts without causing heaviness. Zero chemicals, zero mixing.",
    benefits: ["Rich in Complete Protein & Calcium", "Easy to Digest & Sustained Energy", "Ideal for Navratri, Ekadashi & Janmashtami", "100% Gluten-Free"],
    purity_highlights: ["Separate Fasting Milling Setup", "No Artificial Starch Added", "FSSAI Tested Batch by Batch"],
    ingredients: "100% Pure Rajgira (Amaranth) Grains",
    shelf_life: "6 Months",
    image_url: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",
    badge: "Vrat Bestseller",
    is_featured: true,
    is_active: true,
    order_index: 1,
    variants: [
      { id: 1, size_label: "200g", weight_grams: 200, price: 45, discounted_price: 40, in_stock: true, sku: "AF-RAJ-200G" },
      { id: 2, size_label: "500g", weight_grams: 500, price: 105, discounted_price: 95, in_stock: true, sku: "AF-RAJ-500G" },
      { id: 3, size_label: "1kg", weight_grams: 1000, price: 200, discounted_price: 185, in_stock: true, sku: "AF-RAJ-1KG" }
    ]
  },
  {
    id: 2,
    name: "Singhada Aata",
    hindi_name: "सिंघाड़ा आटा (Water Chestnut Flour)",
    slug: "singhada-aata",
    category_id: 1,
    tagline: "Pure dried water chestnut flour for crispy pakodas and halwa",
    short_description: "Crisp and cooling flour prepared from sun-dried premium Singhada nuts. Outstanding texture for puris, cheelas, and sweet halwa.",
    description: "Our Singhada Aata is processed from hand-selected dried water chestnuts that undergo thorough washing and gentle slow pulverization. Rich in potassium and antioxidants, it provides instantaneous satiety and cooling benefits during holy fasts.",
    benefits: ["High in Potassium & Minerals", "Cooling & Satiating for Vrat", "Crispy texture for Pakodas & Fritters", "Naturally Gluten-Free"],
    purity_highlights: ["No Wheat Contamination", "Slow Cold Milled", "100% Natural Whiteness"],
    ingredients: "100% Pure Sun-Dried Singhada (Water Chestnut)",
    shelf_life: "6 Months",
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    badge: "Fasting Essential",
    is_featured: true,
    is_active: true,
    order_index: 2,
    variants: [
      { id: 4, size_label: "200g", weight_grams: 200, price: 50, discounted_price: 45, in_stock: true, sku: "AF-SNG-200G" },
      { id: 5, size_label: "500g", weight_grams: 500, price: 115, discounted_price: 105, in_stock: true, sku: "AF-SNG-500G" },
      { id: 6, size_label: "1kg", weight_grams: 1000, price: 220, discounted_price: 200, in_stock: true, sku: "AF-SNG-1KG" }
    ]
  },
  {
    id: 3,
    name: "Mix Fariyali Aata",
    hindi_name: "मिक्स फरियाली आटा (Signature Fasting Blend)",
    slug: "mix-fariyali-aata",
    category_id: 1,
    tagline: "Balanced blend of Rajgira, Singhada, Sama & Sabudana",
    short_description: "Our chef-crafted master blend for soft rotis, thalipeeth, and crispy pooris without tearing or sticking.",
    description: "Crafted with the golden ratio of Rajgira, Singhada, and Sama rice, Anjanam Mix Fariyali Aata solves the classic kitchen problem of tearing fasting dough. Yields soft, pliable, aromatic rotis and puffed puris that stay fresh for hours.",
    benefits: ["Dough Rolls Easily Without Breaking", "Balanced Nutritive Energy", "Delicious Traditional Malwa Flavour", "Zero Preservatives"],
    purity_highlights: ["100% Pavitra Vrat Ingredients", "Laboratory Certified Purity", "Dedicated Milling Line"],
    ingredients: "Rajgira, Singhada, Moraiyo (Sama), Sabudana Flour",
    shelf_life: "6 Months",
    image_url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    badge: "Chef's Special",
    is_featured: true,
    is_active: true,
    order_index: 3,
    variants: [
      { id: 7, size_label: "200g", weight_grams: 200, price: 50, discounted_price: 45, in_stock: true, sku: "AF-MF-200G" },
      { id: 8, size_label: "500g", weight_grams: 500, price: 110, discounted_price: 100, in_stock: true, sku: "AF-MF-500G" },
      { id: 9, size_label: "1kg", weight_grams: 1000, price: 210, discounted_price: 190, in_stock: true, sku: "AF-MF-1KG" }
    ]
  },

  // --- Traditional Grain Collection ---
  {
    id: 4,
    name: "Makka Aata",
    hindi_name: "मक्का आटा (Yellow Maize Flour)",
    slug: "makka-aata",
    category_id: 2,
    tagline: "Golden sweet corn flour for Malwa & Punjabi Makki di Roti",
    short_description: "Sweet, golden, slow-milled maize flour with the signature earthy aroma. Ideal partner for Sarson ka Saag.",
    description: "Sourced from sun-ripened indigenous yellow maize cobs. Our slow milling method protects the natural sweetness and fiber of the grain, creating pliable dough for authentic, hearty winter rotis and flatbreads.",
    benefits: ["Rich in Dietary Fiber & Beta-Carotene", "Heart Healthy & Vitamin B Packed", "Authentic Golden Malwa Aroma", "100% Natural"],
    purity_highlights: ["No Artificial Food Color", "Traditional Stone Ground", "Fresh Grain Sourcing"],
    ingredients: "100% Selected Yellow Corn Grains",
    shelf_life: "4 Months",
    image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    badge: "Winter Favourite",
    is_featured: true,
    is_active: true,
    order_index: 4,
    variants: [
      { id: 10, size_label: "500g", weight_grams: 500, price: 40, discounted_price: 35, in_stock: true, sku: "AF-MAK-500G" },
      { id: 11, size_label: "1kg", weight_grams: 1000, price: 75, discounted_price: 65, in_stock: true, sku: "AF-MAK-1KG" }
    ]
  },
  {
    id: 5,
    name: "Bajra Aata",
    hindi_name: "बाजरा आटा (Pearl Millet Flour)",
    slug: "bajra-aata",
    category_id: 2,
    tagline: "Iron-dense rustic millet flour for warm winter rotis and bhakri",
    short_description: "Earthy, mineral-dense flour from prime pearl millet grains. Provides comforting warmth, sustained energy, and low glycemic index.",
    description: "Anjanam Bajra Aata is freshly milled in small batches to preserve its natural wholesome oils without developing bitterness. Packed with magnesium, iron, and fiber, it is an ancestral superfood for gut wellness and diabetic-friendly diets.",
    benefits: ["Immense Iron & Magnesium Content", "Supports Healthy Blood Sugar Balance", "Naturally Warming & Nourishing", "Gluten-Free Grain"],
    purity_highlights: ["Fresh Batch Milling", "Zero Adulteration", "Unbleached & Unrefined"],
    ingredients: "100% Cleaned Desi Bajra Grains",
    shelf_life: "4 Months",
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    badge: "Heritage Millet",
    is_featured: true,
    is_active: true,
    order_index: 5,
    variants: [
      { id: 12, size_label: "500g", weight_grams: 500, price: 42, discounted_price: 38, in_stock: true, sku: "AF-BAJ-500G" },
      { id: 13, size_label: "1kg", weight_grams: 1000, price: 80, discounted_price: 70, in_stock: true, sku: "AF-BAJ-1KG" }
    ]
  },
  {
    id: 6,
    name: "Jowar Aata",
    hindi_name: "ज्वार आटा (Sorghum Flour)",
    slug: "jowar-aata",
    category_id: 2,
    tagline: "Light, cooling, diabetic-friendly white sorghum flour",
    short_description: "Fine-textured white sorghum flour for soft rotis and bhakris. Naturally cool for round-the-year wellness.",
    description: "Crafted from selected whole grain white jowar. High in dietary fiber and essential minerals, Jowar Aata promotes healthy digestion and heart health while providing a light, fluffy texture to every meal.",
    benefits: ["Low Glycemic Index for Glucose Management", "High Dietary Fiber for Gut Health", "Light on Stomach & Refreshing", "Zero Additives"],
    purity_highlights: ["Triple Sifted Clean Grain", "Nutrient-Preserving Milling", "FSSAI Guaranteed"],
    ingredients: "100% Desi White Jowar",
    shelf_life: "4 Months",
    image_url: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    badge: "Diabetic Friendly",
    is_featured: false,
    is_active: true,
    order_index: 6,
    variants: [
      { id: 14, size_label: "500g", weight_grams: 500, price: 48, discounted_price: 42, in_stock: true, sku: "AF-JOW-500G" },
      { id: 15, size_label: "1kg", weight_grams: 1000, price: 90, discounted_price: 80, in_stock: true, sku: "AF-JOW-1KG" }
    ]
  },

  // --- Healthy Staples ---
  {
    id: 7,
    name: "Makka Daliya",
    hindi_name: "मक्का दलिया (Cracked Corn / Grits)",
    slug: "makka-daliya",
    category_id: 3,
    tagline: "Evenly cracked golden corn kernels for soothing morning porridge & khichdi",
    short_description: "Clean, uniformly cut maize daliya that cooks into a creamy, golden, fiber-rich porridge or savory breakfast bowl.",
    description: "Produced by precision cracking of clean dried corn kernels. Free from powder dust, it provides an exquisite texture and rich natural fiber to energize your mornings and soothe your digestive system.",
    benefits: ["High Satiety & Sustained Energy", "Zero Cholesterol & Low Fat", "Quick & Easy to Cook", "Gut Friendly Fiber"],
    purity_highlights: ["No Husk & Dust Free", "Uniform Granules", "Hygienically Packed"],
    ingredients: "100% Pure Maize Grits",
    shelf_life: "6 Months",
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    badge: "Breakfast Favourite",
    is_featured: false,
    is_active: true,
    order_index: 7,
    variants: [
      { id: 16, size_label: "250g", weight_grams: 250, price: 25, discounted_price: 22, in_stock: true, sku: "AF-MKD-250G" },
      { id: 17, size_label: "500g", weight_grams: 500, price: 45, discounted_price: 40, in_stock: true, sku: "AF-MKD-500G" }
    ]
  },
  {
    id: 8,
    name: "Bajra Khichda",
    hindi_name: "बाजरा खिचड़ा (Cracked Pearl Millet)",
    slug: "bajra-khichda",
    category_id: 3,
    tagline: "De-husked and cracked pearl millet for traditional warming khichda",
    short_description: "Traditional de-husked cracked pearl millet for cooking rich, comforting winter khichda with pure ghee and jaggery.",
    description: "An authentic Malwa & Rajasthani staple. Our Bajra Khichda undergoes a special mechanical de-husking and cracking process so that every bowl cooks to a velvety, creamy consistency without bitterness.",
    benefits: ["Immunity Booster & Warming", "High Iron Content for Anemia Prevention", "Authentic Village-Style Texture", "Nourishing Comfort Food"],
    purity_highlights: ["Precision De-Husked", "Fresh Aroma Guaranteed", "Zero Preservatives"],
    ingredients: "100% De-husked Broken Pearl Millet",
    shelf_life: "6 Months",
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    badge: "Traditional Comfort",
    is_featured: false,
    is_active: true,
    order_index: 8,
    variants: [
      { id: 18, size_label: "250g", weight_grams: 250, price: 28, discounted_price: 25, in_stock: true, sku: "AF-BJK-250G" },
      { id: 19, size_label: "500g", weight_grams: 500, price: 50, discounted_price: 45, in_stock: true, sku: "AF-BJK-500G" }
    ]
  },
  {
    id: 9,
    name: "Chawal Aata",
    hindi_name: "चावल आटा (Fine Rice Flour)",
    slug: "chawal-aata",
    category_id: 3,
    tagline: "Superfine silky rice flour for crispy dosas, modaks, snacks & rotis",
    short_description: "Silky-smooth, snow-white rice flour milled from aged non-sticky grains. The secret behind crispy snacks and delicate steamed modaks.",
    description: "Milled to an ultra-fine micron consistency, Anjanam Chawal Aata is your kitchen companion for crunchy pakodas, crispy dosas, ukadiche modaks, and soothing rice rotis.",
    benefits: ["Silky Smooth & Lump-Free", "Adds Supreme Crispiness to Snacks", "100% Gluten-Free Alternative", "Pure White & Clean"],
    purity_highlights: ["Aged Grain Milling", "Zero Artificial Starch", "Moisture Controlled"],
    ingredients: "100% Pure Aged Rice",
    shelf_life: "6 Months",
    image_url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80",
    badge: "Crispy Delights",
    is_featured: false,
    is_active: true,
    order_index: 9,
    variants: [
      { id: 20, size_label: "500g", weight_grams: 500, price: 40, discounted_price: 35, in_stock: true, sku: "AF-CHW-500G" },
      { id: 21, size_label: "1kg", weight_grams: 1000, price: 75, discounted_price: 68, in_stock: true, sku: "AF-CHW-1KG" }
    ]
  }
];

export const INITIAL_RECIPES = [
  {
    id: 1,
    title: "Rajgira Paratha",
    hindi_title: "राजगिरा पराठा",
    slug: "rajgira-paratha",
    category: "Vrat Specials",
    description: "Soft, golden fasting flatbread prepared with Anjanam Rajgira Aata, mashed boiled potatoes, green chillies, and rock salt.",
    prep_time: "15 mins",
    cook_time: "10 mins",
    total_time: "25 mins",
    servings: "4 Persons",
    difficulty: "Easy",
    ingredients: [
      "2 cups Anjanam Rajgira Aata",
      "2 medium boiled & mashed potatoes (alu)",
      "1 tsp Sendha Namak (Rock Salt)",
      "2 finely chopped green chillies",
      "1 tsp roasted cumin (jeera) powder",
      "2 tbsp freshly chopped coriander",
      "2 tbsp Pure Desi Ghee for roasting",
      "Warm water as needed"
    ],
    instructions: [
      "In a wide mixing bowl, add Anjanam Rajgira Aata, mashed boiled potatoes, green chillies, sendha namak, and cumin powder.",
      "Gently mix with hands. The moisture from potatoes helps bind the dough. Add 1-2 tbsp warm water if needed to form a soft, pliable dough.",
      "Divide into equal lemon-sized balls. Dust a rolling board with dry Rajgira Aata or use butter paper to roll gently without tearing.",
      "Heat a tawa on medium flame. Place the paratha and cook for 1 minute until small bubbles appear.",
      "Flip and apply pure desi ghee on both sides. Roast until crisp and golden brown on both sides.",
      "Serve piping hot with chilled curd, peanut chutney, or aloo sabji."
    ],
    chef_tips: "Mashing the potatoes finely without lumps is the key to getting tear-free, soft Rajgira parathas.",
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    order_index: 1
  },
  {
    id: 2,
    title: "Crispy Singhada Puri",
    hindi_title: "सिंघाड़ा पूरी",
    slug: "singhada-puri",
    category: "Vrat Specials",
    description: "Deep-fried golden, puffed fasting puris with a delicate crunch made with pure Singhada Aata.",
    prep_time: "15 mins",
    cook_time: "15 mins",
    total_time: "30 mins",
    servings: "4 Persons",
    difficulty: "Medium",
    ingredients: [
      "2 cups Anjanam Singhada Aata",
      "2 boiled & grated potatoes",
      "1 tsp Sendha Namak",
      "1/2 tsp crushed black pepper",
      "Groundnut oil or pure ghee for deep frying"
    ],
    instructions: [
      "Combine Singhada Aata with grated potatoes, sendha namak, and black pepper.",
      "Knead without extra water into a semi-firm dough. Let it rest for 5 minutes.",
      "Grease a plastic sheet with oil and gently pat a small portion into a 4-inch round disc with your fingers.",
      "Heat groundnut oil in a deep kadhai on medium-high heat.",
      "Gently slide the puri into the hot oil. Press softly with a slotted spoon till it puffs up magnificently.",
      "Fry until golden and crisp. Drain on paper towels and serve with Vrat ki Aloo Sabzi."
    ],
    chef_tips: "Patting with fingers on greased parchment paper is much easier than using a rolling pin for Singhada dough.",
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    order_index: 2
  },
  {
    id: 3,
    title: "Fariyali Roti & Thalipeeth",
    hindi_title: "फरियाली रोटी एवं थालीपीठ",
    slug: "fariyali-roti",
    category: "Vrat Specials",
    description: "Wholesome, soft fasting rotis made effortless with Anjanam Mix Fariyali Aata. Perfect with curd and sabudana khichdi.",
    prep_time: "10 mins",
    cook_time: "10 mins",
    total_time: "20 mins",
    servings: "3 Persons",
    difficulty: "Easy",
    ingredients: [
      "2 cups Anjanam Mix Fariyali Aata",
      "1/2 cup warm milk or water",
      "1 tsp Sendha Namak",
      "1 tsp Cumin Seeds",
      "1 tbsp Desi Ghee"
    ],
    instructions: [
      "Take Anjanam Mix Fariyali Aata in a bowl and add salt and cumin seeds.",
      "Slowly add warm milk or water and knead into a very smooth, soft dough.",
      "Roll smoothly using dry flour dusting. Notice how smoothly it rolls compared to single grain flours!",
      "Cook on a medium-hot iron tawa, flipping once. Smear with desi ghee.",
      "Enjoy soft, wholesome rotis during your sacred fasting days."
    ],
    chef_tips: "Using warm milk instead of water makes the fariyali rotis melt-in-the-mouth soft.",
    image_url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    order_index: 3
  },
  {
    id: 4,
    title: "Traditional Makka Roti",
    hindi_title: "मक्के की रोटी",
    slug: "makka-roti",
    category: "Traditional Rotis",
    description: "Authentic thick, rustic yellow corn flatbread with charred golden edges, served with rich butter and gur.",
    prep_time: "15 mins",
    cook_time: "15 mins",
    total_time: "30 mins",
    servings: "4 Persons",
    difficulty: "Medium",
    ingredients: [
      "2 cups Anjanam Makka Aata",
      "1 cup warm water",
      "1/2 tsp salt",
      "1 tsp ajwain (carom seeds)",
      "Desi Ghee / White Butter (Makhan)"
    ],
    instructions: [
      "Add salt and ajwain to Anjanam Makka Aata. Pour hot water little by little.",
      "Knead with the base of your palm for 4-5 minutes until elastic and smooth.",
      "Take a portion, flatten between palms or on a moist polythene sheet into a round disc.",
      "Transfer to a hot cast iron tawa. Cook on low-medium flame so the interior cooks completely.",
      "Flip and roast over open flame for the signature rustic charred aroma. Smear with generous butter."
    ],
    chef_tips: "Always knead with warm water and work the dough with the palm of your hand for elasticity.",
    image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    order_index: 4
  },
  {
    id: 5,
    title: "Desi Bajra Roti",
    hindi_title: "बाजरे की रोटी",
    slug: "bajra-roti",
    category: "Traditional Rotis",
    description: "Mineral-rich rustic pearl millet flatbread, hand-patted and flame-roasted to golden perfection.",
    prep_time: "15 mins",
    cook_time: "15 mins",
    total_time: "30 mins",
    servings: "4 Persons",
    difficulty: "Medium",
    ingredients: [
      "2 cups Anjanam Bajra Aata",
      "Lukewarm water as required",
      "Pinch of salt",
      "Fresh Desi Ghee & Jaggery (Gur)"
    ],
    instructions: [
      "Take Anjanam Bajra Aata and add a pinch of salt.",
      "Knead portion-by-portion using lukewarm water till soft and pliable.",
      "Dust rolling surface with bajra flour and pat gently with hands to spread into a disc.",
      "Place on a hot earthen (mitti) or iron tawa, apply a light smear of water on the top surface.",
      "Cook, flip, and puff over direct flame. Serve warm with desi ghee and garlic chutney."
    ],
    chef_tips: "Knead only 1-2 rotis worth of dough at a time for optimal hand-patting texture.",
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    is_featured: false,
    order_index: 5
  },
  {
    id: 6,
    title: "Jowar Bhakri",
    hindi_title: "ज्वार भाकरी",
    slug: "jowar-bhakri",
    category: "Traditional Rotis",
    description: "Soft, wholesome white sorghum flatbreads. High in fiber, low glycemic, and gentle on the stomach.",
    prep_time: "15 mins",
    cook_time: "12 mins",
    total_time: "27 mins",
    servings: "3 Persons",
    difficulty: "Easy",
    ingredients: [
      "2 cups Anjanam Jowar Aata",
      "1 cup boiling water",
      "Pinch of salt",
      "1 tsp Ghee"
    ],
    instructions: [
      "Pour boiling water into the Jowar Aata and mix with a spoon. Cover for 5 minutes.",
      "Once warm enough to handle, knead into a very soft, pliable dough.",
      "Pat smoothly into a thin bhakri. Place on a hot tawa and spread water on top.",
      "Flip and roast until the bhakri puffs up like a balloon.",
      "Serve with spicy Pitla, Sev Tamatar, or green vegetable curries."
    ],
    chef_tips: "Using boiling water pre-gelatinizes the starch, yielding unbelievable puffing and softness.",
    image_url: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    is_featured: false,
    order_index: 6
  },
  {
    id: 7,
    title: "Nourishing Bajra Khichdi",
    hindi_title: "पौष्टिक बाजरा खिचड़ी / खिचड़ा",
    slug: "bajra-khichdi",
    category: "Healthy Staples",
    description: "Slow-cooked pearl millet and yellow moong dal khichdi infused with hing, cumin, and fragrant desi ghee.",
    prep_time: "15 mins",
    cook_time: "30 mins",
    total_time: "45 mins",
    servings: "4 Persons",
    difficulty: "Easy",
    ingredients: [
      "1 cup Anjanam Bajra Khichda (rinsed & soaked 30 mins)",
      "1/2 cup yellow moong dal",
      "4 cups water",
      "2 tbsp Pure Desi Ghee",
      "1 tsp Cumin seeds (Jeera)",
      "1/4 tsp Hing (Asafoetida)",
      "1 tsp Turmeric powder & Sendha namak to taste",
      "1 inch grated ginger & 2 green chillies"
    ],
    instructions: [
      "Soak Anjanam Bajra Khichda in warm water for 30 minutes for faster cooking.",
      "In a pressure cooker, heat 1 tbsp ghee. Add cumin seeds, hing, ginger, and green chillies.",
      "Add drained Bajra Khichda, moong dal, turmeric, salt, and 4 cups of water.",
      "Pressure cook on medium heat for 4-5 whistles, then simmer for 5 minutes.",
      "Let pressure release naturally. Open, stir to creamy consistency, and top with remaining ghee.",
      "Serve warm with fresh curd, papad, and pickle."
    ],
    chef_tips: "A gentle soak in warm water softens the grain outer layer for a melt-in-mouth creamy texture.",
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    order_index: 7
  }
];

export const INITIAL_FAQS = [
  {
    id: 1,
    question: "Do you deliver in Indore?",
    answer: "Yes! We provide prompt, fresh doorstep delivery across all areas of Indore, including Tilak Nagar, Palasia, Vijay Nagar, Annapurna, Saket, Scheme 54, Rajendra Nagar, and surrounding localities. Orders are dispatched quickly upon WhatsApp confirmation.",
    category: "Delivery",
    order_index: 1
  },
  {
    id: 2,
    question: "Are your products FSSAI certified?",
    answer: "Yes, Anjanam Foods is 100% FSSAI certified and strictly adheres to national food safety, hygiene, and grain processing standards. Every batch undergoes stringent quality testing.",
    category: "Purity & Quality",
    order_index: 2
  },
  {
    id: 3,
    question: "Which products are suitable for vrat (fasting)?",
    answer: "Our dedicated Vrat Collection includes Rajgira Aata (Amaranth Flour), Singhada Aata (Water Chestnut Flour), and Mix Fariyali Aata. These are processed in specialized, sanitized milling lines strictly isolated from non-vrat grains to preserve sanctity.",
    category: "Vrat Sanctity",
    order_index: 3
  },
  {
    id: 4,
    question: "Do you provide wholesale supply for retailers & distributors?",
    answer: "Absolutely! We supply bulk packs, distributor cartons, and custom wholesale consignments for supermarkets, kirana stores, caterers, and temple trusts. You can submit our Partner form or connect directly on WhatsApp at +91 8827685003.",
    category: "Wholesale & B2B",
    order_index: 4
  },
  {
    id: 5,
    question: "How can I place an order?",
    answer: "Ordering is instant and hassle-free! Simply select your favorite product, size variant (200g, 500g, 1kg), and quantity on this website, then click 'Order on WhatsApp'. A pre-filled message will open directly in your WhatsApp. Confirm your address and our team will handle the rest!",
    category: "Ordering",
    order_index: 5
  },
  {
    id: 6,
    question: "What is the shelf life of Anjanam flours?",
    answer: "Since our flours are 100% natural with zero preservatives or chemical bleaches, we recommend consuming them within 4 to 6 months of packaging. Store in an airtight container in a cool, dry place.",
    category: "Storage",
    order_index: 6
  }
];
