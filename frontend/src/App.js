import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeIndex from "./pages/RecipeIndex";
import RecipeCook from "./pages/RecipeCook";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import NewRecipePage from "./pages/NewRecipePage";

/* App */
export default function App() {
  const [user_token, setUserToken] = useState(null);
  return (
    <div id="recipe-flow" className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage setUserToken={setUserToken} />}></Route>
          <Route path="/recipes" element={<RecipeIndex />}></Route>
          <Route path="/recipes/:recipeId" element={<RecipeCook />}></Route>
          <Route path="/recipes/new" element={<NewRecipePage user_token={user_token} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
