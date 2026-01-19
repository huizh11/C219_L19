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

<<<<<<< HEAD
      return (
    <div>
      <img src={card.image} alt={card.name}/>
      <h3>{card.name}</h3>
      <p>ID: {card.id}</p>
=======
      {/* Card Info */}
      <h3>{card.card_name}</h3>
      <p>ID: {card.card_id}</p>
>>>>>>> 3ae7b6b3cbf16b0fb7574500cff66cf3598bb157

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
