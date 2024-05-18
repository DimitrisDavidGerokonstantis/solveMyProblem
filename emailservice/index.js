import express from "express";
import routes from "./src/routes/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { consume_from_answers_queue } from "./src/consumeAnswer.js";

mongoose.connect(process.env.MONGO_DB_URI);

const app = express();

const corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/email", routes);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

app.listen(5000, async () => {
  console.log("Connected!!");
  await sleep(30000);
  consume_from_answers_queue();
});
