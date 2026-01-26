import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";
import { Link } from "react-router-dom";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(card) {
    setBusy(true);
    setError(null);

    try {
      await deleteCard(card.id);

      // ✅ remove deleted card from UI
      setCards(prevCards =>
        prevCards.filter(c => c.id !== card.id)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main>
      <h1>Card List</h1>

      <Link to="/add">
        <button
          style={{
            marginBottom: "1rem",
            padding: "0.6rem 1.2rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          + Add Card
        </button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <div>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => handleDelete(card)}
            busy={busy}
          />
        ))}
      </div>
    </main>
  );
}
