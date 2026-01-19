import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

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
    try {
      await deleteCard(card.id);
      setCards(cards.filter(c => c.id !== card.id));
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

      <div>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => handleDelete(card)}
            disabled={busy}
          />
        ))}
      </div>
    </main>
  );
}
