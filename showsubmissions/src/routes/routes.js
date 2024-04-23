import express from "express";
import {
  callDummyController,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/showSubmissions/callDummy", callDummyController);

export default router;