# 🌟 NeedNear Ramanathapuram (Ramnad) — Hyperlocal Community Trust & Item Sharing Platform

![NeedNear Banner](https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200)

**NeedNear** is a state-of-the-art, premium hyperlocal community trust platform engineered specifically for **Ramanathapuram (Ramnad) District, Tamil Nadu**. It connects local residents across all **429 Village Panchayats** and **400 Revenue Villages** to buy, rent, borrow, or request items and services with 100% verified community trust, privacy safeguards, and 6-criteria deal ratings.

---

## 🛠️ Technology Stack & Architecture

This application is built with a modern, high-performance web development stack:

### 🎨 Frontend
* **Core Language**: HTML5 & JavaScript (ES6+ Modules)
* **UI Framework**: **React 19** & **Vite 5** (Ultra-fast HMR and bundle compilation)
* **Styling & Design System**: **Vanilla CSS** + **Tailwind CSS v3** (Glassmorphic dark mode, vibrant gradients, micro-animations)
* **Iconography & FX**: **Lucide React Icons** & **Canvas Confetti**

### ⚙️ Backend API
* **Runtime**: **Node.js** (v18+)
* **Server Framework**: **Express.js v5**
* **Cross-Origin & Config**: `cors`, `dotenv`, `node:dns` (IPv4 first resolution)

### 🗄️ Database & Cloud Persistence
* **Database**: **MongoDB Atlas Cluster0** (Database: `neednear_db`)
* **ODM / Driver**: Native `mongodb` Node driver (v7.6)
* **Seed Engine**: Auto-seeds initial Ramnad community listings, panchayats, deals, and reviews upon first initialization.

---

## 🏛️ Ramanathapuram Official Administrative Location System

NeedNear implements the **Official Ramanathapuram District Administrative Structure** directly from official government datasets (`ramanathapuram.nic.in`), ensuring that Revenue Administration, Development Administration, and Urban Local Bodies are never mixed:

### 1. 📜 Revenue Administration (வருவாய் நிர்வாகம்)
* **Structure**: 2 Revenue Divisions, 9 Revenue Taluks, 38 Firkas & **400 Revenue Villages**
* **Divisions & Taluks**:
  * **Ramanathapuram Division**: Ramanathapuram, Rameswaram, Thiruvadanai, Kilakarai, Rajasingamangalam.
  * **Paramakudi Division**: Paramakudi, Kadaladi, Kamuthi, Mudukulathur.
* **Perungulam Context**: Officially identified as **Perungulam Revenue Village** in **Perunkulam Firka**, Ramanathapuram Taluk (`villagePanchayat: null`). Rendered as **`Perungulam Community`** without inventing fake Panchayat names.

### 2. 🌾 Development Administration (வளர்ச்சி நிர்வாகம்)
* **Structure**: 11 Development Union Blocks / Panchayat Unions & **429 Village Panchayats**
* **Blocks**: Mandapam, Ramanathapuram, Raja Singa Mangalam, Thiruppullani, Thiruvadanai, Bogalur, Kadaladi, Kamuthi, Mudukulathur, Nainarkoil, Paramakudi.

### 3. 🏙️ Urban Local Bodies (நகர்ப்புற உள்ளாட்சி அமைப்புகள்)
* **Municipalities (4)**: Ramanathapuram, Rameswaram, Kilakarai, Paramakudi.
* **Town Panchayats (7)**: Mandapam, Sayalkudi, Kamuthi, Abiramam, Mudukulathur, Rajasingamangalam, Tondi.

---

## 🔑 Core Features & Product Capabilities

### 🔒 1. Mandatory Authentication Gate (`LoginGateScreen`)
* Restricted access ensuring that only authenticated local residents can access community listings, chat, and hub data.
* Multi-mode login: Email ID + Password, Continue with Google, Instant Registration with official Ramnad location dropdown, or 1-Click Quick Demo Personas.

### 📊 2. 6-Star Multi-Criteria Deal Rating Engine
Every completed transaction triggers a 6-criteria verification review:
1. **Item Quality** (பொருளின் தரம்)
2. **Description Accuracy** (விளக்க துல்லியம்)
3. **Owner Behaviour & Hospitality** (உரிமையாளரின் நடத்தை)
4. **Response Time** (பதில் அளிக்கும் வேகம்)
5. **On-Time Handover** (நேரத்திற்கு ஒப்படைப்பு)
6. **Overall Satisfaction Score** (ஒட்டுமொத்த திருப்தி)

### 🛡️ 3. Post-Deal Satisfaction Check & Auto Support Ticket
* Post-deal prompt ranging from `😊 Very Satisfied` to `☹️ Not Satisfied`.
* Selecting dissatisfied status automatically creates an official NeedNear Support Ticket (`TICKET-#9402`) for community moderation.

### 📍 4. Privacy-First Location Safeguards
* **Public View**: Shows approximate location only (e.g. `📍 Perungulam • Perunkulam Firka • 2.4 km away`).
* **Private View**: Exact pickup address and landmark are revealed strictly inside chat after deal confirmation.

### 💬 5. Contextual Chat & Dynamic Deal State Machine
* Real-time local chat with quick action toolbar (`Share Pickup Location`, `Make Offer`, `Select Date`, `Confirm Deal`, `Mark Completed`, `Report`).
* Interactive inline deal summary card (`requested` ➔ `agreed` ➔ `completed` ➔ `rated`).

### 🏙️ 6. Panchayat Community Hub & Admin Moderation Console
* Community stats, active items per panchayat, verified resident badges, and duplicate review detection.

---

## 🚀 Getting Started & Installation Guide

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)
* **MongoDB Atlas Connection URI**

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/deepika84284-ship-it/nearbyxz.git
cd nearly
npm install
```

### 2. Environment Setup (`.env`)
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://ammuzz:ammuzz33@cluster0.qjtkz6v.mongodb.net/neednear_db?appName=Cluster0&retryWrites=true&w=majority
```

### 3. Run Development Servers

**Run Vite Frontend (Port 5173)**:
```bash
npm run dev
```

**Run Express + MongoDB Backend Server (Port 5000)**:
```bash
npm run server
# or: node server/index.js
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 📁 Project Directory Structure

```
nearly/
├── server/
│   └── index.js              # Express.js backend API + MongoDB Atlas connection
├── src/
│   ├── components/
│   │   ├── AdminModerationPanel.jsx  # Audit panel & abuse detection
│   │   ├── AuthModal.jsx             # Account switching & auth modal
│   │   ├── ChatSystem.jsx            # Contextual local chat & deal state machine
│   │   ├── Footer.jsx                # Ramnad district sitemap footer
│   │   ├── HeaderNavbar.jsx          # Top bar with dual administrative dataset selector
│   │   ├── ItemDetailModal.jsx       # Item breakdown & 6-criteria rating modal
│   │   ├── ItemListings.jsx          # Main hero search, mode pills & item cards
│   │   ├── LoginGateScreen.jsx       # Mandatory login screen
│   │   ├── MobileBottomNav.jsx       # Sticky mobile bottom navigation
│   │   ├── NeedCard.jsx              # Distinct NEED request card
│   │   ├── PanchayatCommunityHub.jsx # Ramnad community directory & statistics
│   │   ├── PostDealFeedbackModal.jsx # 6-criteria review & support ticket modal
│   │   ├── PostNeedWizard.jsx        # 5-step multi-step need posting wizard
│   │   ├── SellerTrustCard.jsx       # Owner trust profile & badge breakdown
│   │   ├── SkeletonLoader.jsx        # Loading placeholders
│   │   └── TrustStatsBar.jsx         # Live Ramnad trust ledger ticker
│   ├── data/
│   │   ├── initialData.js            # Seed data for users, deals & reviews
│   │   └── locationDatabase.js       # 429 Panchayats & 400 Revenue Villages database
│   ├── App.jsx                       # Main application state & routing controller
│   ├── index.css                     # Tailwind CSS & global styles
│   └── main.jsx                      # Vite entrypoint
├── .env.example                      # Environment variables template
├── package.json                      # Project dependencies & scripts
├── tailwind.config.js                # Tailwind styling rules
└── vite.config.js                    # Vite bundler configuration
```

---

## 📜 License & Community Trust
Developed for **Ramanathapuram District Local Community** • Built with ❤️ for trust, accessibility, and transparency.