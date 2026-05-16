import * as React from 'react';
import { motion } from 'motion/react';
import { Printer, Download, Share2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Order } from '../types';
import { Separator } from './ui/separator';

interface ReceiptProps {
  order: Order;
  onClose?: () => void;
}

export function Receipt({ order, onClose }: ReceiptProps) {
  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = order.shippingCost ?? 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white text-[#1a1a1a] p-8 sm:p-12 font-serif relative overflow-hidden ring-1 ring-black/5 shadow-2xl rounded-sm">
      {/* Texture/Paper Effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
      
      {/* Receipt Header */}
      <div className="text-center space-y-4 mb-10 relative">
        <h2 className="text-4xl font-medium tracking-tighter italic">Sincerely</h2>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-40">Official Transaction Record</p>
          <div className="w-12 h-[1px] bg-black/10" />
        </div>
      </div>

      <div className="space-y-8 relative">
        {/* Order Meta */}
        <div className="flex justify-between items-start text-xs border-b border-dashed border-black/20 pb-6 uppercase tracking-widest leading-relaxed">
          <div className="space-y-1">
            <p className="opacity-40">Order Reference</p>
            <p className="font-sans font-bold tracking-normal">{order.id}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="opacity-40">Date of Order</p>
            <p className="font-sans font-bold tracking-normal">{order.date}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-8 py-2 border-b border-dashed border-black/20 pb-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Billed To</p>
            <div className="text-sm italic">
              <p className="font-medium not-italic">{order.customerName || 'Refined Patron'}</p>
              <p className="opacity-60">{order.customerEmail || 'patron@sincerely.com'}</p>
            </div>
          </div>
          <div className="space-y-2 text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Payment Method</p>
            <p className="text-sm">{order.paymentMethod || 'Manual Authorization'}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Items Acquired</p>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-baseline gap-4 group">
                <div className="flex-1 flex items-baseline gap-2">
                  <span className="text-lg italic leading-tight">{item.name}</span>
                  <div className="flex-1 border-b border-dotted border-black/10 h-0" />
                </div>
                <div className="text-sm font-sans flex gap-4">
                  <span className="opacity-40">x{item.quantity}</span>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Section */}
        <div className="pt-8 space-y-3">
          <div className="flex justify-between items-center text-sm italic opacity-60">
            <span>Subtotal Value</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm italic opacity-60">
            <span>Artisanal Packaging</span>
            <span>Complimentary</span>
          </div>
          <div className="flex justify-between items-center text-sm italic opacity-60">
            <span>Secure Post ({shippingCost > 0 ? (shippingCost > 10 ? 'Express' : 'Standard') : 'Complimentary'})</span>
            <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Complimentary'}</span>
          </div>
          
          <Separator className="bg-black/10 my-4" />
          
          <div className="flex justify-between items-end py-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold font-sans">Total Investment</p>
              <p className="text-xs italic opacity-40">Currency: USD</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-medium tracking-tighter">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 text-center space-y-6 border-t border-dashed border-black/20 pt-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center p-1">
              <Check className="w-4 h-4 opacity-40" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Transaction Verified</p>
          </div>
          
          <p className="text-xs italic leading-relaxed opacity-60 max-w-[240px] mx-auto">
            "Beauty is truth, truth beauty,—that is all ye know on earth, and all ye need to know."
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4 print:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 h-auto p-0 hover:bg-transparent"
              onClick={handlePrint}
            >
              <Printer className="w-3 h-3 mr-2" /> Print
            </Button>
            <span className="w-1 h-1 bg-black/10 rounded-full" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 h-auto p-0 hover:bg-transparent"
            >
              <Download className="w-3 h-3 mr-2" /> PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-black/5 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-black/5 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-black/5 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-black/5 rounded-br-sm pointer-events-none" />
    </div>
  );
}
