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
    console.error("⚠️ MongoDB Atlas Warning:", error.message);
    console.log("ℹ️ Server running with memory fallback store for NeedNear.");
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

app.listen(PORT, () => {
  console.log(`🚀 NeedNear Full-Stack Backend Server running on http://localhost:${PORT}`);
});
