import React, { useState } from 'react';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Handshake, 
  XCircle, 
  Flag, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Star,
  Sparkles
} from 'lucide-react';

export default function ChatSystem({ 
  currentUser, 
  deals, 
  setDeals, 
  messages, 
  setMessages, 
  items, 
  users, 
  onOpenFeedbackModal,
  activeDealId,
  setActiveDealId
}) {
  const activeDeal = deals.find(d => d.id === activeDealId) || deals[0];
  const activeItem = items.find(i => i.id === activeDeal?.itemId);
  const activeOwner = users.find(u => u.id === activeDeal?.ownerId);
  const activeCustomer = users.find(u => u.id === activeDeal?.customerId);

  const [inputMessage, setInputMessage] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showOfferPicker, setShowOfferPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customLocation, setCustomLocation] = useState(activeDeal?.agreedPickupLocation || '');
  const [customOffer, setCustomOffer] = useState(activeDeal?.itemPrice || 300);
  const [customDate, setCustomDate] = useState(activeDeal?.pickupDate || '2026-09-15');

  // Filter messages for active deal
  const dealMessages = messages.filter(m => m.dealId === activeDeal?.id);

  const handleSendMessage = (text, type = 'text') => {
    if (!text && type === 'text') return;
    
    const newMsg = {
      id: `msg-${Date.now()}`,
      dealId: activeDeal.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text || inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
  };

  // Quick Actions Handlers
  const handleSharePickupLocation = () => {
    const locText = customLocation || `${activeDeal.panchayat} Office Complex Ground`;
    handleSendMessage(`📍 Shared Pickup Location: ${locText}`, 'action');
    
    // Update deal record
    setDeals(prev => prev.map(d => d.id === activeDeal.id ? { ...d, agreedPickupLocation: locText } : d));
    setShowLocationPicker(false);
  };

  const handleMakeOffer = () => {
    handleSendMessage(`💰 Made an Offer: ₹${customOffer}/day for 2 days`, 'action');
    setShowOfferPicker(false);
  };

  const handleSelectPickupDate = () => {
    handleSendMessage(`📅 Proposed Pickup Date: ${customDate}`, 'action');
    setShowDatePicker(false);
  };

  const handleConfirmDeal = () => {
    setDeals(prev => prev.map(d => d.id === activeDeal.id ? { ...d, status: 'agreed' } : d));
    handleSendMessage(`🤝 Deal Confirmed! Agreed Pickup at ${activeDeal.agreedPickupLocation || activeDeal.panchayat}`, 'system');
  };

  const handleCompleteDeal = () => {
    setDeals(prev => prev.map(d => d.id === activeDeal.id ? { ...d, status: 'completed' } : d));
    handleSendMessage(`✅ Transaction Marked as Completed! Please rate your experience.`, 'system');
    
    // Auto launch feedback modal for customer or owner
    onOpenFeedbackModal(activeDeal);
  };

  const handleCancelDeal = () => {
    setDeals(prev => prev.map(d => d.id === activeDeal.id ? { ...d, status: 'cancelled' } : d));
    handleSendMessage(`❌ Deal has been cancelled by ${currentUser.name}.`, 'system');
  };

  const handleReport = () => {
    alert(`Report case created for deal ${activeDeal.id}. NeedNear Trust team will review immediately.`);
    handleSendMessage(`🚩 Flagged for review by community safety moderation.`, 'system');
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 h-[82vh]">
      
      {/* Sidebar: Active Deals List */}
      <div className="md:col-span-4 bg-slate-900/90 rounded-3xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-xl">
        <div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Local Deals ({deals.length})
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Ramnad
            </span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[68vh] pr-1">
            {deals.map(deal => {
              const item = items.find(i => i.id === deal.itemId);
              const isActive = deal.id === activeDeal?.id;

              return (
                <div 
                  key={deal.id}
                  onClick={() => setActiveDealId(deal.id)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                    isActive 
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-white shadow-lg' 
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={item?.image} alt={deal.itemTitle} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{deal.itemTitle}</h4>
                      <p className="text-[11px] text-emerald-400 font-semibold truncate">📍 {deal.panchayat}</p>
                      
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                        <span>Status: <strong className="text-emerald-300 capitalize">{deal.status}</strong></span>
                        <span className="font-bold text-white">₹{deal.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User context footer */}
        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>LoggedIn as: <strong className="text-emerald-300">{currentUser.name}</strong></span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">📍 {currentUser.panchayat}</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="md:col-span-8 bg-slate-900/90 rounded-3xl border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl relative">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={activeItem?.image} alt={activeDeal?.itemTitle} className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">{activeDeal?.itemTitle}</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{activeDeal?.panchayat}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Between {activeCustomer?.name} & {activeOwner?.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleReport}
              className="text-xs text-slate-400 hover:text-red-400 p-2 rounded-xl hover:bg-slate-800 flex items-center space-x-1"
              title="Report suspicious behavior"
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS BAR (Prompt Requirement #5) */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 font-medium text-[11px] flex-shrink-0">Quick Actions:</span>

          <button
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-xl whitespace-nowrap font-semibold flex items-center gap-1 transition-all"
          >
            <MapPin className="w-3 h-3 text-emerald-400" /> 📍 Share Pickup Location
          </button>

          <button
            onClick={() => setShowOfferPicker(!showOfferPicker)}
            className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-xl whitespace-nowrap font-semibold flex items-center gap-1 transition-all"
          >
            <DollarSign className="w-3 h-3 text-teal-400" /> 💰 Make an Offer
          </button>

          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-xl whitespace-nowrap font-semibold flex items-center gap-1 transition-all"
          >
            <Calendar className="w-3 h-3 text-cyan-400" /> 📅 Select Pickup Date
          </button>

          {activeDeal?.status === 'requested' && (
            <button
              onClick={handleConfirmDeal}
              className="bg-emerald-500 text-slate-950 font-extrabold px-3 py-1 rounded-xl whitespace-nowrap flex items-center gap-1 transition-all shadow-md shadow-emerald-500/20"
            >
              <Handshake className="w-3.5 h-3.5" /> 🤝 Confirm Deal
            </button>
          )}

          {activeDeal?.status !== 'completed' && activeDeal?.status !== 'rated' && (
            <button
              onClick={handleCompleteDeal}
              className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold px-3 py-1 rounded-xl whitespace-nowrap flex items-center gap-1 transition-all shadow-md"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> ✅ Mark Completed
            </button>
          )}

          {activeDeal?.status === 'completed' && (
            <button
              onClick={() => onOpenFeedbackModal(activeDeal)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-3 py-1 rounded-xl whitespace-nowrap flex items-center gap-1 transition-all shadow-md shadow-amber-500/20 animate-bounce"
            >
              <Star className="w-3.5 h-3.5 fill-slate-950" /> ⭐ Rate & Review
            </button>
          )}

          <button
            onClick={handleCancelDeal}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-2.5 py-1 rounded-xl whitespace-nowrap font-semibold flex items-center gap-1 transition-all"
          >
            <XCircle className="w-3 h-3 text-red-400" /> ❌ Cancel Deal
          </button>
        </div>

        {/* Expandable Location Picker Drawer */}
        {showLocationPicker && (
          <div className="p-3 bg-slate-800 border-b border-emerald-500/30 flex items-center space-x-2 text-xs">
            <span className="text-slate-300 font-medium">Pickup Spot in {activeDeal?.panchayat}:</span>
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="e.g. Perungulam East Street ground"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
            />
            <button onClick={handleSharePickupLocation} className="bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg">
              Confirm & Share
            </button>
          </div>
        )}

        {/* Expandable Offer Picker Drawer */}
        {showOfferPicker && (
          <div className="p-3 bg-slate-800 border-b border-teal-500/30 flex items-center space-x-2 text-xs">
            <span className="text-slate-300 font-medium">Daily Rent Offer (₹):</span>
            <input
              type="number"
              value={customOffer}
              onChange={(e) => setCustomOffer(e.target.value)}
              className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
            />
            <button onClick={handleMakeOffer} className="bg-teal-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg">
              Send Offer
            </button>
          </div>
        )}

        {/* Expandable Date Picker Drawer */}
        {showDatePicker && (
          <div className="p-3 bg-slate-800 border-b border-cyan-500/30 flex items-center space-x-2 text-xs">
            <span className="text-slate-300 font-medium">Select Handover Date:</span>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
            />
            <button onClick={handleSelectPickupDate} className="bg-cyan-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg">
              Share Date
            </button>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {dealMessages.map(msg => {
            const isMe = msg.senderId === currentUser.id;

            if (msg.type === 'deal_card') {
              return (
                <div key={msg.id} className="my-3 max-w-md mx-auto bg-slate-850 border-2 border-emerald-500/40 rounded-2xl p-4 shadow-xl text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-extrabold text-emerald-400 flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Structured Deal Card
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase text-[10px]">
                      {activeDeal?.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-200">
                    <div className="font-bold text-white text-sm">{activeDeal?.itemTitle}</div>
                    <div className="flex justify-between text-slate-300">
                      <span>Rent Rate: ₹{activeDeal?.itemPrice}/day</span>
                      <span>Duration: {activeDeal?.durationDays} Days</span>
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      📍 {activeDeal?.panchayat}
                    </div>
                    <div className="text-slate-300">
                      Pickup Spot: <span className="font-medium text-white">{activeDeal?.agreedPickupLocation || 'Agreed nearby Panchayat Office'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Total: <strong className="text-emerald-300 text-sm">₹{activeDeal?.totalAmount}</strong></span>
                    
                    {activeDeal?.status !== 'completed' ? (
                      <button
                        onClick={handleCompleteDeal}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-xl shadow-md"
                      >
                        Complete Deal
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenFeedbackModal(activeDeal)}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3 py-1.5 rounded-xl shadow-md"
                      >
                        Rate & Review
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mb-1">
                  <span>{msg.senderName}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div 
                  className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none shadow-md' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder={`Message ${currentUser.id === activeDeal?.customerId ? activeOwner?.name : activeCustomer?.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
