// src/screens/Home.jsx
import { useLoaderData, Link, useNavigation } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import Card from "../ui/Card.jsx";
import Tag from "../ui/Tag.jsx";
import { CardSkeleton } from "../ui/Loading.jsx";
import { DEMO_RECIPES } from "../lib/demo.js";

// NEW: tiny favorites helper (works reliably + fires events)
import { toggleFav, isFav } from "../lib/favs";

const CATS = [
  { key:"all", label:"All" },
  { key:"popular", label:"Popular" },
  { key:"quick", label:"Quick & Easy", tag:"quick" },
  { key:"vegetarian", label:"Vegetarian", tag:"vegetarian" },
  { key:"breakfast", label:"Breakfast", tag:"breakfast" },
  { key:"dessert", label:"Dessert", tag:"dessert" },
  { key:"seafood", label:"Seafood", tag:"seafood" },
];

export async function clientLoader({ request }){
  const url = new URL(request.url);
  const q   = url.searchParams.get("q")   || "";
  const cat = url.searchParams.get("cat") || "all";
  // demo data for the pitch
  return { recipes: DEMO_RECIPES, q, cat };
}

export default function Home(){
  const { recipes, q, cat } = useLoaderData();
  const nav = useNavigation();
  const loading = nav.state === "loading";

  // re-render when favorites change
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick(t => t + 1);
    window.addEventListener("favs:changed", bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener("favs:changed", bump);
      window.removeEventListener("storage", bump);
    };
  }, []);

  const filtered = useMemo(()=>{
    let out = recipes;
    if (q) {
      const needle = q.toLowerCase();
      out = out.filter(r =>
        r.title.toLowerCase().includes(needle) ||
        (r.tags || []).some(t => t.toLowerCase().includes(needle))
      );
    }
    if (cat && cat!=="all") {
      const tag = CATS.find(c=>c.key===cat)?.tag;
      if (tag) out = out.filter(r => (r.tags||[]).map(t=>t.toLowerCase()).includes(tag));
    }
    return out;
  },[recipes,q,cat]);

  function setCat(key){
    const url = new URL(window.location.href);
    url.searchParams.set("cat", key);
    window.location.assign(url); // triggers the loader again
  }

  return (
    <>
      <h2 className="section-title">Pick a category</h2>
      <div className="chips" role="tablist" aria-label="Recipe categories">
        {CATS.map(c => (
          <button
            key={c.key} role="tab"
            aria-current={c.key===cat}
            className="chip"
            onClick={()=>setCat(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <section className="grid">
          {Array.from({length:6}).map((_,i)=><CardSkeleton key={i}/>)}
        </section>
      ) : (
        <section className="grid">
          {filtered.map(r => (
            <div key={r.id} style={{position:"relative"}}>
              {/* <<< THIS is the floating + fav button >>> */}
              <button
                className={`fav-btn ${isFav(r.id) ? "liked" : ""}`}
                onClick={(e)=>{ e.preventDefault(); toggleFav(r.id); }}
                aria-label={isFav(r.id) ? "Remove from favorites" : "Save to favorites"}
                title={isFav(r.id) ? "Remove from favorites" : "Save to favorites"}
              >
                {/* plus icon */}
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Card navigates to the recipe */}
              <Link to={`/recipes/${r.id}`}>
                <Card>
                  <img src={r.photo_url ?? "https://picsum.photos/600/400"} alt={r.title}/>
                  <div className="body">
                    <h3>{r.title}</h3>
                    <p>{r.total_minutes ?? "—"} min · {r.difficulty ?? "easy"}</p>
                    <div className="tags">{(r.tags ?? []).map(t => <Tag key={t}>{t}</Tag>)}</div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
