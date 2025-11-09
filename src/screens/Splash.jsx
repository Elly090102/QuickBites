import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash(){
  const nav = useNavigate();
  useEffect(()=>{ window.scrollTo(0,0); },[]);

  function start(){
    localStorage.setItem("started","1");
    nav("/onboarding");
  }

  return (
    <div className="splash">
      <div className="card-soft" style={{ width:"min(560px, 92vw)", padding:"28px 22px", textAlign:"center" }}>
        <div className="art" style={{ height: 220, display:"grid", placeItems:"center", marginBottom:18 }}>
          <img src="/logo.png" alt="QuickBites" style={{ height:110, objectFit:"contain" }} />
        </div>
        <h1 style={{ margin:"0 0 8px" }}>QuickBites</h1>
        <p className="muted" style={{ margin:"0 0 18px" }}>Fast, tasty recipes for busy days.</p>
        <button className="btn-white btn-pill" style={{ width:"100%" }} onClick={start}>
          Get started
        </button>
      </div>
    </div>
  );
}
