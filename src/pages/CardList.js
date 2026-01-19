import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // fetch all cards
  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const data = await getCards();
        setCards(data);
      } catch (err) {
        setError("Failed to load cards");
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  // delete card
  async function handleDelete(card) {
    try {
      setBusy(true);
      await deleteCard(card.id);
      setCards(cards.filter(c => c.id !== card.id));
    } catch (err) {
      setError("Failed to delete card");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <main><p>Loading cards...</p></main>;
  }

  if (error) {
    return <main><p>{error}</p></main>;
  }

  return (
    <main>
      {busy && <p>Processing...</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem"
      }}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => handleDelete(card)}
          />
        ))}
      </div>
    </main>
  );
}
