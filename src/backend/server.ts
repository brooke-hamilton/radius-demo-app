// E-Shop Backend API Server
// Handles product catalog and cart operations, backed by Redis cache.

import express from 'express';
import { createClient } from 'redis';

const app = express();
const PORT = 8080;
const REDIS_URL = process.env.CONNECTION_CACHE_URL || 'redis://cache:6379';

const redis = createClient({ url: REDIS_URL });
redis.connect();

app.use(express.json());

app.get('/products', async (_req, res) => {
  const cached = await redis.get('products');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  const products = [
    { id: 1, name: 'Widget', price: 9.99 },
    { id: 2, name: 'Gadget', price: 24.99 },
    { id: 3, name: 'Doohickey', price: 14.99 },
  ];
  await redis.set('products', JSON.stringify(products), { EX: 300 });
  res.json(products);
});

app.get('/cart', async (_req, res) => {
  const cart = await redis.get('cart');
  res.json(cart ? JSON.parse(cart) : { items: [] });
});

app.post('/cart', async (req, res) => {
  await redis.set('cart', JSON.stringify(req.body), { EX: 3600 });
  res.json({ ok: true });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'backend' });
});

app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});
