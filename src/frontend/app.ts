// E-Shop Frontend Application
// This is the main entry point for the e-shop frontend service.
// It serves the web UI and communicates with the backend API.

import express from 'express';

const app = express();
const PORT = 3000;
const BACKEND_URL = process.env.CONNECTION_BACKEND_URL || 'http://backend:8080';

app.use(express.static('public'));

app.get('/api/products', async (_req, res) => {
  const response = await fetch(`${BACKEND_URL}/products`);
  const products = await response.json();
  res.json(products);
});

app.get('/api/cart', async (_req, res) => {
  const response = await fetch(`${BACKEND_URL}/cart`);
  const cart = await response.json();
  res.json(cart);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'frontend' });
});

app.listen(PORT, () => {
  console.log(`Frontend listening on port ${PORT}`);
});
