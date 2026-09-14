import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  MapPin, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  Users,
  Award
} from 'lucide-react';
import { ALL_RAMNAD_MASTER_LOCATIONS } from '../data/locationDatabase';

export default function LoginGateScreen({ allUsers, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'personas'
  const [email, setEmail] = useState('karthik@neednear.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [panchayat, setPanchayat] = useState('Perungulam');
  const [role, setRole] = useState('Customer/Buyer');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const matchedUser = allUsers.find(u => u.email?.toLowerCase() === email.trim().toLowerCase()) || allUsers[0];
    setSuccessMessage(`Login Successful as ${matchedUser.name}! Entering NeedNear Ramnad...`);
    setTimeout(() => {
      onLoginSuccess(matchedUser);
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
      taluk: "Ramanathapuram Taluk",
      firka: "Perunkulam Firka",
      revenueVillage: "Perungulam Revenue Village",
      villagePanchayat: null,
      locality: "Perungulam",
      adminType: "Locality / Revenue Village",
      communityName: "Perungulam Community",
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

    setSuccessMessage(`Account created for ${name} (${email}) in ${panchayat}! Entering NeedNear...`);
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center p-4 relative overflow-hidden font-sans antialiased">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Top Header branding */}
      <header className="w-full max-w-6xl flex items-center justify-between py-6 px-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-xl shadow-emerald-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                NeedNear
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                Ramnad District
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Hyperlocal Trust & Community Marketplace</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official 429 Village Panchayats & 400 Revenue Villages Source of Truth</span>
        </div>
      </header>

      {/* Central Login Gate Card */}
      <main className="w-full max-w-md z-10 my-auto">
        <div className="bg-slate-900/90 border border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 space-y-6 relative">
          
          {/* Top mandatory notification alert */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center space-x-3 text-emerald-300">
            <Lock className="w-5 h-5 flex-shrink-0 animate-pulse text-emerald-400" />
            <div className="text-xs">
              <p className="font-bold">Authentication Required</p>
              <p className="text-slate-400 text-[11px]">Please log in or register first to enter NeedNear Ramnad.</p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'login' 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'register' 
                  ? 'bg-teal-400 text-slate-950 shadow-lg shadow-teal-400/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setAuthMode('personas')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'personas' 
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quick Demo
            </button>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-3 text-center text-xs font-bold text-emerald-300 animate-bounce flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 🔴 CONTINUE WITH GOOGLE BUTTON */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs py-3 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-3 border border-slate-200 group active:scale-[0.98]"
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
              <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-widest font-extrabold text-slate-400 absolute">
                or sign in with email
              </span>
            </div>
          </div>

          {/* MODE 1: EMAIL LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Registered Email Address (மின்னஞ்சல்)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                    placeholder="e.g. karthik@neednear.in"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Password (கடவுச்சொல்)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm py-3 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <span>Login & Enter App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* MODE 2: NEW USER REGISTRATION FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Anbarasan M"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@neednear.in"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-teal-300 focus:outline-none focus:border-teal-400 font-bold"
                  >
                    <option value="Customer/Buyer">Customer / Buyer</option>
                    <option value="Item Owner / Seller">Item Owner / Seller</option>
                    <option value="Local Service Provider">Service Provider</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Select Official Ramanathapuram Locality / Village</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                  <select
                    value={panchayat}
                    onChange={(e) => setPanchayat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-emerald-300 focus:outline-none focus:border-teal-400 font-bold"
                  >
                    {ALL_RAMNAD_MASTER_LOCATIONS.map(p => (
                      <option key={p.displayName} value={p.displayName}>
                        📍 {p.displayName} ({p.firka ? `${p.firka}, ` : ''}{p.taluk} - {p.adminType})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-extrabold text-sm py-3 rounded-2xl shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <span>Register & Enter App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* MODE 3: QUICK DEMO PERSONAS */}
          {authMode === 'personas' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 font-medium">Select a verified test profile to login instantly:</p>
              
              <div className="space-y-2">
                {allUsers.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => {
                      setEmail(u.email || `${u.name.toLowerCase().replace(/\s+/g, '')}@neednear.in`);
                      setSuccessMessage(`Logged in as ${u.name}!`);
                      setTimeout(() => onLoginSuccess(u), 600);
                    }}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/60 rounded-2xl transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30" />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">{u.name}</span>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          <span className="text-emerald-400 font-semibold">{u.email || `${u.name.toLowerCase().replace(/\s+/g, '')}@neednear.in`}</span> • <span className="text-slate-300">{u.panchayat}</span>
                        </p>
                      </div>
                    </div>
                    <button className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                      Select ➔
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Guarantee Footer */}
          <div className="pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-400 flex items-center justify-center space-x-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Privacy Guaranteed • Exact pickup location shared only after deal confirmation</span>
          </div>

        </div>
      </main>

      {/* Bottom Footer Credits */}
      <footer className="w-full max-w-6xl py-4 text-center text-xs text-slate-400 z-10 border-t border-slate-900">
        <p>© 2026 NeedNear Ramanathapuram Development & Revenue Administration Network</p>
      </footer>

    </div>
  );
}
