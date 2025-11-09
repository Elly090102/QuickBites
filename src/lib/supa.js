import { DEMO_RECIPES, DEMO_STEPS } from "./demo";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function fetchJSON(full){
  const res = await fetch(full, { headers:{ apikey:key, Authorization:`Bearer ${key}` } });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

/* READ with graceful fallback to demo data */
export async function sget(pathAndQuery){
  try{
    if (!url || !key) throw new Error("Missing env");
    return await fetchJSON(`${url}/rest/v1/${pathAndQuery}`);
  }catch(e){
    // Fallback logic
    if (pathAndQuery.startsWith("recipes?")) return DEMO_RECIPES;
    if (pathAndQuery.startsWith("steps?")){
      const match = pathAndQuery.match(/recipe_id=eq\.([a-z0-9-]+)/i);
      const id = match?.[1];
      return (DEMO_STEPS[id] || []).sort((a,b)=>a.step_no-b.step_no);
    }
    return [];
  }
}

/* WRITE: if offline, no-op but succeed so UI continues smoothly */
export async function spost(table, body, { returnRepresentation=false } = {}){
  try{
    if (!url || !key) throw new Error("Missing env");
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method:"POST",
      headers:{
        apikey:key, Authorization:`Bearer ${key}`,
        "Content-Type":"application/json",
        ...(returnRepresentation && { Prefer:"return=representation" })
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Create failed");
    return returnRepresentation ? res.json() : null;
  }catch(e){
    // offline demo mode: fake insert ID & return
    if (returnRepresentation) return [{ ...body, id: crypto.randomUUID() }];
    return null;
  }
}
