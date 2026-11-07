import React from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const VerifiedReviewsSection: React.FC = () => {
  const { reviews } = useShop();

  return (
    <section id="reviews" className="w-full py-16 bg-slate-950 border-b border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">
              GENUINE CUSTOMER EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Trusted by Pakistan&apos;s Gaming Community
            </h2>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-mono font-bold text-white text-sm">4.94 / 5.0</span>
              <span className="text-slate-400 ml-1.5 font-mono">Over 500+ Verified Orders</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{rev.author}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{rev.city}, Pakistan</div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
