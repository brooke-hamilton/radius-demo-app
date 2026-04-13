// Redis Cache Configuration
// This module configures the Redis client used by the backend service.

import { createClient, RedisClientType } from 'redis';

let client: RedisClientType;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    client = createClient({ url });
    client.on('error', (err) => console.error('Redis error:', err));
    await client.connect();
    console.log('Connected to Redis');
  }
  return client;
}

export async function closeRedis(): Promise<void> {
  if (client) {
    await client.quit();
  }
}
