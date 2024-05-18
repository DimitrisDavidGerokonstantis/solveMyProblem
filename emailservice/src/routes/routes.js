import express from "express";
import {
  addUserController,
  sendEmailForAnswerController,
} from "../controllers/controllers.js";

const router = express.Router();

router.post("/addUser", addUserController);
router.post("/sendEmailForAnswer", sendEmailForAnswerController);

export default router;
