import { Link } from "react-router-dom";
 
export default function Card({ card, onDelete, busy }) {
 
  return (
    <div>
      <img src={card.card_pic} alt={card.card_name} />
      <h2>{card.card_name}</h2>
      <p>ID: {card.id}</p>
      <Link to={`/cards/${card.id}/edit`}>Edit</Link>
      <button onClick={() => onDelete(card)}>Delete</button>
    </div>
  );
}