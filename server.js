require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const { initDb } = require("./models/db");

const app = express();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "changeme";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Node 18+ has global fetch. If not, uncomment: 
// const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

initDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Helpers to inject user into responses (for API)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Attach Unsplash helper to request so routes can use it
app.use((req, res, next) => {
  req.fetchUnsplashImage = async (query) => {
    if (!UNSPLASH_ACCESS_KEY) return null;

    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      query
    )}&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      return data?.urls?.small || null;
    } catch (err) {
      console.error("Unsplash error:", err.message);
      return null;
    }
  };
  next();
});

// Routes
const authRoutes = require("./routes/authRoutes");
const dealRoutes = require("./routes/dealRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/community", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "community.html"))
);
app.get("/my-boards", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "my-boards.html"))
);


// SPA-ish redirect helpers (so typing /favorites works)
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);
app.get("/favorites", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "favorites.html"))
);
app.get("/settings", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "settings.html"))
);
app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "admin.html"))
);
// deal + reviews are handled via query string like ?id=1

app.listen(PORT, () => {
  console.log(`Salify running at http://localhost:${PORT}`);
});
