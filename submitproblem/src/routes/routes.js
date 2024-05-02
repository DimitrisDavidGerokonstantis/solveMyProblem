import express from "express";
import cors from "cors";
import {
  submitController,
  getProblemInfo,
  updateSubmission,
  runProblemController,
} from "../controllers/controllers.js";

// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
  hasPermissionsToUpdate,
} from "../controllers/askForAuthentication.js";

const router = express.Router();

router.post(
  "/submitProblem/submit",
  isLoggedIn,
  hasUsersPermissions,
  submitController
);
router.get("/submitProblem/getProblemInfo/:problemId", getProblemInfo);
router.put(
  "/submitProblem/updateSubmission",
  isLoggedIn,
  hasUsersPermissions,
  hasPermissionsToUpdate,
  updateSubmission
);
router.put(
  "/runproblem",
  isLoggedIn,
  hasUsersPermissions,
  runProblemController
);

export default router;
