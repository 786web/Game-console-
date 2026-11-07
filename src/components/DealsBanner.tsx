import React, { useState, useEffect } from 'react';
import { Flame, Clock, Copy, Check, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/initialData';

export const DealsBanner: React.FC = () => {
  const { products, addToCart, setDetailProduct, generateProductWhatsAppUrl } = useShop();
  const [copied, setCopied] = useState(false);

  // Genuine countdown calculation (resets daily at midnight)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText('PESHAWAR5');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const dealProduct = products.find((p) => p.id === 'prod-ps5-pro') || products[0];

  return (
    <section id="deals" className="w-full py-12 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-purple-950/40 border border-cyan-800/40 p-6 sm:p-10 overflow-hidden shadow-2xl">
          {/* Ambient background glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Deal Information & Countdown */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold font-mono">
                  <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                  LIMITED TIME FLASH DEAL
                </span>

                <span className="text-xs text-slate-400 font-mono">
                  Naveed Games Peshawar Exclusive
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                PlayStation 5 Pro 2TB + DualSense Bundle Deal
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Get the ultimate next-generation 4K 120FPS setup with 2TB high-speed SSD, enhanced ray tracing, and free express delivery across Pakistan with official store warranty.
              </p>

              {/* Countdown Timer */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2 font-mono">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>DEAL EXPIRES IN:</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-center min-w-[64px]">
                    <span className="text-xl sm:text-2xl font-bold text-cyan-400 tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-slate-400">HOURS</span>
                  </div>
                  <span className="text-cyan-400 font-bold text-xl">:</span>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-center min-w-[64px]">
                    <span className="text-xl sm:text-2xl font-bold text-cyan-400 tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-slate-400">MINUTES</span>
                  </div>
                  <span className="text-cyan-400 font-bold text-xl">:</span>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-center min-w-[64px]">
                    <span className="text-xl sm:text-2xl font-bold text-cyan-400 tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-slate-400">SECONDS</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-950 border border-cyan-800/60 rounded-xl px-3.5 py-2">
                  <span className="text-xs text-slate-400">Coupon:</span>
                  <span className="font-mono font-bold text-sm text-cyan-300">PESHAWAR5</span>
                  <button
                    onClick={copyCoupon}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-xs text-emerald-400 font-medium">
                  {copied ? 'Copied to clipboard!' : 'Use for 5% off orders over Rs. 20,000'}
                </span>
              </div>
            </div>

            {/* Right Column: Featured Product Card Preview */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-xl relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 relative mb-4">
                <img
                  src={dealProduct.image}
                  onError={(e) => {
                    e.currentTarget.src = '/images/product_ps5_pro_console.jpg';
                  }}
                  alt={dealProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md font-mono">
                  SAVE RS. 20,000
                </div>
              </div>

              <div className="space-y-2 text-left">
                <div className="text-xs text-cyan-400 font-mono">{dealProduct.brand}</div>
                <h3 className="text-base font-bold text-white line-clamp-1">{dealProduct.name}</h3>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    Rs. {dealProduct.price.toLocaleString()}
                  </span>
                  {dealProduct.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                      Rs. {dealProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3">
                  <button
                    onClick={() => addToCart(dealProduct, 1)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim Deal</span>
                  </button>

                  <a
                    href={generateProductWhatsAppUrl(dealProduct, 1)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-emerald-500/50 text-emerald-400 font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
