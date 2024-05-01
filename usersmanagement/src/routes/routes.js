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
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/getToken", getTokenController);
router.put("/updateUsername", updateUsernameController);
router.get("/getCredits/:userid", getCreditsController);
router.put("/buyCredits/:userid", buyCreditsController);

router.post("/authenticate", authenticationController);
router.post("/usersPermissions", usersPermissionsController);
router.post("/adminsPermissions", adminsPermissionsController);

export default router;
