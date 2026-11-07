import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

interface FeaturedShowcaseProps {
  onViewAllClick: () => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ onViewAllClick }) => {
  const { products } = useShop();

  // Featured flagship items
  const featuredItems = products.filter((p) => p.featured || p.isBestSeller).slice(0, 4);

  return (
    <section id="featured" className="w-full py-16 bg-slate-950 border-b border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>HANDPICKED SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
              Trending Next-Gen Consoles &amp; Hardware
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider font-mono self-start sm:self-auto"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
