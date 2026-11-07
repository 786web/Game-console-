import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Wrench, Gamepad2, Navigation, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';

export const StoreShowroomSection: React.FC = () => {
  return (
    <section id="showroom" className="w-full py-16 bg-slate-950 border-b border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">
            <span>PHYSICAL SHOWROOM &amp; TECH WORKSHOP</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-sans">نوید گیمز کارخانو مارکیٹ پشاور</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Visit Naveed Games at Karkhano Market, Peshawar
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience Pakistan&apos;s leading gaming technology hub in person. Test original PlayStation 5, Xbox, Nintendo consoles, high-refresh OLED displays, and esports controllers before you buy. Located at Shop No. 75, S.S Plaza, Jamrud Road, Peshawar.
          </p>
        </div>

        {/* 2-Column Split: Showroom Showcase & Store Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: High-Res Showroom Image & Services */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                src="/src/assets/images/store_naveed_games_showroom_1794052340781.jpg"
                alt="Naveed Games Showroom Peshawar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-mono bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg">
                  Shop #75, S.S Plaza, Jamrud Road
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-md font-mono">
                  Walk-ins Welcome
                </span>
              </div>
            </div>

            {/* 3 Store Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <div className="text-xs font-bold text-white">100% Genuine Guarantee</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Only authentic factory-sealed imported hardware with verifiable serial numbers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <Wrench className="w-5 h-5 text-purple-400" />
                <div className="text-xs font-bold text-white">Console Service &amp; Mods</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Thermal paste replacement, stick drift repairs, and pro paddle installations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <Gamepad2 className="w-5 h-5 text-emerald-400" />
                <div className="text-xs font-bold text-white">Disc Trade-in &amp; Games</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Exchange pre-owned PS5 and Xbox titles at the best valuation rates in Peshawar.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details, Map Card & Navigation */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">Store Contact Details</h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Store Address:</div>
                    <div className="text-slate-400 mt-0.5 leading-relaxed">{STORE_INFO.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Opening Hours:</div>
                    <div className="text-slate-400 mt-0.5 font-mono">{STORE_INFO.hours}</div>
                    <div className="text-[11px] text-emerald-400 mt-1">Friday prayers break: 1:00 PM – 2:30 PM</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>WhatsApp / Mobile:</span>
                    </div>
                    <a
                      href={`tel:${STORE_INFO.phoneRaw}`}
                      className="text-white font-mono font-bold hover:text-cyan-400 transition-colors block"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                      <span>Store Landline:</span>
                    </div>
                    <a
                      href="tel:0915810832"
                      className="text-white font-mono font-bold hover:text-purple-400 transition-colors block"
                    >
                      {STORE_INFO.landline}
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Email:</span>
                  </div>
                  <a
                    href={`mailto:${STORE_INFO.email}`}
                    className="font-mono text-cyan-400 hover:underline"
                  >
                    {STORE_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Google Maps & WhatsApp CTA Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href="https://maps.google.com/?q=Shop+No+75+SS+Plaza+Karkhano+Market+Jamrud+Road+Peshawar"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions to Karkhano Store</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent('Assalam-o-Alaikum Naveed Games! I want to visit your store at Karkhano Market Peshawar today. Is the showroom open?')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-emerald-500/50 text-emerald-400 font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Peshawar Store on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
