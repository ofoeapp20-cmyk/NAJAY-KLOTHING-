import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onOpenChange, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader className="pb-6">
          <SheetTitle className="font-serif text-3xl font-medium">Your Selection</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <ShoppingBag className="w-12 h-12 stroke-[1px]" />
              <p className="font-serif italic">Your bag is currently empty.</p>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="rounded-full px-8"
              >
                Continue Browsing
              </Button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4"
                >
                  <div className="h-24 w-24 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-medium text-lg leading-tight">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-secondary rounded-full px-3 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="hover:text-primary transition-colors disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="hover:text-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-6 border-t space-y-4">
            <div className="flex justify-between items-center text-lg font-serif">
              <span>Estimated Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground italic text-center">
              Taxes and shipping calculated at checkout.
            </p>
            <Button 
              onClick={onCheckout}
              className="w-full h-12 rounded-full text-lg font-serif tracking-wide bg-primary hover:bg-primary/90"
            >
              Checkout Sincerely
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
