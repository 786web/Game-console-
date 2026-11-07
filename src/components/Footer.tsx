import React from 'react';
import { STORE_INFO, CATEGORIES } from '../data/initialData';
import { MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { setSelectedCategory, setIsTrackingOpen, setIsAdminOpen } = useShop();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    onNavClick('catalog');
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-left text-xs text-slate-400">
      {/* Top Value Banner */}
      <div className="border-b border-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-white font-bold text-sm mb-1">Peshawar Store Pickup</div>
            <p className="text-slate-500">Pick up your order directly from Shop #75 S.S Plaza Karkhano Market.</p>
          </div>
          <div>
            <div className="text-white font-bold text-sm mb-1">Nationwide Fast Dispatch</div>
            <p className="text-slate-500">Insured express courier delivery via TCS &amp; Leopards with live tracking.</p>
          </div>
          <div>
            <div className="text-white font-bold text-sm mb-1">Cash on Delivery Available</div>
            <p className="text-slate-500">Convenient pay-on-arrival across all major cities of Pakistan.</p>
          </div>
          <div>
            <div className="text-white font-bold text-sm mb-1">Authentic Hardware Only</div>
            <p className="text-slate-500">Brand new sealed stock backed by store technical warranty.</p>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavClick('hero')}
              className="text-left focus:outline-none"
            >
              <span className="text-2xl font-black tracking-tight text-white font-display">
                NAVEED <span className="text-cyan-400">GAMES</span>
              </span>
            </button>

            <p className="text-slate-400 leading-relaxed">
              {STORE_INFO.name} is Peshawar&apos;s prestigious gaming technology store, providing next-generation gaming consoles, genuine accessories, esports hardware, and dedicated technical support.
            </p>

            <div className="pt-2 text-slate-300 font-mono text-[11px] space-y-1">
              <div>📍 {STORE_INFO.address}</div>
              <div>🕒 {STORE_INFO.hours}</div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-400 transition-colors"
                title="Instagram @naveed.games"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Facebook Naveed Games"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Popular Categories
            </h4>
            <div className="flex flex-col space-y-2">
              {CATEGORIES.slice(1, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Customer Care & Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Customer Links
            </h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => onNavClick('deals')}
                className="text-left hover:text-cyan-400 transition-colors"
              >
                Special Deals
              </button>
              <button
                onClick={() => onNavClick('showroom')}
                className="text-left hover:text-cyan-400 transition-colors"
              >
                Showroom &amp; Map
              </button>
              <button
                onClick={() => onNavClick('reviews')}
                className="text-left hover:text-cyan-400 transition-colors"
              >
                Customer Reviews
              </button>
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="text-left text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Track Your Order
              </button>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-left text-slate-500 hover:text-slate-300 transition-colors"
              >
                Admin Login
              </button>
            </div>
          </div>

          {/* Col 4: Official Contact Card */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500 block">WhatsApp / Mobile:</span>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="font-mono text-white font-bold hover:text-cyan-400 block"
                >
                  {STORE_INFO.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block">Landline:</span>
                <a
                  href="tel:0915810832"
                  className="font-mono text-white font-bold hover:text-purple-400 block"
                >
                  {STORE_INFO.landline}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block">Email Inquiry:</span>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="font-mono text-cyan-400 hover:underline block"
                >
                  {STORE_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 Naveed Games. All Rights Reserved. Peshawar, Pakistan.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Official Warranty</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>TCS Express</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
