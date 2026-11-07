import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, PackageCheck, Lock, Menu, X, PhoneCall } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/initialData';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const {
    cartTotalCount,
    wishlist,
    setIsCartOpen,
    setIsTrackingOpen,
    setIsAdminOpen,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-slate-950 via-cyan-950/70 to-slate-950 border-b border-cyan-900/30 text-center py-1.5 px-3 sm:px-6 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Peshawar Store:</span>
            <span>Shop #75, S.S Plaza, Karkhano Market</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <a
            href={`tel:${STORE_INFO.phoneRaw}`}
            className="text-white font-mono font-semibold hover:text-cyan-400 shrink-0 flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3 text-cyan-400" />
            <span>{STORE_INFO.phone}</span>
          </a>
          <span className="text-slate-600 hidden md:inline">·</span>
          <span className="text-emerald-400 font-medium hidden md:inline">
            Free Express Delivery over Rs. 15,000
          </span>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('hero')}
            className="group text-left focus:outline-none"
          >
            <span className="text-2xl font-extrabold tracking-tighter text-white group-hover:text-cyan-400 transition-colors font-display">
              NAVEED <span className="text-cyan-400">GAMES</span>
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleLinkClick('featured')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Featured Gear
          </button>
          <button
            onClick={() => handleLinkClick('catalog')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            All Products
          </button>
          <button
            onClick={() => handleLinkClick('deals')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Special Offers
          </button>
          <button
            onClick={() => handleLinkClick('showroom')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Karkhano Showroom
          </button>
          <button
            onClick={() => handleLinkClick('reviews')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Verified Reviews
          </button>
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart Drawer, Admin) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search PS5, Xbox, Headsets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-36 sm:w-48"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-white ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Indicator */}
          <button
            onClick={() => handleLinkClick('catalog')}
            className="relative p-2 text-slate-300 hover:text-pink-400 hover:bg-slate-900 rounded-lg transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 transition-all text-slate-200"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-semibold hidden sm:inline">Cart</span>
            {cartTotalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center font-mono">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Admin Management Toggle */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
            title="Store Admin Panel"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-5 space-y-4 shadow-2xl">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search consoles, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
            />
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleLinkClick('featured')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Featured Gear
            </button>
            <button
              onClick={() => handleLinkClick('catalog')}
              className="text-left py-1 hover:text-cyan-400"
            >
              All Products & Categories
            </button>
            <button
              onClick={() => handleLinkClick('deals')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Special Offers & Deals
            </button>
            <button
              onClick={() => handleLinkClick('showroom')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Karkhano Showroom & Contact
            </button>
            <button
              onClick={() => handleLinkClick('reviews')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => {
                setIsTrackingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-cyan-400 py-1"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Track Existing Order</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>{STORE_INFO.phone}</span>
            </div>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
