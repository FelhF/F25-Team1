const express = require("express");
const { db } = require("../models/db");

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });
  next();
}

// GET /api/reviews/:dealId
router.get("/:dealId", (req, res) => {
  const dealId = req.params.dealId;
  const reviews = db
    .prepare(
      `SELECT r.*, u.name as user_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       WHERE r.deal_id = ?
       ORDER BY r.created_at DESC`
    )
    .all(dealId);
  res.json({ reviews });
});

// POST /api/reviews/:dealId
router.post("/:dealId", requireAuth, (req, res) => {
  const dealId = req.params.dealId;
  const userId = req.session.user.id;
  const { rating, comment } = req.body;

  const r = parseInt(rating, 10);
  if (!r || r < 1 || r > 5) {
    return res.status(400).json({ error: "Rating must be 1–5" });
  }

  const info = db
    .prepare(
      "INSERT INTO reviews (user_id, deal_id, rating, comment) VALUES (?, ?, ?, ?)"
    )
    .run(userId, dealId, r, comment || "");

  const newReview = db
    .prepare(
      `SELECT r.*, u.name as user_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       WHERE r.id = ?`
    )
    .get(info.lastInsertRowid);

  res.json({ review: newReview });
});

// DELETE /api/reviews/delete/:id (owner or admin)
router.delete("/delete/:id", requireAuth, (req, res) => {
  const reviewId = req.params.id;
  const user = req.session.user;

  const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(reviewId);
  if (!review) return res.status(404).json({ error: "Review not found" });

  if (!user.is_admin && review.user_id !== user.id) {
    return res.status(403).json({ error: "Not allowed" });
  }

  db.prepare("DELETE FROM reviews WHERE id = ?").run(reviewId);
  res.json({ message: "Review deleted" });
});

module.exports = router;
