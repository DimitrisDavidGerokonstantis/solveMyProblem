import express from "express";
import { fetchAnswers } from "../controllers/controllers.js";
import { hasPermissionsToSeeResults } from "../controllers/checkPermissions.js";

const router = express.Router();

router.get("/getResults", hasPermissionsToSeeResults, fetchAnswers);

export default router;
