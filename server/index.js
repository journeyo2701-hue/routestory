import app from "../api/index.js";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Setup environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// --- SERVE FRONTEND (For monolithic local previews) ---
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Catch-all route to serve index.html for React Router
app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
