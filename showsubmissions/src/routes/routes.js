import express from "express";
import {
  callDummyController,
  fetchProblems
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/showSubmissions", fetchProblems);

export default router;