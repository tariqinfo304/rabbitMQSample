const amqp = require("amqplib");

async function sendToQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "some_rabbit";
    const message = "Hello, RabbitMQ!";

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent: ${message}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
}

sendToQueue();
