import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { RAMANATHAPURAM_DISTRICT_DATA, ALL_RAMNAD_PLACES } from '../data/initialData';

export default function AuthModal({ onClose, onLoginSuccess, allUsers }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'personas'
  const [email, setEmail] = useState('karthik@neednear.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [panchayat, setPanchayat] = useState('Perungulam Panchayat');
  const [role, setRole] = useState('Customer/Buyer');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const matchedUser = allUsers.find(u => u.email?.toLowerCase() === email.trim().toLowerCase()) || allUsers[0];
    setSuccessMessage(`Login Successful as ${matchedUser.name}! Welcome back to NeedNear Ramnad.`);
    setTimeout(() => {
      onLoginSuccess(matchedUser);
      onClose();
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    const googleUser = allUsers.find(u => u.email === "karthik@neednear.in") || {
      id: `g-${Date.now()}`,
      name: "Karthik V (Google)",
      email: "karthik.v@gmail.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      role: "Customer/Buyer",
      district: "Ramanathapuram",
      taluk: "Ramanathapuram",
      panchayat: "Perungulam Panchayat",
      locality: "Perungulam Main Road",
      isVerified: true,
      isTrustedMember: true,
      overallRating: 5.0,
      reviewCount: 1,
      successfulDeals: 1,
      phone: "+91 97890 *****",
      bio: "Google Authenticated NeedNear Resident.",
      joinedDate: "Just now"
    };

    setSuccessMessage('Authenticating via Google Account...');
    setTimeout(() => {
      onLoginSuccess(googleUser);
      onClose();
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const newUser = {
      id: `u-${Date.now()}`,
      name: name,
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      role: role,
      district: "Ramanathapuram",
      taluk: "Ramanathapuram",
      panchayat: panchayat,
      locality: `${panchayat} Main Road`,
      isVerified: true,
      isTrustedMember: true,
      overallRating: 5.0,
      reviewCount: 1,
      successfulDeals: 0,
      phone: "+91 98421 *****",
      bio: `Verified ${role} resident in ${panchayat}, Ramanathapuram.`,
      joinedDate: "Just now"
    };

    setSuccessMessage(`Account created for ${name} (${email}) in ${panchayat}!`);
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl my-auto text-white space-y-5 relative overflow-hidden">
        
        {/* Glow bg */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <span className="font-extrabold text-lg text-white">NeedNear Ramnad Auth</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-bold">
          <button
            onClick={() => setAuthMode('login')}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'login' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'register' ? 'bg-teal-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setAuthMode('personas')}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'personas' ? 'bg-cyan-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Demo Roles
          </button>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 🔴 CONTINUE WITH GOOGLE BUTTON */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2.5 border border-slate-200 active:scale-[0.98]"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-800"></div>
            <span className="bg-slate-900 px-2 text-[9px] uppercase tracking-widest font-extrabold text-slate-400 absolute">
              or email sign in
            </span>
          </div>
        </div>

        {/* TAB 1: LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Email Address (மின்னஞ்சல் முகவரி):
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="karthik@neednear.in"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center justify-center space-x-2"
            >
              <span>Login to NeedNear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 2: REGISTER FORM WITH PANCHAYAT SELECTION */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Full Name:</label>
              <input
                type="text"
                placeholder="e.g. Arumugam P."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Role:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Customer/Buyer">Customer / Buyer</option>
                  <option value="Seller/Owner">Seller / Owner</option>
                  <option value="Both">Both (Owner & Buyer)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Phone Number:</label>
                <input
                  type="text"
                  placeholder="+91 98421 *****"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Select Panchayat / Village (RMD):
              </label>
              <select
                value={panchayat}
                onChange={(e) => setPanchayat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-300 font-semibold focus:outline-none focus:border-emerald-500"
              >
                {ALL_RAMNAD_PLACES.map(p => (
                  <option key={p.panchayat} value={p.panchayat}>📍 {p.panchayat} ({p.taluk})</option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center space-x-2 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Includes <strong>✅ Verified Profile</strong> & <strong>🟢 Trusted Member</strong> community badges upon signup!</span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center justify-center space-x-2"
            >
              <span>Create Verified Account</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 3: DEMO PERSONAS QUICK SELECT */}
        {authMode === 'personas' && (
          <div className="space-y-2 text-xs">
            <p className="text-slate-400 font-medium text-[11px]">Click any verified Ramnad resident to instantly test their account:</p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {allUsers.map(u => (
                <div
                  key={u.id}
                  onClick={() => {
                    onLoginSuccess(u);
                    onClose();
                  }}
                  className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40" />
                    <div>
                      <div className="flex items-center space-x-1 font-bold text-white group-hover:text-emerald-300">
                        <span>{u.name}</span>
                        {u.isVerified && <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400">📍 {u.panchayat} • {u.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded-md border border-emerald-500/30">
                    Login →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
