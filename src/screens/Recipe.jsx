import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DEMO_RECIPES, DEMO_STEPS } from "../lib/demo.js";
import { toggleFav, isFav } from "../lib/favs";

export async function clientLoader({ params }) {
  const recipe = DEMO_RECIPES.find(r => String(r.id) === String(params.id));
  const steps  = DEMO_STEPS[String(params.id)] ?? [];
  if (!recipe) throw new Response("Not found", { status: 404 });
  return { recipe, steps };
}

export default function Recipe() {
  const { recipe, steps } = useLoaderData();
  const nav = useNavigate();

  // Track favorite state live
  const [liked, setLiked] = useState(isFav(recipe.id));
  useEffect(() => {
    const update = () => setLiked(isFav(recipe.id));
    window.addEventListener("favs:changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("favs:changed", update);
      window.removeEventListener("storage", update);
    };
  }, [recipe.id]);

  return (
    <article className="recipe">
      {/* Hero image with sticky mint header */}
      <div className="recipe-hero">
        <img src={recipe.photo_url} alt={recipe.title} />
        <div className="hero-bar">
          {/* back */}
          <button
            className="btn-white btn-pill"
            onClick={() => nav(-1)}
            aria-label="Back"
          >
            ←
          </button>

          {/* title & meta */}
          <div className="hero-title">
            <img src={recipe.photo_url} alt="" />
            <div>
              <h1>{recipe.title}</h1>
              <div className="hero-meta">
                <span>
                  <small>LEVEL</small>
                  <strong style={{ textTransform: "capitalize" }}>
                    {recipe.difficulty ?? "easy"}
                  </strong>
                </span>
                <span>
                  <small>TIME</small>
                  <strong>≈ {recipe.total_minutes} min</strong>
                </span>
                <span>
                  <small>YIELD</small>
                  <strong>2 servings</strong>
                </span>
              </div>
            </div>
          </div>

          {/* + add to favorites */}
          <button
            className={`btn-white btn-pill ${liked ? "liked" : ""}`}
            onClick={() => toggleFav(recipe.id)}
            aria-label={liked ? "Remove from favorites" : "Save to favorites"}
            style={{
              fontWeight: 800,
              fontSize: "18px",
              width: "48px",
              height: "48px",
              display: "grid",
              placeItems: "center",
              borderRadius: "999px"
            }}
          >
            {liked ? "✓" : "+"}
          </button>
        </div>
      </div>

      {/* Stat tiles */}
      <section className="stat-grid">
        <div className="stat">
          <span>Prep Time</span>
          <strong>~ {(recipe.total_minutes * 0.4) | 0} mins</strong>
        </div>
        <div className="stat">
          <span>Cook Time</span>
          <strong>~ {(recipe.total_minutes * 0.6) | 0} mins</strong>
        </div>
        <div className="stat">
          <span>Total Time</span>
          <strong>{recipe.total_minutes} mins</strong>
        </div>
        <div className="stat">
          <span>Serving Size</span>
          <div className="qty">
            <button>-</button>
            <b>2</b>
            <button>+</button>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="card-soft section">
        <h2>Ingredients</h2>
        <ul className="ing">
          <li>200 g pasta</li>
          <li>2 tbsp olive oil</li>
          <li>2 cloves garlic, minced</li>
          <li>1 cup tomatoes, chopped</li>
          <li>Salt &amp; pepper</li>
        </ul>
      </section>

      {/* Directions */}
      <section className="card-soft section">
        <h2>Directions</h2>
        <ol className="steps">
          {(steps.length ? steps : [
            { id: "a", step_no: 1, instruction: "Boil pasta in salted water until al dente." },
            { id: "b", step_no: 2, instruction: "Sauté garlic in olive oil, add tomatoes; simmer." },
            { id: "c", step_no: 3, instruction: "Toss pasta in sauce, season, and serve warm." },
          ]).map(s => (
            <li key={s.id}>
              <span className="num">{s.step_no}</span>
              <p>{s.instruction}</p>
            </li>
          ))}
        </ol>
      </section>

      <div style={{ height: 20 }} />
    </article>
  );
}
