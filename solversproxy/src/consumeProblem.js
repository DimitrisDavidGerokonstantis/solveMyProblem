import amqp from 'amqplib';
import Problems from './models/Problems.js';

export async function consumeProblem() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_QUESTIONS_URL);
        const channel = await connection.createChannel();
        
        await channel.assertExchange(process.env.EXCHANGE_NAME_QUESTIONS, 'fanout', { durable: true });
        
        const queueName = process.env.QUEUE_NAME;
        const queue = await channel.assertQueue(queueName, { durable: true });
        
        console.log(`Consumer started. Waiting for messages in queue ${queueName}...`);
        await channel.bindQueue(queue.queue, process.env.EXCHANGE_NAME_QUESTIONS, "");

        return new Promise((resolve) => {
            channel.consume(queue.queue, (message) => {
                console.log(`Received message from ProxyQueue`);
                channel.ack(message);
                const parsedMessage = JSON.parse(message.content.toString());
                resolve(parsedMessage);
            }, { noAck: false });
        });
    } catch (error) {
        console.log(error);
    }
}