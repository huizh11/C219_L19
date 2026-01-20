import { useState } from "react";

export default function CardForm({
  onSubmit,
  submitLabel = "Add Card",
  busy = false,
}) {
  const [card_name, setCardName] = useState("");
  const [card_pic, setCardPic] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!card_name.trim() || !card_pic.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");
    onSubmit({
      card_name,
      card_pic,
    });
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "6px",
  };

  const fieldStyle = {
    marginBottom: "16px",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Card Name
        <input
          type="text"
          value={card_name}
          disabled={busy}
          onChange={(e) => setCardName(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <br /><br />

      <label>
        Card Image URL
        <input
          type="text"
          value={card_pic}
          disabled={busy}
          onChange={(e) => setCardPic(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <br /><br />

      <button
        type="submit"
        disabled={busy}
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: busy ? "not-allowed" : "pointer",
        }}
      >
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
