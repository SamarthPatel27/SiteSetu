import dns from "dns";

dns.setServers(["8.8.8.8"]);

import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SiteSetu API running on port ${PORT}`);
});