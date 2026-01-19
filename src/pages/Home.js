import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
      }}
    >
      <section
        style={{
          maxWidth: "700px",
          padding: "2.5rem",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>
          Card Management Application
        </h1>

        <p style={{ marginBottom: "1rem", color: "#374151" }}>
          Welcome to the <strong>Card Management App</strong>. This application
          allows you to view, add, edit, and delete cards stored in a backend
          database.
        </p>

        <p style={{ marginBottom: "1.5rem", color: "#374151" }}>
          The frontend is built using <strong>React</strong> and communicates
          with a backend API developed using{" "}
          <strong>Express and Node.js</strong>.
        </p>

        <h3 style={{ marginBottom: "0.5rem" }}>What you can do</h3>
        <ul style={{ marginBottom: "1.5rem", color: "#374151" }}>
          <li>View all cards retrieved from the backend</li>
          <li>Add a new card using a form</li>
          <li>Edit existing cards</li>
          <li>Delete cards from the system</li>
        </ul>

        <Link
          to="/cards"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.75rem",
            backgroundColor: "#2563eb",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          View Cards
        </Link>
      </section>
    </main>
  );
}
