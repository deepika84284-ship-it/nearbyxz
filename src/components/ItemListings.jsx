import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Tag, 
  Search, 
  CheckCircle2, 
  SlidersHorizontal,
  Award,
  PlusCircle,
  Sparkles,
  Zap,
  ArrowRight,
  Handshake,
  HelpCircle
} from 'lucide-react';
import NeedCard from './NeedCard';

export default function ItemListings({ 
  items, 
  users, 
  selectedPanchayat, 
  onSelectItem, 
  onStartChat, 
  onOpenOwnerProfile,
  onOpenPostModal 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All'); // 'All' | 'Rent' | 'Buy' | 'Borrow' | 'Free' | 'Need'

  const categories = [
    { label: 'All', icon: '🌟' },
    { label: 'Agriculture & Tools', icon: '🚜' },
    { label: 'Electronics & Events', icon: '📽️' },
    { label: 'Photography', icon: '📷' },
    { label: 'Events & Supplies', icon: '🎪' }
  ];

  const modes = [
    { label: 'All', icon: '✨' },
    { label: 'Rent', icon: '🔄' },
    { label: 'Buy', icon: '🏷️' },
    { label: 'Borrow', icon: '🤝' },
    { label: 'Free', icon: '🎁' },
    { label: 'Need', icon: '🔎' }
  ];

  const filteredItems = items.filter(item => {
    const matchesPanchayat = selectedPanchayat === 'All' || 
      item.locality === selectedPanchayat || 
      item.communityName === selectedPanchayat || 
      item.panchayat === selectedPanchayat;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesMode = selectedMode === 'All' || item.type === selectedMode;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.locality && item.locality.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.firka && item.firka.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.taluk && item.taluk.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPanchayat && matchesCategory && matchesMode && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. HERO SECTION (Prompt Requirement #2: "What do you need today?") */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3.5 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ramanathapuram Community Marketplace</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            What do you <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">need today?</span>
          </h1>

          {/* LARGE INPUT FOCUS */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <input
                type="text"
                placeholder="I need a projector for 2 days, power tiller, camera..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 shadow-inner"
              />
            </div>
            
            <button 
              onClick={onOpenPostModal}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all text-sm flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Your Need</span>
            </button>
          </div>

          {/* MODE PILLS (Buy • Rent • Borrow • Free) */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-bold mr-1">Find nearby:</span>
            {modes.map(m => (
              <button
                key={m.label}
                onClick={() => setSelectedMode(m.label)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1 ${
                  selectedMode === m.label
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. HOW NEEDLY WORKS INFOGRAPHIC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { step: "01", title: "Post Need", desc: "Share what you need & budget", icon: "📢" },
          { step: "02", title: "Find Match", desc: "Smart local matching system", icon: "🔎" },
          { step: "03", title: "Chat & Agree", desc: "Safe Panchayat spot in chat", icon: "💬" },
          { step: "04", title: "Confirm Deal", desc: "Handover & complete deal", icon: "🤝" },
          { step: "05", title: "6-Star Review", desc: "Build verified trust score", icon: "⭐" }
        ].map(st => (
          <div key={st.step} className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-start space-x-2.5 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm flex-shrink-0">
              {st.icon}
            </div>
            <div>
              <span className="text-[9px] font-extrabold text-emerald-400 uppercase">Step {st.step}</span>
              <h4 className="font-bold text-white text-xs mt-0.5">{st.title}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CATEGORY PILLS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" />
        {categories.map(cat => (
          <button
            key={cat.label}
            onClick={() => setSelectedCategory(cat.label)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              selectedCategory === cat.label
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 4. ACTIVE RESULTS GRID */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <span className="font-extrabold text-white">{filteredItems.length} active listings & needs</span> in{' '}
          <span className="text-emerald-400 font-bold">
            {selectedPanchayat === 'All' ? 'All Ramanathapuram District' : selectedPanchayat}
          </span>
        </div>
      </div>

      {/* FRIENDLY EMPTY STATE (Prompt Requirement #13) */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-12 text-center space-y-4 max-w-xl mx-auto">
          <HelpCircle className="w-14 h-14 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-extrabold text-white">We couldn't find a match nearby yet.</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Be the first in {selectedPanchayat === 'All' ? 'your Panchayat' : selectedPanchayat} to post what you need! Local neighbors will respond with available offers.
          </p>
          <button
            onClick={onOpenPostModal}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs shadow-lg shadow-emerald-500/20"
          >
            Post Your Need Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const owner = users.find(u => u.id === item.ownerId);

            if (item.type === 'Need') {
              return (
                <NeedCard 
                  key={item.id} 
                  need={item} 
                  onStartChat={onStartChat} 
                />
              );
            }

            return (
              <div 
                key={item.id}
                className="bg-slate-900/90 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between overflow-hidden group glow-card"
              >
                <div>
                  <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => onSelectItem(item)}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-[11px] font-bold text-emerald-300 flex items-center space-x-1 shadow-lg">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>{item.publicLocality}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-medium text-[10px]">({item.reviewsCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-xl shadow-md">
                        ₹{item.price} / {item.priceUnit}
                      </span>
                      <span className="text-[10px] text-emerald-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 cursor-pointer" onClick={() => onSelectItem(item)}>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.commonFeedback.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-slate-800 text-emerald-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
                  {owner && (
                    <div 
                      onClick={() => onOpenOwnerProfile(owner)}
                      className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40" />
                      <div>
                        <div className="flex items-center space-x-1 text-xs font-bold text-slate-200">
                          <span className="truncate max-w-[90px]">{owner.name}</span>
                          {owner.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-emerald-400 font-medium">
                          {owner.successfulDeals} Deals • ⭐ {owner.overallRating}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-2 rounded-xl text-xs border border-slate-700 transition-all"
                    >
                      Reviews
                    </button>

                    <button
                      onClick={() => onStartChat(item)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
