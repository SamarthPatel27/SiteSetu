import dns from "dns";

dns.setServers(["8.8.8.8"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SiteSetu backend is running"
  });
});

app.get("/api/services", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Architect Consultation",
      category: "Architect",
      description: "Planning, design and residential consultation."
    },
    {
      id: 2,
      title: "Civil Engineering Inspection",
      category: "Civil Engineer",
      description: "Construction quality and site inspection support."
    },
    {
      id: 3,
      title: "Interior Design Consultation",
      category: "Interior Designer",
      description: "Interior planning, finishing and design guidance."
    }
  ]);
});

async function startServer() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB not configured yet — running without database");
    }

    app.listen(PORT, () => {
      console.log(`SiteSetu API running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
}

startServer();