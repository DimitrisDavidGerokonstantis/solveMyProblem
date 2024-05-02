import amqp from "amqplib";
import Problem from "./models/Problems.js"; 
import mongoose from "mongoose";

export async function consume_from_questions_queue() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(process.env.RABBITMQ_QUESTIONS_URL);
    console.log(process.env.RABBITMQ_QUESTIONS_URL);

    // Create a channel
    const channel = await connection.createChannel();

    // Create the direct exchange
    const exchangeName = process.env.EXCHANGE_NAME;
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    // Create the chart_A queue
    const queueName = process.env.QUEUE_SHOW_SUBMISSIONS;
    const assertQueue = await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(assertQueue.queue, exchangeName, "");

    // Start consuming messages
    console.log(`Consumer started. Waiting for messages in queue ${queueName}...`);
    channel.consume(assertQueue.queue, async (message) => {
      try {
        const messageData = JSON.parse(message.content.toString());
        console.log(`Received message from ${queueName}: ${messageData}`);

        const existingProblem = await Problem.findOne({ _id: messageData._id });
        if(existingProblem){
          if(existingProblem.name!==messageData.name){
            existingProblem.name = messageData.name;
            await existingProblem.save(); 
            console.log("Existing problem updated in MongoDB:", existingProblem);
          }
          if(messageData.status==="running"){
            existingProblem.status = 'running';
            await existingProblem.save(); 
            console.log("Existing problem updated in MongoDB:", existingProblem);
          }
          else{
            existingProblem.updatedAt = new Date();
            await existingProblem.save(); 
            console.log("Existing problem updated in MongoDB:", existingProblem);
          }
        }
        else{
        const newProblem = new Problem({
          _id: messageData._id,
          userID: messageData.userID,
          name: messageData.name,
          model: messageData.model,
          status: messageData.status,
          createdAt: messageData.createdAt,
          updatedAt: messageData.updatedAt
        });
        await newProblem.save();
        console.log("New problem saved to MongoDB:", newProblem);
        }
        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        //channel.reject(message, false);
      }
    }, { noAck: false });

  } catch (error) {
    console.log(error);
  }
}
