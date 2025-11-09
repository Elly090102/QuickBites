// src/screens/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <div className="card-soft" style={{ width: "min(560px,92vw)", padding: "26px 20px", textAlign: "center" }}>
        <div className="art" style={{ height: 220, marginBottom: 16, display: "grid", placeItems: "center" }}>
          <img src="/onboarding/404.svg" alt="Not found" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <h1 style={{ margin: "0 0 8px" }}>Page not found</h1>
        <p className="muted" style={{ margin: "0 0 18px" }}>
          This page isn’t ready yet or the link is invalid.
        </p>
        <Link to="/" className="btn-white btn-pill">Back to Home</Link>
      </div>
    </div>
  );
}
