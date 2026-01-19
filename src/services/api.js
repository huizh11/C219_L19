// FRONTEND API SERVICE (React only)

const API_URL = process.env.REACT_APP_API_URL;

// GET all cards
export async function getCards() {
  const res = await fetch(`${API_URL}/allcards`);
  if (!res.ok) throw new Error("Failed to fetch cards");
  return res.json();
}

// ADD card
export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  if (!res.ok) throw new Error("Failed to add card");
  return res.json();
}

// UPDATE card
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

// DELETE card
export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete card");
  return res.json();
}
