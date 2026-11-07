import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, MapPin, PackageCheck, Gamepad2, PhoneCall } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { useShop } from '../context/ShopContext';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsTrackingOpen } = useShop();

  const handleOpenWhatsApp = (customText: string) => {
    const url = `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(customText)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Menu Popup */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 shadow-2xl space-y-3 text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-white block">Naveed Games WhatsApp</span>
                <span className="text-[10px] text-slate-400 font-mono">Store Active · 10:30 AM – 7:00 PM</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <button
              onClick={() =>
                handleOpenWhatsApp(
                  'Assalam-o-Alaikum Naveed Games! I want to check available stock and prices for PS5 / Xbox / Gaming Gear.'
                )
              }
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Price &amp; Stock Inquiry</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsTrackingOpen(true);
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Track My Existing Order</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() =>
                handleOpenWhatsApp(
                  'Assalam-o-Alaikum! Please share directions to Naveed Games Shop #75, S.S Plaza, Karkhano Market, Jamrud Road, Peshawar.'
                )
              }
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Directions to Peshawar Showroom</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
                <span>Call Store: {STORE_INFO.phone}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>

          <button
            onClick={() =>
              handleOpenWhatsApp(
                'Assalam-o-Alaikum Naveed Games! I am visiting your website and have an urgent query.'
              )
            }
            className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open Direct WhatsApp Chat</span>
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Naveed Games WhatsApp Direct Contact"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 blur group-hover:opacity-70 transition-opacity" />
        {isOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
        )}
      </button>
    </div>
  );
};
