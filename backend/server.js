import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "churchDB",
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test routes one by one
try {
  console.log("Loading memberRoutes...");
  const memberRoutes = await import("./routes/memberRoutes.js");
  app.use("/api/members", memberRoutes.default);
  console.log("✅ memberRoutes loaded");
} catch (err) {
  console.error("❌ Error loading memberRoutes:", err.message);
}

try {
  console.log("Loading familyRoutes...");
  const familyRoutes = await import("./routes/familyRoutes.js");
  app.use("/api/families", familyRoutes.default);
  console.log("✅ familyRoutes loaded");
} catch (err) {
  console.error("❌ Error loading familyRoutes:", err.message);
}

try {
  console.log("Loading marriageRoutes...");
  const marriageRoutes = await import("./routes/marriageRoutes.js");
  app.use("/api/marriages", marriageRoutes.default);
  console.log("✅ marriageRoutes loaded");
} catch (err) {
  console.error("❌ Error loading marriageRoutes:", err.message);
}

try {
  console.log("Loading baptismRoutes...");
  const baptismRoutes = await import("./routes/baptismRoutes.js");
  app.use("/api/baptisms", baptismRoutes.default);
  console.log("✅ baptismRoutes loaded");
} catch (err) {
  console.error("❌ Error loading baptismRoutes:", err.message);
}

try {
  console.log("Loading deathRoutes...");
  const deathRoutes = await import("./routes/deathRoutes.js");
  app.use("/api/deaths", deathRoutes.default);
  console.log("✅ deathRoutes loaded");
} catch (err) {
  console.error("❌ Error loading deathRoutes:", err.message);
}

try {
  console.log("Loading subscriptionRoutes...");
  const subscriptionRoutes = await import("./routes/subscriptionRoutes.js");
  app.use("/api/subscriptions", subscriptionRoutes.default);
  console.log("✅ subscriptionRoutes loaded");
} catch (err) {
  console.error("❌ Error loading subscriptionRoutes:", err.message);
}

app.get("/api", (req, res) => {
  res.send("✅ ChurchDB API is running");
});

app.use(express.static(path.join(__dirname, "../tnp-proj/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../tnp-proj/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
console.log("Starting server...");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
