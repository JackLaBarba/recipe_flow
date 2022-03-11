import mongoose from "mongoose";

const RecipeModel = mongoose.model("Recipe", new mongoose.Schema({
    title: String,
    description: String,
    ingredients: [String],
    steps: Object
}));

export default RecipeModel;