import mongoose from "mongoose"
import Problems from "../models/Problems.js"
import amqp from "amqplib"
import { produce_to_questions_queue } from "../publishQuestion.js";

export const dummyController = async (req, res) => {
  // console.log("HELLO from dummy controller!!!");
  // let problem = await Problems.create({name: "MyProblem", description: "desc......"})
  // console.log(await Problems.find({name:"MyProblem"}))
  // async function produce_to_questions_queue() {
  //   try {
  //     // Connect to RabbitMQ server
  //     const connection = await amqp.connect(process.env.RABBITMQ_QUESTIONS_URL);
  
  //     // Create a channel
  //     const channel = await connection.createChannel();
  
  //     // Create the direct exchange
  //     const exchangeName = process.env.EXCHANGE_NAME;
  //     await channel.assertExchange(exchangeName, 'direct', { durable: true });
  
  //     // Send messages to the chart_A
  //     const routingKey_q_A = process.env.ROUTING_KEY_SHOW_SUBMISSIONS;
  
  //     // Send a random number every 20 seconds
  //     setInterval(() => {
  //       const randomNumber = Math.floor(Math.random() * 100);
  //       channel.publish(exchangeName, routingKey_q_A, Buffer.from(`Random number: ${randomNumber}`));
  //       console.log(`Sent random number: ${randomNumber} to queue with routing key eq to ${routingKey_q_A}`);
  //     }, 20000);
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  // produce_to_questions_queue();

  produce_to_questions_queue('Hello there !');
  return res.status(200).json({ message: "Data received successfully" });
};

export const submitController = async (req, res) => {
  console.log('HELLO', req.body)
  let problem = await Problems.create({userID: req.body.userID, inputDataFile: req.body.inputDataFile, pythonScript : req.body.pythonScript, status: req.body.status})
  console.log("PROBLEM",problem);
  produce_to_questions_queue(JSON.stringify(problem));
  return res.status(201).json({ message: "Resource created. Problem Added successfully", problem: problem });
};