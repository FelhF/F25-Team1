const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");

const dbPath = path.join(__dirname, "..", "salifyyy.db");
const db = new Database(dbPath);

// Create tables & seed data
function initDb() {
  db.exec(`
    PRAGMA foreign_keys = ON;

   CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  address TEXT,
  avatar_url TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  spirit_animal TEXT,
  is_admin INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);


       CREATE TABLE IF NOT EXISTS deals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      short_description TEXT,
      long_description TEXT,
      price REAL,
      original_price REAL,
      link_url TEXT,
      category TEXT,
      store_name TEXT,
      source_name TEXT,
      start_date TEXT,
      end_date TEXT,
      image_url TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );


    CREATE TABLE IF NOT EXISTS favorites (
      user_id INTEGER NOT NULL,
      deal_id INTEGER NOT NULL,
      PRIMARY KEY (user_id, deal_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  deal_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  admin_reply TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
);

  `);
    // columns for older DB versions
  try { db.exec(`ALTER TABLE deals ADD COLUMN store_name TEXT;`); } catch (e) {}
  try { db.exec(`ALTER TABLE deals ADD COLUMN source_name TEXT;`); } catch (e) {}
  try { db.exec(`ALTER TABLE deals ADD COLUMN start_date TEXT;`); } catch (e) {}
  try { db.exec(`ALTER TABLE deals ADD COLUMN end_date TEXT;`); } catch (e) {}

    try { db.exec(`ALTER TABLE reviews ADD COLUMN admin_reply TEXT;`); } catch (e) {}



  // Seed an admin user if not exists
  const adminExists = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get("admin@salify.com");

  if (!adminExists) {
    const passwordHash = bcrypt.hashSync("admin123", 10);
    db.prepare(`
      INSERT INTO users (name, email, password_hash, is_admin)
      VALUES (?, ?, ?, 1)
    `).run("Admin", "admin@salify.com", passwordHash);
  }

  // Seed some example deals if table is empty
  const dealCount = db.prepare("SELECT COUNT(*) as c FROM deals").get().c;
   if (dealCount === 0) {
    const insert = db.prepare(`
      INSERT INTO deals (
        title,
        short_description,
        long_description,
        price,
        original_price,
        link_url,
        category,
        store_name,
        source_name,
        start_date,
        end_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      "Electronics Black Friday Mega Sale",
      "Save up to 40% on laptops, gaming accessories, and smart devices.",
      "TechWorld's annual Black Friday sale with big discounts on laptops, gaming gear, monitors and more.",
      null,
      null,
      "https://example.com/techworld-black-friday",
      "Electronics",
      "TechWorld",
      "TechWorld",
      "2025-11-01",
      "2025-11-30"
    );

    insert.run(
      "Printer & Office Tech Savings Event",
      "Up to 25% off on select printers and office technology.",
      "BestBuy's seasonal promotion for printers, scanners and small office devices.",
      null,
      null,
      "https://example.com/bestbuy-printers",
      "Technology",
      "BestBuy",
      "BestBuy",
      "2026-01-01",
      "2026-02-01"
    );

    insert.run(
      "Back-to-School Essentials",
      "Discounts on backpacks, notebooks, and student tech accessories.",
      "CampusMart's back-to-school campaign for students with deals on essentials and accessories.",
      null,
      null,
      "https://example.com/campusmart-back-to-school",
      "Back to School",
      "CampusMart",
      "CampusMart",
      "2025-08-10",
      "2025-09-05"
    );
  }

}

module.exports = { db, initDb };
