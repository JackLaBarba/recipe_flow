
import { config } from "dotenv";
import express from "express";
import connect from "../config/db.mjs";
import bodyParser from "body-parser";
import cors from "cors";
import RecipeModel from "./models/RecipeModel.mjs";

config();
await connect();

const app = express();

app.use(cors());
app.use(bodyParser.json())

const { API_PORT } = process.env;

app.post('/recipe', async (req, res) => {
    const { title, steps } = req.body;

    const recipe = await RecipeModel.create({
        title,
        steps
    });

    res.status(201).json(recipe);
});

app.get('/recipe', async (req, res) => {
    const query = RecipeModel.find();
    return res.send(await query.exec());
});

app.listen(API_PORT, () => {
    console.log(`auth-service listening on port ${API_PORT}`);
})
