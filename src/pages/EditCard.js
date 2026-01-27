import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CardForm from "../components/CardForm";

const API_BASE = process.env.REACT_APP_API_URL;

export default function EditCard() {
  const { id } = useParams(); // gets id from the render
  const navigate = useNavigate(); // used to redirect to the cards list page after its being updated

  const [initialValues, setInitialValues] = useState(null); // stores existing card data
  const [loading, setLoading] = useState(true); // shows loading card while fetching data
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Fetch card from the backend by ID
  // =========================
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

        const card = data.find(
          (c) => String(c.id) === String(id)
        );

        if (!card) {
          throw new Error("Card not found");
        }

        setInitialValues({
          card_name: card.card_name,
          card_pic: card.card_pic,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [id]);

  // =========================
  // Update card by ID
  // =========================
  async function handleSubmit(updatedCard) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/updatecard/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_name: updatedCard.card_name,
          card_pic: updatedCard.card_pic,
        }),
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

  // =========================
  // Delete card by the ID
  // =========================
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (!confirmDelete) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/deletecard/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      navigate("/cards");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // UI states
  // =========================
  if (loading) return <p>Loading card...</p>;

  if (error)
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/cards">← Back to Cards</Link>
      </div>
    );

  // =========================
  // Render
  // =========================
  return (
    <div>
      <h2>Edit Card</h2>

      <CardForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={saving ? "Saving..." : "Update Card"}
        busy={saving}
      />

      <button
        onClick={handleDelete}
        disabled={saving}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          marginTop: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Delete Card
      </button>

      <br />
      <Link to="/cards">← Back to Cards</Link>
    </div>
  );
}
