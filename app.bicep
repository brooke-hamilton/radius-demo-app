extension radius

// Demo refresh: trigger graph workflow with the published orphan-branch fixes.

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
  properties: any({
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
    codeReference: 'src/frontend/app.ts#L1'
  })
}

resource backend 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'backend'
  properties: any({
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
    }
    codeReference: 'src/backend/server.ts#L1'
  })
}

resource cache 'Applications.Datastores/redisCaches@2023-10-01-preview' = {
  name: 'cache'
  properties: any({
    application: app.id
    environment: application
    codeReference: 'src/cache/redis.ts#L1'
  })
}
