import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    height: "60px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
  };

  const linkGroupStyle = {
    display: "flex",
    gap: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#374151",
    fontSize: "16px",
    fontWeight: 500,
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#111827",
  };

  return (
    <nav style={navStyle}>
      {/* App title */}
      <div style={titleStyle}>Card Management App</div>

      {/* Navigation links */}
      <div style={linkGroupStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/cards" style={linkStyle}>
          Cards
        </Link>
        <Link to="/cards/new" style={linkStyle}>
          Add Card
        </Link>
      </div>
    </nav>
  );
}

