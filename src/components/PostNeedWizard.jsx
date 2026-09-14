import React, { useState } from 'react';
import { 
  PlusCircle, 
  MapPin, 
  Tag, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { RAMANATHAPURAM_DISTRICT_DATA, ALL_RAMNAD_PLACES } from '../data/initialData';

export default function PostNeedWizard({ currentUser, onClose, onSubmitItem }) {
  const [step, setStep] = useState(1); // 1 to 5

  // Form State
  const [mode, setMode] = useState('need'); // 'need' | 'listing'
  const [title, setTitle] = useState('Full HD Cinema Projector for 2 Days');
  const [category, setCategory] = useState('Electronics & Events');
  const [type, setType] = useState('Rent'); // 'Rent' | 'Buy' | 'Borrow' | 'Free'
  const [price, setPrice] = useState('300');
  const [duration, setDuration] = useState('2');
  const [panchayat, setPanchayat] = useState(currentUser.locality || 'Perungulam');
  const [description, setDescription] = useState('Required for village cultural event in Perungulam. High brightness projector preferred.');

  const totalSteps = 5;

  const handleNextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: `item-${Date.now()}`,
      title: title,
      category: category,
      price: Number(price) || 0,
      priceUnit: 'day',
      type: mode === 'need' ? 'Need' : type,
      ownerId: currentUser.id,
      district: 'Ramanathapuram',
      taluk: currentUser.taluk || 'Ramanathapuram',
      panchayat: panchayat,
      distanceKm: 1.8,
      publicLocality: `📍 ${panchayat}`,
      exactAddressHidden: `Near ${panchayat} Main Complex`,
      image: mode === 'need'
        ? 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600',
      description: description,
      rating: 5.0,
      reviewsCount: 0,
      commonFeedback: ['Good Quality', 'Fast Response', 'On Time'],
      status: 'Available'
    };

    onSubmitItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl my-auto text-white space-y-6 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-extrabold text-white">Post Need Wizard</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        {/* PROGRESS BAR 1 ━━━ 2 ━━━ 3 ━━━ 4 ━━━ 5 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300">
            <span>Step {step} of 5</span>
            <span className="text-emerald-400">
              {step === 1 && "What do you need?"}
              {step === 2 && "Where do you need it?"}
              {step === 3 && "Select Mode (Buy/Rent/Borrow/Free)"}
              {step === 4 && "Budget & Duration"}
              {step === 5 && "Review & Publish"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all ${
                  s <= step ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-sm' : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* STEP 1: WHAT DO YOU NEED? */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Title of Need / Listing:</label>
              <input
                type="text"
                placeholder="e.g. Projector needed for 2 days event"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Select Category:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Agriculture & Tools", icon: "🚜" },
                  { name: "Electronics & Events", icon: "📽️" },
                  { name: "Photography", icon: "📷" },
                  { name: "Events & Supplies", icon: "🎪" }
                ].map(c => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCategory(c.name)}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                      category === c.name 
                        ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{c.icon}</span>
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: WHERE DO YOU NEED IT? */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-400" /> Select Panchayat / Village in Ramnad:
              </label>
              <select
                value={panchayat}
                onChange={(e) => setPanchayat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300 font-bold text-sm focus:outline-none focus:border-emerald-500"
              >
                {ALL_RAMNAD_PLACES.map(p => (
                  <option key={p.panchayat} value={p.panchayat}>📍 {p.panchayat} ({p.taluk} Taluk)</option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center space-x-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Public listing will show <strong>📍 {panchayat}</strong> only. Home address stays private!</span>
            </div>
          </div>
        )}

        {/* STEP 3: MODE (BUY / RENT / BORROW / FREE) */}
        {step === 3 && (
          <div className="space-y-3 text-xs">
            <label className="block text-slate-300 font-bold mb-1">Select How You Want It:</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Rent", desc: "Pay daily/weekly rate", icon: "🔄" },
                { label: "Borrow", desc: "Friendly neighbor borrow", icon: "🤝" },
                { label: "Buy", desc: "Purchase second hand", icon: "🏷️" },
                { label: "Free", desc: "Community free giveaway", icon: "🎁" }
              ].map(m => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setType(m.label)}
                  className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all ${
                    type === m.label 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400 text-white font-bold shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 text-sm">
                    <span>{m.icon}</span>
                    <span className="font-extrabold">{m.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET & DURATION */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Target Budget (₹):</label>
                <input
                  type="number"
                  placeholder="300"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Duration (Days):</label>
                <input
                  type="number"
                  placeholder="2"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Description & Specific Needs:</label>
              <textarea
                rows={3}
                placeholder="Mention timing, condition, specs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & PUBLISH */}
        {step === 5 && (
          <div className="space-y-4 text-xs bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Review Summary before Posting
            </h4>

            <div className="space-y-1.5 text-slate-200">
              <div>Title: <strong className="text-white">{title}</strong></div>
              <div>Category: <span className="text-teal-300">{category}</span></div>
              <div>Mode: <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">{type}</span></div>
              <div>Budget: <strong className="text-emerald-400">₹{price} / day ({duration} Days)</strong></div>
              <div>Locality: <strong className="text-white">📍 {panchayat}</strong></div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div></div>}

          {step < totalSteps ? (
            <button
              onClick={handleNextStep}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-emerald-500/30"
            >
              Publish Now ✨
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
