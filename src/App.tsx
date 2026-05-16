import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, Heart, ArrowRight, Instagram, Mail, MapPin, Sparkles, Facebook, Twitter, Star, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Cart } from './components/Cart';
import { ProductDetail } from './components/ProductDetail';
import { AIConcierge } from './components/AIConcierge';
import { Checkout } from './components/Checkout';
import { OrderHistory } from './components/OrderHistory';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sy_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    localStorage.setItem('sy_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Stationery', 'Lifestyle', 'Gifts'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast.success(`${product.name} added to bag`, {
      description: "It has been added to your selection.",
      action: {
        label: "View Bag",
        onClick: () => setCartOpen(true),
      },
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setTimeout(() => setCheckoutOpen(true), 300);
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground font-sans text-foreground">
      <Toaster position="bottom-right" richColors />
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-border/50' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="lg:hidden text-foreground">
              <Menu className="w-6 h-6 stroke-[1.5px]" />
            </button>
            <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium opacity-70">
              <a href="#" className="hover:opacity-100 transition-opacity">Shop</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Bespoke</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Journal</a>
            </nav>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-4xl font-semibold tracking-tighter cursor-pointer">
              S<span className="italic font-light opacity-80">y</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setHistoryOpen(true)}
              className="hover:opacity-70 transition-opacity flex items-center gap-2 group"
            >
              <History className="w-5 h-5 stroke-[1.5px] group-hover:rotate-[-45deg] transition-transform" />
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 hidden sm:inline">History</span>
            </button>
            <button className="hidden md:block hover:opacity-70 transition-opacity">
              <Search className="w-5 h-5 stroke-[1.5px]" />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="group flex items-center gap-2 relative bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2px]" />
              <span className="text-xs font-semibold uppercase tracking-widest hidden sm:inline">Your Bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-background animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>


      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full w-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=2000" 
                alt="Sincerely Yours Hero" 
                className="h-full w-full object-cover grayscale-[0.2] sepia-[0.1]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="container relative z-20 px-6 mt-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] opacity-60">
                  <Separator className="w-12 bg-foreground/20" />
                  <span>Est. 2024</span>
                  <Separator className="w-4 bg-foreground/20" />
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-accent" /> Powered by Gemini</span>
                </div>
                <h2 className="font-serif text-6xl md:text-8xl leading-none font-medium tracking-tight">
                  Letters to the <br /> 
                  <span className="italic font-light">Unspoken</span>.
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-serif italic max-w-xl leading-relaxed">
                  Discover our curated collection of artisanal stationery and heartfelt gifts designed for the moments that matter most.
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <Button size="lg" className="rounded-full px-8 h-14 text-base font-serif tracking-wide">
                    Shop Collection
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8 h-14 text-base font-serif italic tracking-wide hover:bg-accent/50"
                    onClick={() => toast("Our Philosophy", { 
                      description: "We are always good listeners.",
                      icon: <Heart className="w-4 h-4 text-primary" />
                    })}
                  >
                    Our Story
                  </Button>
                  <Button variant="ghost" size="lg" className="rounded-full px-4 group flex items-center gap-2 hover:bg-transparent">
                    <span className="font-serif italic border-b border-foreground/30 py-1 group-hover:border-foreground transition-all">Explore Bespoke</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories / Filter */}
        <section className="py-24 container px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
            <div className="space-y-2">
              <h3 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">Curated Pieces</h3>
              <p className="text-muted-foreground font-serif italic">Every object tells a story of sincerity.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-muted-foreground hover:bg-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => handleViewDetail(product)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-serif italic font-normal px-3 border-foreground/10 text-muted-foreground">
                        {product.category}
                      </Badge>
                      <span className="font-serif font-medium text-lg tracking-tight">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-2xl font-medium group-hover:text-primary transition-colors leading-tight">
                        {product.name}
                      </h4>
                      {product.reviews && product.reviews.length > 0 && (
                        <div className="flex items-center gap-1 text-xs font-serif italic text-primary/60">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="pt-4">
                      <Button 
                        variant="link" 
                        onClick={() => addToCart(product)}
                        className="p-0 h-auto font-serif italic text-base group-hover:text-primary underline-offset-4 hover:underline"
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Bespoke Promo */}
        <section className="bg-secondary/50 py-24 mb-24">
          <div className="container px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 aspect-square relative rounded-3xl overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200" 
                alt="Bespoke Writing" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <Badge className="bg-accent text-accent-foreground font-serif italic px-4 py-1">Limited Service</Badge>
              <h2 className="font-serif text-5xl font-medium tracking-tight">The Art of the Personal Hand.</h2>
              <p className="text-lg text-muted-foreground font-serif italic leading-relaxed">
                Our calligraphy studio offers bespoke services for those who believe in the power of a handwritten note. From custom monograms to wax seal designs, we help you leave a lasting impression.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-widest font-bold">Services</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <ul className="grid grid-cols-2 gap-4 text-sm font-serif italic">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Custom Letterheads</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Wax Seal Dies</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Ink Blending</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Calligraphy</li>
                </ul>
              </div>
              <Button size="lg" className="rounded-full px-8 h-14 font-serif text-lg tracking-wide">
                Book a Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="pb-24 container px-6">
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">Stay Sincere.</h2>
              <p className="text-lg opacity-80 font-serif italic">
                Join our circle for exclusive stories on craftsmanship, seasonal drops, and the philosophy of refined living.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  placeholder="Your email address" 
                  className="bg-primary-foreground/10 border-white/20 text-white placeholder:text-white/50 h-14 rounded-full px-8"
                />
                <Button className="h-14 px-8 rounded-full bg-white text-primary font-serif font-bold text-lg hover:bg-white/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-24 bg-secondary/20">
        <div className="container px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h1 className="font-serif text-4xl font-semibold tracking-tighter">
              S<span className="italic font-light opacity-80">y</span>
            </h1>
            <p className="text-muted-foreground font-serif italic max-w-sm leading-relaxed">
              An elegant boutique for personalized gifts, bespoke stationery, and heartfelt tokens. Crafted for those who appreciate the nuances of a life well-lived.
            </p>
            <div className="flex items-center gap-6 py-4">
              <a href="https://instagram.com/sincerelyyours" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://facebook.com/sincerelyyours" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://twitter.com/sincerelyyours" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="mailto:hello@sincerelyyours.com" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><MapPin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-bold uppercase tracking-widest text-xs">Boutique</h5>
            <ul className="space-y-4 text-sm text-muted-foreground font-serif italic">
              <li>
                <button 
                  onClick={() => toast("Our Philosophy", { description: "We are always good listeners." })}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bespoke Studio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">The Journal</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-bold uppercase tracking-widest text-xs">Assistance</h5>
            <ul className="space-y-4 text-sm text-muted-foreground font-serif italic">
              <li>0246295794</li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Care Instructions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container px-6 mt-24 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 gap-4">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">
            &copy; 2024 Sy. All Rights Reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">
            Design for the Heartfelt.
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <Cart 
        isOpen={cartOpen} 
        onOpenChange={setCartOpen} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Selection */}
      <Checkout 
        isOpen={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        total={cartTotal}
        items={cartItems}
        onSuccess={handlePaymentSuccess}
      />

      {/* Product Detail Selection */}
      <ProductDetail 
        product={selectedProduct}
        isOpen={detailOpen}
        onOpenChange={setDetailOpen}
        onAddToCart={addToCart}
      />

      {/* AI Concierge */}
      <AIConcierge onAddToCart={addToCart} onViewProduct={handleViewDetail} />

      {/* Order History */}
      <OrderHistory 
        isOpen={historyOpen}
        onOpenChange={setHistoryOpen}
      />
    </div>
  );
}
