import express from "express";
import {
  dummyController,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/submitProblem/dummy", dummyController);

export default router;