import mongoose from "mongoose";
import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

export const registerController = async (req, res) => {
  try {
    console.log(req.body);
    // Check for existing user
    let user = await Users.where("username").equals(req.body.username);
    if (user.length) return res.status(409).json("User already exists!");

    // hash the password and creat the user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let createdUser = await Users.create({
      username: req.body.username,
      password: hash,
    });
    return res.status(200).json("User has been created!");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const loginController = async (req, res) => {
  try {
    let user = await Users.where("username").equals(req.body.username);
    if (user.length === 0) return res.status(404).json("User not found!");

    // else check credentials
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user[0].password
    );
    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

    // create a token based on the unique user's id
    const token = jwt.sign({ id: user[0]._id }, process.env.JWT_KEY);

    // save the token as a cookie accesible only via http API calls
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        id: user[0]._id,
        username: user[0].username,
        role: user[0].role,
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logoutController = async (req, res) => {
  return res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

export const getTokenController = async (req, res) => {
  const myToken = req.cookies.access_token;
  let role = "";
  let id = "";
  if (myToken) {
    jwt.verify(myToken, process.env.JWT_KEY, async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      id = userInfo.id;
      let user = await Users.findOne({ _id: userInfo.id });
      return res.status(200).json({
        token: myToken,
        role: user.role,
        userid: id,
        username: user.username,
      });
    });
  } else {
    return res.status(200).json({ token: myToken, role: role, userid: id });
  }
  // if (!myToken) return res.status(200).json({ token: myToken });
  // jwt.verify(myToken, process.env.JWT_KEY, (err, userInfo) => {
  //   if (err) return res.status(403).json({ token: null });
  //   if (req.params.userID != userInfo.id)
  //     return res.status(401).json({ token: null });
  //   return res.status(200).json({ token: myToken });
  // });
};

export const updateUsernameController = async (req, res) => {
  try {
    let existingUser = await Users.findOne({ username: req.body.username });
    if (existingUser && existingUser._id != req.body.userID) {
      return res.status(409).json("This username is already in use");
    }
    let user = await Users.findOne({ username: req.body.oldName });
    user.username = req.body.username;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getCreditsController = async (req, res) => {
  try {
    let user = await Users.findOne({ _id: req.params.userid });
    return res.status(200).json({ credits: user.credits });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const buyCreditsController = async (req, res) => {
  try {
    let user = await Users.findOne({ _id: req.params.userid });
    user.credits = `${
      parseInt(user.credits) + parseInt(req.body.creditsToBuy)
    }`;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// checks if a user is logged in with a valid token
export const authenticationController = async (req, res) => {
  console.log("REQUEST", req.body);
  if (!req.body.request.access_token) {
    return res.status(200).json(false);
  } else {
    jwt.verify(
      req.body.request.access_token,
      process.env.JWT_KEY,
      async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        return res.status(200).json(true);
      }
    );
  }
};

export const usersPermissionsController = async (req, res) => {
  console.log("REQUEST", req.body);
  jwt.verify(
    req.body.request.access_token,
    process.env.JWT_KEY,
    async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      let user = await Users.findOne({ _id: userInfo.id });
      if (user.role === "user") return res.status(200).json(true);
      return res.status(200).json(false);
    }
  );
};

export const adminsPermissionsController = async (req, res) => {
  console.log("REQUEST", req.body);
  jwt.verify(
    req.body.request.access_token,
    process.env.JWT_KEY,
    async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      let user = await Users.findOne({ _id: userInfo.id });
      if (user.role === "admin") return res.status(200).json(true);
      return res.status(200).json(false);
    }
  );
};

export const editPermissionsController = async (req, res) => {
  jwt.verify(
    req.body.request.access_token,
    process.env.JWT_KEY,
    async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      try {
        const result = await axios.get(
          `http://submitproblem:5000/api/submitProblem/getProblemInfo/${req.body.problemToEdit}`
        );
        console.log(
          "PROBLEM's USER ID",
          result.data,
          result.data !== userInfo.id
        );
        if (result.data.problem[0].userID != userInfo.id)
          return res.status(200).json(false);
        return res.status(200).json(true);
      } catch (error) {
        console.log(error);
      }
    }
  );
};

export const deletePermissionsController = async (req, res) => {
  jwt.verify(
    req.body.request.access_token,
    process.env.JWT_KEY,
    async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      try {
        const result = await axios.get(
          `http://submitproblem:5000/api/submitProblem/getProblemInfo/${req.body.problemToDelete}`
        );

        let user = await Users.where("_id").equals(userInfo.id);
        console.log(userInfo.id, user);
        if (
          result.data.problem[0].userID != userInfo.id &&
          user[0].role !== "admin"
        )
          return res.status(200).json(false);
        return res.status(200).json(true);
      } catch (error) {
        console.log(error);
      }
    }
  );
};
