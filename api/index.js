import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { getCustomerEmailHtml, getAdminEmailHtml, getCustomerReviewEmailHtml, getAdminReviewEmailHtml } from "../server/emailTemplates.js";

// Setup environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Auto-seeding logic
let isSeeded = false;
const ensureSeeded = async () => {
  if (isSeeded) return;
  try {
    // Check content table count
    const { count, error } = await supabase
      .from("content")
      .select("*", { count: "exact", head: true });
      
    if (error) {
      console.error("Error checking content table status:", error);
      return;
    }

    if (count === 0) {
      console.log("Seeding initial CMS content to Supabase...");
      const seedFilePath = path.join(__dirname, "../server/seed.json");
      if (fs.existsSync(seedFilePath)) {
        const seedData = JSON.parse(fs.readFileSync(seedFilePath, "utf8"));
        const { error: insertError } = await supabase
          .from("content")
          .insert([{ data: seedData }]);
          
        if (insertError) {
          console.error("Error seeding content table:", insertError);
        } else {
          console.log("Supabase content table seeded successfully!");
        }
      }
    }

    // Check admin credentials
    const { data: adminExists, error: adminErr } = await supabase
      .from("admin_credentials")
      .select("username")
      .eq("username", "admin")
      .maybeSingle();

    if (!adminErr && !adminExists) {
      console.log("Seeding default admin credentials in Supabase...");
      const { error: insertAdminErr } = await supabase
        .from("admin_credentials")
        .insert([{ username: "admin", password: "admin121" }]);
        
      if (insertAdminErr) {
        console.error("Error seeding admin credentials:", insertAdminErr);
      } else {
        console.log("Default admin credentials seeded successfully!");
      }
    }

    isSeeded = true;
  } catch (err) {
    console.error("Database schema auto-seeding error:", err);
  }
};

// Nodemailer Transporter Setup (Gmail & Custom SMTP)
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
    await ensureSeeded();
    const { data, error } = await supabase
      .from("content")
      .select("data")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update CMS Content
app.put("/api/content", async (req, res) => {
  try {
    await ensureSeeded();
    let payload = req.body;
    
    const { data: row, error: fetchError } = await supabase
      .from("content")
      .select("id, data")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (row) {
      const dbContent = row.data;
      // Merge testimonialsData to prevent overwriting new reviews with older frontend states
      if (dbContent.testimonialsData && payload.testimonialsData) {
        const incomingIds = new Set(payload.testimonialsData.map(r => r.id));
        const incomingMaxId = payload.testimonialsData.reduce((max, r) => r.id > max ? r.id : max, 0);
        const autoAddedReviews = dbContent.testimonialsData.filter(r => !incomingIds.has(r.id) && r.id > incomingMaxId);
        
        if (autoAddedReviews.length > 0) {
          payload.testimonialsData = [...autoAddedReviews, ...payload.testimonialsData];
        }
      }
      
      const { error: updateError } = await supabase
        .from("content")
        .update({ data: payload })
        .eq("id", row.id);
        
      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from("content")
        .insert([{ data: payload }]);
        
      if (insertError) throw insertError;
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
    await ensureSeeded();
    
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert([{ 
        name, 
        email, 
        phone, 
        destination, 
        travelDate, 
        message 
      }]);

    if (insertError) throw insertError;

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

        await Promise.all([
          transporter.sendMail(clientMailOptions),
          transporter.sendMail(adminMailOptions)
        ]);
        console.log(`Enquiry emails successfully sent to client (${email}) and admin.`);
      } catch (mailError) {
        console.error("Error sending enquiry emails:", mailError);
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
    await ensureSeeded();
    
    const { data: rows, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Submit Review
app.post("/api/reviews", async (req, res) => {
  const newReview = req.body;
  const { author, email, location, journey, quote, rating } = newReview;

  try {
    await ensureSeeded();
    
    const { data: row, error: fetchError } = await supabase
      .from("content")
      .select("id, data")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (row) {
      const siteContent = row.data;
      newReview.id = Date.now();
      siteContent.testimonialsData = [newReview, ...(siteContent.testimonialsData || [])];
      
      const { error: updateError } = await supabase
        .from("content")
        .update({ data: siteContent })
        .eq("id", row.id);

      if (updateError) throw updateError;

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

          await Promise.all([
            transporter.sendMail(clientMailOptions),
            transporter.sendMail(adminMailOptions)
          ]);
          console.log(`Review emails successfully sent to reviewer (${email}) and admin.`);
        } catch (mailError) {
          console.error("Error sending review emails:", mailError);
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
    await ensureSeeded();
    
    const { data: row, error } = await supabase
      .from("admin_credentials")
      .select("password")
      .eq("username", username)
      .maybeSingle();

    if (!error && row && row.password === password) {
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
    await ensureSeeded();
    
    const { data: row, error } = await supabase
      .from("admin_credentials")
      .select("password")
      .eq("username", username)
      .maybeSingle();

    if (error || !row || row.password !== currentPassword) {
      return res.status(400).json({ success: false, error: "Current password does not match" });
    }
    
    const { error: updateError } = await supabase
      .from("admin_credentials")
      .update({ password: newPassword })
      .eq("username", username);

    if (updateError) throw updateError;
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Supabase Storage File Upload
app.post("/api/upload", async (req, res) => {
  const { filename, base64Data } = req.body;
  if (!filename || !base64Data) {
    return res.status(400).json({ error: "Missing filename or base64Data" });
  }

  try {
    const base64Content = base64Data.split(";base64,").pop();
    const mimeType = base64Data.split(";base64,")[0].split(":")[1];
    const buffer = Buffer.from(base64Content, "base64");
    
    const ext = path.extname(filename);
    const cleanName = path.basename(filename, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueFilename = `${Date.now()}_${cleanName}${ext}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uniqueFilename, buffer, {
        contentType: mimeType,
        upsert: true
      });

    if (error) {
      console.error("Supabase Storage upload error details:", error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("uploads")
      .getPublicUrl(uniqueFilename);

    res.json({ url: publicUrl });
  } catch (error) {
    console.error("Supabase storage upload error:", error);
    res.status(500).json({ error: "Failed to upload file to cloud storage" });
  }
});

export default app;
