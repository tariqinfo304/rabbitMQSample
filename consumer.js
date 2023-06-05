const amqp = require("amqplib");

async function receiveFromQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "some_rabbit";

    await channel.assertQueue(queue);
    channel.consume(
      queue,
      (message) => {
        console.log(`Received message: ${message.content.toString()}`);
        channel.ack(message);
      },
      { noAck: false }
    );

    console.log("Waiting for messages...");

    process.on("SIGINT", () => {
      channel.close();
      connection.close();
      console.log("Consumer stopped");
      process.exit(0);
    });
  } catch (error) {
    console.error(error);
  }
}

receiveFromQueue();
