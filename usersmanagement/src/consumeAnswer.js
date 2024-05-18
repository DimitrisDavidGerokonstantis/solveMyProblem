import amqp from "amqplib";
import Users from "./models/Users.js";

export async function consume_from_answers_queue() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(process.env.RABBITMQ_ANSWERS_URL);
    console.log(process.env.RABBITMQ_ANSWERS_URL);

    // Create a channel
    const channel = await connection.createChannel();

    // Create the direct exchange
    const exchangeName = process.env.EXCHANGE_NAME_ANSWERS;
    await channel.assertExchange(exchangeName, "fanout", { durable: true });

    // Create the chart_A queue
    const queueName = process.env.QUEUE_NAME_USERS_MANAGEMENT;
    const assertQueue = await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(assertQueue.queue, exchangeName, "");

    // Start consuming messages
    console.log(
      `Consumer started. Waiting for messages in queue ${queueName}...`
    );
    channel.consume(
      assertQueue.queue,
      async (message) => {
        try {
          console.log(message.content);
          const messageData = JSON.parse(message.content.toString());
          console.log(
            `Received message from ${queueName}: ${messageData.userID}`
          );
          channel.ack(message);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.log(error);
  }
}
