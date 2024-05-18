import Answer from "../models/Answers.js";
import mongoose from "mongoose";

export const fetchAnswers = async (req, res) => {
  let id = req.query.id;
  console.log("ID", id);
  let id_mongo = new mongoose.Types.ObjectId(id);

  const answer = await Answer.find({ _id: id_mongo });
  console.log("Answer : ", answer);
  return res.status(200).json(answer);
};