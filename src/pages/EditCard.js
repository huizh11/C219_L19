import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CardForm from "../components/CardForm";

// ✅ Matches your .env exactly
const API_BASE = process.env.REACT_APP_API_URL;

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing card
  useEffect(() => {
    async function fetchCard() {
      setLoading(true);
      setError("");

      try {
        if (!API_BASE) {
          throw new Error("API URL is not configured");
        }

        const response = await fetch(`${API_BASE}/cards/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch card details");
        }

        const data = await response.json();
        setInitialValues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [id]);

  // Update card
  async function handleSubmit(updatedCard) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/cards/${id}`, {
        method: "PUT", // change to PATCH if your backend uses PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      // redirect after success
      navigate("/cards");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading card...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/cards">← Back to Cards</Link>
      </div>
    );
  }

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
