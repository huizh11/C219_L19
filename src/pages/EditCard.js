import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch existing card data
  useEffect(() => {
    fetch(`${API_URL}/cards/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch card");
        }
        return res.json();
      })
      .then((data) => {
        setCard(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load card data.");
        setLoading(false);
      });
  }, [API_URL, id]);

  // Submit updated card
  function handleUpdate(updatedCard) {
    fetch(`${API_URL}/cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Update failed");
        }
        navigate("/cards");
      })
      .catch(() => {
        setError("Failed to update card.");
      });
  }

  if (loading) {
    return <p>Loading card...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Edit Card</h1>

      <CardForm
        initialData={card}
        onSubmit={handleUpdate}
        submitLabel="Update Card"
      />
    </main>
  );
}
