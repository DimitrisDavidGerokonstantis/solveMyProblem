import express from "express";
import mongoose from "mongoose";
import { consumeProblem } from "./src/consumeProblem.js";

mongoose.connect(process.env.MONGO_DB_URI);

const app = express();

app.use(express.json());

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

app.listen(5000, async () => {
    console.log('Connected!');
    await sleep(40000);
    consumeProblem();
})