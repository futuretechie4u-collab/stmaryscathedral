import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import memberRoutes from "./routes/memberRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import marriageRoutes from "./routes/marriageRoutes.js";
import baptismRoutes from "./routes/baptismRoutes.js";
import deathRoutes from "./routes/deathRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -------------------
// MongoDB Connection
// -------------------
mongoose
  .connect(process.env.MONGO_URI, { dbName: "churchDB" })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------
// API Routes
// -------------------
// Always use relative paths starting with "/"
app.use("/api/members", memberRoutes);
app.use("/api/families", familyRoutes);
app.use("/api/marriages", marriageRoutes);
app.use("/api/baptisms", baptismRoutes);
app.use("/api/deaths", deathRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Test endpoints
app.get("/", (req, res) => res.send("✅ ChurchDB API is running"));

app.get("/api/test-db", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const counts = {};
    for (const col of collections) {
      counts[col.name] = await db.collection(col.name).countDocuments();
    }
    res.json({
      connected: mongoose.connection.readyState === 1,
      databaseName: db.databaseName,
      collections: collections.map((c) => c.name),
      documentCounts: counts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------
// Serve React Frontend
// -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reactBuildPath = path.join(__dirname, "../tnp-proj/build");

// Serve React static files
app.use(express.static(reactBuildPath));

// Fallback for any frontend route
app.get("*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

// -------------------
// Start Server
// -------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
