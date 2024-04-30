import express from "express";
import cors from "cors";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
