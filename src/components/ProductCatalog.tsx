import React, { useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
  } = useShop();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          const matchSku = product.sku.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchCategory && !matchSku) {
            return false;
          }
        }
        // Price filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All Products');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 300000]);
  };

  return (
    <section id="catalog" className="w-full py-14 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-slate-900 pb-6">
          <div>
            <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase mb-1">
              OFFICIAL GAMING HARDWARE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
              Explore Naveed Games Collection
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{filteredProducts.length}</strong> of{' '}
            <strong className="text-white">{products.length}</strong> items available in Peshawar
          </div>
        </div>

        {/* Categories Bar (Segmented Interactive Filter - compliant with Frontend Design §1.A) */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Row: Search, Max Price Slider, Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, console brand, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-4 flex items-center gap-3">
            <span className="text-xs text-slate-400 shrink-0 font-mono">Max Price:</span>
            <input
              type="range"
              min="10000"
              max="300000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-xs font-mono font-bold text-white shrink-0 tabular-nums">
              Rs. {priceRange[1].toLocaleString()}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 w-full"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-8 space-y-4">
            <p className="text-slate-400 text-sm">
              No products found matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo; in category{' '}
              <span className="text-cyan-400">{selectedCategory}</span>.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
