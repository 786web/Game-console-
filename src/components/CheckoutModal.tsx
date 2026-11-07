import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, MessageCircle, Copy, ArrowRight, PackageCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/initialData';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    shippingFee,
    appliedDiscount,
    cartTotalAmount,
    placeOrder,
    setIsTrackingOpen,
    setTrackingOrderId,
  } = useShop();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    altPhone: '',
    email: '',
    address: '',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    paymentMethod: 'cod' as 'cod' | 'bank' | 'jazzcash_easypaisa',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errors.customerName = 'Please enter your full name';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = 'Valid Pakistani mobile/WhatsApp number required (e.g. 0333 1234567)';
    }
    if (!formData.address.trim()) {
      errors.address = 'Please enter your delivery street address';
    }
    if (!formData.city.trim()) {
      errors.city = 'Please select or enter your city';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (cart.length === 0) {
      return;
    }

    const newOrder = placeOrder({
      customerName: formData.customerName,
      phone: formData.phone,
      altPhone: formData.altPhone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      paymentMethod: formData.paymentMethod,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      discountApplied: appliedDiscount?.amount || 0,
      discountCode: appliedDiscount?.code,
      totalAmount: cartTotalAmount,
      notes: formData.notes,
    });

    setCompletedOrder(newOrder);

    // Trigger victory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#10b981'],
      });
    } catch {
      // safe fallback
    }
  };

  const generateOrderWhatsAppMessage = (order: Order) => {
    const items = order.items
      .map((i) => `• ${i.product.name} (${i.selectedColor || 'Standard'}) x${i.quantity} = Rs. ${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const msg = `Assalam-o-Alaikum Naveed Games Peshawar! 🎮\n\nI have submitted Order #${order.id} on your website:\n\n${items}\n\n• Subtotal: Rs. ${order.subtotal.toLocaleString()}\n• Delivery: ${order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee}`}${order.discountApplied ? `\n• Discount: -Rs. ${order.discountApplied.toLocaleString()}` : ''}\n• Total: Rs. ${order.totalAmount.toLocaleString()}\n• Payment Method: ${order.paymentMethod.toUpperCase()}\n\nCustomer Details:\n• Name: ${order.customerName}\n• Phone: ${order.phone}\n• Address: ${order.address}, ${order.city}, ${order.province}\n• Tracking No: ${order.trackingNumber}\n\nPlease confirm dispatch. Thank you!`;
    return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-left">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <span className="text-xs font-mono text-cyan-400">Naveed Games Peshawar Checkout</span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {completedOrder ? 'Order Confirmation' : 'Complete Your Order'}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCompletedOrder(null);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Thank You, {completedOrder.customerName}!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your order <strong className="text-cyan-400 font-mono">#{completedOrder.id}</strong> has been received by our store at Karkhano Market, Peshawar.
              </p>
            </div>

            {/* Tracking Banner */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>ASSIGNED TRACKING NUMBER:</span>
                <span className="text-emerald-400 font-bold">{completedOrder.courierName}</span>
              </div>
              <div className="text-lg font-mono font-bold text-white tracking-wider">
                {completedOrder.trackingNumber}
              </div>
              <p className="text-xs text-slate-400">
                You can track this anytime on our website using your Tracking ID or Order ID.
              </p>
            </div>

            {/* Order Items Summary */}
            <div className="space-y-2 border-t border-slate-800 pt-4 text-xs">
              <div className="font-semibold text-slate-300 mb-2">Order Summary:</div>
              {completedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-slate-400">
                  <span>
                    {it.product.name} ({it.selectedColor}) x{it.quantity}
                  </span>
                  <span className="font-mono text-white tabular-nums">
                    Rs. {(it.product.price * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800/80 font-bold text-sm">
                <span>Total Payable:</span>
                <span className="text-cyan-400 font-mono">
                  Rs. {completedOrder.totalAmount.toLocaleString()} ({completedOrder.paymentMethod.toUpperCase()})
                </span>
              </div>
            </div>

            {/* Primary Action: Confirm on WhatsApp */}
            <div className="space-y-3 pt-2">
              <a
                href={generateOrderWhatsAppMessage(completedOrder)}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Order via WhatsApp (+92 333 9348891)</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setTrackingOrderId(completedOrder.id);
                    setIsCheckoutOpen(false);
                    setIsTrackingOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold"
                >
                  <PackageCheck className="w-4 h-4 text-cyan-400" />
                  <span>Live Tracking</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCompletedOrder(null);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono text-cyan-400">
                1. Delivery & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Asad Ullah Khan"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  {formErrors.customerName && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.customerName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="0333 9348891"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Peshawar">Peshawar (Same-Day Store Rider)</option>
                    <option value="Islamabad">Islamabad (Overnight Express)</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Swat">Swat</option>
                    <option value="Kohat">Kohat</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other City">Other Pakistan City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Complete Street Address & Landmark *
                </label>
                <input
                  type="text"
                  placeholder="House #, Street #, Sector / Colony, Near Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                {formErrors.address && (
                  <span className="text-[11px] text-red-400 mt-1 block">{formErrors.address}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before arrival / Deliver after 4 PM"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono text-cyan-400">
                2. Select Payment Option
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.paymentMethod === 'cod'
                      ? 'bg-cyan-950/30 border-cyan-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="sr-only"
                  />
                  <div className="font-bold text-xs">Cash on Delivery (COD)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Pay rider upon delivery</div>
                </label>

                <label
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.paymentMethod === 'bank'
                      ? 'bg-cyan-950/30 border-cyan-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                    className="sr-only"
                  />
                  <div className="font-bold text-xs">Bank Transfer</div>
                  <div className="text-[11px] text-slate-400 mt-1">Meezan Bank / HBL</div>
                </label>

                <label
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.paymentMethod === 'jazzcash_easypaisa'
                      ? 'bg-cyan-950/30 border-cyan-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash_easypaisa"
                    checked={formData.paymentMethod === 'jazzcash_easypaisa'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash_easypaisa' })}
                    className="sr-only"
                  />
                  <div className="font-bold text-xs">JazzCash / EasyPaisa</div>
                  <div className="text-[11px] text-slate-400 mt-1">Instant mobile wallet</div>
                </label>
              </div>

              {formData.paymentMethod === 'bank' && (
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-xs space-y-1 text-slate-300 font-mono">
                  <div>Bank: <strong>Meezan Bank Limited</strong></div>
                  <div>Account Title: <strong>Naveed Games Peshawar</strong></div>
                  <div>Account Number: <strong>0208-0105829101</strong></div>
                  <div>IBAN: <strong>PK52MEZN0002080105829101</strong></div>
                </div>
              )}

              {formData.paymentMethod === 'jazzcash_easypaisa' && (
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-xs space-y-1 text-slate-300 font-mono">
                  <div>Account Title: <strong>Naveed Khan</strong></div>
                  <div>Mobile Number: <strong>0333 9348891</strong></div>
                </div>
              )}
            </div>

            {/* Total Payable Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Payable ({cart.length} items):</span>
                <div className="text-xl font-black text-white font-mono tabular-nums">
                  Rs. {cartTotalAmount.toLocaleString()}
                </div>
              </div>

              <div className="text-right text-xs text-emerald-400">
                {shippingFee === 0 ? '✓ Free Express Delivery' : 'Standard Shipping (Rs. 500)'}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
