import mongoose from "mongoose"
import Problems from "../models/Problems.js"

export const dummyController = async (req, res) => {
  console.log("HELLO from dummy controller!!!");
  let problem = await Problems.create({name: "MyProblem", description: "desc......"})
  console.log(await Problems.find({name:"MyProblem"}))
  return res.status(200).json({ message: "Data received successfully" });
};