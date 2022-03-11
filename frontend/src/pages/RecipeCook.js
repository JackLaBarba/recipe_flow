import Recipe from "../components/Recipe";
import { Link } from "react-router-dom";
import Config from "../config";
import cloneDeep from 'lodash/cloneDeep';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

async function fetchRecipe(id) {
  console.log("hello!");
  const data = await fetch(`${Config.recipe_service_url}/recipe/${id}`, { method: 'GET' });
  let recipe = await data.json();
  for (let step in recipe.steps) {
    recipe.steps[step].isDone = false;
  };
  return recipe;
}

export default function RecipeCook() {
  const [recipe, setRecipe] = useState(false);
  let params = useParams();

  useEffect(() => {
    fetchRecipe(params.recipeId).then((r) => { setRecipe(r) });
  }, [params.recipeId]);

  const markStepDoneness = (stepId, value) => {
    let new_recipe = cloneDeep(recipe);
    for (let step of new_recipe.steps) {
      if (step.id === stepId) {
        step.isDone = value;
        setRecipe(new_recipe);
        return;
      }
    }
    console.warn("Attempted to mark a step complete, but I couldn't find it");
  }

  if (!recipe) {
    return <p>loading ...</p>
  } else {
    return (
      <div>
        <h1>RecipeFlow</h1>
        <Link to={`/recipes`}>go back to Recipes</Link>
        <Recipe recipe={recipe} markStepDoneness={markStepDoneness} />
      </div>
    );
  }
}
