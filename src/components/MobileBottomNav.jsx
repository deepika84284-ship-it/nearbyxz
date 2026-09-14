import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User, Sparkles } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab, onOpenPostModal, onOpenAuthModal, currentUser }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] shadow-2xl">
      
      {/* 1. Home / Listings */}
      <button
        onClick={() => setActiveTab('listings')}
        className={`flex flex-col items-center space-y-1 transition-all ${
          activeTab === 'listings' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* 2. Community Hub */}
      <button
        onClick={() => setActiveTab('community')}
        className={`flex flex-col items-center space-y-1 transition-all ${
          activeTab === 'community' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Search className="w-5 h-5" />
        <span>Hub</span>
      </button>

      {/* 3. PROMINENT CENTER POST BUTTON */}
      <button
        onClick={onOpenPostModal}
        className="flex flex-col items-center relative -top-3"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-4 ring-slate-950 font-black">
          <PlusCircle className="w-7 h-7" />
        </div>
        <span className="text-[10px] font-bold text-emerald-300 mt-0.5">Post Need</span>
      </button>

      {/* 4. Deals & Chat */}
      <button
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center space-y-1 transition-all relative ${
          activeTab === 'chat' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-0 right-3"></span>
      </button>

      {/* 5. Profile / Auth */}
      <button
        onClick={onOpenAuthModal}
        className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200"
      >
        <img 
          src={currentUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"} 
          alt={currentUser?.name || "User"} 
          className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-400"
        />
        <span className="truncate max-w-[45px]">{currentUser?.name.split(' ')[0] || "Profile"}</span>
      </button>

    </div>
  );
}
