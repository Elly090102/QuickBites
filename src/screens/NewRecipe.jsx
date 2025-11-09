import { Form, redirect, useActionData } from "react-router-dom";
import { spost } from "../lib/supa";
import Button from "../ui/Button.jsx";

export async function clientAction({ request }){
  const fd = await request.formData();
  const title = (fd.get("title") || "").trim();
  if (!title) return { error:"Title is required." };
  const difficulty = fd.get("difficulty") || "easy";
  const total_minutes = Number(fd.get("total_minutes") || 0) || null;
  const tags = (fd.get("tags") || "").split(",").map(s=>s.trim()).filter(Boolean);
  const photo_url = fd.get("photo_url") || null;

  const [created] = await spost("recipes", { title, difficulty, total_minutes, tags, photo_url }, { returnRepresentation:true });
  return redirect(`/recipes/${created.id}`);
}

export default function NewRecipe(){
  const action = useActionData();
  return (
    <section className="form">
      <h1 style={{marginTop:0}}>Add a Recipe</h1>
      <Form method="post">
        <label>Title</label>
        <input name="title" placeholder="5-min Eggs" required />
        <label>Total minutes</label>
        <input name="total_minutes" type="number" min="0" />
        <label>Difficulty</label>
        <select name="difficulty" defaultValue="easy">
          <option>easy</option><option>medium</option><option>hard</option>
        </select>
        <label>Tags (comma-sep)</label>
        <input name="tags" placeholder="quick, vegetarian" />
        <label>Photo URL</label>
        <input name="photo_url" placeholder="https://..." />
        <div style={{marginTop:14}}>
          <Button type="submit">Create</Button>
        </div>
        {action?.error && <p className="error">{action.error}</p>}
      </Form>
    </section>
  );
}
