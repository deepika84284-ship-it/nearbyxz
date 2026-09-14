import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  Lock, 
  UserCheck,
  Tag,
  Info,
  ChevronRight
} from 'lucide-react';
import SellerTrustCard from './SellerTrustCard';

export default function ItemDetailModal({ 
  item, 
  owner, 
  itemReviews = [], 
  onClose, 
  onStartChat, 
  onOpenOwnerProfile 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reviews' | 'owner'
  const [selectedTagFilter, setSelectedTagFilter] = useState('All');

  if (!item) return null;

  const filteredReviews = selectedTagFilter === 'All' 
    ? itemReviews 
    : itemReviews.filter(r => r.selectedTags?.includes(selectedTagFilter));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
              {item.type} • ₹{item.price}/{item.priceUnit}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">• {item.category}</span>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Hero & Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-56 md:h-64 object-cover rounded-2xl border border-slate-800 shadow-lg"
              />
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{item.publicLocality}</span>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold mb-1">
                  <span>📍 {item.panchayat}</span>
                  <span className="text-slate-500">•</span>
                  <span>{item.distanceKm} km away from you</span>
                </div>

                <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug mb-3">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Privacy Notice Box */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-start space-x-2.5 text-xs text-slate-300">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-300">Panchayat Privacy Safeguard:</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Exact home address is hidden. Public listing shows <strong>{item.publicLocality}</strong>. Full pickup details revealed in chat after deal agreement.
                  </p>
                </div>
              </div>

              {/* Owner Trust Quick Card */}
              {owner && (
                <div 
                  onClick={() => onOpenOwnerProfile(owner)}
                  className="p-3 bg-gradient-to-r from-slate-800/80 to-slate-800/40 rounded-xl border border-slate-700/60 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <img src={owner.avatar} alt={owner.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40" />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-white">{owner.name}</span>
                        {owner.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        {owner.isTrustedMember && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                            🟢 Trusted Member
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{owner.panchayat} • {owner.successfulDeals} Deals</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400 font-bold text-xs">
                    <span>{owner.overallRating}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CUSTOMER EXPERIENCE SECTION (Prompt Requirement #8) */}
          <div className="bg-slate-800/60 rounded-2xl p-5 border border-emerald-500/20 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Customer Experience & Feedback
                </h3>
                <p className="text-xs text-slate-400">Authentic 100% verified deal reviews from local neighbors</p>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <div className="flex items-center text-amber-400 font-extrabold text-lg">
                  <span>{item.rating || 4.8}</span>
                  <Star className="w-4 h-4 fill-amber-400 ml-1" />
                </div>
                <span className="text-slate-400 text-xs font-medium">({item.reviewsCount || itemReviews.length} Reviews)</span>
              </div>
            </div>

            {/* Common Feedback Badges */}
            <div>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-teal-400" /> Common Feedback Highlights:
              </p>
              <div className="flex flex-wrap gap-2">
                {item.commonFeedback.map(tag => {
                  const isSelected = selectedTagFilter === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTagFilter(isSelected ? 'All' : tag)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20' 
                          : 'bg-slate-700/60 text-emerald-300 hover:bg-slate-700 border border-emerald-500/30'
                      }`}
                    >
                      <span>✓ {tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">
                  Verified Reviews {selectedTagFilter !== 'All' && `(Filtered by "${selectedTagFilter}")`}:
                </span>
                {selectedTagFilter !== 'All' && (
                  <button 
                    onClick={() => setSelectedTagFilter('All')}
                    className="text-emerald-400 hover:underline text-xs"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {filteredReviews.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-3">No reviews found matching this filter tag.</p>
              ) : (
                filteredReviews.map(rev => (
                  <div key={rev.id} className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-white text-xs">{rev.reviewerName}</span>
                          <span className="text-[10px] text-slate-400 ml-2">📍 {rev.panchayat}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                          ✓ Verified Deal
                        </span>
                        <div className="flex items-center text-amber-400 font-bold">
                          <span>{rev.averageScore}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-400 ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-200 text-xs leading-relaxed">"{rev.textFeedback}"</p>

                    {/* Detailed Ratings breakdown pill */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-400 border-t border-slate-800">
                      <div>Product Quality: <span className="text-amber-400 font-bold">⭐ {rev.ratings.productQuality}</span></div>
                      <div>Product Accuracy: <span className="text-amber-400 font-bold">⭐ {rev.ratings.productAccuracy}</span></div>
                      <div>Owner Behaviour: <span className="text-amber-400 font-bold">⭐ {rev.ratings.ownerBehaviour}</span></div>
                      <div>Response Time: <span className="text-amber-400 font-bold">⭐ {rev.ratings.responseTime}</span></div>
                      <div>On-Time Handover: <span className="text-amber-400 font-bold">⭐ {rev.ratings.onTimeHandover}</span></div>
                      <div>Overall Satisfaction: <span className="text-amber-400 font-bold">⭐ {rev.ratings.overallSatisfaction}</span></div>
                    </div>

                    {/* Tags */}
                    {rev.selectedTags && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {rev.selectedTags.map(t => (
                          <span key={t} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-700">
                            ✓ {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Rent / Day:</span>
            <div className="text-xl font-extrabold text-emerald-400">
              ₹{item.price} <span className="text-xs text-slate-400 font-normal">/ {item.priceUnit}</span>
            </div>
          </div>

          <button
            onClick={() => onStartChat(item)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2 text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat & Request Deal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
