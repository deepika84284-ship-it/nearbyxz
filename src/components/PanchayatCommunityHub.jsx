import React, { useState } from 'react';
import { 
  Users, 
  Handshake, 
  Star, 
  Store, 
  HelpCircle, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Building2,
  FileCheck2,
  Info
} from 'lucide-react';
import { DEVELOPMENT_ADMINISTRATION, REVENUE_ADMINISTRATION } from '../data/locationDatabase';

export default function PanchayatCommunityHub({ 
  selectedPanchayat, 
  setSelectedPanchayat, 
  communityStats, 
  users, 
  items, 
  reviews, 
  onOpenOwnerProfile,
  onSelectItem 
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('panchayats'); // 'panchayats' | 'revenue_villages'

  // Find stats for selected community or fallback to first
  const currentCommunityStats = communityStats.find(s => 
    s.communityName === selectedPanchayat || 
    s.locality === selectedPanchayat || 
    s.panchayat === selectedPanchayat
  ) || communityStats[0];

  const communityTitle = currentCommunityStats.communityName || 
    (currentCommunityStats.isPanchayatVerified ? `${currentCommunityStats.locality} Village Panchayat Community` : `${currentCommunityStats.locality} Community`);

  // Members in this community
  const panchayatMembers = users.filter(u => 
    selectedPanchayat === 'All' || 
    u.communityName === currentCommunityStats.communityName || 
    u.locality === currentCommunityStats.locality
  );
  
  // Items in this community
  const panchayatItems = items.filter(i => 
    selectedPanchayat === 'All' || 
    i.communityName === currentCommunityStats.communityName || 
    i.locality === currentCommunityStats.locality
  );

  // Reviews in this community
  const panchayatReviews = reviews.filter(r => 
    selectedPanchayat === 'All' || 
    r.communityName === currentCommunityStats.communityName || 
    r.locality === currentCommunityStats.locality
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* OFFICIAL ADMINISTRATIVE DATASET INFORMATION BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 border border-teal-500/30 rounded-3xl p-5 shadow-xl text-white space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Official Ramanathapuram Location Datasets</h3>
              <p className="text-[11px] text-slate-400">Strictly separated Development Administration & Revenue Administration Source of Truth</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setActiveAdminTab('panchayats')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeAdminTab === 'panchayats' 
                  ? 'bg-teal-400 text-slate-950 shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>🏛️ 429 Village Panchayats</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('revenue_villages')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeAdminTab === 'revenue_villages' 
                  ? 'bg-cyan-400 text-slate-950 shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>📜 400 Revenue Villages</span>
            </button>
          </div>
        </div>

        {/* Dynamic Admin Explanation */}
        {activeAdminTab === 'panchayats' ? (
          <div className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <Info className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-teal-300">Development Administration (Panchayat Unions):</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ramanathapuram has <strong>429 Village Panchayats</strong> organized under <strong>11 Panchayat Union Blocks</strong> (Mandapam, Ramanathapuram, R.S. Mangalam, Thiruppullani, Thiruvadanai, Bogalur, Kadaladi, Kamuthi, Mudukulathur, Nainarkoil, Paramakudi). Used for official Village Panchayat community hubs.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300">Revenue Administration (Taluks & Firkas):</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ramanathapuram has <strong>400 Revenue Villages</strong> organized under <strong>9 Revenue Taluks</strong> and <strong>38 Revenue Firkas</strong> (including Perunkulam Firka) across <strong>2 Revenue Divisions</strong>. Used for locality & revenue village community hubs.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Community Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 p-6 sm:p-8 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src={currentCommunityStats.heroBanner} 
            alt={communityTitle} 
            className="w-full h-full object-cover opacity-20 filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentCommunityStats.locality || currentCommunityStats.communityName}</span>
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
              {currentCommunityStats.firka ? `${currentCommunityStats.firka} • ` : ''}{currentCommunityStats.taluk}
            </span>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
              currentCommunityStats.isPanchayatVerified 
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' 
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
            }`}>
              {currentCommunityStats.isPanchayatVerified ? '🏛️ Official Village Panchayat' : '📍 Locality / Revenue Community'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {communityTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentCommunityStats.description}
          </p>

          {/* Quick Community Switcher Pills */}
          <div className="pt-2 flex items-center space-x-2 overflow-x-auto scrollbar-none">
            <span className="text-xs text-slate-400 font-bold whitespace-nowrap">Switch Community:</span>
            {communityStats.map(s => {
              const name = s.locality || s.communityName;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedPanchayat(name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedPanchayat === name || selectedPanchayat === s.communityName
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  📍 {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PANCHAYAT STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <Users className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-2xl font-extrabold text-white">{currentCommunityStats.activeMembers}</div>
          <p className="text-[11px] text-slate-400 font-medium">Active Members</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <Handshake className="w-5 h-5 text-teal-400 mx-auto" />
          <div className="text-2xl font-extrabold text-white">{currentCommunityStats.successfulDeals}</div>
          <p className="text-[11px] text-slate-400 font-medium">Successful Deals</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <Store className="w-5 h-5 text-cyan-400 mx-auto" />
          <div className="text-2xl font-extrabold text-white">{currentCommunityStats.activeListings}</div>
          <p className="text-[11px] text-slate-400 font-medium">Active Listings</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <HelpCircle className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="text-2xl font-extrabold text-white">{currentCommunityStats.activeNeeds}</div>
          <p className="text-[11px] text-slate-400 font-medium">Active Needs</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <div className="flex justify-center text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{currentCommunityStats.averageRating}</div>
          <p className="text-[11px] text-slate-400 font-medium">Community Exp.</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-2xl font-extrabold text-emerald-300">100%</div>
          <p className="text-[11px] text-slate-400 font-medium">Verified Deals</p>
        </div>
      </div>

      {/* TRUSTED LOCAL MEMBERS DIRECTORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" /> Trusted Members in {currentPanchayatStats.panchayat}
          </h2>
          <span className="text-xs text-slate-400">{panchayatMembers.length} Verified Residents</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {panchayatMembers.map(mem => (
            <div 
              key={mem.id}
              onClick={() => onOpenOwnerProfile(mem)}
              className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-start space-x-3 group"
            >
              <img src={mem.avatar} alt={mem.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/40" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors truncate">{mem.name}</h4>
                  {mem.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                </div>
                
                <p className="text-[11px] text-slate-400 truncate">{mem.locality}</p>

                <div className="flex items-center space-x-3 mt-2 text-xs font-semibold">
                  <span className="text-amber-400 flex items-center gap-0.5">
                    ⭐ {mem.overallRating}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-300">{mem.successfulDeals} Deals</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-cyan-300">{mem.reviewCount} Reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE ITEMS & NEEDS IN PANCHAYAT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Available Items */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-400" /> Active Items in {currentPanchayatStats.panchayat}
          </h3>

          <div className="space-y-3">
            {panchayatItems.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-slate-400">₹{item.price} / {item.priceUnit} • {item.distanceKm} km away</p>
                    <div className="flex items-center space-x-1 text-amber-400 text-[10px] font-bold mt-1">
                      <span>⭐ {item.rating} ({item.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Community Recent Reviews Feed */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-400" /> Recent Panchayat Reviews
          </h3>

          <div className="space-y-3">
            {panchayatReviews.map(rev => (
              <div key={rev.id} className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-slate-200">{rev.reviewerName}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                    ✓ Verified Deal
                  </span>
                </div>
                <p className="text-slate-300 italic text-xs">"{rev.textFeedback}"</p>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>For: {rev.itemTitle}</span>
                  <span>{rev.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
