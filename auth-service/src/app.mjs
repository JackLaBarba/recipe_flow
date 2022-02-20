
import { config } from "dotenv";
import express from "express";
import connect from "../config/db.mjs";
import jwt from "jsonwebtoken";
import UserModel from "./models/user.mjs";
import bodyParser from "body-parser";
import crypto from "crypto";

config();
await connect();

const app = express();

app.use(bodyParser.json())

const { API_PORT, JWT_SECRET } = process.env;

app.post('/login', (req, res) => {
    const token = jwt.sign({ user: "jack" }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json(token);
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const existing_user = await UserModel.findOne({ email });
    if (existing_user) {
        return res.status(400).send("User already exists with this email");
    }

    const password_hash = crypto.createHash("sha256").update(password).digest("base64");
    // create User
    const user = await UserModel.create({
        name,
        email,
        password_hash
    });

    // create jwt
    user.token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json(user);
})

app.use(express.json());

app.listen(API_PORT, () => {
    console.log(`auth-service listening on port ${API_PORT}`);
})
