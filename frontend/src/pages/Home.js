import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <h1>RecipeFlow</h1>
      <Link to="recipes">
        <button className="done-action">Cook something!</button>
      </Link>
      <p>or login and <Link to="/recipes/new">create a recipe</Link></p>
    </div>
  );
}
