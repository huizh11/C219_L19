import { useState } from "react";
// React hook for managing form state

export default function CardForm({
  onSubmit,                 // Handles form submission (from parent)
  submitLabel = "Add Card", // Form title and button text
  busy = false,             // Controls loading / disabled state
}) {

  const [card_name, setCardName] = useState("");
  // Stores card name input

  const [card_pic, setCardPic] = useState("");
  // Stores card image URL input

  const [error, setError] = useState("");
  // Stores validation error message

  function handleSubmit(e) {
    e.preventDefault();
    // Prevent page refresh

    if (!card_name.trim() || !card_pic.trim()) {
      setError("All fields are required");
      return;
    }
    // Validate input fields

    setError("");

    onSubmit({
      card_name,
      card_pic,
    });
    // Send form data to parent component
  }

  /* ---------- inline styles ---------- */

  const formStyle = {
    maxWidth: 480,
    margin: "40px auto",
    padding: "24px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  };

  const fieldStyle = { marginBottom: "18px" };

  const labelStyle = {
    display: "block",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
  };

  const errorStyle = {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: 600,
    backgroundColor: busy ? "#93c5fd" : "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: busy ? "not-allowed" : "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>
        {submitLabel}
      </h2>

      {error && <div style={errorStyle}>{error}</div>}
      {/* Show validation error */}

      <div style={fieldStyle}>
        <label style={labelStyle}>Card Name</label>
        <input
          type="text"
          value={card_name}
          disabled={busy}
          onChange={(e) => setCardName(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Card Image URL</label>
        <input
          type="text"
          value={card_pic}
          disabled={busy}
          onChange={(e) => setCardPic(e.target.value)}
          style={inputStyle}
        />
      </div>

      <button type="submit" disabled={busy} style={buttonStyle}>
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
