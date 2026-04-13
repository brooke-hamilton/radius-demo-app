extension radius

@description('The Radius Application — a simple e-commerce app with frontend, backend API, and Redis cache.')
param application string

resource app 'Applications.Core/applications@2023-10-01-preview' = {
  name: 'eshop'
  properties: {
    environment: application
  }
}

resource frontend 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'frontend'
  properties: {
    application: app.id
    container: {
      image: 'ghcr.io/brooke-hamilton/eshop-frontend:latest'
      ports: {
        http: {
          containerPort: 3000
        }
      }
    }
    connections: {
      backend: {
        source: backend.id
      }
    }
    // codeReference: 'src/frontend/app.ts#L1' — added to app.json after types are published
  }
}

resource backend 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'backend'
  properties: {
    application: app.id
    container: {
      image: 'ghcr.io/brooke-hamilton/eshop-backend:latest'
      ports: {
        http: {
          containerPort: 8080
        }
      }
    }
    connections: {
      cache: {
        source: cache.id
      }
      notifications: {
        source: notifications.id
      }
    }
    // codeReference: 'src/backend/server.ts#L1' — added to app.json after types are published
  }
}

resource cache 'Applications.Datastores/redisCaches@2023-10-01-preview' = {
  name: 'cache'
  properties: {
    application: app.id
    environment: application
    // codeReference: 'src/cache/redis.ts#L1' — added to app.json after types are published
  }
}

resource notifications 'Applications.Messaging/rabbitMQQueues@2023-10-01-preview' = {
  name: 'notifications'
  properties: {
    application: app.id
    environment: application
    // codeReference: 'src/notifications/queue.ts#L1' — added to app.json after types are published
  }
}
