import Answer from "../models/Answers.js";
import mongoose from "mongoose";

export const fetchAnswers = async (req, res) => {
  let id = req.query.id;
  console.log("ID", id);
  let id_mongo = new mongoose.Types.ObjectId(id);

  const answer = await Answer.find({ _id: id_mongo });

  console.log("Answer : ", answer);

  if (answer[0].allowToShowResults === "true") {
    return res.status(200).json(answer);
  } else {
    return res.status(204).json("Forbidden! Not enough coins!");
  }
};

export const updateAllowResults = async (req, res) => {
  try {
    console.log("PROBLEMID", req.body.problemID);
    let answer = await Answer.findOne({
      _id: req.body.problemID,
    });
    console.log("PROBBBB", answer);
    answer.allowToShowResults = "false";
    await answer.save();
    return res.status(200).json(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
