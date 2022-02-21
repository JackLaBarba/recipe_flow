import mongoose from "mongoose";

const RecipeModel = mongoose.model("Recipe", new mongoose.Schema({
    title: String,
    steps: Object
}));

export default RecipeModel;