const express = require("express");
const bcrypt = require("bcryptjs");
const { db } = require("../models/db");

const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return res.status(400).json({ error: "Email already in use" });

  const hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare(
      "INSERT INTO users (name, email, password_hash, is_admin) VALUES (?, ?, ?, 0)"
    )
    .run(name, email, hash);

  req.session.user = {
    id: info.lastInsertRowid,
    name,
    email,
    is_admin: 0,
  };

  res.json({ message: "Registered", user: req.session.user });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db
    .prepare("SELECT id, name, email, password_hash, is_admin FROM users WHERE email = ?")
    .get(email);

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.is_admin,
  };

  res.json({ message: "Logged in", user: req.session.user });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

// Current user
router.get("/me", (req, res) => {
  res.json({ user: req.session.user || null });
});

module.exports = router;
