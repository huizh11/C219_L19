import { useEffect, useState } from "react";

export default function CardForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
  disabled = false,
}) {
  const [formData, setFormData] = useState({
    cardName: "",
    cardId: "",
    cardUrl: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        cardName: initialValues.cardName || "",
        cardId: initialValues.cardId || "",
        cardUrl: initialValues.cardUrl || "",
      });
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
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
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <div style={fieldStyle}>
        <label>Card Name</label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          disabled={disabled}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Card ID</label>
        <input
          type="text"
          name="cardId"
          value={formData.cardId}
          onChange={handleChange}
          disabled={disabled}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Card URL</label>
        <input
          type="url"
          name="cardUrl"
          value={formData.cardUrl}
          onChange={handleChange}
          disabled={disabled}
          required
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
