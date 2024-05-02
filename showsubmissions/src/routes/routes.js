import express from "express";
import {
  callDummyController,
  fetchProblems,
  deleteProblem,
} from "../controllers/controllers.js";
// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
} from "../controllers/askForAuthentication.js";

const router = express.Router();

router.get("/showSubmissions", isLoggedIn, fetchProblems);
router.post("/deleteProblem", isLoggedIn, deleteProblem);

export default router;
