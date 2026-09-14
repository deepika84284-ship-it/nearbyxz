import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Lock, 
  Filter, 
  Search, 
  Ban,
  Activity,
  FileText,
  UserX
} from 'lucide-react';

export default function AdminModerationPanel({ 
  reviews, 
  setReviews, 
  deals, 
  users, 
  panchayatStats 
}) {
  const [activeSubTab, setActiveSubTab] = useState('reviews'); // 'reviews' | 'panchayat_health' | 'reports' | 'suspicious'
  const [filterPanchayat, setFilterPanchayat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = reviews.filter(r => {
    const matchesP = filterPanchayat === 'All' || r.panchayat === filterPanchayat;
    const matchesQ = r.textFeedback.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     r.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     r.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesP && matchesQ;
  });

  const handleRemoveReview = (reviewId) => {
    if (window.confirm("Are you sure you want to remove this abusive or policy-violating review?")) {
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    }
  };

  const handleFlagReview = (reviewId) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, flaggedByAdmin: !r.flaggedByAdmin } : r));
  };

  // Detect suspicious repeated reviews (e.g. 2+ reviews between same customer and seller)
  const userPairCounts = {};
  reviews.forEach(r => {
    const pair = `${r.reviewerId}_${r.ownerId}`;
    userPairCounts[pair] = (userPairCounts[pair] || 0) + 1;
  });

  const suspiciousReviews = reviews.filter(r => {
    const pair = `${r.reviewerId}_${r.ownerId}`;
    return userPairCounts[pair] > 1;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Trust & Safety Command</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Panchayat Trust & Review Moderation
          </h1>

          <p className="text-xs text-slate-300 mt-1">
            Audit transaction-linked reviews, moderate reported feedback, inspect suspicious patterns, and track local village safety scores.
          </p>
        </div>

        {/* STRICT ANTI-FAKE ENFORCEMENT BANNER (Requirement #10) */}
        <div className="p-3.5 bg-slate-950 border border-emerald-500/40 rounded-2xl flex items-center space-x-3 text-xs max-w-sm">
          <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="font-extrabold text-emerald-300">Authenticity Guarantee:</span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Strict policy enforced. Admins cannot manually generate fake reviews. All reviews must originate from verified completed transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'reviews' 
              ? 'bg-purple-500 text-white shadow-md' 
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>All Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('suspicious')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'suspicious' 
              ? 'bg-amber-500 text-slate-950 shadow-md' 
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Suspicious Repeated ({suspiciousReviews.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('panchayat_health')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'panchayat_health' 
              ? 'bg-emerald-500 text-slate-950 shadow-md' 
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Panchayat Health Map</span>
        </button>
      </div>

      {/* TAB 1: ALL REVIEWS MODERATION */}
      {activeSubTab === 'reviews' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search feedback text, buyer or seller name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <select
              value={filterPanchayat}
              onChange={(e) => setFilterPanchayat(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-purple-300 font-bold px-3 py-2 rounded-xl text-xs"
            >
              <option value="All">All Panchayats</option>
              {panchayatStats.map(p => (
                <option key={p.panchayat} value={p.panchayat}>📍 {p.panchayat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filteredReviews.map(rev => (
              <div 
                key={rev.id} 
                className={`p-4 rounded-2xl border transition-all text-xs space-y-3 ${
                  rev.flaggedByAdmin 
                    ? 'bg-amber-950/30 border-amber-500/40' 
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-white">{rev.reviewerName}</span>
                      <span className="text-slate-400 ml-1">reviewed owner <strong>{rev.ownerName}</strong></span>
                      <p className="text-[10px] text-emerald-400">📍 {rev.panchayat} • Deal #{rev.dealId}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                      ✓ Verified Transaction
                    </span>
                    <span className="font-extrabold text-amber-400 text-sm">⭐ {rev.averageScore}</span>
                  </div>
                </div>

                <p className="text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  "{rev.textFeedback}"
                </p>

                {/* Ratings details */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[10px] text-slate-400 bg-slate-950/40 p-2 rounded-lg">
                  <div>Quality: <strong className="text-white">{rev.ratings.productQuality}</strong></div>
                  <div>Accuracy: <strong className="text-white">{rev.ratings.productAccuracy}</strong></div>
                  <div>Behaviour: <strong className="text-white">{rev.ratings.ownerBehaviour}</strong></div>
                  <div>Response: <strong className="text-white">{rev.ratings.responseTime}</strong></div>
                  <div>Handover: <strong className="text-white">{rev.ratings.onTimeHandover}</strong></div>
                  <div>Overall: <strong className="text-white">{rev.ratings.overallSatisfaction}</strong></div>
                </div>

                {/* Admin Actions */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px]">Submitted: {rev.createdAt}</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFlagReview(rev.id)}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                        rev.flaggedByAdmin ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {rev.flaggedByAdmin ? '⚠️ Flagged' : 'Flag for Audit'}
                    </button>

                    <button
                      onClick={() => handleRemoveReview(rev.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: SUSPICIOUS REPEATED REVIEWS DETECTOR */}
      {activeSubTab === 'suspicious' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1">
            <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Automated Pattern Detection
            </span>
            <p className="text-slate-300">
              Flags multiple reviews created between the exact same pair of buyer and seller to prevent artificial inflation.
            </p>
          </div>

          {suspiciousReviews.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6 text-center">No suspicious repeated reviews detected across Panchayats.</p>
          ) : (
            suspiciousReviews.map(rev => (
              <div key={rev.id} className="p-4 bg-slate-900 border border-amber-500/30 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between font-bold text-amber-300">
                  <span>Repeated Pair: {rev.reviewerName} → {rev.ownerName}</span>
                  <span>Deal #{rev.dealId}</span>
                </div>
                <p className="text-slate-300">"{rev.textFeedback}"</p>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => handleRemoveReview(rev.id)} className="bg-red-500 text-slate-950 font-bold px-3 py-1 rounded">
                    Delete Duplicate Review
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: PANCHAYAT HEALTH MAP */}
      {activeSubTab === 'panchayat_health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panchayatStats.map(stat => (
            <div key={stat.panchayat} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-white text-base">📍 {stat.panchayat}</h4>
                <span className="text-amber-400 font-extrabold text-sm">⭐ {stat.averageRating} / 5.0</span>
              </div>
              <p className="text-xs text-slate-400">{stat.description}</p>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950 p-3 rounded-xl">
                <div>
                  <div className="font-bold text-emerald-400">{stat.activeMembers}</div>
                  <div className="text-[10px] text-slate-500">Members</div>
                </div>
                <div>
                  <div className="font-bold text-teal-400">{stat.successfulDeals}</div>
                  <div className="text-[10px] text-slate-500">Deals</div>
                </div>
                <div>
                  <div className="font-bold text-cyan-400">{stat.activeListings}</div>
                  <div className="text-[10px] text-slate-500">Listings</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
