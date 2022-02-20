
import { config } from "dotenv";
import express from "express";
import connect from "../config/db.mjs";

config();
connect();

const app = express();
const { PORT } = process.env;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(express.json());

app.listen(PORT, () => {
    console.log(`auth-service listening on port ${PORT}`);
})
