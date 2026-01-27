// FRONTEND API SERVICE (React only)

const API_URL = process.env.REACT_APP_API_URL;

// helper: attach JWT if exists
function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// =======================
// LOGIN
// =======================
export async function login({ username, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json(); // { token }
}

// =======================
// GET all cards
// =======================
export async function getCards() {
  const res = await fetch(`${API_URL}/allcards`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// =======================
// ADD card (JWT protected)
// =======================
export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(card),
  });

  if (!res.ok) throw new Error("Failed to add card");
  return res.json();
}

// =======================
// UPDATE card
// =======================
export async function updateCard(id, card) {
  const res = await fetch(`${API_URL}/updatecard/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  if (!res.ok) throw new Error("Failed to update card");
  return res.json();
}

// =======================
// DELETE card
// =======================
export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete card");
  return res.json();
}
