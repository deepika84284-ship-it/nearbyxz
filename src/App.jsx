import React, { useState, useEffect } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import ItemListings from './components/ItemListings';
import ItemDetailModal from './components/ItemDetailModal';
import ChatSystem from './components/ChatSystem';
import SellerTrustCard from './components/SellerTrustCard';
import PostDealFeedbackModal from './components/PostDealFeedbackModal';
import PanchayatCommunityHub from './components/PanchayatCommunityHub';
import AdminModerationPanel from './components/AdminModerationPanel';
import PostNeedWizard from './components/PostNeedWizard';
import LoginGateScreen from './components/LoginGateScreen';
import { 
  RAMANATHAPURAM_DISTRICT_DATA,
  INITIAL_USERS,
  INITIAL_ITEMS,
  INITIAL_DEALS,
  INITIAL_REVIEWS,
  INITIAL_OWNER_REVIEWS,
  PANCHAYAT_COMMUNITY_STATS,
  INITIAL_CHAT_MESSAGES
} from './data/initialData';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  // Main state
  const [selectedPanchayat, setSelectedPanchayat] = useState('All');
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'community' | 'chat' | 'admin'
  
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(null); // Mandatory login required on launch
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [ownerReviews, setOwnerReviews] = useState(INITIAL_OWNER_REVIEWS);
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [communityStats, setCommunityStats] = useState(PANCHAYAT_COMMUNITY_STATS);

  // Modals & Overlays
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOwnerProfile, setSelectedOwnerProfile] = useState(null);
  const [feedbackModalDeal, setFeedbackModalDeal] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeDealId, setActiveDealId] = useState(INITIAL_DEALS[0].id);

  // Fetch initial data from Express + MongoDB backend
  useEffect(() => {
    fetch(`${API_BASE}/items`)
      ? fetch(`${API_BASE}/items`)
          .then(res => res.json())
          .then(data => { if (Array.isArray(data) && data.length > 0) setItems(data); })
          .catch(err => console.log('Using local dataset for items'))
      : null;

    fetch(`${API_BASE}/reviews`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setReviews(data); })
      .catch(err => console.log('Using local dataset for reviews'));

    fetch(`${API_BASE}/deals`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setDeals(data); })
      .catch(err => console.log('Using local dataset for deals'));
  }, []);

  const handleCreateNewItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);

    // Sync with MongoDB backend
    fetch(`${API_BASE}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).catch(err => console.log('Backend sync offline, item saved locally'));

    setCommunityStats(prev => prev.map(s => {
      if (s.panchayat === newItem.panchayat) {
        return { ...s, activeListings: s.activeListings + 1 };
      }
      return s;
    }));
  };

  // Trigger Chat from item listing
  const handleStartChatWithItem = (item) => {
    // Check if deal already exists for this item and current user
    let existingDeal = deals.find(d => d.itemId === item.id && d.customerId === currentUser.id);

    if (!existingDeal) {
      const newDeal = {
        id: `deal-${Date.now()}`,
        itemId: item.id,
        itemTitle: item.title,
        itemPrice: item.price,
        durationDays: 2,
        totalAmount: item.price * 2,
        customerId: currentUser.id,
        customerName: currentUser.name,
        ownerId: item.ownerId,
        ownerName: users.find(u => u.id === item.ownerId)?.name || 'Owner',
        panchayat: item.panchayat,
        agreedPickupLocation: `${item.panchayat} Main Ground`,
        pickupDate: '2026-09-15',
        status: 'requested',
        createdAt: 'Just now',
        customerFeedbackSubmitted: false,
        ownerFeedbackSubmitted: false
      };

      setDeals(prev => [newDeal, ...prev]);
      existingDeal = newDeal;

      // Add system message
      const sysMsg = {
        id: `msg-${Date.now()}`,
        dealId: newDeal.id,
        senderId: 'system',
        senderName: 'NeedNear System',
        text: `Deal request initiated by ${currentUser.name} for ${item.title} in ${item.panchayat}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'deal_card'
      };

      setMessages(prev => [...prev, sysMsg]);
    }

    setActiveDealId(existingDeal.id);
    setSelectedItem(null);
    setActiveTab('chat');
  };

  // Submit Customer Review
  const handleSubmitCustomerFeedback = (newReview) => {
    setReviews(prev => [newReview, ...prev]);

    // Sync with MongoDB backend API
    fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    }).catch(err => console.log('Review saved locally'));

    // Mark deal customer feedback submitted
    setDeals(prev => prev.map(d => d.id === newReview.dealId ? { ...d, customerFeedbackSubmitted: true, status: 'rated' } : d));

    // Update Owner score & review count
    setUsers(prev => prev.map(u => {
      if (u.id === newReview.ownerId) {
        const newCount = u.reviewCount + 1;
        const newScore = Number(((u.overallRating * u.reviewCount + newReview.averageScore) / newCount).toFixed(1));
        return {
          ...u,
          reviewCount: newCount,
          overallRating: newScore,
          successfulDeals: u.successfulDeals + 1
        };
      }
      return u;
    }));

    // Update item rating
    setItems(prev => prev.map(i => {
      if (i.id === newReview.itemId) {
        const newCount = i.reviewsCount + 1;
        const newRating = Number(((i.rating * i.reviewsCount + newReview.averageScore) / newCount).toFixed(1));
        return {
          ...i,
          reviewsCount: newCount,
          rating: newRating
        };
      }
      return i;
    }));
  };

  // Submit Two-Way Owner Review of Customer
  const handleSubmitOwnerFeedback = (newOwnerReview) => {
    setOwnerReviews(prev => [newOwnerReview, ...prev]);
    setDeals(prev => prev.map(d => d.id === newOwnerReview.dealId ? { ...d, ownerFeedbackSubmitted: true } : d));
  };

  // Mandatory Login Gate Check: If not logged in, user MUST sign in first!
  if (!currentUser) {
    return (
      <LoginGateScreen 
        allUsers={users}
        onLoginSuccess={(loggedInUser) => {
          setCurrentUser(loggedInUser);
          if (!users.some(u => u.id === loggedInUser.id)) {
            setUsers(prev => [loggedInUser, ...prev]);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <HeaderNavbar
        selectedPanchayat={selectedPanchayat}
        setSelectedPanchayat={setSelectedPanchayat}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        allUsers={users}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Live Ramnad Trust Ledger Ticker */}
      <TrustStatsBar selectedPanchayat={selectedPanchayat} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: ITEM LISTINGS */}
        {activeTab === 'listings' && (
          <ItemListings
            items={items}
            users={users}
            selectedPanchayat={selectedPanchayat}
            onSelectItem={(item) => setSelectedItem(item)}
            onStartChat={handleStartChatWithItem}
            onOpenOwnerProfile={(owner) => setSelectedOwnerProfile(owner)}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
        )}

        {/* VIEW 2: PANCHAYAT COMMUNITY HUB */}
        {activeTab === 'community' && (
          <PanchayatCommunityHub
            selectedPanchayat={selectedPanchayat === 'All' ? 'Perungulam Panchayat' : selectedPanchayat}
            setSelectedPanchayat={setSelectedPanchayat}
            communityStats={communityStats}
            users={users}
            items={items}
            reviews={reviews}
            onOpenOwnerProfile={(owner) => setSelectedOwnerProfile(owner)}
            onSelectItem={(item) => setSelectedItem(item)}
          />
        )}

        {/* VIEW 3: CHAT & LOCAL DEALS */}
        {activeTab === 'chat' && (
          <ChatSystem
            currentUser={currentUser}
            deals={deals}
            setDeals={setDeals}
            messages={messages}
            setMessages={setMessages}
            items={items}
            users={users}
            activeDealId={activeDealId}
            setActiveDealId={setActiveDealId}
            onOpenFeedbackModal={(deal) => setFeedbackModalDeal(deal)}
          />
        )}

        {/* VIEW 4: ADMIN MODERATION PANEL */}
        {activeTab === 'admin' && (
          <AdminModerationPanel
            reviews={reviews}
            setReviews={setReviews}
            deals={deals}
            users={users}
            panchayatStats={communityStats}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onSelectPanchayat={(p) => setSelectedPanchayat(p)} />

      {/* MODAL 1: ITEM DETAIL & FEEDBACK BREAKDOWN */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          owner={users.find(u => u.id === selectedItem.ownerId)}
          itemReviews={reviews.filter(r => r.itemId === selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          onStartChat={handleStartChatWithItem}
          onOpenOwnerProfile={(owner) => {
            setSelectedItem(null);
            setSelectedOwnerProfile(owner);
          }}
        />
      )}

      {/* MODAL 2: SELLER / OWNER TRUST PROFILE MODAL */}
      {selectedOwnerProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <SellerTrustCard
            owner={selectedOwnerProfile}
            reviews={reviews.filter(r => r.ownerId === selectedOwnerProfile.id)}
            ownerReviews={ownerReviews.filter(r => r.ownerId === selectedOwnerProfile.id)}
            isModal={true}
            onClose={() => setSelectedOwnerProfile(null)}
            onContactClick={() => {
              const ownerItem = items.find(i => i.ownerId === selectedOwnerProfile.id);
              if (ownerItem) handleStartChatWithItem(ownerItem);
              setSelectedOwnerProfile(null);
            }}
          />
        </div>
      )}

      {/* MODAL 3: POST-DEAL CUSTOMER EXPERIENCE & SATISFACTION MODAL */}
      {feedbackModalDeal && (
        <PostDealFeedbackModal
          deal={feedbackModalDeal}
          item={items.find(i => i.id === feedbackModalDeal.itemId)}
          currentUser={currentUser}
          existingReviews={reviews}
          onClose={() => setFeedbackModalDeal(null)}
          onSubmitFeedback={handleSubmitCustomerFeedback}
          onSubmitOwnerFeedback={handleSubmitOwnerFeedback}
        />
      )}

      {/* MODAL 4: POST A NEED / LIST AN ITEM MULTI-STEP WIZARD */}
      {isPostModalOpen && (
        <PostNeedWizard
          currentUser={currentUser}
          onClose={() => setIsPostModalOpen(false)}
          onSubmitItem={handleCreateNewItem}
        />
      )}

      {/* MODAL 5: LOGIN / REGISTER / DEMO PERSONAS AUTH MODAL */}
      {isAuthModalOpen && (
        <AuthModal
          allUsers={users}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(loggedInUser) => {
            setCurrentUser(loggedInUser);
            if (!users.some(u => u.id === loggedInUser.id)) {
              setUsers(prev => [loggedInUser, ...prev]);
            }
          }}
        />
      )}

      {/* MOBILE-FIRST STICKY BOTTOM NAVIGATION BAR */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenPostModal={() => setIsPostModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

    </div>
  );
}
