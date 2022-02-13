import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <h1>RecipeFlow</h1>
      <Link to="recipes">
        <button>Cook something!</button>
      </Link>
      <p>or</p>
      <Link to="login">
        <button>Create a recipe</button>
      </Link>
    </div>
  );
}
