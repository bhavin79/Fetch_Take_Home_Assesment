import { createClient } from "redis";

const client = createClient({
  url: "redis://redis-stack:6379"
});

client.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  await client.connect();
};

export const getRedisClient = async () => {
  if (client.isReady && client.isReady) {
    return client;
  } else {
    await connectRedis();
    return client;
  }
};
