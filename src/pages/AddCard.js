import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (cardData) => {
    try {
      setBusy(true);
      setError("");
      await addCard(cardData);
      navigate("/cards");
    } catch {
      setError("Failed to add card");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <h2>Add New Card</h2>
      {error && <p>{error}</p>}
      <CardForm onSubmit={handleSubmit} busy={busy} />
    </main>
  );
}
