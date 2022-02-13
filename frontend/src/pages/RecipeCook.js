import Recipe from "../components/Recipe";
import recipes from "../fake_data/recipes";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

export default function RecipeCook() {
  let params = useParams();

  return (
    <div>
      <h1>RecipeFlow</h1>
      <Link to={`/recipes`}>go back to Recipes</Link>
      <Recipe recipe={recipes[params.recipeId]} />
    </div>
  );
}
