import express from "express";
import routes from "./src/routes/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:8080"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Connected!!!");
});