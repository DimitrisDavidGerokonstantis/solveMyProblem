import express from "express";
import cors from "cors";
import {
  registerController,
  loginController,
  logoutController,
  getTokenController,
  updateUsernameController,
  getCreditsController,
  buyCreditsController,
  authenticationController,
  usersPermissionsController,
  adminsPermissionsController,
  editPermissionsController,
  deletePermissionsController,
} from "../controllers/auth.js";

// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
} from "../controllers/askForAuthentication.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/getToken", getTokenController);
router.put("/updateUsername", isLoggedIn, updateUsernameController);
router.get(
  "/getCredits/:userid",
  isLoggedIn,
  hasUsersPermissions,
  getCreditsController
);
router.put(
  "/buyCredits/:userid",
  isLoggedIn,
  hasUsersPermissions,
  buyCreditsController
);

router.post("/authenticate", authenticationController);
router.post("/usersPermissions", usersPermissionsController);
router.post("/adminsPermissions", adminsPermissionsController);

router.post("/editPermissions", editPermissionsController);
router.post("/deletePermissions", deletePermissionsController);

export default router;
