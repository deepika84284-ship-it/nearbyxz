import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Handshake, MessageSquare, MapPin, Award, UserCheck, Calendar } from 'lucide-react';

export default function SellerTrustCard({ owner, reviews = [], ownerReviews = [], onContactClick, isModal = false, onClose }) {
  if (!owner) return null;

  return (
    <div className={`bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-white ${isModal ? 'max-w-2xl w-full mx-auto' : ''}`}>
      {/* Header Close button if modal */}
      {isModal && (
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Community Trust Profile
          </span>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold px-2 py-0.5 rounded hover:bg-slate-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative">
          <img 
            src={owner.avatar} 
            alt={owner.name} 
            className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover ring-4 ring-emerald-500/30 shadow-lg shadow-emerald-500/10"
          />
          {owner.isTrustedMember && (
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg" title="Trusted Member">
              <Award className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl font-extrabold text-white tracking-tight">{owner.name}</h3>
            {owner.isVerified && (
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Profile
              </span>
            )}
            {owner.isTrustedMember && (
              <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-teal-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Trusted Member
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 flex items-center gap-1 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold text-emerald-200">{owner.panchayat}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{owner.taluk} Taluk</span>
          </p>

          <p className="text-xs text-slate-300 italic line-clamp-2">"{owner.bio}"</p>
        </div>
      </div>

      {/* Trust Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 mb-6">
        <div className="text-center border-r border-slate-700/60 pr-2">
          <div className="flex items-center justify-center space-x-1 text-amber-400 font-extrabold text-xl sm:text-2xl">
            <span>{owner.overallRating || 4.8}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Overall Rating</p>
        </div>

        <div className="text-center border-r border-slate-700/60 pr-2">
          <div className="flex items-center justify-center space-x-1 text-cyan-300 font-extrabold text-xl sm:text-2xl">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span>{owner.reviewCount || reviews.length || 0}</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Reviews</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-emerald-300 font-extrabold text-xl sm:text-2xl">
            <Handshake className="w-5 h-5 text-emerald-400" />
            <span>{owner.successfulDeals || 0}</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Successful Deals</p>
        </div>
      </div>

      {/* Recent Reviews section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" /> Customer Reviews & Experience
          </h4>
          <span className="text-[11px] text-emerald-400 font-medium">✓ 100% Verified Deals</span>
        </div>

        {reviews.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">No reviews submitted yet.</p>
        ) : (
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/40 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-slate-200">{rev.reviewerName}</span>
                    {rev.isVerifiedDeal && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                        ✓ Verified Deal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-amber-400 font-bold">
                    <span>{rev.averageScore}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 ml-0.5" />
                  </div>
                </div>

                <p className="text-slate-300 mb-2 leading-relaxed">"{rev.textFeedback}"</p>

                {rev.selectedTags && (
                  <div className="flex flex-wrap gap-1">
                    {rev.selectedTags.map(tag => (
                      <span key={tag} className="bg-slate-700/60 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two-Way Owner Reviews (Feedback given by owner to customers) */}
      {ownerReviews.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> Owner's Feedback on Buyers (Two-Way Trust)
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {ownerReviews.map(orev => (
              <div key={orev.id} className="p-2.5 bg-teal-950/30 rounded-lg border border-teal-500/20 text-xs">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-teal-200">Buyer: {orev.customerName}</span>
                  <span className="text-slate-400">{orev.createdAt}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1">
                  {orev.tags.map(t => (
                    <span key={t} className="bg-teal-500/20 text-teal-300 text-[10px] px-2 py-0.5 rounded-full border border-teal-500/30">
                      👍 {t}
                    </span>
                  ))}
                </div>
                {orev.comment && <p className="text-slate-300 italic text-[11px]">"{orev.comment}"</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {onContactClick && (
        <button 
          onClick={onContactClick}
          className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat with {owner.name} on NeedNear</span>
        </button>
      )}
    </div>
  );
}
