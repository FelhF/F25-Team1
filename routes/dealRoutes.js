const express = require("express");
const { db } = require("../models/db");

const router = express.Router();

// GET /api/deals?search=...
router.get("/", async (req, res) => {
  const search = (req.query.search || "").trim();
  let rows;

  if (search) {
    rows = db
      .prepare(
        `SELECT * FROM deals
         WHERE title LIKE ? OR short_description LIKE ? OR long_description LIKE ?
         ORDER BY created_at DESC`
      )
      .all(`%${search}%`, `%${search}%`, `%${search}%`);
  } else {
    rows = db.prepare("SELECT * FROM deals ORDER BY created_at DESC").all();
  }

  // Attach Unsplash images if missing
  const updatedDeals = [];
  for (const d of rows) {
    if (!d.image_url && req.fetchUnsplashImage) {
      const url = await req.fetchUnsplashImage(d.title || d.short_description || "deal");
      if (url) {
        db.prepare("UPDATE deals SET image_url = ? WHERE id = ?").run(url, d.id);
        d.image_url = url;
      }
    }
    updatedDeals.push(d);
  }

  res.json({ deals: updatedDeals });
});

// GET /api/deals/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const deal = db.prepare("SELECT * FROM deals WHERE id = ?").get(id);
  if (!deal) return res.status(404).json({ error: "Deal not found" });
  res.json({ deal });
});

module.exports = router;
