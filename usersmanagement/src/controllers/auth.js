import mongoose from "mongoose";
import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  if (myToken) {
    jwt.verify(myToken, process.env.JWT_KEY, async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      let user = await Users.findOne({ _id: userInfo.id });
      return res.status(200).json({ token: myToken, role: user.role });
    });
  } else {
    return res.status(200).json({ token: myToken, role: role });
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
    let user = await Users.findOne({ username: req.body.oldName });
    user.username = req.body.username;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
