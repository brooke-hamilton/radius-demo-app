# E-Shop Demo App

A sample e-commerce application modeled with [Radius](https://radapp.io) to demonstrate the **GitHub App Graph Visualization** feature.

## Architecture

| Component | Type | Description |
|-----------|------|-------------|
| **frontend** | `Applications.Core/containers` | Web UI served on port 3000, connects to backend |
| **backend** | `Applications.Core/containers` | REST API on port 8080, connects to Redis cache |
| **cache** | `Applications.Datastores/redisCaches` | Redis cache for product catalog and cart |

## Application Graph

The application topology is defined in [`app.bicep`](app.bicep). On every push, a CI workflow compiles it into a static graph artifact at `.radius/static/app.json`, which the Radius browser extension renders directly inside GitHub.

## Getting Started

1. Install the [Radius browser extension](https://github.com/radius-project/radius/tree/002-github-app-graph-viz/web/browser-extension)
2. Navigate to this repo or open a PR — the application graph appears automatically
