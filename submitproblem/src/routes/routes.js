import express from "express";
import cors from "cors";
import {
  submitController,
  getProblemInfo,
  updateSubmission,
} from "../controllers/controllers.js";

// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
} from "../controllers/askForAuthentication.js";

const router = express.Router();

router.post(
  "/submitProblem/submit",
  isLoggedIn,
  hasUsersPermissions,
  submitController
);
router.get(
  "/submitProblem/getProblemInfo/:problemId",
  isLoggedIn,
  getProblemInfo
);
router.put(
  "/submitProblem/updateSubmission",
  isLoggedIn,
  hasUsersPermissions,
  updateSubmission
);

export default router;
