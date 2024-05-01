import express from "express";
import {
  callDummyController,
  fetchProblems,
  deleteProblem
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/showSubmissions", fetchProblems);
router.post("/deleteProblem", deleteProblem);

export default router;