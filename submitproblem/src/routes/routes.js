import express from "express";
import cors from "cors";
import {
  dummyController, submitController, getProblemInfo, updateSubmission
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/submitProblem/dummy", dummyController);
router.post("/submitProblem/submit", submitController);
router.get("/submitProblem/getProblemInfo/:problemId", getProblemInfo);

router.put("/submitProblem/updateSubmission", updateSubmission);

export default router;