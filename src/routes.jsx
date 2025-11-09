import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Layout from "./screens/Layout.jsx";
import Splash from "./screens/Splash.jsx";
import Home,       { clientLoader as homeLoader }     from "./screens/Home.jsx";
import Recipe,     { clientLoader as recipeLoader }   from "./screens/Recipe.jsx";
import NewRecipe,  { clientAction as newRecipeAction } from "./screens/NewRecipe.jsx";
import Favorites,  { clientLoader as favLoader }      from "./screens/Favorites.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import NotFound   from "./screens/NotFound.jsx";
import { ToastProvider } from "./ui/toast.jsx";

/* Gate: first run → /start, then /onboarding, else proceed */
async function gateLoader() {
  const started   = localStorage.getItem("started");
  const onboarded = localStorage.getItem("onboarded");
  if (!started)    throw redirect("/start");
  if (!onboarded)  throw redirect("/onboarding");
  return null;
}

function Root() {
  const router = createBrowserRouter([
    // Public entry flows (bypass the gate)
    { path: "/start",      element: <Splash /> },
    { path: "/onboarding", element: <Onboarding /> },

    // App shell
    {
      path: "/",
      element: <Layout />,
      loader: gateLoader,
      children: [
        { index: true,           element: <Home />,       loader: homeLoader },
        { path: "favorites",     element: <Favorites />,  loader: favLoader },
        {
          path: "recipes/:id",
          element: <Recipe />,
          loader: recipeLoader,
          // If the loader throws 404/Response, show NotFound
          errorElement: <NotFound />
        },
        { path: "new",           element: <NewRecipe />,  action: newRecipeAction },

        // Catch-all for unknown nested paths under "/"
        { path: "*",             element: <NotFound /> },
      ],
      // Fallback for unhandled errors inside the shell
      errorElement: <NotFound />
    },

    // Top-level catch-all so unknown absolute paths (not hitting "/") also 404 nicely
    { path: "*", element: <NotFound /> }
  ]);

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default Root;
