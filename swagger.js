import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'API de Restaurante',
    description:
      'API para gerenciar produtos, mesas e pedidos de um restaurante.',
  },
  host: 'localhost:3333',
  schemes: ['http'],
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/routes/index.ts']

// Gera o swagger-output.json
swaggerAutogen()(outputFile, endpointsFiles, doc)
