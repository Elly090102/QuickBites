import { NavLink, Form, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "/logo.png";
import { getFavs } from "../lib/favs";

export default function Header(){
  const [sp] = useSearchParams();
  const q = sp.get("q") || "";
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const update = () => setFavCount(getFavs().length);
    update();
    window.addEventListener("favs:changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("favs:changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <>
      {/* Logo row (click → home) */}
      <div className="header-row">
        <Link to="/" className="brand-lg" aria-label="QuickBites – Home">
          <img src={logo} alt="" />
          <strong>QuickBites</strong>
        </Link>
      </div>

      {/* Search bar */}
      <Form role="search" method="get" action="/" style={{ marginBottom: 10 }}>
        <div className="search">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search recipes…"
            aria-label="Search recipes"
          />
          <button className="btn btn-pill" type="submit">Search</button>
        </div>
      </Form>

      {/* Word nav */}
      <nav className="topnav" aria-label="Primary">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/favorites" className="fav-link">
          Favorites
          {favCount > 0 && <span className="fav-badge">{favCount}</span>}
        </NavLink>
        <NavLink to="/new">Add Recipe</NavLink>
      </nav>
    </>
  );
}
