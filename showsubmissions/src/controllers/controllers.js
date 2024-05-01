import axios from "axios";
// import amqp from "amqplib"
// import { consume_from_questions_queue } from "../consumeQuestion.js";
// import { consume_from_questions_queue2 } from "../consumeQuestion2.js";
import Problems from "../models/Problems.js";

export const fetchProblems = async (req, res) => {
  const problems = await Problems.find();
  console.log(problems)
  return res.status(200).json(problems);
};






export const callDummyController = async (req, res) => {
  // const headers = {
  //   'Content-Type': 'application/json', 
  // };
  // try {
  //   console.log('HELLOOOOOOO')
  //   const result = await axios.get(
  //     `http://submitproblem:5000/api/submitProblem/dummy`, {headers:headers}
  //   );
  //   console.log('HELLOOOOOOO2', result)
  // } catch (error) {
  //   console.log(error);
  // }

  // async function consume_from_questions_queue() {
  //   try {
  //     // Connect to RabbitMQ server
  //     const connection = await amqp.connect(process.env.RABBITMQ_QUESTIONS_URL);
  //     console.log(process.env.RABBITMQ_QUESTIONS_URL)
      
  //     // Create a channel
  //     const channel = await connection.createChannel();
      
  //     // Create the direct exchange
  //     const exchangeName = process.env.EXCHANGE_NAME;
  //     await channel.assertExchange(exchangeName, 'direct', { durable: true });
      
  //     // Create the chart_A queue
  //     const queueName = process.env.QUEUE_SHOW_SUBMISSIONS;
  //     const assertQueue = await channel.assertQueue(queueName, { durable: true });
      
  //     // Bind the queue to the exchange with the routing key
  //     const routingKey_q_A = process.env.ROUTING_KEY_SHOW_SUBMISSIONS;
  //     await channel.bindQueue(assertQueue.queue, exchangeName, routingKey_q_A);
      
  //     // Start consuming messages
  //     console.log(`Consumer started. Waiting for messages in queue ${queueName}...`);
  //     channel.consume(assertQueue.queue, (message) => {
  //       console.log(`Received message: ${message.content.toString()}`);
  //       channel.ack(message);
  //     }, { noAck: false });
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // consume_from_questions_queue();
  // consume_from_questions_queue2();
  // consume_from_questions_queue();
  // console.log('ekana kai kati allo meta giati den kollaw!!!!!!!!!!!')
  return res.status(200).json({ message: "Data received successfully" });
};