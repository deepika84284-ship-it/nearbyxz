import React from 'react';
import { Search, MapPin, Calendar, DollarSign, Clock, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function NeedCard({ need, onStartChat }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl border border-amber-500/30 p-5 shadow-xl hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group">
      
      {/* Decorative tag */}
      <div className="flex items-center justify-between">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5 uppercase tracking-wider">
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span>🔎 NEED REQUEST</span>
        </span>

        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>Posted 20 min ago</span>
        </span>
      </div>

      {/* Need Title & Details */}
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
          {need.title}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {need.description}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{need.panchayat}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Budget: ₹{need.price}</span>
          </div>
        </div>
      </div>

      {/* Footer & Matches pill */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-300 font-bold">3 nearby matches found</span>
        </div>

        <button
          onClick={() => onStartChat(need)}
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all flex items-center space-x-1"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Fulfill Need</span>
        </button>
      </div>

    </div>
  );
}
