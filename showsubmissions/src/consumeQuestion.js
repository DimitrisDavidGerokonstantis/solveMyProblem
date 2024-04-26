import amqp from "amqplib"

export async function consume_from_questions_queue() {
    try {
      // Connect to RabbitMQ server
      const connection = await amqp.connect(process.env.RABBITMQ_QUESTIONS_URL);
      console.log(process.env.RABBITMQ_QUESTIONS_URL)
      
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
      channel.consume(assertQueue.queue, (message) => {
        console.log(`Received message from ${queueName}: ${message.content.toString()}`);
        channel.ack(message);
      }, { noAck: false });

    } catch (error) {
      console.log(error);
    }
  }