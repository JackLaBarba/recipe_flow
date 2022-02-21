import Recipe from "../components/Recipe";
import { Link } from "react-router-dom";
import Config from "../config";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

async function fetchRecipe(id) {
  console.log("hello!");
  const data = await fetch(`${Config.recipe_service_url}/recipe/${id}`, { method: 'GET' });
  return data.json();
}

export default function RecipeCook() {
  const [recipe, setRecipe] = useState(false);
  let params = useParams();

  useEffect(() => {
    fetchRecipe(params.recipeId).then((r) => { setRecipe(r) });
  }, []);

  if (!recipe) {
    return <p>loading ...</p>
  } else {
    return (
      <div>
        <h1>RecipeFlow</h1>
        <Link to={`/recipes`}>go back to Recipes</Link>
        <Recipe recipe={recipe} />
      </div>
    );
  }
}
