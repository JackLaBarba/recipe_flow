import Recipe from "./components/Recipe";
import recipes from "./fake_data/recipes";

/* App */
export default function App() {
  return (
    <div id="recipe-flow" className="my-app">
      <Recipe recipe={recipes[0]} />
    </div>
  );
}
