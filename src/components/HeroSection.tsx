import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Shield, Truck, Award, Zap, ShoppingBag, Eye, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { useShop } from '../context/ShopContext';
import { IMAGES } from '../assets/images';

interface HeroSectionProps {
  onExploreClick: () => void;
  onDealsClick: () => void;
}

const HERO_FEATURED_ITEMS = [
  {
    id: 'prod-ps5-pro',
    title: 'PlayStation 5 Pro 2TB & DualSense Limited Edition',
    subtitle: 'Next-Gen 4K 120FPS · AI PSSR Upscaling · 2TB NVMe SSD',
    category: 'PlayStation Consoles',
    price: 245000,
    originalPrice: 265000,
    image: IMAGES.heroPs5,
    tag: 'FLAGSHIP PS5 PRO BUNDLE',
    badge: 'SAVE RS. 20,000',
    rating: 4.98,
    specs: ['2TB High-Speed SSD', 'Advanced Ray Tracing', 'DualSense Haptics', 'Pakistani Power Standard'],
  },
  {
    id: 'prod-scuf-controller',
    title: 'SCUF Reflex Pro Performance Wireless Controller',
    subtitle: 'Instant Mouse-Click Triggers · 4 Rear Paddles · Titanium Grip',
    category: 'Gaming Controllers',
    price: 76000,
    originalPrice: 82000,
    image: IMAGES.controller,
    tag: 'TOURNAMENT PRO CONTROLLER',
    badge: 'ESPORTS READY',
    rating: 4.96,
    specs: ['4 Remappable Paddles', 'Instant Click Triggers', 'Ultra-Low Latency', 'PS5 & PC Compatible'],
  },
  {
    id: 'prod-aether-headset',
    title: 'Aether Apex Planar Magnetic Esports Wireless Headset',
    subtitle: '50mm Planar Drivers · <15ms Wireless · 65H Battery · AI Mic',
    category: 'Gaming Headsets',
    price: 34500,
    originalPrice: 39000,
    image: IMAGES.headset,
    tag: 'AUDIOPHILE GAMING AUDIO',
    badge: 'HI-RES CERTIFIED',
    rating: 4.88,
    specs: ['50mm Planar Drivers', 'Dual 2.4GHz + BT 5.3', 'Memory Foam Cushions', 'Detachable Boom Mic'],
  },
  {
    id: 'prod-ps5-slim',
    title: 'Sony PlayStation 5 Slim 1TB Disc Edition',
    subtitle: 'Sleek Compact Chassis · 4K Ultra HD Blu-ray · Tempest 3D Audio',
    category: 'PlayStation Consoles',
    price: 175000,
    originalPrice: 185000,
    image: IMAGES.ps5Pro,
    tag: 'OFFICIAL SONY PAKISTAN STOCK',
    badge: 'BEST SELLER',
    rating: 4.92,
    specs: ['1TB Custom SSD', 'Ultra HD Blu-ray', 'Tempest 3D Audio', '1 Year Store Warranty'],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onDealsClick }) => {
  const { products, addToCart, setDetailProduct, generateProductWhatsAppUrl } = useShop();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = HERO_FEATURED_ITEMS[activeIndex];
  const matchedProduct = products.find((p) => p.id === activeItem.id) || products[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? HERO_FEATURED_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === HERO_FEATURED_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-slate-900">
      {/* Background ambient lighting glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main 2-Column Split: Typography Left, Flagship Interactive Showcase Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tagline kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{STORE_INFO.tagline}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Peshawar Premier Gaming Store</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.08] text-balance">
              LEVEL UP YOUR <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">GAMING</span> EXPERIENCE.
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
              Discover Next-Generation Gaming Technology, Premium Consoles, Accessories &amp; Everything Gamers Love. Official stock delivered to your doorstep across Pakistan.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent('Assalam-o-Alaikum Naveed Games! I am browsing your online store and would like to inquire about available consoles and gaming gear.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 font-semibold text-sm transition-all active:scale-95 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ORDER ON WHATSAPP</span>
              </a>

              <button
                onClick={onDealsClick}
                className="px-4 py-3 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                View Today&apos;s Deals
              </button>
            </div>

            {/* Store Address & Direct Verification Line */}
            <div className="pt-4 border-t border-slate-900/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>Showroom Open: 10:30 AM – 7:00 PM</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span>Shop No. 75, S.S Plaza, Karkhano Market, Jamrud Road, Peshawar</span>
            </div>
          </div>

          {/* Right Column: Ultra-Premium Flagship Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800/90 shadow-2xl overflow-hidden p-4 sm:p-6 group">
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Selector Navigation */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold font-mono">
                    {activeItem.tag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold font-mono">
                    {activeItem.badge}
                  </span>
                </div>

                {/* Arrow switchers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
                    title="Previous Flagship"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 px-1">
                    {activeIndex + 1}/{HERO_FEATURED_ITEMS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
                    title="Next Flagship"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Showcase Image Stage with floating specs */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full my-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80">
                <img
                  src={activeItem.image}
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero_ps5_pro_controller.jpg';
                  }}
                  alt={activeItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Spec Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-white font-mono px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>In-Stock in Peshawar</span>
                  </span>
                  <span className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-white font-mono px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official Warranty</span>
                  </span>
                </div>
              </div>

              {/* Title, Specs & Price Details */}
              <div className="space-y-3 text-left">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono text-cyan-400 font-semibold">{activeItem.category}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-white font-bold">{activeItem.rating}</span>
                      <span className="text-slate-500">· Verified Tech</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display line-clamp-1">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {activeItem.subtitle}
                  </p>
                </div>

                {/* 4 Feature Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
                  {activeItem.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{sp}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Direct Purchase Buttons */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                      Rs. {activeItem.price.toLocaleString()}
                    </span>
                    {activeItem.originalPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                        Rs. {activeItem.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-cyan-400">PKR</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(matchedProduct, 1)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <a
                      href={generateProductWhatsAppUrl(matchedProduct, 1)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 font-semibold text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Order</span>
                    </a>

                    <button
                      onClick={() => setDetailProduct(matchedProduct)}
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Inspect Full Specifications"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Interactive Flagship Thumbnails Switcher */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {HERO_FEATURED_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                        activeIndex === idx
                          ? 'border-cyan-400 scale-[1.02] shadow-md shadow-cyan-500/20'
                          : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={item.image}
                        onError={(e) => {
                          e.currentTarget.src = '/images/hero_ps5_pro_controller.jpg';
                        }}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item KPI & Trust Value Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">100% Original Tech</div>
              <div className="text-[11px] text-slate-400">Genuine sealed boxes with store warranty</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Nationwide Shipping</div>
              <div className="text-[11px] text-slate-400">Same-day Peshawar, 24-48h Pakistan</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Cash on Delivery</div>
              <div className="text-[11px] text-slate-400">Verify package upon delivery in Pakistan</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Instant WhatsApp Help</div>
              <div className="text-[11px] text-slate-400">Direct tech support from Peshawar team</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
