import express from "express";
import { getStats } from "../controllers/controllers.js";

const router = express.Router();

router.get("/admin/viewStatistics", getStats);

export default router;