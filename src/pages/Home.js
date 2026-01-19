import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Card Management Application</h1>

      <p>
        Welcome to the <strong>Card Management App</strong>. This application
        allows you to view, add, edit, and delete cards that are stored in a
        backend database.
      </p>

      <p>
        The frontend is built using <strong>React</strong> and communicates with
        a backend API developed using <strong>Express and Node.js</strong>.
      </p>

      <h2>What you can do</h2>
      <ul>
        <li>View all cards retrieved from the backend</li>
        <li>Add a new card using a form</li>
        <li>Edit existing cards</li>
        <li>Delete cards from the system</li>
      </ul>

      <p>
        Use the navigation bar or the button below to begin managing your cards.
      </p>

      <Link
        to="/cards"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        View Cards
      </Link>
    </main>
  );
}
