
import { config } from "dotenv";
import express from "express";
import connect from "../config/db.mjs";
import jwt from "jsonwebtoken";
import UserModel from "./models/user.mjs";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";

config();
await connect();

const app = express();

app.use(cors());
app.use(bodyParser.json())

const { API_PORT, JWT_SECRET } = process.env;

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if a user with that email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "No user with that email" });
    }

    // Check the client-supplied password
    const password_hash = crypto.pbkdf2Sync(password,  
        user.salt, 1000, 64, `sha512`).toString(`hex`);
    if (password_hash !== user.password_hash) {
        return res.status(400).json({ error: "Invalid password" });
    }

    // if we've made it here, the user had the right credentials.
    // Create a token for them.
    // create jwt
    user.token = jwt.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json(user);
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const existing_user = await UserModel.findOne({ email });
    if (existing_user) {
        return res.status(400).send("User already exists with this email");
    }

    // Citation
    // https://www.loginradius.com/blog/async/password-hashing-with-nodejs/
    const salt = crypto.randomBytes(16).toString('hex');
    const password_hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
    
    // create User
    const user = await UserModel.create({
        name,
        email,
        password_hash,
        salt
    });

    // create jwt
    user.token = jwt.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json(user);
});

app.post("/verify_token", (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json(decoded);
    } catch {
        return res.status(403).json({ error: "invalid token" });
    }
});

app.use(express.json());

app.listen(API_PORT, () => {
    console.log(`auth-service listening on port ${API_PORT}`);
})
