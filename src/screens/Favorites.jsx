import { useLoaderData, Link, useNavigation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { DEMO_RECIPES } from "../lib/demo.js";
import { getFavs, isFav, toggleFav } from "../lib/favs";
import Card from "../ui/Card.jsx";
import Tag from "../ui/Tag.jsx";
import { CardSkeleton } from "../ui/Loading.jsx";

export async function clientLoader() {
  // Only keep recipes whose id is in localStorage.favs
  const ids = new Set(getFavs().map(String));
  const rows = DEMO_RECIPES.filter(r => ids.has(String(r.id)));
  return { rows };
}

export default function Favorites() {
  const { rows } = useLoaderData();
  const nav = useNavigation();
  const loading = nav.state === "loading";

  // Keep a live list in case user unfavs/favs here or elsewhere
  const [list, setList] = useState(rows);

  useEffect(() => {
    const sync = () => {
      const ids = new Set(getFavs().map(String));
      setList(DEMO_RECIPES.filter(r => ids.has(String(r.id))));
    };
    window.addEventListener("favs:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("favs:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (loading) {
    return (
      <section className="grid">
        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
      </section>
    );
  }

  if (!list.length) {
    return (
      <div className="card-soft section" style={{ textAlign: "center" }}>
        <h2>No favorites yet</h2>
        <p className="muted">Tap the <b>+</b> on any recipe to save it here.</p>
        <Link className="btn btn-pill" to="/">Browse recipes</Link>
      </div>
    );
  }

  return (
    <section className="grid">
      {list.map(r => (
        <div key={r.id} style={{ position: "relative" }}>
          {/* + / ✓ favorite toggle */}
          <button
            className={`fav-btn ${isFav(r.id) ? "liked" : ""}`}
            onClick={(e) => { e.preventDefault(); toggleFav(r.id); }}
            aria-label={isFav(r.id) ? "Remove from favorites" : "Save to favorites"}
            title={isFav(r.id) ? "Remove from favorites" : "Save to favorites"}
            style={{
              width: 44, height: 44, borderRadius: 999,
              fontWeight: 800, fontSize: 18, display: "grid", placeItems: "center"
            }}
          >
            {isFav(r.id) ? "✓" : "+"}
          </button>

          <Link to={`/recipes/${r.id}`}>
            <Card>
              <img src={r.photo_url} alt={r.title} />
              <div className="body">
                <h3>{r.title}</h3>
                <p>{r.total_minutes ?? "—"} min · {r.difficulty ?? "easy"}</p>
                <div className="tags">
                  {(r.tags ?? []).map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </section>
  );
}
