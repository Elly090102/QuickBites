// src/ui/RecipeCard.jsx
import { Link } from "react-router-dom";

export default function RecipeCard({ r }){
  return (
    <Link to={`/recipe/${r.id}`} className="rcard">
      <div className="rcard-img">
        <img src={r.photo_url} alt={r.title}/>
      </div>
      <div className="rcard-body">
        <h3>{r.title}</h3>
        <p>{r.total_minutes} min · {r.difficulty}</p>
        <div className="tags">
          {(r.tags||[]).slice(0,2).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}
