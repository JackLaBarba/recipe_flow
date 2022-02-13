import { Dag } from "./Dag";

const Recipe = (props) => {
  return (
    <div>
      <h2>{props.recipe.title}</h2>
      <h3>Ingredients</h3>
      <h3>Steps</h3>
      <Dag data={props.recipe.steps} />
    </div>
  );
};

export default Recipe;
