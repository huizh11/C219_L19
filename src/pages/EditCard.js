import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CardForm from "../components/CardForm";

const API_BASE = process.env.REACT_APP_API_URL;

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch ALL cards, then filter by ID
  useEffect(() => {
    async function fetchCard() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE}/allcards`);

        if (!response.ok) {
          throw new Error("Unable to load card data");
        }

        const data = await response.json();

        // find the card that matches the route param
        const card = data.find(
          (c) => String(c.id) === String(id)
        );

        if (!card) {
          throw new Error("Card not found");
        }

        setInitialValues(card);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [id]);

  // ✅ Update card
  async function handleSubmit(updatedCard) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/cards/${id}`, {
        method: "PUT", // must match backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      navigate("/cards");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading card...</p>;

  if (error)
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/cards">← Back to Cards</Link>
      </div>
    );

  return (
    <div>
      <h2>Edit Card</h2>

      <CardForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={saving ? "Saving..." : "Update Card"}
        disabled={saving}
      />

      <Link to="/cards">← Back to Cards</Link>
    </div>
  );
}
