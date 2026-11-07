export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number; // PKR
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;
  image: string;
  secondaryImages?: string[];
  description: string;
  specs: Record<string, string>;
  colors?: string[];
  warranty: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  altPhone?: string;
  email?: string;
  address: string;
  city: string;
  province: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank' | 'jazzcash_easypaisa';
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountApplied: number;
  totalAmount: number;
  discountCode?: string;
  createdAt: string;
  trackingNumber: string;
  courierName?: string;
}

export interface DiscountCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  isActive: boolean;
}

export interface CustomerReview {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}
