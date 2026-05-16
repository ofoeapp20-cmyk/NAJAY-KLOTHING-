import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, X, Info, Heart, Truck, Undo2, Star, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Product, Review } from '../types';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, isOpen, onOpenChange, onAddToCart }: ProductDetailProps) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });

  if (!product) return null;

  const averageRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Thank you for your review! It has been submitted for moderation.");
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col bg-background overflow-y-auto">
        <SheetHeader className="pb-6 border-b">
          <div className="flex items-center justify-between mb-4">
             <Badge variant="outline" className="font-serif italic font-normal px-3 border-foreground/10 text-muted-foreground">
                {product.category}
             </Badge>
             {averageRating && (
               <div className="flex items-center gap-1 text-sm font-serif italic text-primary">
                 <Star className="w-3 h-3 fill-current" />
                 <span>{averageRating} / 5.0</span>
               </div>
             )}
          </div>
          <SheetTitle className="font-serif text-4xl font-medium tracking-tight leading-tight">
            {product.name}
          </SheetTitle>
          <p className="font-serif text-2xl font-medium mt-2">${product.price}</p>
        </SheetHeader>

        <div className="py-8 space-y-12">
          {/* Image */}
          <div className="aspect-[3/2] rounded-3xl overflow-hidden bg-muted">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">The Piece</h3>
            <p className="font-serif text-xl italic leading-relaxed text-foreground/80 lowercase">
               "{product.description}"
            </p>
            {product.details && (
              <p className="text-muted-foreground leading-relaxed">
                {product.details}
              </p>
            )}
          </div>

          <Separator className="bg-border/30" />

          {/* Detailed Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {product.materialSourcing && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                  <Info className="w-3 h-3" /> Material Sourcing
                </h4>
                <p className="text-sm italic font-serif leading-relaxed text-muted-foreground">
                  {product.materialSourcing}
                </p>
              </div>
            )}
            
            {product.artisanStory && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                  <Star className="w-3 h-3" /> Artisan Story
                </h4>
                <p className="text-sm italic font-serif leading-relaxed text-muted-foreground">
                  {product.artisanStory}
                </p>
              </div>
            )}

            {product.careInstructions && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                  <Info className="w-3 h-3" /> Care Instructions
                </h4>
                <p className="text-sm italic font-serif leading-relaxed text-muted-foreground">
                  {product.careInstructions}
                </p>
              </div>
            )}

            <div className="space-y-3">
               <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                  <Truck className="w-3 h-3" /> Shipping
                </h4>
                <p className="text-sm italic font-serif leading-relaxed text-muted-foreground">
                  Complimentary tracked shipping on all bespoke orders. Delivered in our signature FSC-certified packaging.
                </p>
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Reviews Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">Client Reflections</h3>
              <Badge variant="outline" className="font-serif italic opacity-40">
                {product.reviews?.length || 0} reviews
              </Badge>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic font-medium">{review.userName}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground opacity-30'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm italic font-serif text-muted-foreground leading-relaxed lowercase">
                      "{review.comment}"
                    </p>
                    <p className="text-[10px] uppercase tracking-widest opacity-30">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic font-serif text-muted-foreground opacity-50">No reflections yet. Be the first to share your experience.</p>
            )}

            {/* Leave a Review Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4 pt-6 bg-secondary/20 p-6 rounded-3xl">
               <h4 className="font-serif italic text-lg opacity-80">Share Your Experience</h4>
               <div className="grid grid-cols-2 gap-4">
                 <Input 
                   placeholder="Your Name" 
                   value={newReview.userName}
                   onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                   className="rounded-xl font-serif italic"
                 />
                 <select 
                   className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background font-serif italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                   value={newReview.rating}
                   onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                 >
                   {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                 </select>
               </div>
               <Textarea 
                 placeholder="Your comments..." 
                 value={newReview.comment}
                 onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                 className="rounded-xl font-serif italic min-h-[100px]"
               />
               <Button type="submit" variant="outline" className="w-full rounded-full font-serif italic">
                 <Send className="w-4 h-4 mr-2" /> Submit Review
               </Button>
            </form>
          </div>

          <div className="pt-8 sticky bottom-0 bg-background/80 backdrop-blur-sm pb-4">
            <Button 
                onClick={() => {
                  onAddToCart(product);
                  onOpenChange(false);
                }}
                className="w-full h-16 rounded-full text-xl font-serif tracking-wide bg-primary shadow-xl hover:scale-[1.02] transition-transform"
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Add to Selection — ${product.price}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
