export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: 'delivered' | 'processing' | 'shipped';
  paymentMethod?: string;
  customerName?: string;
  customerEmail?: string;
  shippingCost?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Stationery' | 'Lifestyle' | 'Gifts';
  image: string;
  details?: string;
  materialSourcing?: string;
  artisanStory?: string;
  careInstructions?: string;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}
