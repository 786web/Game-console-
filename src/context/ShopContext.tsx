import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, DiscountCode, OrderStatus, CustomerReview } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_DISCOUNT_CODES, INITIAL_REVIEWS, STORE_INFO } from '../data/initialData';

interface ShopContextType {
  products: Product[];
  categories: readonly string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;
  shippingFee: number;
  appliedDiscount: { code: string; amount: number } | null;
  cartTotalAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;

  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  detailProduct: Product | null;
  setDetailProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingOrderId: string;
  setTrackingOrderId: (id: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetToDefaultCatalog: () => void;

  // WhatsApp Helpers
  generateProductWhatsAppUrl: (product: Product, quantity?: number, selectedColor?: string) => string;
  generateCartWhatsAppUrl: () => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ng_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ng_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ng_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ng_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [discountCodes] = useState<DiscountCode[]>(() => {
    try {
      const saved = localStorage.getItem('ng_discount_codes');
      return saved ? JSON.parse(saved) : INITIAL_DISCOUNT_CODES;
    } catch {
      return INITIAL_DISCOUNT_CODES;
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('ng_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);

  // Filters & Sorting
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);

  // Modal states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ng_products', JSON.stringify(products));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ng_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ng_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ng_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ng_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [reviews]);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((count, item) => count + item.quantity, 0);
  // Free delivery across Pakistan if cart is over 15,000 PKR, else standard 500 PKR
  const shippingFee = cartSubtotal > 15000 || cartSubtotal === 0 ? 0 : 500;
  const cartTotalAmount = Math.max(0, cartSubtotal + shippingFee - (appliedDiscount?.amount || 0));

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors?.[0] || 'Standard';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = { ...next[existingIndex], quantity: Math.min(product.stock, newQty) };
        return next;
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity), selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)))
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity: Math.min(item.product.stock, quantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(null);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = discountCodes.find((c) => c.code.toUpperCase() === normalized && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum spend of Rs. ${found.minSpend.toLocaleString()} required for this code.`,
      };
    }
    let discountAmount = 0;
    if (found.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * found.discountValue) / 100);
    } else {
      discountAmount = found.discountValue;
    }
    setAppliedDiscount({ code: found.code, amount: discountAmount });
    return {
      success: true,
      message: `Coupon ${found.code} applied! Saved Rs. ${discountAmount.toLocaleString()}`,
    };
  };

  const removeCoupon = () => {
    setAppliedDiscount(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'status'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `NG-2026-${randomSuffix}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      trackingNumber: `TCS-NG-${randomSuffix}${Math.floor(100 + Math.random() * 900)}`,
      courierName: orderData.city.toLowerCase().includes('peshawar')
        ? 'Naveed Express Same-Day Peshawar Rider'
        : 'TCS Overnight Express',
    };

    setOrders((prev) => [newOrder, ...prev]);
    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const orderedItem = orderData.items.find((i) => i.product.id === prod.id);
        if (orderedItem) {
          return { ...prod, stock: Math.max(0, prod.stock - orderedItem.quantity) };
        }
        return prod;
      })
    );
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord)));
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  // Reviews
  const addReview = (review: Omit<CustomerReview, 'id' | 'date'>) => {
    const newRev: CustomerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [newRev, ...prev]);
    // Update product rating count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === review.productId) {
          const nextCount = p.reviewsCount + 1;
          const nextRating = Number(((p.rating * p.reviewsCount + review.rating) / nextCount).toFixed(2));
          return { ...p, reviewsCount: nextCount, rating: nextRating };
        }
        return p;
      })
    );
  };

  // Admin product actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const productWithId: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [productWithId, ...prev]);
  };

  const editProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const resetToDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReviews(INITIAL_REVIEWS);
    localStorage.removeItem('ng_products');
    localStorage.removeItem('ng_orders');
    localStorage.removeItem('ng_reviews');
  };

  // WhatsApp Helpers
  const generateProductWhatsAppUrl = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors?.[0] || 'Standard';
    const message = `Assalam-o-Alaikum Naveed Games Peshawar! 🎮\n\nI want to order from your website:\n• Product: ${product.name}\n• Product ID: ${product.id}\n• SKU: ${product.sku}\n• Selected Variant: ${color}\n• Quantity: ${quantity}\n• Unit Price: Rs. ${product.price.toLocaleString()}\n• Subtotal: Rs. ${(product.price * quantity).toLocaleString()}\n• Store Warranty: ${product.warranty}\n\nPlease confirm stock and delivery details. Thank you!`;
    return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  const generateCartWhatsAppUrl = () => {
    if (cart.length === 0) {
      return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent('Assalam-o-Alaikum Naveed Games Peshawar! I have a question regarding your gaming consoles and gear.')}`;
    }
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.selectedColor || 'Standard'}) x${item.quantity} = Rs. ${(item.product.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const message = `Assalam-o-Alaikum Naveed Games Peshawar! 🎮\n\nI want to place an order for my Cart:\n\n${itemsList}\n\n• Subtotal: Rs. ${cartSubtotal.toLocaleString()}\n• Shipping: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}${appliedDiscount ? `\n• Discount (${appliedDiscount.code}): -Rs. ${appliedDiscount.amount.toLocaleString()}` : ''}\n• Total Amount: Rs. ${cartTotalAmount.toLocaleString()}\n\nPlease confirm my order. My contact number is attached.`;
    return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories: [
          'All Products',
          'PlayStation Consoles',
          'Xbox Consoles',
          'Nintendo Consoles',
          'Gaming Controllers',
          'Gaming Headsets',
          'Gaming Keyboards',
          'Gaming Mice',
          'Gaming Monitors',
          'Gaming Chairs',
          'Racing Wheels',
          'VR Headsets',
          'Gaming Accessories',
          'PC Gaming Products',
          'Console Games',
        ],
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        shippingFee,
        appliedDiscount,
        cartTotalAmount,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        reviews,
        addReview,
        quickViewProduct,
        setQuickViewProduct,
        detailProduct,
        setDetailProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingOrderId,
        setTrackingOrderId,
        isAdminOpen,
        setIsAdminOpen,
        addProduct,
        editProduct,
        deleteProduct,
        resetToDefaultCatalog,
        generateProductWhatsAppUrl,
        generateCartWhatsAppUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
