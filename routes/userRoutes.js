const express = require("express");
const { db } = require("../models/db");

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });
  next();
}

// GET /api/user/me
router.get("/me", requireAuth, (req, res) => {
  const id = req.session.user.id;
  const user = db
    .prepare(
      `SELECT id, name, email, address, avatar_url, phone, city, state, spirit_animal, is_admin
       FROM users WHERE id = ?`
    )
    .get(id);
  res.json({ user });
});


// PUT /api/user/me
router.put("/me", requireAuth, async (req, res) => {
  const id = req.session.user.id;
  const { name, email, address, avatar_url, phone, city, state, spirit_animal } = req.body;

  let finalAvatarUrl = avatar_url || null;

  // If a spirit animal is provided, fetch an Unsplash image for it
  if (spirit_animal && req.fetchUnsplashImage) {
    try {
      const img = await req.fetchUnsplashImage(`${spirit_animal} animal`);
      if (img) {
        finalAvatarUrl = img;
      }
    } catch (e) {
      console.error("Error fetching avatar from Unsplash:", e.message);
    }
  }

  db.prepare(
    `UPDATE users
     SET name = ?, email = ?, address = ?, avatar_url = ?, phone = ?, city = ?, state = ?, spirit_animal = ?
     WHERE id = ?`
  ).run(name, email, address, finalAvatarUrl, phone, city, state, spirit_animal, id);

  // update session
  req.session.user.name = name;
  req.session.user.email = email;

  const updated = db
    .prepare(
      `SELECT id, name, email, address, avatar_url, phone, city, state, spirit_animal, is_admin
       FROM users WHERE id = ?`
    )
    .get(id);

  res.json({ user: updated });
});


module.exports = router;
