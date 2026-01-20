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
      console.log("in load: "+data);
      setCards(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(card) {
    try {
      await deleteCard(card.id);
      setCards(cards.filter(c => c.id !== card.id));
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
  <main>
    <h1>Card List</h1>

    {/* ADD CARD BUTTON */}
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

    {error && <p>{error}</p>}
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
