import React from 'react';
import { Sparkles, ShieldCheck, MapPin, Heart, PhoneCall, Globe, CheckCircle2 } from 'lucide-react';
import { RAMANATHAPURAM_DISTRICT_DATA } from '../data/initialData';

export default function Footer({ onSelectPanchayat }) {
  return (
    <footer className="bg-slate-950 border-t border-emerald-500/20 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                NeedNear
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs max-w-sm">
              Ramanathapuram District's premier Panchayat-level community marketplace. Built specifically for local farmers, event organizers, photographers, and neighbors to share resources with 100% verified trust scores.
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <span className="bg-emerald-500/10 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Deals</span>
              </span>
              <span className="bg-teal-500/10 text-teal-300 font-bold px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>9 Ramnad Taluks</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Taluk Map Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" /> Ramanathapuram District Taluks:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {RAMANATHAPURAM_DISTRICT_DATA.taluks.map(t => (
                <button
                  key={t.name}
                  onClick={() => onSelectPanchayat(t.panchayats[0])}
                  className="text-left text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <span className="text-emerald-400">›</span> {t.name} Taluk
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Safety & Community Helpline */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-cyan-400" /> Local Safety & Support:
            </h4>
            <p className="text-slate-400 text-xs">
              Have a question about Panchayat pickup or transaction verification?
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="font-bold text-emerald-300">Ramnad Community Helpline</div>
              <div className="text-slate-400 text-[11px]">+91 98421 ***** • support@neednear.in</div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 NeedNear Ramnad. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Ramanathapuram Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
