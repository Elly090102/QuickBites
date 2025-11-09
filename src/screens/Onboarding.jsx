import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  { title:"Discover Recipes", text:"Browse fast, tasty meals tailored to your taste and time.", art:"/onboarding/discover.svg" },
  { title:"Save Favorites", text:"Keep the recipes you love with a single tap.", art:"/onboarding/favorites.svg" },
  { title:"Cook Calmly", text:"Clear, easy steps make cooking relaxing.", art:"/onboarding/cook.svg" },
  { title:"Add Your Recipe", text:"Share your creations with everyone.", art:"/onboarding/add.svg" },
];

export default function Onboarding(){
  const [i, setI] = useState(0);
  const nav = useNavigate();

  function next(){ i < slides.length-1 ? setI(i+1) : finish(); }
  function back(){ if(i>0) setI(i-1); }
  function skip(){ finish(); }
  function finish(){ localStorage.setItem("onboarded","1"); nav("/"); }

  const s = slides[i];

  return (
    <div className="container" style={{ minHeight:"100dvh", display:"grid", placeItems:"center" }}>
      <div className="card-soft" style={{ width:"min(560px, 92vw)", padding:"26px 20px", textAlign:"center" }}>
        <div style={{ textAlign:"right", marginBottom:8 }}>
          <button onClick={skip} className="btn-outline btn-pill">Skip</button>
        </div>

        <div className="art" style={{ height: 240, marginBottom: 18, display:"grid", placeItems:"center" }}>
          <img src={s.art} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"contain" }} />
        </div>

        <h1 style={{ margin:"4px 0 8px" }}>{s.title}</h1>
        <p className="muted" style={{ margin:"0 0 18px" }}>{s.text}</p>

        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:12 }}>
          {i>0 && <button className="btn-outline btn-pill" onClick={back}>Back</button>}
          <button className="btn-white btn-pill" style={{ minWidth:140 }} onClick={next}>
            {i<slides.length-1 ? "Next" : "Get started"}
          </button>
        </div>

        <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
          {slides.map((_,idx)=>
            <span key={idx} style={{
              width:10, height:10, borderRadius:999,
              background: idx===i ? "var(--brand)" : "rgba(85,179,77,.28)"
            }}/>
          )}
        </div>
      </div>
    </div>
  );
}
