import mongoose from "mongoose";
import Problems from "../models/Problems.js";
import amqp from "amqplib";
import { produce_to_questions_queue } from "../publishQuestion.js";

export const submitController = async (req, res) => {
  console.log("HELLO", req.body);
  try {
    let problem = await Problems.create({
      userID: req.body.userID,
      inputDataFile: req.body.inputDataFile,
      extraParams: req.body.extraParams,
      pythonScript: req.body.pythonScript,
      status: req.body.status,
      name: req.body.name,
      model: req.body.model,
    });
    console.log("PROBLEM", problem);
    produce_to_questions_queue(JSON.stringify(problem));
    return res.status(200).json({
      message: "Resource created. Problem Added successfully",
      problem: problem,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateSubmission = async (req, res) => {
  try {
    let problemToUpdate = await Problems.findOne({ _id: req.body.problemId });
    if (!problemToUpdate) return res.status(404).json("Problem not found!");
    problemToUpdate.pythonScript = req.body.pythonScript;
    problemToUpdate.inputDataFile = req.body.inputDataFile;
    problemToUpdate.extraParams = req.body.extraParams;
    problemToUpdate.name = req.body.name;
    await problemToUpdate.save();
    produce_to_questions_queue(JSON.stringify(problemToUpdate));
    return res
      .status(200)
      .json({ message: "Resource updated. Problem updated successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProblemInfo = async (req, res) => {
  try {
    console.log(req.params.problemId);
    let problem = await Problems.find({ _id: req.params.problemId });
    return res.status(200).json({ problem });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const runProblemController = async (req, res) => {
  try {
    console.log("RECEIVED", req.body.problemID);
    let problem = await Problems.findOne({ _id: req.body.problemID });
    problem.status = "running";
    await problem.save();
    produce_to_questions_queue(JSON.stringify(problem));
    return res.status(200).json("Problem status updated to running");
  } catch (error) {
    return res.status(500).json(error);
  }
};
