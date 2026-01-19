import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  return (
    <div className="card">
      {/* Card Image */}
      <img
        src={card.card_pic}
        alt={card.card_name}
        className="card-img"
      />

      {/* Card Info */}
      <h3>{card.card_name}</h3>
      <p>ID: {card.card_id}</p>

      {/* Actions */}
      <div className="card-actions">
        <Link to={`/edit/${card.card_id}`}>
          <button>Edit</button>
        </Link>

        <button
          onClick={() => onDelete(card)}
          disabled={busy}
        >
          {busy ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
