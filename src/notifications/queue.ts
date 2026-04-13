// Notification Queue Worker
// Processes order notifications via RabbitMQ.

import amqp from 'amqplib';

const QUEUE_URL = process.env.CONNECTION_NOTIFICATIONS_URL || 'amqp://notifications:5672';
const QUEUE_NAME = 'order-notifications';

async function startWorker() {
  const connection = await amqp.connect(QUEUE_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log(`Waiting for messages on ${QUEUE_NAME}...`);

  channel.consume(QUEUE_NAME, (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log(`Processing order notification: ${order.id}`);
      // Send email, push notification, etc.
      channel.ack(msg);
    }
  });
}

startWorker().catch(console.error);
