// src/lib/favs.js
const KEY = "favs";

export function getFavs() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
export function setFavs(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  // Fire a custom event that *always* runs in this tab
  window.dispatchEvent(new Event("favs:changed"));
  // Also fire "storage" for cross-tab listeners (doesn’t fire in same tab)
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
}
export function toggleFav(id) {
  const set = new Set(getFavs());
  set.has(id) ? set.delete(id) : set.add(id);
  setFavs([...set]);
}
export function isFav(id) {
  return getFavs().includes(id);
}
