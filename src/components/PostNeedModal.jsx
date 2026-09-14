import React, { useState } from 'react';
import { PlusCircle, MapPin, Tag, DollarSign, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { RAMANATHAPURAM_DISTRICT_DATA } from '../data/initialData';

export default function PostNeedModal({ currentUser, onClose, onSubmitItem }) {
  const [mode, setMode] = useState('listing'); // 'listing' | 'need'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics & Events');
  const [type, setType] = useState('Rent'); // 'Rent' | 'Sell' | 'Borrow'
  const [price, setPrice] = useState('');
  const [panchayat, setPanchayat] = useState(currentUser.panchayat || 'Perungulam Panchayat');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a valid title.');
      return;
    }
    if (!price || Number(price) <= 0) {
      setErrorMsg('Please enter a valid rate or budget.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a description.');
      return;
    }

    const newItem = {
      id: `item-${Date.now()}`,
      title: title,
      category: category,
      price: Number(price),
      priceUnit: 'day',
      type: mode === 'need' ? 'Need' : type,
      ownerId: currentUser.id,
      district: 'Ramanathapuram',
      taluk: currentUser.taluk || 'Ramanathapuram',
      panchayat: panchayat,
      distanceKm: 1.5,
      publicLocality: `📍 ${panchayat}`,
      exactAddressHidden: `Near ${panchayat} Main Square`,
      image: image || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600',
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
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl my-auto text-white space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-extrabold text-white">
              {mode === 'need' ? 'Post a Local Need' : 'List an Item for Rent / Share'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            type="button"
            onClick={() => setMode('listing')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'listing' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🛍️ List Item for Rent / Share
          </button>
          <button
            type="button"
            onClick={() => setMode('need')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'need' ? 'bg-teal-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📢 Post a Need (Requirement)
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              {mode === 'need' ? 'What do you need?' : 'Item Title:'}
            </label>
            <input
              type="text"
              placeholder={mode === 'need' ? 'e.g. Need Projector for 2 days village event' : 'e.g. HD Cinema Projector & Screen'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Agriculture & Tools">Agriculture & Tools</option>
                <option value="Electronics & Events">Electronics & Events</option>
                <option value="Photography">Photography</option>
                <option value="Events & Supplies">Events & Supplies</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                {mode === 'need' ? 'Budget / Day (₹):' : 'Rent Rate / Day (₹):'}
              </label>
              <input
                type="number"
                placeholder="300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Panchayat Locality:</label>
            <select
              value={panchayat}
              onChange={(e) => setPanchayat(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-300 font-semibold focus:outline-none focus:border-emerald-500"
            >
              {RAMANATHAPURAM_DISTRICT_DATA.taluks.flatMap(t => t.panchayats).map(p => (
                <option key={p} value={p}>📍 {p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Description & Specs:</label>
            <textarea
              rows={3}
              placeholder="Provide details about condition, accessories included, and pickup terms..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Privacy Note: Public listing displays <strong>📍 {panchayat}</strong> only. Exact address revealed after deal agreement.</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{mode === 'need' ? 'Publish Need' : 'Publish Listing'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
