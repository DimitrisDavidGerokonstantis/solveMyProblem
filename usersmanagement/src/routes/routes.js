import express from "express";
import cors from "cors";
import {
  registerController,
  loginController,
  logoutController,
  getTokenController,
  updateUsernameController,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/getToken", getTokenController);
router.put("/updateUsername", updateUsernameController);

export default router;
