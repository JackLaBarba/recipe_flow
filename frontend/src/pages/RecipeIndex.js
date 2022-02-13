import { Link } from "react-router-dom";
import recipes from "../fake_data/recipes";

export default function RecipeIndex() {
  return (
    <div>
      <h1>RecipeFlow</h1>
      <Link to={`/`}>go back</Link>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <Link to={`/recipes/${index}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
