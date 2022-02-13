import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeIndex from "./pages/RecipeIndex";
import RecipeCook from "./pages/RecipeCook";
import Login from "./pages/Login";

/* App */
export default function App() {
  return (
    <div id="recipe-flow" className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/recipes" element={<RecipeIndex />}></Route>
          <Route path="/recipes/:recipeId" element={<RecipeCook />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
