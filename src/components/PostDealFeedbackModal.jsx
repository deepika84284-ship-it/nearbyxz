import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Tag, 
  MessageSquare,
  ThumbsUp,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  PREDEFINED_CUSTOMER_TAGS, 
  PREDEFINED_OWNER_TAGS, 
  SATISFACTION_OPTIONS 
} from '../data/initialData';

export default function PostDealFeedbackModal({ 
  deal, 
  item, 
  currentUser, 
  onClose, 
  onSubmitFeedback,
  onSubmitOwnerFeedback,
  existingReviews = []
}) {
  if (!deal || !item) return null;

  const isCustomer = currentUser.id === deal.customerId;
  const isOwner = currentUser.id === deal.ownerId;

  // Check if review already submitted
  const alreadyReviewed = existingReviews.some(
    r => r.dealId === deal.id && r.reviewerId === currentUser.id
  );

  // Step state: 'satisfaction' | 'customer_form' | 'owner_form' | 'submitted'
  const [step, setStep] = useState(alreadyReviewed ? 'already_done' : 'satisfaction');
  
  // Satisfaction State
  const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);
  const [dissatisfiedReason, setDissatisfiedReason] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);

  // Customer Star Ratings (1-5)
  const [ratings, setRatings] = useState({
    productQuality: 5,
    productAccuracy: 5,
    ownerBehaviour: 5,
    responseTime: 5,
    onTimeHandover: 5,
    overallSatisfaction: 5
  });

  // Customer Predefined Tags
  const [selectedCustomerTags, setSelectedCustomerTags] = useState([
    'Good Quality',
    'As Described',
    'On Time',
    'Fully Satisfied'
  ]);

  // Customer Text feedback
  const [textFeedback, setTextFeedback] = useState(
    'Quality was very good. The owner was responsive and gave the item on time. Fully satisfied.'
  );

  // Owner Tags & Comment (for reviewing buyer)
  const [selectedOwnerTags, setSelectedOwnerTags] = useState([
    'Genuine Customer',
    'Polite',
    'On Time',
    'Returned Item Safely'
  ]);
  const [ownerComment, setOwnerComment] = useState(
    'Great communication, returned the equipment cleanly and right on time.'
  );

  const toggleCustomerTag = (tag) => {
    setSelectedCustomerTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleOwnerTag = (tag) => {
    setSelectedOwnerTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleStarChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSatisfactionNext = (option) => {
    setSelectedSatisfaction(option.value);
    if (option.value === 'Not Satisfied') {
      // stay on satisfaction screen to capture reason
      return;
    }

    if (isCustomer) {
      setStep('customer_form');
    } else {
      setStep('owner_form');
    }
  };

  const handleCreateSupportTicket = () => {
    setTicketCreated(true);
    setTimeout(() => {
      if (isCustomer) setStep('customer_form');
      else setStep('owner_form');
    }, 1500);
  };

  const handleSubmitCustomerReview = (e) => {
    e.preventDefault();

    // Trigger celebration animation!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const totalStars = Object.values(ratings).reduce((a, b) => a + b, 0);
    const avgScore = Number((totalStars / 6).toFixed(1));

    const newReview = {
      id: `rev-${Date.now()}`,
      dealId: deal.id,
      itemId: item.id,
      itemTitle: item.title,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatar,
      ownerId: deal.ownerId,
      ownerName: deal.ownerName,
      panchayat: deal.panchayat,
      isVerifiedDeal: true,
      ratings: ratings,
      averageScore: avgScore,
      textFeedback: textFeedback,
      selectedTags: selectedCustomerTags,
      satisfactionStatus: selectedSatisfaction || '😊 Very Satisfied',
      createdAt: 'Just now',
      flaggedByAdmin: false
    };

    onSubmitFeedback(newReview);
    setStep('submitted');
  };

  const handleSubmitOwnerReview = (e) => {
    e.preventDefault();

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}

    const newOwnerReview = {
      id: `orev-${Date.now()}`,
      dealId: deal.id,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      customerId: deal.customerId,
      customerName: deal.customerName,
      customerAvatar: currentUser.avatar,
      panchayat: deal.panchayat,
      tags: selectedOwnerTags,
      comment: ownerComment,
      createdAt: 'Just now'
    };

    onSubmitOwnerFeedback(newOwnerReview);
    setStep('submitted');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl my-auto text-white space-y-6 relative overflow-hidden">
        
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>✓ Verified Deal Feedback</span>
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg px-2">
            ✕
          </button>
        </div>

        {/* ALREADY DONE STATE */}
        {step === 'already_done' && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold">Feedback Already Submitted!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              You have already submitted a verified review for this transaction. Thank you for building trust in the {deal.panchayat} community!
            </p>
            <button onClick={onClose} className="bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs">
              Close Window
            </button>
          </div>
        )}

        {/* STEP 1: SATISFACTION STATUS QUERY (Prompt Requirement #9) */}
        {step === 'satisfaction' && (
          <div className="space-y-5 text-center py-2">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-300">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Were you satisfied with this transaction?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Completed Deal: <strong>{deal.itemTitle}</strong> in {deal.panchayat}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {SATISFACTION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSatisfactionNext(opt)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 group ${
                    selectedSatisfaction === opt.value
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/40'
                  }`}
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform">{opt.emoji}</span>
                  <span className="text-xs font-bold text-slate-200">{opt.label}</span>
                </button>
              ))}
            </div>

            {/* If Dissatisfied Selected */}
            {selectedSatisfaction === 'Not Satisfied' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-left space-y-3 mt-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-red-300">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>We are sorry your experience wasn't satisfactory.</span>
                </div>

                <p className="text-[11px] text-slate-300">
                  Please tell us what went wrong so our NeedNear local support & safety team can investigate:
                </p>

                <textarea
                  rows={2}
                  value={dissatisfiedReason}
                  onChange={(e) => setDissatisfiedReason(e.target.value)}
                  placeholder="e.g. Item was damaged or owner did not show up on time..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50"
                />

                <div className="flex items-center justify-between pt-1">
                  {ticketCreated ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Support Ticket #TK-{Math.floor(Math.random()*9000+1000)} Created!
                    </span>
                  ) : (
                    <button
                      onClick={handleCreateSupportTicket}
                      className="bg-red-500 hover:bg-red-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md"
                    >
                      Submit Support Ticket
                    </button>
                  )}

                  <button
                    onClick={() => setStep(isCustomer ? 'customer_form' : 'owner_form')}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Continue to Rating →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: CUSTOMER FEEDBACK FORM (Prompt Requirement #1) */}
        {step === 'customer_form' && (
          <form onSubmit={handleSubmitCustomerReview} className="space-y-5">
            
            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-white">How was your experience?</h3>
              <p className="text-xs text-slate-400">
                Rating owner <strong>{deal.ownerName}</strong> for <em>{deal.itemTitle}</em>
              </p>
            </div>

            {/* 6 STAR RATING CRITERIA */}
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-3 text-xs">
              <p className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] mb-1">
                Rate on 6 Key Criteria (1 - 5 Stars):
              </p>

              {[
                { key: 'productQuality', label: 'Product Quality' },
                { key: 'productAccuracy', label: 'Product Accuracy' },
                { key: 'ownerBehaviour', label: 'Owner/Seller Behaviour' },
                { key: 'responseTime', label: 'Response Time' },
                { key: 'onTimeHandover', label: 'On-Time Handover' },
                { key: 'overallSatisfaction', label: 'Overall Satisfaction' }
              ].map(crit => (
                <div key={crit.key} className="flex items-center justify-between py-1 border-b border-slate-700/40 last:border-0">
                  <span className="font-medium text-slate-200">{crit.label}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarChange(crit.key, star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star className={`w-4 h-4 ${star <= ratings[crit.key] ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* PREDEFINED TAG CHIPS */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-teal-400" /> Select Predefined Highlights:
              </label>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_CUSTOMER_TAGS.map(tag => {
                  const isSelected = selectedCustomerTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleCustomerTag(tag)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                      }`}
                    >
                      <span>{isSelected ? '✓' : '+'}</span>
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TEXT FEEDBACK BOX */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Tell us about your experience:
              </label>
              <textarea
                rows={3}
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                placeholder="e.g. Quality was very good. The owner was responsive and gave the item on time. Fully satisfied."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Submit Verified Deal Review</span>
            </button>

          </form>
        )}

        {/* STEP 3: TWO-WAY OWNER FEEDBACK FORM (Prompt Requirement #3) */}
        {step === 'owner_form' && (
          <form onSubmit={handleSubmitOwnerReview} className="space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-white">Review Customer (Two-Way Trust)</h3>
              <p className="text-xs text-slate-400">
                Rate buyer <strong>{deal.customerName}</strong> for returning your item in {deal.panchayat}
              </p>
            </div>

            <div className="bg-teal-950/40 rounded-2xl p-4 border border-teal-500/30 space-y-3">
              <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> Predefined Buyer Feedback Tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_OWNER_TAGS.map(tag => {
                  const isSelected = selectedOwnerTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleOwnerTag(tag)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                        isSelected 
                          ? 'bg-teal-400 text-slate-950 font-extrabold shadow-md' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <span>{isSelected ? '👍' : '+'}</span>
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Comments on Customer Handover & Conduct:
              </label>
              <textarea
                rows={3}
                value={ownerComment}
                onChange={(e) => setOwnerComment(e.target.value)}
                placeholder="e.g. Genuine customer, returned item safely right on time."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center space-x-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Submit Owner Review of Customer</span>
            </button>
          </form>
        )}

        {/* STEP 4: SUBMITTED SUCCESS STATE */}
        {step === 'submitted' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">Thank You for Building Community Trust!</h3>
            
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your feedback has been verified and posted to the <strong>{deal.panchayat}</strong> community trust ledger (`✓ Verified Deal`).
            </p>

            <button
              onClick={onClose}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3 rounded-xl text-xs shadow-lg shadow-emerald-500/20"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
