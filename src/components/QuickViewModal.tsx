import React from 'react';
import { X, Star, Heart, ShoppingBag, Zap, MessageCircle, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    setDetailProduct,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setIsCheckoutOpen,
    generateProductWhatsAppUrl,
  } = useShop();

  if (!quickViewProduct) return null;

  const wish = isWishlisted(quickViewProduct.id);

  const handleBuyNow = () => {
    addToCart(quickViewProduct, 1);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleViewFullSpecs = () => {
    const p = quickViewProduct;
    setQuickViewProduct(null);
    setDetailProduct(p);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <span className="text-xs font-mono text-cyan-400">Quick Gear Preview</span>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {quickViewProduct.discountPercent && (
              <div className="absolute top-3 left-3 bg-red-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded">
                -{quickViewProduct.discountPercent}% OFF
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-mono text-cyan-400">{quickViewProduct.brand}</div>
            <h3 className="text-lg font-bold text-white font-display">{quickViewProduct.name}</h3>

            <div className="flex items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">{quickViewProduct.rating}</span>
                <span className="text-slate-400">({quickViewProduct.reviewsCount})</span>
              </div>
              <span className="text-slate-600">·</span>
              <span className={quickViewProduct.stock > 0 ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
                {quickViewProduct.stock > 0 ? `In Stock (${quickViewProduct.stock} units)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono tabular-nums">
              Rs. {quickViewProduct.price.toLocaleString()}
            </span>
            {quickViewProduct.originalPrice && (
              <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                Rs. {quickViewProduct.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400 ml-auto">PKR Official</span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
            {quickViewProduct.description}
          </p>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, 1);
                  setQuickViewProduct(null);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={generateProductWhatsAppUrl(quickViewProduct, 1)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-600/50 text-emerald-400 text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={handleViewFullSpecs}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Full Specifications</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
