import { useEffect, useState } from "react";

export default function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allcards")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Card List</h1>

      {cards.length === 0 && <p>No cards found.</p>}

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <strong>{card.title}</strong> — {card.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

