// public/js/app.js

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// Auth UI (header)
async function setupAuthUi() {
  const currentUserSpan = document.getElementById("currentUser");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminLink = document.getElementById("adminLink");

  if (!currentUserSpan) return;

  try {
    const { user } = await api("/api/auth/me", { method: "GET" });
    if (user) {
      currentUserSpan.textContent = `Hi, ${user.name}`;
      if (loginLink) loginLink.classList.add("hidden");
      if (logoutBtn) logoutBtn.classList.remove("hidden");
      if (adminLink && user.is_admin) adminLink.classList.remove("hidden");
    } else {
      currentUserSpan.textContent = "";
      if (loginLink) loginLink.classList.remove("hidden");
      if (logoutBtn) logoutBtn.classList.add("hidden");
    }
  } catch (e) {
    console.error(e);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await api("/api/auth/logout", { method: "POST", body: "{}" });
        window.location.href = "login.html";
      } catch (e) {
        console.error(e);
      }
    });
  }
}

/* ---------- Home / deals page ---------- */

async function loadDeals(search = "") {
  const grid = document.getElementById("dealGrid");
  if (!grid) return;
  grid.innerHTML = "Loading deals...";

  try {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const { deals } = await api(`/api/deals${query}`, { method: "GET" });

    if (!deals.length) {
      grid.innerHTML = "<p>No deals found.</p>";
      return;
    }

    const cardsHtml = deals
      .map((d) => {
        const category = d.category || "Deal";
        const img = d.image_url || "";
        const store = d.store_name || "";
        const source = d.source_name || "";
        const starts = d.start_date ? `Starts: ${d.start_date}` : "";
        const ends = d.end_date ? `Ends: ${d.end_date}` : "";
        const desc = d.short_description || "";

        return `
        <article class="card deal-card">
          <img class="deal-card-image" src="${img}" alt="${category}" onerror="this.style.display='none'">
          <div class="deal-title">${category}</div>
          <div class="deal-desc">${desc}</div>
          <div class="deal-meta">
            ${store ? `<div class="deal-store">${store}</div>` : ""}
            ${source ? `<div class="deal-source">Source: ${source}</div>` : ""}
            <div class="deal-dates">
              ${starts ? `<span>${starts}</span>` : ""}
              ${ends ? `<span>${ends}</span>` : ""}
            </div>
            <div class="deal-id">Id: ${d.id}</div>
          </div>
          <div class="deal-actions">
            <button class="btn secondary" data-action="fav" data-id="${d.id}">★ Favorite</button>
            <button class="btn primary" data-action="detail" data-id="${d.id}">View</button>
            <button class="btn" data-action="reviews" data-id="${d.id}">Reviews</button>
          </div>
        </article>
      `;
      })
      .join("");

    grid.innerHTML = cardsHtml;

    grid.addEventListener("click", async (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;

      if (action === "fav") {
        try {
          await api(`/api/favorites/${id}`, { method: "POST", body: "{}" });
          btn.textContent = "★ Favorited";
        } catch (err) {
          alert(err.message || "Failed to favorite");
        }
      } else if (action === "detail") {
        window.location.href = `deal.html?id=${id}`;
      } else if (action === "reviews") {
        window.location.href = `reviews.html?dealId=${id}`;
      }
    });
  } catch (e) {
    console.error(e);
    grid.innerHTML = "<p>Failed to load deals.</p>";
  }
}


function initHomePage() {
  loadDeals();
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      loadDeals(input.value.trim());
    });
  }
}

/* ---------- Login page ---------- */

function initLoginPage() {
  const form = document.getElementById("loginForm");
  const errorEl = document.getElementById("loginError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";
    const formData = new FormData(form);
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
      window.location.href = "index.html";
    } catch (err) {
      errorEl.textContent = err.message;
    }
  });
}

/* ---------- Register page ---------- */

function initRegisterPage() {
  const form = document.getElementById("registerForm");
  const errorEl = document.getElementById("registerError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      });
      window.location.href = "index.html";
    } catch (err) {
      errorEl.textContent = err.message;
    }
  });
}

/* ---------- Favorites page ---------- */

async function loadFavorites() {
  const grid = document.getElementById("favoriteGrid");
  if (!grid) return;
  grid.innerHTML = "Loading favorites...";

  try {
    const { favorites } = await api("/api/favorites", { method: "GET" });
    if (!favorites.length) {
      grid.innerHTML = "<p>You have no favorites yet.</p>";
      return;
    }
    grid.innerHTML = favorites
      .map((d) => {
        const category = d.category || "Deal";
        const img = d.image_url || "";
        const store = d.store_name || "";
        const source = d.source_name || "";
        const starts = d.start_date ? `Starts: ${d.start_date}` : "";
        const ends = d.end_date ? `Ends: ${d.end_date}` : "";
        const desc = d.short_description || "";

        return `
        <article class="card deal-card">
          <img class="deal-card-image" src="${img}" alt="${category}" onerror="this.style.display='none'">
          <div class="deal-title">${category}</div>
          <div class="deal-desc">${desc}</div>
          <div class="deal-meta">
            ${store ? `<div class="deal-store">${store}</div>` : ""}
            ${source ? `<div class="deal-source">Source: ${source}</div>` : ""}
            <div class="deal-dates">
              ${starts ? `<span>${starts}</span>` : ""}
              ${ends ? `<span>${ends}</span>` : ""}
            </div>
            <div class="deal-id">Id: ${d.id}</div>
          </div>
          <div class="deal-actions">
            <button class="btn secondary" data-action="remove-fav" data-id="${d.id}">Remove</button>
            <button class="btn primary" data-action="detail" data-id="${d.id}">View</button>
          </div>
        </article>`;
      })
      .join("");

    grid.addEventListener("click", async (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === "remove-fav") {
        try {
          await api(`/api/favorites/${id}`, { method: "DELETE", body: "{}" });
          loadFavorites();
        } catch (err) {
          alert(err.message);
        }
      } else if (action === "detail") {
        window.location.href = `deal.html?id=${id}`;
      }
    });
  } catch (err) {
    grid.innerHTML = "<p>Failed to load favorites. Are you logged in?</p>";
  }
}


function initFavoritesPage() {
  loadFavorites();
}

/* ---------- Deal detail page ---------- */

async function loadDealDetail() {
  const container = document.getElementById("dealDetail");
  if (!container) return;

  const id = getQueryParam("id");
  if (!id) {
    container.innerHTML = "<p>No deal specified.</p>";
    return;
  }

  try {
    const { deal } = await api(`/api/deals/${id}`, { method: "GET" });

       const category = deal.category || "Deal";
    const store = deal.store_name || "";
    const source = deal.source_name || "";
    const starts = deal.start_date ? `Starts: ${deal.start_date}` : "";
    const ends = deal.end_date ? `Ends: ${deal.end_date}` : "";
    const img = deal.image_url || "";
    const price = deal.price ? `$${deal.price.toFixed(2)}` : "";
    const orig = deal.original_price ? `$${deal.original_price.toFixed(2)}` : "";

    container.innerHTML = `
      <div>
        <img src="${img}" alt="${category}" onerror="this.style.display='none'"/>
      </div>
      <div class="deal-detail-main">
        <h1>${category}</h1>
        <p>${deal.long_description || deal.short_description || ""}</p>
        ${store ? `<p><strong>Store:</strong> ${store}</p>` : ""}
        ${source ? `<p><strong>Source:</strong> ${source}</p>` : ""}
        ${(starts || ends) ? `<p><strong>Dates:</strong> ${[starts, ends].filter(Boolean).join(" · ")}</p>` : ""}
        ${
          deal.link_url
            ? `<p><strong>Link:</strong> <a href="${deal.link_url}" target="_blank" rel="noopener">${deal.link_url}</a></p>`
            : ""
        }
        ${
          price || orig
            ? `<p><strong>Pricing:</strong> ${price} ${
                orig ? `<span class="deal-original">${orig}</span>` : ""
              }</p>`
            : ""
        }
        <p><strong>Deal Id:</strong> ${deal.id}</p>
        <div style="margin-top:1rem; display:flex; gap:0.5rem;">
          <button class="btn secondary" id="detailFavBtn">★ Favorite</button>
          <button class="btn" id="detailReviewsBtn">View reviews</button>
        </div>
      </div>
    `;


    document
      .getElementById("detailFavBtn")
      .addEventListener("click", async () => {
        try {
          await api(`/api/favorites/${deal.id}`, {
            method: "POST",
            body: "{}",
          });
          alert("Added to favorites");
        } catch (e) {
          alert(e.message);
        }
      });

    document
      .getElementById("detailReviewsBtn")
      .addEventListener("click", () => {
        window.location.href = `reviews.html?dealId=${deal.id}`;
      });
  } catch (err) {
    container.innerHTML = "<p>Failed to load deal.</p>";
  }
}

function initDealPage() {
  loadDealDetail();
}

/* ---------- Reviews page ---------- */

async function loadReviews() {
  const dealId = getQueryParam("dealId");
  const list = document.getElementById("reviewList");
  const titleEl = document.getElementById("reviewsTitle");
  if (!dealId || !list) return;

  list.innerHTML = "Loading reviews...";

  try {
    const { reviews } = await api(`/api/reviews/${dealId}`, { method: "GET" });
    if (titleEl) titleEl.textContent = `Reviews for Deal #${dealId}`;

    if (!reviews.length) {
      list.innerHTML = "<p>No reviews yet. Be the first!</p>";
      return;
    }

        list.innerHTML = reviews
      .map((r) => {
        const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
        const date = new Date(r.created_at).toLocaleString();
        const replyHtml = r.admin_reply
          ? `<div class="review-meta"><strong>Admin reply:</strong> ${r.admin_reply}</div>`
          : "";
        return `
        <article class="review-card" data-id="${r.id}">
          <div class="review-header">
            <span>${r.user_name}</span>
            <span class="review-rating">${stars} (${r.rating})</span>
          </div>
          <div class="review-meta">${date}</div>
          <p class="review-comment">${r.comment || ""}</p>
          ${replyHtml}
          <button class="btn secondary btn-sm" data-action="delete-review" data-id="${r.id}">
            Delete
          </button>
        </article>`;
      })
      .join("");


    list.addEventListener("click", async (e) => {
      const btn = e.target.closest("button[data-action='delete-review']");
      if (!btn) return;
      const reviewId = btn.dataset.id;
      if (!confirm("Delete this review?")) return;

      try {
        await api(`/api/reviews/delete/${reviewId}`, {
          method: "DELETE",
          body: "{}",
        });
        loadReviews();
      } catch (err) {
        alert(err.message);
      }
     });
  } catch (err) {
    list.innerHTML = "<p>Failed to load reviews.</p>";
  }
}

function initReviewsPage() {
  const form = document.getElementById("reviewForm");
  const errorEl = document.getElementById("reviewError");
  const dealId = getQueryParam("dealId");
  if (form && dealId) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorEl.textContent = "";
      const formData = new FormData(form);
      const body = {
        rating: formData.get("rating"),
        comment: formData.get("comment"),
      };
      try {
        await api(`/api/reviews/${dealId}`, {
          method: "POST",
          body: JSON.stringify(body),
        });
        form.reset();
        loadReviews();
      } catch (err) {
        errorEl.textContent = err.message;
      }
    });
  }
  loadReviews();
}

/* ---------- Settings page ---------- */

async function initSettingsPage() {
  const form = document.getElementById("settingsForm");
  const msgEl = document.getElementById("settingsMsg");
  const avatarImg = document.getElementById("avatarPreview");
  if (!form) return;

  try {
    const { user } = await api("/api/user/me", { method: "GET" });
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    form.name.value = user.name || "";
    form.email.value = user.email || "";
    form.address.value = user.address || "";
    form.phone.value = user.phone || "";
    form.city.value = user.city || "";
    form.state.value = user.state || "";
    form.spirit_animal.value = user.spirit_animal || "";

    if (user.avatar_url) {
      avatarImg.src = user.avatar_url;
      avatarImg.style.display = "block";
    } else {
      avatarImg.style.display = "none";
    }
  } catch (err) {
    msgEl.textContent = "You must be logged in to edit your account.";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msgEl.textContent = "";
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      state: formData.get("state"),
      spirit_animal: formData.get("spirit_animal"),
      avatar_url: null  // backend will set based on spirit animal
    };

    try {
      const { user } = await api("/api/user/me", {
        method: "PUT",
        body: JSON.stringify(body),
      });
      msgEl.textContent = "Account updated.";

      if (user.avatar_url) {
        avatarImg.src = user.avatar_url;
        avatarImg.style.display = "block";
      }
    } catch (err) {
      msgEl.textContent = err.message;
    }
  });
}


/* ---------- Admin page ---------- */

async function initAdminPage() {
  const reviewsContainer = document.getElementById("adminReviews");
  const errorEl = document.getElementById("adminError");
  if (!reviewsContainer) return;

  async function loadReviewsAdmin() {
    reviewsContainer.innerHTML = "Loading reviews...";

    try {
      const { reviews } = await api("/api/admin/reviews", { method: "GET" });
      if (!reviews.length) {
        reviewsContainer.innerHTML = "<p>No reviews yet.</p>";
        return;
      }

      const rows = reviews
        .map(
          (r) => `
        <tr data-id="${r.id}">
          <td>${r.id}</td>
          <td>${r.deal_title}</td>
          <td>${r.user_name} (${r.user_email})</td>
          <td>${r.rating}</td>
          <td>${r.comment || ""}</td>
          <td>${r.admin_reply || ""}</td>
          <td>${new Date(r.created_at).toLocaleString()}</td>
          <td>
            <button class="btn secondary btn-sm" data-action="admin-reply" data-id="${r.id}">Reply</button>
            <button class="btn secondary btn-sm" data-action="admin-delete" data-id="${r.id}">Delete</button>
          </td>
        </tr>`
        )
        .join("");

      reviewsContainer.innerHTML = `
        <h2>Reviews</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Deal</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Admin Reply</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    } catch (err) {
      reviewsContainer.innerHTML = "<p>Admin access required.</p>";
      if (errorEl) errorEl.textContent = err.message;
    }
  }

  // --- Users section for admin ---
  const usersSectionId = "adminUsersSection";
  let usersContainer = document.getElementById(usersSectionId);

  if (!usersContainer) {
    const main = document.querySelector("main.container");
    usersContainer = document.createElement("section");
    usersContainer.id = usersSectionId;
    usersContainer.className = "admin-table card";
    main.appendChild(usersContainer);
  }

  async function loadUsersAdmin() {
    usersContainer.innerHTML = "Loading users...";
    try {
      const { users } = await api("/api/admin/users", { method: "GET" });
      if (!users.length) {
        usersContainer.innerHTML = "<p>No users yet.</p>";
        return;
      }

      const rows = users
        .map(
          (u) => `
        <tr data-id="${u.id}">
          <td>${u.id}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.city || ""}</td>
          <td>${u.state || ""}</td>
          <td>${u.is_admin ? "Admin" : "User"}</td>
          <td>${u.created_at ? new Date(u.created_at).toLocaleString() : ""}</td>
          <td>
            ${
              u.is_admin
                ? ""
                : `<button class="btn secondary btn-sm" data-action="admin-delete-user" data-id="${u.id}">Delete</button>`
            }
          </td>
        </tr>`
        )
        .join("");

      usersContainer.innerHTML = `
        <h2>Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Role</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    } catch (err) {
      usersContainer.innerHTML = "<p>Failed to load users.</p>";
      if (errorEl) errorEl.textContent = err.message;
    }
  }

  // Set up click handlers (one listener for the page)
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "admin-delete") {
      if (!confirm("Delete this review?")) return;
      try {
        await api(`/api/admin/reviews/${id}`, {
          method: "DELETE",
          body: "{}",
        });
        await loadReviewsAdmin();
      } catch (err) {
        if (errorEl) errorEl.textContent = err.message;
      }
    }

    if (action === "admin-reply") {
      const reply = prompt("Enter admin reply:");
      if (reply === null) return;
      try {
        await api(`/api/admin/reviews/${id}/reply`, {
          method: "POST",
          body: JSON.stringify({ reply }),
        });
        await loadReviewsAdmin();
      } catch (err) {
        if (errorEl) errorEl.textContent = err.message;
      }
    }

    if (action === "admin-delete-user") {
      if (!confirm("Delete this user account?")) return;
      try {
        await api(`/api/admin/users/${id}`, {
          method: "DELETE",
          body: "{}",
        });
        await loadUsersAdmin();
      } catch (err) {
        if (errorEl) errorEl.textContent = err.message;
      }
    }
  });

  await loadReviewsAdmin();
  await loadUsersAdmin();
}


/* ---------- Boot ---------- */

document.addEventListener("DOMContentLoaded", () => {
  setupAuthUi();
  const page = document.body.dataset.page;

  switch (page) {
    case "home":
      initHomePage();
      break;
    case "login":
      initLoginPage();
      break;
    case "register":
      initRegisterPage();
      break;
    case "favorites":
      initFavoritesPage();
      break;
    case "deal":
      initDealPage();
      break;
    case "reviews":
      initReviewsPage();
      break;
    case "settings":
      initSettingsPage();
      break;
    case "admin":
      initAdminPage();
      break;
  }
});
