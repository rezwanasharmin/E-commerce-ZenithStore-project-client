import type { Product } from '../components/ProductCard';

export const defaultProducts: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, with ergonomic shoulder straps and water-resistant G-1000 HeavyDuty Eco fabric.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.8, count: 120 },
    sku: 'ZEN-BAG-101'
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.30,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. Solid stitched shirts with round neck made for durability.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.5, count: 259 },
    sku: 'ZEN-TSH-202'
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket & Windbreaker Coat',
    price: 55.99,
    description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.7, count: 500 },
    sku: 'ZEN-JCK-303'
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit Stretch Chino Pants',
    price: 35.90,
    description: 'Versatile casual trousers designed with flexible stretch comfort cotton blend fabric. Flat front with slant side pockets and button-through rear welt pockets for everyday office or casual leisure.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.3, count: 430 },
    sku: 'ZEN-PNT-404'
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
    price: 695.00,
    description: 'From the Naga Collection, this mythic dragon represents love and protection. Handcrafted with sterling silver and 18K bonded gold with rich sapphire eyes symbolizing prosperity.',
    category: 'jewelery',
    image: 'https://images.unsplash.com/photo-1611591475102-468205e45a27?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.9, count: 400 },
    sku: 'ZEN-JWL-505'
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave Diamond Ring',
    price: 168.00,
    description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and crafted in premium 14k yellow gold embedded with micro-pave natural diamonds.',
    category: 'jewelery',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.6, count: 70 },
    sku: 'ZEN-JWL-606'
  },
  {
    id: 7,
    title: 'White Gold Plated Princess Crown Solitaire Pendant',
    price: 49.99,
    description: 'Classic Princess cut cubic zirconia gemstone necklace. Created with hypoallergenic high-polish rhodium plating that resists tarnishing, complemented by an adjustable box chain.',
    category: 'jewelery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.4, count: 280 },
    sku: 'ZEN-JWL-707'
  },
  {
    id: 8,
    title: 'Pierced Owl Rose Gold Plated Stainless Steel Earrings',
    price: 29.99,
    description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Surgical Grade Stainless Steel for skin comfort and high-luster shine in every occasion.',
    category: 'jewelery',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.2, count: 156 },
    sku: 'ZEN-JWL-808'
  },
  {
    id: 9,
    title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
    price: 64.00,
    description: 'Fast data transfers with USB 3.0 and USB 2.0 compatibility. High capacity in a compact and lightweight enclosure, formatted for Windows and easily re-formattable for Mac.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.7, count: 640 },
    sku: 'ZEN-ELC-909'
  },
  {
    id: 10,
    title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 109.00,
    description: 'Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads with speeds up to 535MB/s.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.8, count: 470 },
    sku: 'ZEN-ELC-010'
  },
  {
    id: 11,
    title: 'Silicon Power 256GB High-Speed 3D NAND Performance SSD',
    price: 32.99,
    description: '3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup and improved overall system performance.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.5, count: 319 },
    sku: 'ZEN-ELC-011'
  },
  {
    id: 12,
    title: 'WD 4TB Gaming Drive Works with Playstation 4 & PC',
    price: 114.00,
    description: 'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer limited warranty.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.8, count: 400 },
    sku: 'ZEN-ELC-012'
  },
  {
    id: 13,
    title: 'Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin Gaming Monitor',
    price: 199.99,
    description: '21.5 inches Full HD (1920 x 1080) widescreen IPS display with Radeon FreeSync technology. Ultra-thin Zero Frame design with 75Hz refresh rate.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.6, count: 250 },
    sku: 'ZEN-ELC-013'
  },
  {
    id: 14,
    title: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor',
    price: 999.99,
    description: '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch side by side screens. Quantum dot (QLED) technology, HDR support and factory calibration.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.9, count: 140 },
    sku: 'ZEN-ELC-014'
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coat",
    price: 56.99,
    description: 'Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm. Stand Collar Liner design, keep you warm in cold weather.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.6, count: 235 },
    sku: 'ZEN-WMN-015'
  },
  {
    id: 16,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Jacket",
    price: 49.95,
    description: '100% POLYURETHANE (shell) 100% POLYESTER (lining). Faux leather material for style and comfort. 2 pockets on front, side waist detail with zipper closure.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.7, count: 340 },
    sku: 'ZEN-WMN-016'
  },
  {
    id: 17,
    title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    price: 39.99,
    description: 'Lightweight with breathable fabric, packable, skin-friendly, windproof waterproof function, giving you versatility in everyday life.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.4, count: 679 },
    sku: 'ZEN-WMN-017'
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V-Neck Top",
    price: 18.85,
    description: 'Lightweight fabric with great stretch for comfort. Ribbed on sleeves and neckline with double stitching on bottom hem for a clean polished look.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.5, count: 130 },
    sku: 'ZEN-WMN-018'
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture Wicking Athletic Shirt",
    price: 15.95,
    description: '100% Polyester, Machine Wash, 100% cationic polyester interlock. Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.5, count: 146 },
    sku: 'ZEN-WMN-019'
  },
  {
    id: 20,
    title: 'DANVOUY Womens Casual T-Shirt Cotton Striped Pocket Tee',
    price: 12.99,
    description: '95%Cotton, 5%Spandex, Features: Casual, Short Sleeve, Letter Print, V-Neck, Fashion Tees. The Fabric is Soft and has Some Stretch.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.6, count: 145 },
    sku: 'ZEN-WMN-020'
  }
];
