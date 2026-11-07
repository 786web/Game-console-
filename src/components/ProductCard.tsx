import React from 'react';
import { Heart, ShoppingBag, Eye, MessageCircle, Star, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    isWishlisted,
    toggleWishlist,
    setQuickViewProduct,
    setDetailProduct,
    setIsCheckoutOpen,
    generateProductWhatsAppUrl,
  } = useShop();

  const wish = isWishlisted(product.id);

  const handleBuyNow = () => {
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/80">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="p-2.5 rounded-xl bg-slate-900/90 text-white hover:text-cyan-400 hover:bg-slate-800 transition-all shadow-md active:scale-95"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDetailProduct(product)}
            className="px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-md active:scale-95"
          >
            Full Specs
          </button>
        </div>

        {/* Top Indicators: Discount & Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.discountPercent && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono shadow-sm">
              -{product.discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded font-mono shadow-sm">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-xl transition-all shadow-md ${
            wish
              ? 'bg-pink-500/20 text-pink-500 border border-pink-500/50'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/60'
          }`}
          title={wish ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wish ? 'fill-pink-500' : ''}`} />
        </button>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left space-y-3">
        <div>
          {/* Metadata: Category & Rating (Unboxed clean text) */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span className="font-mono text-cyan-400/90">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-slate-200 font-semibold">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setDetailProduct(product)}
            className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Availability & Warranty line */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
            <span className={product.stock > 0 ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
              {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
            </span>
            <span>·</span>
            <span className="text-slate-400 truncate max-w-[150px]">{product.warranty}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-white font-mono tabular-nums">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-500">PKR</span>
          </div>

          {/* 3 Action Buttons: Add to Cart, Buy Now, WhatsApp Order */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* WhatsApp Direct Order Button */}
          <a
            href={generateProductWhatsAppUrl(product, 1)}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 hover:border-emerald-500 text-emerald-400 text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
