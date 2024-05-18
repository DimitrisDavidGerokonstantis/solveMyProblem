import mongoose from "mongoose";
import Users from "../models/Users.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "solvio.app@gmail.com",
    pass: process.env.APP_PWD,
  },
});

export const addUserController = async (req, res) => {
  console.log("REQ BODY", req.body);
  try {
    let existingUser = await Users.findOne({ email: req.body.user.email });
    if (!existingUser) {
      console.log("USER DOES NOT EXIST", existingUser);
      let createdUser = await Users.create({
        _id: req.body.user._id,
        username: req.body.user.username,
        email: req.body.user.email,
      });
      const info = await transporter.sendMail({
        from: '"Solvio App" <solvio.app@gmail.com>', // sender address
        to: createdUser.email, // list of receivers
        subject: "Welcome to solvio!", // Subject line
        html: `<p>Hello ${createdUser.username},</p>
        <p>Welcome to Solvio!</p>
        <p>Visit our website, submit your problems and receive the answers you need!
        You will be awarded 10 credits for every hour you use the solver we provide!</p>
        <p>Best wishes,<br><span style="color: #a36c3d;"><em>Solvio team</em></span></p>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "Google user was saved" });
    } else {
      return res.status(200).json({ message: "Existing Google user" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailForAnswerController = async (req, res) => {
  try {
    let userID = req.body.userID;
    let problemID = req.body.problemID;

    let link = `http://localhost:8080/showresults/${problemID}?forwarded=true`;

    const user = await Users.findOne({ _id: userID });
    console.log("USER", user);
    if (user) {
      //   const formData = {
      //     username: user.username,
      //     to_email: user.email,
      //     link: link,
      //   };

      //   await emailjs.send(
      //     "service_4xud9kh",
      //     "template_gi54mxa",
      //     formData,
      //     "68u66vjXqZ8KeaiJi"
      //   );
      const info = await transporter.sendMail({
        from: '"Solvio App" <solvio.app@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Solvio : Your problem was solved", // Subject line
        html: `<p>Hello ${user.username},</p>
        <p>Your problem was solved. You can see the results by visiting the following link :</p> <p>${link}</p>
        <p>Best wishes,<br><span style="color: #a36c3d;"><em>Solvio team</em></span></p>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "Email was sent" });
    } else {
      return res.status(200).json({ message: "Not a google user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
