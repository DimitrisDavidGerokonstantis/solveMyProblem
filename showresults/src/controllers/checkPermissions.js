import jwt from "jsonwebtoken";
import Answer from "../models/Answers.js";
import mongoose from "mongoose";

export const hasPermissionsToSeeResults = async (req, res, next) => {
  try {
    let id = req.query.id;
    let id_mongo = new mongoose.Types.ObjectId(id);
    const answer = await Answer.findOne({ _id: id_mongo });
    console.log("ANSWER", answer, id_mongo);
    jwt.verify(
      req.cookies.access_token,
      process.env.JWT_KEY,
      async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        let userInfoId_mongo = new mongoose.Types.ObjectId(userInfo.id);
        console.log(
          userInfoId_mongo,
          answer.userID,
          userInfoId_mongo != answer.userID,
          userInfo.id === answer.userID,
          userInfoId_mongo.equals(answer.userID)
        );
        if (!userInfoId_mongo.equals(answer.userID))
          return res
            .status(403)
            .json(
              "Forbidden : You can only see the results of YOUR submissions!"
            );

        next();
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.response.data);
  }
};
