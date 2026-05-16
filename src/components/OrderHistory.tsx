import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Clock, CheckCircle2, ChevronRight, ArrowLeft, History, Receipt as ReceiptIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Order } from '../types';
import { PAST_ORDERS } from '../constants';
import { Receipt } from './Receipt';
import { Dialog, DialogContent } from './ui/dialog';

interface OrderHistoryProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderHistory({ isOpen, onOpenChange }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [receiptOpen, setReceiptOpen] = React.useState(false);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'processing': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'shipped': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="w-3 h-3" />;
      case 'processing': return <Clock className="w-3 h-3" />;
      case 'shipped': return <Package className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader className="pb-6 border-b border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-primary opacity-60" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Account Archives</span>
          </div>
          <SheetTitle className="font-serif text-3xl font-medium">Order History</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          <AnimatePresence mode="wait">
            {!selectedOrder ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {PAST_ORDERS.length > 0 ? (
                  PAST_ORDERS.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="w-full text-left p-5 rounded-3xl border border-border/40 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">{order.id}</p>
                          <p className="font-serif italic text-lg">{order.date}</p>
                        </div>
                        <Badge variant="outline" className={`font-serif italic font-normal gap-1.5 px-3 py-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-sm text-muted-foreground font-serif italic">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-medium text-lg leading-none">${order.total}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto opacity-20">
                      <Package className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif italic text-lg">A blank slate.</p>
                      <p className="text-sm text-muted-foreground">Your architectural journey begins with your first selection.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-full hover:bg-primary/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">{selectedOrder.id}</p>
                      <Badge variant="outline" className={`font-serif italic font-normal gap-1.5 px-3 py-1 ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-3xl font-medium">{selectedOrder.date}</h3>
                  </div>

                  <Separator className="bg-border/40" />

                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Your Selections</h4>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center group">
                          <div className="space-y-1">
                            <p className="font-serif italic text-lg leading-tight group-hover:text-primary transition-colors">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                              Qty: {item.quantity} · ${item.price}
                            </p>
                          </div>
                          <span className="font-serif font-medium text-lg">${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-border/40" />

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="text-sm italic font-serif">Packaging & Handling</span>
                      <span className="font-serif italic tracking-tight">Complimentary</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="text-sm italic font-serif">Tracked Shipping</span>
                      <span className="font-serif italic tracking-tight">
                        {selectedOrder.shippingCost && selectedOrder.shippingCost > 0 
                          ? `$${selectedOrder.shippingCost.toFixed(2)}` 
                          : 'Complimentary'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 pb-6">
                      <span className="font-serif italic text-xl">Investment Total</span>
                      <span className="font-serif font-medium text-2xl tracking-tighter">${selectedOrder.total}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setReceiptOpen(true)}
                      className="w-full rounded-full font-serif italic py-6 gap-2"
                    >
                      <ReceiptIcon className="w-4 h-4 opacity-60" />
                      View Official Receipt
                    </Button>
                    <p className="text-[10px] text-muted-foreground italic text-center opacity-40">
                        Thank you for your refined investment in artisanal craftsmanship.
                    </p>
                  </div>
                </div>

                <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
                  <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none overflow-y-auto max-h-[90vh]">
                    {selectedOrder && <Receipt order={selectedOrder} />}
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
