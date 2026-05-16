import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Loader2, Send, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { getProductRecommendations } from '../services/geminiService';
import { Product } from '../types';

interface AIConciergeProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export function AIConcierge({ onAddToCart, onViewProduct }: AIConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ recommendations: Product[]; reasoning: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    setIsLoading(true);
    const data = await getProductRecommendations(description);
    setResults(data);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-white text-primary shadow-2xl rounded-full p-4 flex items-center gap-3 border border-border group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="bg-primary text-primary-foreground p-1.5 rounded-full">
           <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold tracking-tight pr-1">AI Concierge</span>
        <div className="flex items-center gap-1 opacity-40">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
           <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
           <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        </div>
      </motion.button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full sm:max-w-md flex flex-col bg-background">
          <SheetHeader className="pb-8">
            <div className="flex items-center gap-2 mb-2">
                 <Sparkles className="w-5 h-5 text-primary" />
                 <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Powered by Google Gemini</span>
            </div>
            <SheetTitle className="font-serif text-4xl font-medium tracking-tight">Gift Concierge</SheetTitle>
            <SheetDescription className="font-serif italic text-lg leading-snug">
              Tell us who you're thinking of, and our intelligence will curate the perfect sentiment.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto space-y-8 pr-2">
            {!results && !isLoading ? (
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest opacity-60">The Recipient</label>
                  <textarea 
                    placeholder="e.g. A dear friend who loves quiet mornings, literature, and the warmth of lavender..."
                    className="w-full min-h-[150px] bg-secondary/50 border-none rounded-2xl p-6 text-lg font-serif italic focus:ring-1 focus:ring-primary outline-none resize-none transition-all"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={!description.trim()}
                  className="w-full h-14 rounded-full text-lg font-serif tracking-wide group"
                >
                  Seek Perfection
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            ) : isLoading ? (
              <div className="h-64 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="relative">
                   <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                   <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
                <p className="font-serif italic text-lg text-muted-foreground animate-pulse">Consulting the artisans of intelligence...</p>
              </div>
            ) : results ? (
              <div className="space-y-8">
                <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
                   <p className="font-serif italic text-lg leading-relaxed text-foreground/80 lowercase">
                     "{results.reasoning}"
                   </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Selected Recommendations</h4>
                  <div className="grid gap-6">
                    {results.recommendations.map((product) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={product.id}
                        className="flex gap-4 group"
                      >
                         <div className="h-20 w-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                              referrerPolicy="no-referrer"
                            />
                         </div>
                         <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                               <h5 className="font-serif font-medium leading-tight">{product.name}</h5>
                               <p className="text-xs text-muted-foreground">${product.price}</p>
                            </div>
                            <div className="flex gap-4">
                               <Button 
                                 variant="link" 
                                 className="p-0 h-auto self-start text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors"
                                 onClick={() => {
                                   onViewProduct(product);
                                   setIsOpen(false);
                                 }}
                               >
                                 View Details
                               </Button>
                               <Button 
                                 variant="link" 
                                 className="p-0 h-auto self-start text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors"
                                 onClick={() => {
                                   onAddToCart(product);
                                   setIsOpen(false);
                                 }}
                               >
                                 Add to Bag
                               </Button>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full rounded-full h-12 font-serif italic"
                  onClick={() => {
                    setResults(null);
                    setDescription('');
                  }}
                >
                  Start a New Search
                </Button>
              </div>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
