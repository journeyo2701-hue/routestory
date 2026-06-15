import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { getCustomerEmailHtml, getAdminEmailHtml, getCustomerReviewEmailHtml, getAdminReviewEmailHtml } from "./emailTemplates.js";

// Setup environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// SQLite Database Setup
const dbPath = path.join(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath);

// Promisified database helper methods
const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Database Schema Initialization & Bootstrapping
db.serialize(async () => {
  try {
    // 1. Create content table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL
      )
    `);

    // 2. Create contact submissions table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        destination TEXT,
        travelDate TEXT,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Auto-seed database if empty
    const row = await dbGet("SELECT COUNT(*) as count FROM content");
    if (row && row.count === 0) {
      console.log("Seeding initial CMS content to SQLite...");
      const seedFilePath = path.join(__dirname, "seed.json");
      if (fs.existsSync(seedFilePath)) {
        const seedData = fs.readFileSync(seedFilePath, "utf8");
        await dbRun("INSERT INTO content (data) VALUES (?)", [seedData]);
        console.log("Database seeded successfully from seed.json!");
      } else {
        console.warn("seed.json not found! Content table remains empty.");
      }
    } else {
      console.log("SQLite content database already contains data.");
    }

    // 4. Create admin_credentials table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS admin_credentials (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL
      )
    `);

    // Seed default admin credentials if table is empty
    const adminExists = await dbGet("SELECT COUNT(*) as count FROM admin_credentials WHERE username = 'admin'");
    if (adminExists && adminExists.count === 0) {
      await dbRun("INSERT INTO admin_credentials (username, password) VALUES (?, ?)", ["admin", "admin121"]);
      console.log("Default admin credentials seeded in SQLite database.");
    }
  } catch (err) {
    console.error("Database schema initialization error:", err);
  }
});

// Nodemailer Transporter Setup (Supports Gmail & Custom SMTP e.g. Hostinger)
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  const mailConfig = process.env.EMAIL_HOST
    ? {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "465"),
        secure: process.env.EMAIL_PORT === "465" || process.env.EMAIL_SECURE === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }
    : {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      };
  transporter = nodemailer.createTransport(mailConfig);
}

// --- API ROUTES ---

// 1. Fetch CMS Content
app.get("/api/content", async (req, res) => {
  try {
    const row = await dbGet("SELECT data FROM content ORDER BY id DESC LIMIT 1");
    if (!row) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(JSON.parse(row.data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update CMS Content
app.put("/api/content", async (req, res) => {
  try {
    let payload = req.body;
    const row = await dbGet("SELECT id, data FROM content ORDER BY id DESC LIMIT 1");
    
    if (row) {
      const dbContent = JSON.parse(row.data);
      // Merge testimonialsData to prevent overwriting new reviews with older frontend states
      if (dbContent.testimonialsData && payload.testimonialsData) {
        const incomingIds = new Set(payload.testimonialsData.map(r => r.id));
        // Identify reviews in DB that are missing in the incoming payload.
        // If their ID (timestamp) is greater than the max ID in the incoming payload,
        // it means they were added after the client loaded the page, so we preserve them.
        const incomingMaxId = payload.testimonialsData.reduce((max, r) => r.id > max ? r.id : max, 0);
        const autoAddedReviews = dbContent.testimonialsData.filter(r => !incomingIds.has(r.id) && r.id > incomingMaxId);
        
        if (autoAddedReviews.length > 0) {
          payload.testimonialsData = [...autoAddedReviews, ...payload.testimonialsData];
        }
      }
      const newData = JSON.stringify(payload);
      await dbRun("UPDATE content SET data = ? WHERE id = ?", [newData, row.id]);
    } else {
      const newData = JSON.stringify(payload);
      await dbRun("INSERT INTO content (data) VALUES (?)", [newData]);
    }
    
    res.json({ message: "Content updated successfully", data: payload });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Contact Form Submission (Saves to DB and optionally sends mail)
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, destination, travelDate, message } = req.body;

  try {
    // Save submission to SQLite database
    await dbRun(
      `INSERT INTO contact_submissions (name, email, phone, destination, travelDate, message) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, destination, travelDate, message]
    );

    // Send emails if transporter is configured
    if (transporter) {
      try {
        const clientMailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your Journey with Route Story Begins",
          html: getCustomerEmailHtml(name, destination, travelDate)
        };

        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Journey Enquiry from ${name}`,
          html: getAdminEmailHtml(name, email, phone, destination, travelDate, message)
        };

        // Send both client confirmation and admin notification emails concurrently
        await Promise.all([
          transporter.sendMail(clientMailOptions),
          transporter.sendMail(adminMailOptions)
        ]);
        console.log(`Enquiry emails successfully sent to client (${email}) and admin.`);
      } catch (mailError) {
        console.error("Error sending enquiry emails:", mailError);
        // Note: We do not fail the request if database insertion was successful
      }
    }

    res.json({ message: "Enquiry sent successfully" });
  } catch (error) {
    console.error("DB save error:", error);
    res.status(500).json({ error: "Failed to process enquiry" });
  }
});

// 4. Fetch Contact Submissions (For Admin Dashboard)
app.get("/api/contact", async (req, res) => {
  try {
    const rows = await dbAll("SELECT * FROM contact_submissions ORDER BY createdAt DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Submit Review
app.post("/api/reviews", async (req, res) => {
  const newReview = req.body;
  const { author, email, location, journey, quote, rating } = newReview;

  try {
    const row = await dbGet("SELECT id, data FROM content ORDER BY id DESC LIMIT 1");
    if (row) {
      const siteContent = JSON.parse(row.data);
      newReview.id = Date.now();
      siteContent.testimonialsData = [newReview, ...(siteContent.testimonialsData || [])];
      
      await dbRun("UPDATE content SET data = ? WHERE id = ?", [JSON.stringify(siteContent), row.id]);

      // Send emails if transporter is configured
      if (transporter) {
        try {
          const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Sharing Your Route Story",
            html: getCustomerReviewEmailHtml(author, rating, quote, journey)
          };

          const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Review Submitted by ${author}`,
            html: getAdminReviewEmailHtml(author, email, location, journey, quote, rating)
          };

          // Send both client review thank you and admin notification concurrently
          await Promise.all([
            transporter.sendMail(clientMailOptions),
            transporter.sendMail(adminMailOptions)
          ]);
          console.log(`Review emails successfully sent to reviewer (${email}) and admin.`);
        } catch (mailError) {
          console.error("Error sending review emails:", mailError);
          // Note: We do not fail the request if database update was successful
        }
      }

      res.json({ message: "Review added successfully", review: newReview });
    } else {
      res.status(404).json({ error: "CMS content not initialized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Admin Authentication (Login & Password Management)
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const row = await dbGet("SELECT password FROM admin_credentials WHERE username = ?", [username]);
    if (row && row.password === password) {
      res.json({ success: true, message: "Logged in successfully" });
    } else {
      res.status(401).json({ success: false, error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/admin/change-password", async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  try {
    const row = await dbGet("SELECT password FROM admin_credentials WHERE username = ?", [username]);
    if (!row || row.password !== currentPassword) {
      return res.status(400).json({ success: false, error: "Current password does not match" });
    }
    await dbRun("UPDATE admin_credentials SET password = ? WHERE username = ?", [newPassword, username]);
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve Uploads
const uploadsPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express.static(uploadsPath));

// 6. Local File Upload
app.post("/api/upload", async (req, res) => {
  const { filename, base64Data } = req.body;
  if (!filename || !base64Data) {
    return res.status(400).json({ error: "Missing filename or base64Data" });
  }

  try {
    const base64Content = base64Data.split(";base64,").pop();
    const buffer = Buffer.from(base64Content, "base64");
    
    const ext = path.extname(filename);
    const cleanName = path.basename(filename, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueFilename = `${Date.now()}_${cleanName}${ext}`;
    const filePath = path.join(uploadsPath, uniqueFilename);
    
    fs.writeFileSync(filePath, buffer);
    res.json({ url: `/uploads/${uniqueFilename}` });
  } catch (error) {
    console.error("Local file upload error:", error);
    res.status(500).json({ error: "Failed to upload file locally" });
  }
});

// --- SERVE FRONTEND (Render Monolithic Deployment) ---
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Catch-all route to serve index.html for React Router
app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
