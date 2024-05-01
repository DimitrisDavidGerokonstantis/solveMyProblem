import express from "express";
import {
  callDummyController,
  fetchProblems,
} from "../controllers/controllers.js";
// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
} from "../controllers/askForAuthentication.js";

const router = express.Router();

router.get("/showSubmissions", isLoggedIn, fetchProblems);

export default router;
