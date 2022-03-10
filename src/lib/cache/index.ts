const redis = require('redis');

export const createClient = async () => {
  const newClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  });
  newClient.on('error', (err) => console.log('Redis Client Error', err));
  await newClient.connect();

  return newClient;
};

export default createClient;
