import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
// import fetch from "node-fetch";
// import { OAuth2Client } from "google-auth-library";
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
  getRoleController,
  getUserDetailsController,
} from "../controllers/auth.js";

// middleware that checks if the user who makes the request is logged in
import {
  hasAdminsPermissions,
  isLoggedIn,
  hasUsersPermissions,
} from "../controllers/askForAuthentication.js";

// dotenv.config();

// const redirectUrl = "http://127.0.0.1:5001/oauth";

// const oAuth2Client = new OAuth2Client(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   redirectUrl
// );

// async function getUserData(access_token) {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
//   );
//   const data = await response.json();
//   console.log("data", data);
// }

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
router.get("/getRole/:userid", getRoleController);
router.post("/editPermissions", editPermissionsController);
router.post("/deletePermissions", deletePermissionsController);

router.get(
  "/getUserDetails/:userID",
  isLoggedIn,
  hasAdminsPermissions,
  getUserDetailsController
);

// // creates the google URL that the frontend will trigger
// router.post("/googleRequest", async (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Referrer-Policy", "no-referrer-when-downgrade");

//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: "https://www.googleapis.com/auth/userinfo.profile openid",
//     prompt: "consent",
//   });

//   res.json({ url: authorizeUrl });
// });

// // the redirect URL to which we are redirected after google authentication
// // and we take user's info
// router.get("/oauth", async (req, res, next) => {
//   // code sent by google
//   const code = req.query.code;
//   try {
//     const res = await oAuth2Client.getToken(code);
//     await oAuth2Client.setCredentials(res.token);
//     console.log("Tokens acquired");
//     const user = oAuth2Client.credentials;
//     console.log("credentials", user);
//     await getUserData(user.access_token);
//   } catch (error) {
//     console.log("Error with signing in with google");
//   }
// });

export default router;
