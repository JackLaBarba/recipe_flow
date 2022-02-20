import { Link } from "react-router-dom";
import Login from "../components/Login";

export default function LoginPage({setUserToken}) {
  return (
    <div>
      <h1>RecipeFlow</h1>
      <Link to={`/`}>go back</Link>
      <Login setUserToken={setUserToken}></Login>
    </div>
  );
}
