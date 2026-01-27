import { Link } from "react-router-dom";

//displaying card details
export default function Card({ card, onDelete, busy }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
      }}
    >
      <img
        src={card.card_pic}
        alt={card.card_name}
        style={{
          width: "90px",
          height: "auto",
          borderRadius: "8px",
        }}
      />

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{card.card_name}</h3>
        <p style={{ margin: "0.25rem 0 0", color: "#6b7280" }}>
          ID: {card.id}
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link
          to={`/cards/${card.id}/edit`}
          style={{
            padding: "0.45rem 0.9rem",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}
        >
          Edit
        </Link>

{/* //provides edit del options */}
        <button
          onClick={() => onDelete(card)}
          disabled={busy}
          style={{
            padding: "0.45rem 0.9rem",
            backgroundColor: busy ? "#9ca3af" : "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: busy ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
