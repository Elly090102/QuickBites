export const DEMO_RECIPES = [
  {
    id: "pasta-10",
    title: "10-min Tomato Pasta",
    photo_url: "/public/images/pasta.jpg",
    total_minutes: 10,
    difficulty: "easy",
    tags: ["quick","vegetarian","dinner"]
  },
  {
    id: "koshary",
    title: "Egyptian Koshary",
    photo_url: "/public/images/koshari.jpg",
    total_minutes: 45,
    difficulty: "medium",
    tags: ["popular","vegan"]
  },
  {
    id: "zucchini-boats",
    title: "Stuffed Zucchini Boats",
    photo_url: "/public/images/zucchini.jpg",
    total_minutes: 35,
    difficulty: "easy",
    tags: ["vegetarian","popular"]
  },
  {
    id: "comfort-fish",
    title: "One-Pot Comfort Fish",
    photo_url: "/public/images/fish.jpg",
    total_minutes: 30,
    difficulty: "easy",
    tags: ["seafood","dinner"]
  },
  {
    id: "oat-bowl",
    title: "Berry Oat Breakfast Bowl",
    photo_url: "/public/images/oat.jpg",
    total_minutes: 7,
    difficulty: "easy",
    tags: ["breakfast","quick","vegetarian"]
  },
  {
    id: "choc-mousse",
    title: "Light Chocolate Mousse",
    photo_url: "/public/images/mousse.jpg",
    total_minutes: 20,
    difficulty: "easy",
    tags: ["dessert","popular"]
  },
];

export const DEMO_STEPS = {
  "pasta-10": [
    { id:"a", step_no:1, instruction:"Boil pasta in salted water until al dente." },
    { id:"b", step_no:2, instruction:"Sauté garlic in olive oil, add tomatoes; simmer briefly." },
    { id:"c", step_no:3, instruction:"Toss pasta with sauce, season, serve with basil." },
  ],
  "koshary": [
    { id:"a", step_no:1, instruction:"Cook rice, pasta, and lentils separately." },
    { id:"b", step_no:2, instruction:"Make spiced tomato sauce; fry onions." },
    { id:"c", step_no:3, instruction:"Assemble layers and top with crispy onions." },
  ],
};
