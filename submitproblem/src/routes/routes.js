import express from "express";
import cors from "cors";
import {
  submitController,
  getProblemInfo,
  updateSubmission,
} from "../controllers/controllers.js";

const router = express.Router();

router.post("/submitProblem/submit", submitController);
router.get("/submitProblem/getProblemInfo/:problemId", getProblemInfo);
router.put("/submitProblem/updateSubmission", updateSubmission);

export default router;
