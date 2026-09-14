import React from 'react';
import { ShieldCheck, Handshake, Users, MapPin, Sparkles, Star, Zap } from 'lucide-react';

export default function TrustStatsBar({ selectedPanchayat }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border-y border-emerald-500/20 py-3.5 px-4 text-white shadow-xl relative overflow-hidden">
      
      {/* Subtle glowing orb */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        
        {/* Left Pulse */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm text-white tracking-tight">Live Ramnad Trust Ledger</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-[11px] text-slate-400">
              Active in <strong className="text-emerald-300">{selectedPanchayat === 'All' ? 'All 9 Ramnad Taluks' : selectedPanchayat}</strong>
            </p>
          </div>
        </div>

        {/* Center Live Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 text-center">
          <div className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="font-black text-emerald-400 text-sm sm:text-base">1,420+</div>
            <div className="text-[10px] text-slate-400">Successful Deals</div>
          </div>

          <div className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="font-black text-teal-300 text-sm sm:text-base">100%</div>
            <div className="text-[10px] text-slate-400">Verified Reviews</div>
          </div>

          <div className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="font-black text-cyan-300 text-sm sm:text-base">4.8 ⭐</div>
            <div className="text-[10px] text-slate-400">Ramnad Avg Rating</div>
          </div>

          <div className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="font-black text-amber-400 text-sm sm:text-base">50+</div>
            <div className="text-[10px] text-slate-400">Panchayats Connected</div>
          </div>
        </div>

        {/* Right Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-300 font-bold text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Fake Reviews Policy Enforced</span>
        </div>

      </div>
    </div>
  );
}
