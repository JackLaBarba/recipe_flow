
import { config } from "dotenv";
import express from "express";
import connect from "../config/db.mjs";
import jwt from "jsonwebtoken";
// import UserModel from "./models/user.mjs";

config();
await connect();

const app = express();
const { API_PORT, JWT_SECRET } = process.env;

app.post('/login', (req, res) => {
    const token = jwt.sign({ user: "jack" }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json(token);
});

app.use(express.json());

app.listen(API_PORT, () => {
    console.log(`auth-service listening on port ${API_PORT}`);
})
