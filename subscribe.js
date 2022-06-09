import { Kafka } from "kafkajs";

const subscribeMessages = async () => {
  const kafka = new Kafka({ brokers: ["localhost:29092"] });

  // If you specify the same group id and run this process multiple times, KafkaJS
  // won't get the events. That's because Kafka assumes that, if you specify a
  // group id, a consumer in that group id should only read each message at most once.
  
  const consumer = kafka.consumer({ groupId: "" + Date.now() });

  await consumer.connect();

  await consumer.subscribe({ topic: "messages", fromBeginning: true });
  await consumer.run({ 
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      console.log({
          key: message.key.toString(),
          value: message.value.toString(),
      })
  },

  });
};

subscribeMessages().then(() => console.log("Done"), err => console.log(err));