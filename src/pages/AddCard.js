import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate(); 
  // Used to redirect after adding a card

  const [busy, setBusy] = useState(false); 
  // Tracks loading state to disable form

  const [error, setError] = useState(""); 
  // Stores API error message

  const handleSubmit = async (cardData) => {
    // Handles form submission and receives data from CardForm
    try {
      setBusy(true);
      setError("");

      await addCard(cardData); 
      // Sends card data to backend

      navigate("/cards");   
      // Redirects to cards page after success
    } catch {
      setError("Failed to add card"); 
      // Shows error if submission fails
    } finally {
      setBusy(false); 
      // Re-enables form
    }
  };

  return (
    <main>
      <h2>Add New Card</h2>

      {error && <p>{error}</p>} 
      {/* Display error message */}

      <CardForm onSubmit={handleSubmit} busy={busy} /> 
      {/* Reusable form component */}
    </main>
  );
}
