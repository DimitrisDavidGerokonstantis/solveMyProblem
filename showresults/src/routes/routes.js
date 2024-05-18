import express from "express";
import {
    fetchAnswers
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/getResults", fetchAnswers);

export default router;
