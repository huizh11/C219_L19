import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  /* TODO: Complete the Card component
    - display the card image and name
    - display the card ID
    - edit button linking to edit page
    - delete button calling onDelete with the card object
    - style as a card UI */

      return (
    <div>
      <img src={card.image} alt={card.name}/>
      <h3>{card.name}</h3>
      <p>{card.id}</p>
      <Link to={`/cards/${card.id}/edit`}> Edit</Link>
      <button onClick={() => onDelete(card)} disabled={busy}>Delete</button>
    </div>
  );

  return <div></div>;
}
