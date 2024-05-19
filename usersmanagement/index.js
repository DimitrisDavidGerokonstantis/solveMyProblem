import express from "express";
import routes from "./src/routes/routes.js";
import googleRoutes from "./src/routes/oauth.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { consume_from_answers_queue } from "./src/consumeAnswer.js";

mongoose.connect(process.env.MONGO_DB_URI);

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://submitproblem:5000",
    "http://showsubmissions:5000",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", routes);
app.use("/googleAuth", googleRoutes);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

app.listen(5000, async () => {
  console.log("Connected!!");
  await sleep(40000);
  consume_from_answers_queue();
});
