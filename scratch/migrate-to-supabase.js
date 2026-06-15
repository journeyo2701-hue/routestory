import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load env variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Please make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) are set in your .env file!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Open local SQLite database
const dbPath = path.join(__dirname, "../server/database.sqlite");
if (!fs.existsSync(dbPath)) {
  console.log("No local SQLite database found at server/database.sqlite. Skipping database migration.");
} else {
  const db = new sqlite3.Database(dbPath);
  
  const dbGet = (query, params = []) => new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => err ? reject(err) : resolve(row));
  });
  
  const dbAll = (query, params = []) => new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => err ? reject(err) : resolve(rows));
  });

  const migrateDb = async () => {
    console.log("Starting database migration to Supabase...");

    // 1. Migrate content table
    try {
      const contentRow = await dbGet("SELECT data FROM content ORDER BY id DESC LIMIT 1");
      if (contentRow) {
        console.log("Migrating CMS content row...");
        const parsedData = JSON.parse(contentRow.data);
        const { error } = await supabase.from("content").insert([{ data: parsedData }]);
        if (error) console.error("Error migrating content:", error.message);
        else console.log("CMS content successfully migrated to Supabase!");
      }
    } catch (e) {
      console.log("Content table migration skipped or failed:", e.message);
    }

    // 2. Migrate admin credentials
    try {
      const adminRows = await dbAll("SELECT username, password FROM admin_credentials");
      if (adminRows && adminRows.length > 0) {
        console.log(`Migrating ${adminRows.length} admin credentials...`);
        const { error } = await supabase.from("admin_credentials").upsert(adminRows);
        if (error) console.error("Error migrating admin credentials:", error.message);
        else console.log("Admin credentials successfully migrated to Supabase!");
      }
    } catch (e) {
      console.log("Admin credentials table migration skipped or failed:", e.message);
    }

    // 3. Migrate contact submissions
    try {
      const submissions = await dbAll("SELECT name, email, phone, destination, travelDate, message, createdAt FROM contact_submissions");
      if (submissions && submissions.length > 0) {
        console.log(`Migrating ${submissions.length} contact submissions...`);
        const { error } = await supabase.from("contact_submissions").insert(submissions);
        if (error) console.error("Error migrating contact submissions:", error.message);
        else console.log("Contact submissions successfully migrated to Supabase!");
      }
    } catch (e) {
      console.log("Contact submissions table migration skipped or failed:", e.message);
    }

    db.close();
  };

  await migrateDb();
}

// 4. Migrate local upload files to Supabase Storage
const uploadsDir = path.join(__dirname, "../uploads");
if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  console.log(`Found ${files.length} local uploaded files. Syncing to Supabase Storage bucket 'uploads'...`);
  
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    if (fs.lstatSync(filePath).isFile()) {
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(file).toLowerCase();
      let contentType = "application/octet-stream";
      if (ext === ".png") contentType = "image/png";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".gif") contentType = "image/gif";
      else if (ext === ".webp") contentType = "image/webp";

      console.log(`Uploading ${file}...`);
      const { error } = await supabase.storage
        .from("uploads")
        .upload(file, fileBuffer, { contentType, upsert: true });

      if (error) {
        console.error(`Failed to upload ${file}:`, error.message);
      } else {
        console.log(`Successfully uploaded ${file} to Supabase Storage!`);
      }
    }
  }
}

console.log("Migration script completed!");
