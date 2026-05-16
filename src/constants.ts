import { Product, Order } from './types';

export const PAST_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    total: 105,
    status: 'delivered',
    items: [
      { id: '1', name: 'Bespoke Monogram Stationery', price: 45, quantity: 1 },
      { id: '5', name: 'Italian Leather Journal', price: 60, quantity: 1 }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-04-02',
    total: 32,
    status: 'delivered',
    items: [
      { id: '2', name: 'Midnight Lavender Soy Candle', price: 32, quantity: 1 }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-05-10',
    total: 120,
    status: 'processing',
    items: [
      { id: '3', name: 'The Heirloom Fountain Pen', price: 120, quantity: 1 }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bespoke Monogram Stationery',
    description: 'Textured cream paper with elegant foil-pressed monograms.',
    price: 45,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?auto=format&fit=crop&q=80&w=800',
    details: 'Each set includes 25 cards and hand-lined envelopes.',
    materialSourcing: 'Sourced from a family-owned mill in the English Lake District, using 100% recycled cotton fibers.',
    artisanStory: 'Crafted by Clara, a third-generation printer who specializes in traditional letterpress techniques.',
    careInstructions: 'Store in a cool, dry place. Avoid direct sunlight to prevent delicate color fading.',
    reviews: [
      { id: 'r1', userName: 'Eleanor R.', rating: 5, comment: 'The quality of the paper is unmatched. Truly feels like a luxury experience.', date: '2024-03-12' },
      { id: 'r2', userName: 'James W.', rating: 4, comment: 'Beautiful stationery, though I wish there were more envelope liner options.', date: '2024-03-05' }
    ]
  },
  {
    id: '2',
    name: 'Midnight Lavender Soy Candle',
    description: 'Hand-poured artisanal candle with organic lavender fields essence.',
    price: 32,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1602810318383-e502cb24a0d9?auto=format&fit=crop&q=80&w=800',
    details: '50-hour burn time. Sustainable soy wax.',
    materialSourcing: 'Organic lavender harvested from our own estate at peak bloom, blended with non-GMO soy wax.',
    artisanStory: 'Poured by Thomas, a scent alchemist who believes in the meditative power of slow fragrance development.',
    careInstructions: 'Trim wick to 1/4 inch before each burn. Do not burn for more than 4 hours at a time.',
    reviews: [
      { id: 'r3', userName: 'Sophie L.', rating: 5, comment: 'The scent is so calming. It fills the room without being overpowering.', date: '2024-02-28' }
    ]
  },
  {
    id: '3',
    name: 'The Heirloom Fountain Pen',
    description: 'A timeless writing instrument with a 14k gold-plated nib.',
    price: 120,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    details: 'Includes a velvet-lined carrying case and three ink cartridges.',
    materialSourcing: 'Engineered with high-grade resin and gold-plated components sourced from ethical suppliers in Germany.',
    artisanStory: 'Assembled by Marcus in a small workshop where every nib is hand-tested for flow and flexibility.',
    careInstructions: 'Flush with lukewarm water monthly to prevent ink buildup. Store horizontally.',
    reviews: [
      { id: 'r4', userName: 'Arthur C.', rating: 5, comment: 'A perfect weight in the hand. The nib is incredibly smooth.', date: '2024-03-15' },
      { id: 'r5', userName: 'Julian M.', rating: 5, comment: 'An absolute masterpiece of craftsmanship.', date: '2024-03-20' }
    ]
  },
  {
    id: '4',
    name: 'Curated Seasonal Gift Box',
    description: 'A hand-selected collection of our most beloved seasonal items.',
    price: 85,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
    details: 'Includes a small candle, stationery set, and artisanal chocolates.',
    materialSourcing: 'A mixture of small-batch products from our local partner artisans, wrapped in FSC-certified packaging.',
    artisanStory: 'Curated by our founders to celebrate the changing rhythms of nature and human connection.',
    careInstructions: 'Specific care for each item is provided inside the box on a handwritten guide.'
  },
  {
    id: '5',
    name: 'Italian Leather Journal',
    description: 'Supple hand-stitched leather bound with archival-quality paper.',
    price: 65,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    details: '160 pages of 120gsm ivory paper. Refillable design.',
    materialSourcing: 'Full-grain, vegetable-tanned leather from a historic tannery in Tuscany, Italy.',
    artisanStory: 'Hand-sewn by Sofia, who uses traditional saddlery stitches for lifelong durability.',
    careInstructions: 'Apply a light coat of leather conditioner every six months to maintain suppleness.'
  },
  {
    id: '6',
    name: 'Hand-Painted Porcelain Vase',
    description: 'Bespoke floral motifs on delicate white porcelain.',
    price: 95,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
    details: 'Height: 8 inches. Each piece is uniquely hand-painted.',
    materialSourcing: 'Fine bone china clay sourced from Cornwall, renowned for its transparency and strength.',
    artisanStory: 'Painted by Elias, whose work is inspired by 18th-century botanical illustrations found in the archives.',
    careInstructions: 'Hand wash only with mild detergent. Not recommended for dishwasher use.'
  },
  {
    id: '7',
    name: 'Wildflower Seed Paper Set',
    description: 'Plantable stationery that grows into a garden of blooms.',
    price: 28,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1586075010620-192994a5a88e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    name: 'Emerald Velvet Journal',
    description: 'Luxurious velvet cover with gold-edged archival pages.',
    price: 55,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
    name: 'Antique Brass Wax Seal Kit',
    description: 'Complete with melting spoon, wax beads, and a custom seal.',
    price: 42,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1533470192478-9997bf339168?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '10',
    name: 'Deep Sea Calligraphy Ink',
    description: 'Rich artisanal ink with a subtle metallic shimmer.',
    price: 18,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '11',
    name: 'Botanical Illustration Letterheads',
    description: 'Hand-drawn floral borders on heavy vellum paper.',
    price: 35,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '12',
    name: 'Silk Sleep Mask in Rose',
    description: '100% mulberry silk for a gentle, restorative rest.',
    price: 38,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '13',
    name: 'Hand-Carved Walnut Pen Tray',
    description: 'A elegant resting place for your finest writing tools.',
    price: 48,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1519789148387-2152420e9382?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '14',
    name: 'Sandalwood & Moss Incense',
    description: 'Earthy notes of cedarwood and forest floor.',
    price: 24,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1602810316498-0d8366ec9494?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '15',
    name: 'Hammered Copper Bookmark',
    description: 'Hand-beaten copper with a genuine leather tassel.',
    price: 22,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '16',
    name: 'Artisanal Tea Sampler Box',
    description: 'Six rare loose-leaf blends from small family estates.',
    price: 45,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '17',
    name: 'Stone Essential Oil Diffuser',
    description: 'Ceramic minimalist design with ultrasonic technology.',
    price: 78,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '18',
    name: 'Hand-Stitched Leather Passport Case',
    description: 'Vegetable-tanned leather for the soulful traveler.',
    price: 62,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '19',
    name: 'Smoked Glass Water Carafe',
    description: 'Elegant mouth-blown glass with a matching tumbler.',
    price: 52,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1523211711701-1cc5dcff9e59?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '20',
    name: 'Artisanal Honey Gift Set',
    description: 'Three varieties of raw, single-origin wildflower honey.',
    price: 36,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '21',
    name: 'Linen Bound Photo Album',
    description: 'Preserve memories in a book made from European flax.',
    price: 68,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1544133782-990710609384?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '22',
    name: 'Minimalist Desktop Clock',
    description: 'Solid oak case with a silent sweeping movement.',
    price: 85,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '23',
    name: 'Gold Foiled Star Map',
    description: 'The night sky on your special date, embossed in gold.',
    price: 75,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '24',
    name: 'Handcrafted Soy Wax Melts',
    description: 'Natural botanicals infused in pure soy wax cubes.',
    price: 18,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1605651262774-9c440a377d63?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '25',
    name: 'Embroidered Linen Napkins',
    description: 'Set of four napkins with delicate vine motifs.',
    price: 48,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '26',
    name: 'Carrara Marble Mortar & Pestle',
    description: 'A timeless tool for the artisanal kitchen.',
    price: 65,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1590214811986-7b819f04642c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '27',
    name: 'Vintage Style Glass Atomizer',
    description: 'Refillable perfume bottle with a classic puff pump.',
    price: 34,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '28',
    name: 'Archival Paper Clipping File',
    description: 'Organize your inspirations in a leather-bound folder.',
    price: 42,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '29',
    name: 'Copper Plated Coffee Scoop',
    description: 'Precision measure for the perfect morning ritual.',
    price: 24,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '30',
    name: 'Dried Lavender Sachet Trio',
    description: 'Fragrant French lavender in hand-sewn linen bags.',
    price: 22,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1515600466124-5c9695d0386a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '31',
    name: 'Hand-Blown Glass Votive Holder',
    description: 'Irregular crystalline shapes that play with candlelight.',
    price: 38,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1510253303666-41b953d9e03f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '32',
    name: 'Artisanal Charcoal Soap',
    description: 'Cold-pressed with bamboo charcoal and tea tree oil.',
    price: 15,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1628191010210-a59771599553?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '33',
    name: 'Leather Luggage Tag Set',
    description: 'Two tags with hidden privacy flaps for your journeys.',
    price: 35,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '34',
    name: 'Pressed Flower Glass Frame',
    description: 'Double-walled glass to float your favorite blooms.',
    price: 45,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '35',
    name: 'Ceramic Gouache Palette',
    description: 'Hand-glazed ceramic tray for the watercolor artist.',
    price: 52,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '36',
    name: 'Raw Silk Ribbons (Set of 3)',
    description: 'Soft-edged ribbons for the ultimate gift wrapping.',
    price: 28,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '37',
    name: 'Wool Felt Desk Mat',
    description: 'Warm and sound-dampening surface for your workspace.',
    price: 65,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '38',
    name: 'Hand-Bound Travel Log',
    description: 'Compact size with map inserts and weather-proof paper.',
    price: 42,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '39',
    name: 'Brass Desktop Magnifier',
    description: 'Optical grade glass with a substantial brass handle.',
    price: 36,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '40',
    name: 'Rose Quartz Facial Roller',
    description: 'Cooling natural stone for a refined morning routine.',
    price: 32,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1616394158624-a2ba01e7424b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '41',
    name: 'Hand-Dipped Beeswax Tapers',
    description: 'Smokeless and honey-scented natural candles (Pair).',
    price: 24,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1570823170827-44776a96e.jpg?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '42',
    name: 'Personalized Wax Seal Stamp',
    description: 'Your unique initials engraved onto a solid brass head.',
    price: 58,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1533470192478-9997bf339168?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '43',
    name: 'Wilderness Survival Matches',
    description: 'Elegant glass apothecary jar with 50 long matches.',
    price: 22,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1456315138460-858d1089ddba?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '44',
    name: 'Concrete Candle Pedestal',
    description: 'Raw industrial base for our artisanal candles.',
    price: 28,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1581447021644-884c78ae1b0e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '45',
    name: 'Fine Tip Fountain Pen Ink',
    description: 'Water-resistant pigment in a vintage-style glass well.',
    price: 25,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '46',
    name: 'Linen Wrapped Keepsake Box',
    description: 'Acid-free storage for your most precious letters.',
    price: 45,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '47',
    name: 'Handwritten Recipe Journal',
    description: 'Numbered pages and an index for your kitchen secrets.',
    price: 38,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '48',
    name: 'Gilded Leaf Tea Strainer',
    description: 'Delicate gold mesh for a refined steeping experience.',
    price: 22,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458621b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '49',
    name: 'Cedar Shoe Valet Kit',
    description: 'Horsehair brushes and organic polish in a cedar box.',
    price: 85,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '50',
    name: 'Hand-Molded Clay Incense Bowl',
    description: 'Wabi-sabi aesthetic with a unique crackle glaze.',
    price: 34,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&q=80&w=800'
  }
];
