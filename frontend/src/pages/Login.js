import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>RecipeFlow</h1>
      <Link to={`/`}>go back</Link>
      <h2>Login</h2>
      <form>
        <div>
          <label>
            username
            <input type="text"></input>
          </label>
        </div>
        <div>
          <label>
            password
            <input type="text"></input>
          </label>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
