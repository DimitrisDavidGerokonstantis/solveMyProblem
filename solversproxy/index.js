import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";
import { consumeController } from "./src/controllers/controllers.js";

mongoose.connect(process.env.MONGO_DB_URI);

const app = express();

app.use(express.json());

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

app.listen(5000, async () => {
    console.log('Connected!');
    await sleep(40000);
    consumeController();
})