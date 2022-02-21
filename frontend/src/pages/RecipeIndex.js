import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Config from "../config";
import recipes from "../fake_data/recipes";

async function fetchRecipes() {
  const data = await fetch(`${Config.recipe_service_url}/recipe`, { method: 'GET' });
  return data.json();
}

export default function RecipeIndex() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    return fetchRecipes().then((data) => { setRecipes(data) });
  }, []);

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
