import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Tag, Check, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/initialData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotalCount,
    shippingFee,
    appliedDiscount,
    cartTotalAmount,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    generateCartWhatsAppUrl,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const freeShippingThreshold = 15000;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-display">
                Shopping Cart ({cartTotalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-slate-900/80 px-5 py-3 border-b border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-300 mb-1.5 font-mono">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {cartSubtotal >= freeShippingThreshold
                  ? 'Free Delivery Unlocked across Pakistan!'
                  : `Add Rs. ${(freeShippingThreshold - cartSubtotal).toLocaleString()} more for Free Shipping`}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Your shopping cart is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Explore Gaming Gear
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-slate-950 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="text-[11px] text-cyan-400 font-mono">{item.product.brand}</div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <div className="text-[11px] text-slate-400">Variant: {item.selectedColor}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-white tabular-nums">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Discount code (e.g. PESHAWAR5)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <div
                  className={`text-xs p-2 rounded-lg ${
                    couponFeedback.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                      : 'bg-red-950/60 border border-red-800 text-red-300'
                  }`}
                >
                  {couponFeedback.message}
                </div>
              )}

              {appliedDiscount && (
                <div className="flex items-center justify-between text-xs bg-cyan-950/40 border border-cyan-800/60 p-2 rounded-lg text-cyan-300">
                  <span>Coupon {appliedDiscount.code} applied</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">-Rs. {appliedDiscount.amount.toLocaleString()}</span>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-white"
                      title="Remove coupon"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery to Pakistan:</span>
                  <span className={shippingFee === 0 ? 'text-emerald-400 font-bold' : 'tabular-nums'}>
                    {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-cyan-400">
                    <span>Discount:</span>
                    <span className="tabular-nums">-Rs. {appliedDiscount.amount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-cyan-400 tabular-nums">Rs. {cartTotalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateCartWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Cart Order via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
