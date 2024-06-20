import express from "express";
import cors from "cors";

import {
  createPaypalOrder,
  capturePaypalOrder,
} from "../controllers/payments.js";

// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
} from "../controllers/askForAuthentication.js";

const router = express.Router();

router.post("/paypal/create-paypal-order", createPaypalOrder);
router.post("/paypal/orders/:orderID/capture", capturePaypalOrder);

export default router;
