import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock, AlertCircle, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/initialData';
import { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, trackingOrderId, setTrackingOrderId, orders } = useShop();
  const [searchInput, setSearchInput] = useState(trackingOrderId || '');

  if (!isTrackingOpen) return null;

  // Find order
  const foundOrder = orders.find(
    (o) =>
      o.id.toLowerCase() === (searchInput || trackingOrderId).toLowerCase().trim() ||
      o.trackingNumber.toLowerCase() === (searchInput || trackingOrderId).toLowerCase().trim()
  );

  const statusSteps: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

  const getStatusIndex = (st: OrderStatus) => {
    if (st === 'Cancelled') return -1;
    return statusSteps.indexOf(st);
  };

  const currentIdx = foundOrder ? getStatusIndex(foundOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 text-left">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-display">Live Order Tracking</h2>
          </div>
          <button
            onClick={() => {
              setIsTrackingOpen(false);
              setTrackingOrderId('');
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Enter Order ID or TCS Tracking Number:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. NG-2026-9412 or TCS-PK-98124901"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
            {orders.length > 0 && !foundOrder && (
              <div className="flex flex-wrap gap-1.5 items-center pt-1 text-[11px] text-slate-400">
                <span>Recent orders:</span>
                {orders.slice(0, 3).map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSearchInput(o.id)}
                    className="font-mono text-cyan-400 hover:underline"
                  >
                    #{o.id}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Found Order Card */}
          {foundOrder ? (
            <div className="space-y-6">
              {/* Order Basic Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 font-bold">Order #{foundOrder.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    STATUS: {foundOrder.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  Customer: {foundOrder.customerName} ({foundOrder.city})
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Assigned Courier: <strong className="text-slate-200">{foundOrder.courierName}</strong>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Tracking No: <strong className="text-emerald-400">{foundOrder.trackingNumber}</strong>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300 uppercase font-mono">
                  Shipment Progress:
                </div>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {statusSteps.map((step, idx) => {
                    const isPassed = currentIdx >= idx;
                    const isCurrent = currentIdx === idx;
                    return (
                      <div key={step} className="relative flex items-center gap-3">
                        <div
                          className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isPassed
                              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                              : 'bg-slate-800 text-slate-500 border border-slate-700'
                          }`}
                        >
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <div>
                          <div
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-cyan-400 font-mono'
                                : isPassed
                                ? 'text-white'
                                : 'text-slate-500'
                            }`}
                          >
                            {step}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {step === 'Pending' && 'Order received at Naveed Games system'}
                            {step === 'Confirmed' && 'Stock verified and packaged at Peshawar Showroom'}
                            {step === 'Processing' && 'Quality check & courier dispatch manifest generated'}
                            {step === 'Shipped' && 'In transit with delivery rider / courier'}
                            {step === 'Delivered' && 'Successfully delivered to customer'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in this Order */}
              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
                <div className="font-semibold text-slate-300">Items:</div>
                {foundOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-400">
                    <span>
                      {it.product.name} ({it.selectedColor}) x{it.quantity}
                    </span>
                    <span className="font-mono text-white">
                      Rs. {(it.product.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800/60 font-mono">
                  <span>Total Amount:</span>
                  <span className="text-cyan-400">Rs. {foundOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* WhatsApp direct inquiry button for this order */}
              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Naveed Games! Inquiring about status for Order #${foundOrder.id} (Tracking: ${foundOrder.trackingNumber}). My name is ${foundOrder.customerName}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/50 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask Store on WhatsApp regarding Order #{foundOrder.id}</span>
              </a>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
              <p>Please enter an Order ID (e.g. NG-2026-9412) to view tracking details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
