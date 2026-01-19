import { useEffect, useState } from "react";

export default function CardForm({
  initialData = { title: "", description: "" },
  onSubmit,
  submitLabel = "Save",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("All fields are required.");
      return;
    }

    setError("");
    onSubmit({
      title,
      description,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Description
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>
      </div>

      <button
        type="submit"
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
