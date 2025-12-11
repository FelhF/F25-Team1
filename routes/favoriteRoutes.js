const express = require("express");
const { db } = require("../models/db");

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });
  next();
}

// GET /api/favorites
router.get("/", requireAuth, (req, res) => {
  const userId = req.session.user.id;
  const favorites = db
    .prepare(
      `SELECT d.*
       FROM favorites f
       JOIN deals d ON d.id = f.deal_id
       WHERE f.user_id = ?`
    )
    .all(userId);
  res.json({ favorites });
});

// POST /api/favorites/:dealId
router.post("/:dealId", requireAuth, (req, res) => {
  const userId = req.session.user.id;
  const dealId = req.params.dealId;
  try {
    db.prepare("INSERT OR IGNORE INTO favorites (user_id, deal_id) VALUES (?, ?)")
      .run(userId, dealId);
    res.json({ message: "Added to favorites" });
  } catch (e) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

// DELETE /api/favorites/:dealId
router.delete("/:dealId", requireAuth, (req, res) => {
  const userId = req.session.user.id;
  const dealId = req.params.dealId;
  db.prepare("DELETE FROM favorites WHERE user_id = ? AND deal_id = ?")
    .run(userId, dealId);
  res.json({ message: "Removed from favorites" });
});

module.exports = router;
