import express from "express";
import routes from "./src/routes/routes.js";
import cors from "cors";
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_DB_URI);

const app = express();


const corsOptions = {
  origin: ['http://localhost:8080','http://localhost:5000','http://localhost:3000','http://localhost:3001'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);


app.listen(5000, () => {
  console.log("Connected!!");
});