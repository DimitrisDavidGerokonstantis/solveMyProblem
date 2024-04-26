import express from "express";
import {
  dummyController, submitController
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/submitProblem/dummy", dummyController);
router.post("/submitProblem/submit", submitController);

export default router;