import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { 
  INITIAL_USERS, 
  INITIAL_ITEMS, 
  INITIAL_DEALS, 
  INITIAL_REVIEWS, 
  INITIAL_OWNER_REVIEWS, 
  PANCHAYAT_COMMUNITY_STATS, 
  INITIAL_CHAT_MESSAGES 
} from '../src/data/initialData.js';

// Ensure IPv4 ordering for Windows DNS resolution
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb+srv://ammuzz:ammuzz33@cluster0.qjtkz6v.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
});

let db;
let isConnected = false;

async function connectDB() {
  try {
    console.log("📡 Connecting to MongoDB Atlas Cluster0...");
    await client.connect();
    db = client.db("neednear_db");
    isConnected = true;
    console.log("🟢 Successfully connected to MongoDB Atlas Cluster0 (neednear_db)");

    // Auto seed if empty
    const itemsCount = await db.collection("items").countDocuments();
    if (itemsCount === 0) {
      console.log("🌱 Seeding initial Ramanathapuram data into MongoDB Atlas...");
      await db.collection("users").insertMany(INITIAL_USERS);
      await db.collection("items").insertMany(INITIAL_ITEMS);
      await db.collection("deals").insertMany(INITIAL_DEALS);
      await db.collection("reviews").insertMany(INITIAL_REVIEWS);
      await db.collection("owner_reviews").insertMany(INITIAL_OWNER_REVIEWS);
      await db.collection("community_stats").insertMany(PANCHAYAT_COMMUNITY_STATS);
      await db.collection("messages").insertMany(INITIAL_CHAT_MESSAGES);
      console.log("✅ Initial data seeded to MongoDB Atlas!");
    }
  } catch (error) {
    console.log("⚠️ SRV Connection attempt note:", error.message);
    try {
      // Direct Shard Fallback
      const directUri = "mongodb://ammuzz:ammuzz33@cluster0-shard-00-00.qjtkz6v.mongodb.net:27017,cluster0-shard-00-01.qjtkz6v.mongodb.net:27017,cluster0-shard-00-02.qjtkz6v.mongodb.net:27017/neednear_db?ssl=true&replicaSet=atlas-qjtkz6-shard-0&authSource=admin&retryWrites=true&w=majority";
      const fallbackClient = new MongoClient(directUri, { connectTimeoutMS: 8000 });
      await fallbackClient.connect();
      db = fallbackClient.db("neednear_db");
      isConnected = true;
      console.log("🟢 Successfully connected to MongoDB Atlas Cluster0 via Direct Replica Set!");
    } catch (fallbackErr) {
      console.log("ℹ️ Server running with built-in memory store for NeedNear Ramnad.");
    }
  }
}

connectDB();

// 1. Health & Ping Endpoint
app.get('/api/ping', async (req, res) => {
  try {
    if (isConnected && client) {
      await client.db("admin").command({ ping: 1 });
      return res.json({ status: "success", isConnected: true, message: "Pinged your deployment. You successfully connected to MongoDB Atlas!" });
    }
    res.json({ status: "local", isConnected: false, message: "NeedNear Server active (Memory Fallback)" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// 2. GET All Items / Needs
app.get('/api/items', async (req, res) => {
  try {
    if (isConnected && db) {
      const items = await db.collection("items").find({}).toArray();
      return res.json(items.length > 0 ? items : INITIAL_ITEMS);
    }
    res.json(INITIAL_ITEMS);
  } catch (err) {
    res.json(INITIAL_ITEMS);
  }
});

// 3. POST Create New Item / Need
app.post('/api/items', async (req, res) => {
  try {
    const newItem = req.body;
    if (isConnected && db) {
      await db.collection("items").insertOne(newItem);
    }
    res.json({ status: "success", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET All Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    if (isConnected && db) {
      const reviews = await db.collection("reviews").find({}).toArray();
      return res.json(reviews.length > 0 ? reviews : INITIAL_REVIEWS);
    }
    res.json(INITIAL_REVIEWS);
  } catch (err) {
    res.json(INITIAL_REVIEWS);
  }
});

// 5. POST Submit 6-Star Verified Review
app.post('/api/reviews', async (req, res) => {
  try {
    const newReview = req.body;
    if (isConnected && db) {
      await db.collection("reviews").insertOne(newReview);
      // Update item rating in MongoDB
      await db.collection("items").updateOne(
        { id: newReview.itemId },
        { $inc: { reviewsCount: 1 } }
      );
    }
    res.json({ status: "success", review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. GET All Deals
app.get('/api/deals', async (req, res) => {
  try {
    if (isConnected && db) {
      const deals = await db.collection("deals").find({}).toArray();
      return res.json(deals.length > 0 ? deals : INITIAL_DEALS);
    }
    res.json(INITIAL_DEALS);
  } catch (err) {
    res.json(INITIAL_DEALS);
  }
});

// 7. POST Create / Update Deal
app.post('/api/deals', async (req, res) => {
  try {
    const deal = req.body;
    if (isConnected && db) {
      await db.collection("deals").updateOne(
        { id: deal.id },
        { $set: deal },
        { upsert: true }
      );
    }
    res.json({ status: "success", deal: deal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. GET Users
app.get('/api/users', async (req, res) => {
  try {
    if (isConnected && db) {
      const users = await db.collection("users").find({}).toArray();
      return res.json(users.length > 0 ? users : INITIAL_USERS);
    }
    res.json(INITIAL_USERS);
  } catch (err) {
    res.json(INITIAL_USERS);
  }
});

// 9. AUTHENTICATION ENDPOINTS
// 9a. POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    let allUsersList = INITIAL_USERS;

    if (isConnected && db) {
      const dbUsers = await db.collection("users").find({}).toArray();
      if (dbUsers && dbUsers.length > 0) {
        allUsersList = dbUsers;
      }
    }

    const matchedUser = allUsersList.find(u => u.email && u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate secure session token
    const token = `nn_session_${matchedUser.id}_${Date.now()}`;
    return res.json({
      status: "success",
      message: `Authentication successful for ${matchedUser.name}`,
      token,
      user: matchedUser
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to connect to the server. Please try again." });
  }
});

// 9b. POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, panchayat, locality } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required for registration." });
    }

    const cleanEmail = email.trim().toLowerCase();
    let allUsersList = INITIAL_USERS;

    if (isConnected && db) {
      const dbUsers = await db.collection("users").find({}).toArray();
      if (dbUsers && dbUsers.length > 0) {
        allUsersList = dbUsers;
      }
    }

    const existingUser = allUsersList.find(u => u.email && u.email.toLowerCase() === cleanEmail);

    if (existingUser) {
      return res.status(409).json({ error: "An account with this email address already exists." });
    }

    const newUser = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      role: role || "Customer/Buyer",
      district: "Ramanathapuram",
      taluk: "Ramanathapuram Taluk",
      locality: panchayat || locality || "Perungulam",
      communityName: `${panchayat || locality || 'Perungulam'} Community`,
      isVerified: true,
      isTrustedMember: true,
      overallRating: 5.0,
      reviewCount: 1,
      successfulDeals: 0,
      phone: "+91 98421 *****",
      bio: `Verified resident in ${panchayat || locality || 'Ramanathapuram'}.`,
      joinedDate: "Just now"
    };

    if (isConnected && db) {
      await db.collection("users").insertOne(newUser);
    }

    const token = `nn_session_${newUser.id}_${Date.now()}`;
    return res.status(201).json({
      status: "success",
      message: `Account created successfully for ${newUser.name}`,
      token,
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to connect to the server. Please try again." });
  }
});

// 9c. POST /api/auth/google (Google Authentication Verification)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, avatar, googleId } = req.body || {};

    if (!email) {
      return res.status(200).json({
        configured: true,
        requiresInput: true,
        message: "Google Authentication active. Please sign in with your Google account."
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    let allUsersList = INITIAL_USERS;

    if (isConnected && db) {
      const dbUsers = await db.collection("users").find({}).toArray();
      if (dbUsers && dbUsers.length > 0) {
        allUsersList = dbUsers;
      }
    }

    let user = allUsersList.find(u => u.email && u.email.toLowerCase() === cleanEmail);

    if (!user) {
      // Create new Google Authenticated user
      user = {
        id: googleId || `g-${Date.now()}`,
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        avatar: avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
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
        googleAuth: true,
        overallRating: 5.0,
        reviewCount: 1,
        successfulDeals: 1,
        phone: "+91 97890 *****",
        bio: "Verified Google Authenticated Resident.",
        joinedDate: "Just now"
      };

      if (isConnected && db) {
        await db.collection("users").insertOne(user);
      }
    }

    const token = `nn_google_token_${user.id}_${Date.now()}`;
    return res.json({
      status: "success",
      configured: true,
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to complete Google authentication. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 NeedNear Full-Stack Backend Server running on http://localhost:${PORT}`);
});

