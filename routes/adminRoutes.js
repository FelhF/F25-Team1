const express = require("express");
const { db } = require("../models/db");

const router = express.Router();

function requireAdmin(req, res, next) {
  if (!req.session.user || !req.session.user.is_admin)
    return res.status(403).json({ error: "Admin only" });
  next();
}

// GET /api/admin/reviews
router.get("/reviews", requireAdmin, (req, res) => {
  const reviews = db
    .prepare(
      `SELECT r.id, r.rating, r.comment, r.created_at,
              u.name as user_name, u.email as user_email,
              d.title as deal_title
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       JOIN deals d ON d.id = r.deal_id
       ORDER BY r.created_at DESC`
    )
    .all();
  res.json({ reviews });
});

// DELETE /api/admin/reviews/:id
router.delete("/reviews/:id", requireAdmin, (req, res) => {
  const id = req.params.id;
  db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
  res.json({ message: "Review deleted by admin" });
});

// POST /api/admin/reviews/:id/reply
router.post("/reviews/:id/reply", requireAdmin, (req, res) => {
  const id = req.params.id;
  const { reply } = req.body;
  db.prepare("UPDATE reviews SET admin_reply = ? WHERE id = ?").run(reply || "", id);
  res.json({ message: "Reply saved" });
});

// GET /api/admin/users
router.get("/users", requireAdmin, (req, res) => {
  const users = db
    .prepare(
      `SELECT id, name, email, city, state, is_admin, created_at
       FROM users
       ORDER BY created_at DESC`
    )
    .all();
  res.json({ users });
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (req.session.user && req.session.user.id === id) {
    return res.status(400).json({ error: "Admins cannot delete their own account." });
  }
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
  res.json({ message: "User deleted" });
});



module.exports = router;
