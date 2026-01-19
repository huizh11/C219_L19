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
      <h3>{card.title}</h3>
      <p>{card.description}</p>

      <button onClick={onDelete}>
        Delete
      </button>
    </div>
  );

  return <div></div>;
}
