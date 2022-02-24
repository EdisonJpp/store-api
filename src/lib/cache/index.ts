const redis = require("redis");

interface ISaveCache<T> {
  client: any;
  cacheKey: string;
  item: T;
}

export async function saveCache<T>(
  { client, cacheKey = "", item }: ISaveCache<T>,
  isUpdate: boolean,
  save = (acc, item): boolean => true
) {
  const rawData = ((await client.get(cacheKey)) || "[]") as string;

  if (isUpdate) {
    const filtered = JSON.parse(rawData).filter((it) => save(it, item));
    await client.set(cacheKey, JSON.stringify([item, ...filtered]));
  }

  if (!isUpdate) {
    await client.set(cacheKey, JSON.stringify([item, ...JSON.parse(rawData)]));
  }

  return item;
}

export async function setFilterCache(
  client: any,
  cacheKey: string,
  filter = (acc): boolean => true
) {
  const rawData = ((await client.get(cacheKey)) || "[]") as string;
  const filtered = JSON.parse(rawData).filter(filter);
  await client.set(cacheKey, JSON.stringify(filtered));
}

export const createClient = async () => {
  const newClient = redis.createClient({
    port: process.env.REDIS_PORT || "6379",
    host: "0.0.0.0",
  });
  newClient.on("error", (err) => console.log("Redis Client Error", err));
  await newClient.connect();

  return newClient;
};

export default createClient;
