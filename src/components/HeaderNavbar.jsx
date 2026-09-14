import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Store, 
  UserCheck, 
  Sparkles,
  ChevronDown,
  Search,
  Check,
  Building2,
  FileCheck2
} from 'lucide-react';
import { 
  ALL_VILLAGE_PANCHAYATS, 
  ALL_REVENUE_VILLAGES, 
  COMBINED_RAMNAD_MASTER_LOCATIONS 
} from '../data/locationDatabase';

export default function HeaderNavbar({ 
  selectedPanchayat, 
  setSelectedPanchayat, 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setCurrentUser, 
  allUsers,
  onOpenAuthModal
}) {
  const [placeSearchQuery, setPlaceSearchQuery] = useState('');
  const [datasetFilter, setDatasetFilter] = useState('All'); // 'All' | 'Panchayats' | 'Revenue'
  const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false);

  const locationsToSearch = datasetFilter === 'Panchayats' 
    ? ALL_VILLAGE_PANCHAYATS 
    : datasetFilter === 'Revenue' 
    ? ALL_REVENUE_VILLAGES 
    : COMBINED_RAMNAD_MASTER_LOCATIONS;

  const filteredPlaces = locationsToSearch.filter(p => 
    p.name.toLowerCase().includes(placeSearchQuery.toLowerCase()) ||
    p.parentUnit.toLowerCase().includes(placeSearchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('listings')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  NeedNear
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                  Official RMD Data
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">429 Village Panchayats & 400 Revenue Villages Source of Truth</p>
            </div>
          </div>

          {/* DUAL ADMINISTRATIVE DATASET LOCATION SELECTOR */}
          <div className="hidden md:block relative">
            <div 
              onClick={() => setIsPlaceDropdownOpen(!isPlaceDropdownOpen)}
              className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3.5 py-1.5 space-x-2 text-xs hover:border-emerald-500/50 cursor-pointer transition-all min-w-[280px] justify-between shadow-inner"
            >
              <div className="flex items-center space-x-2 truncate">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
                <span className="text-slate-400 font-medium">Location:</span>
                <span className="text-emerald-300 font-bold truncate">
                  {selectedPanchayat === 'All' ? 'All Ramnad District' : selectedPanchayat}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            </div>

            {/* Smart Dual Dataset Dropdown Panel */}
            {isPlaceDropdownOpen && (
              <div className="absolute left-0 mt-2 w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50 space-y-3">
                
                {/* Administrative Dataset Switcher Pills */}
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Select Official Administrative Dataset:
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
                    <button
                      onClick={() => setDatasetFilter('All')}
                      className={`py-1.5 rounded-lg transition-all ${
                        datasetFilter === 'All' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All ({COMBINED_RAMNAD_MASTER_LOCATIONS.length})
                    </button>
                    <button
                      onClick={() => setDatasetFilter('Panchayats')}
                      className={`py-1.5 rounded-lg transition-all ${
                        datasetFilter === 'Panchayats' ? 'bg-teal-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      429 Panchayats
                    </button>
                    <button
                      onClick={() => setDatasetFilter('Revenue')}
                      className={`py-1.5 rounded-lg transition-all ${
                        datasetFilter === 'Revenue' ? 'bg-cyan-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      400 Rev. Villages
                    </button>
                  </div>
                </div>

                {/* Search Box */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search village panchayat or revenue village..."
                    value={placeSearchQuery}
                    onChange={(e) => setPlaceSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                {/* Results list with explicit administrative dataset badges */}
                <div className="max-h-64 overflow-y-auto space-y-1.5 text-xs pr-1">
                  <button
                    onClick={() => {
                      setSelectedPanchayat('All');
                      setIsPlaceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                      selectedPanchayat === 'All' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>📍 All Ramanathapuram District (All Units)</span>
                    {selectedPanchayat === 'All' && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {filteredPlaces.length} Official Units Found:
                  </div>

                  {filteredPlaces.map(p => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setSelectedPanchayat(p.name);
                        setIsPlaceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                        selectedPanchayat === p.name ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="block font-semibold truncate text-white">📍 {p.name}</span>
                        <div className="flex items-center space-x-1.5 text-[10px] mt-0.5">
                          <span className="text-slate-400">{p.parentUnit}</span>
                          <span className="text-slate-600">•</span>
                          <span className={`px-1.5 py-0.2 rounded font-semibold text-[9px] ${
                            p.adminType.includes('Panchayat') 
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {p.adminType.includes('Panchayat') ? '🏛️ Panchayat' : '📜 Revenue Village'}
                          </span>
                        </div>
                      </div>
                      {selectedPanchayat === p.name && <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'listings' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Listings</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'community' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">Panchayat Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                activeTab === 'chat' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Deals & Chat</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-1 animate-ping"></span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'admin' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                  : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="hidden md:inline">Admin Panel</span>
            </button>

            {/* Login & Switch Account */}
            <div className="pl-2 border-l border-slate-800 flex items-center space-x-2">
              <button
                onClick={onOpenAuthModal}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
              >
                <span>Login / Register</span>
              </button>

              <div className="relative group hidden sm:block">
                <button className="flex items-center space-x-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 rounded-lg text-xs transition-all">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-500/40"
                  />
                  <span className="font-semibold text-slate-200 hidden lg:inline">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Switcher Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                  <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Switch Active Persona:
                  </div>
                  {allUsers.map(u => (
                    <button
                      key={u.id}
                      onClick={() => setCurrentUser(u)}
                      className={`w-full text-left flex items-center space-x-2.5 p-2 rounded-lg text-xs transition-all ${
                        currentUser?.id === u.id ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                      <div className="truncate">
                        <div className="flex items-center space-x-1">
                          <span className="truncate">{u.name}</span>
                          {u.isVerified && <UserCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{u.panchayat}</p>
                      </div>
                    </button>
                  ))}
                  
                  <div className="border-t border-slate-800 my-1 pt-1">
                    <button
                      onClick={() => setCurrentUser(null)}
                      className="w-full text-left flex items-center space-x-2 p-2 rounded-lg text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                      <span>🚪 Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </nav>
        </div>

        {/* Mobile Panchayat Selector Row */}
        <div className="md:hidden py-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-slate-400">RMD Location:</span>
          </div>
          <select 
            value={selectedPanchayat}
            onChange={(e) => setSelectedPanchayat(e.target.value)}
            className="bg-slate-800 text-emerald-300 font-semibold px-2 py-1 rounded border border-slate-700 text-xs"
          >
            <option value="All">All Ramnad District</option>
            {COMBINED_RAMNAD_MASTER_LOCATIONS.map(p => (
              <option key={p.name} value={p.name}>📍 {p.name} ({p.parentUnit})</option>
            ))}
          </select>
        </div>

      </div>
    </header>
  );
}
