import swaggerJsdoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MS Agendamentos — Unimed',
      version: '1.0.0',
      description: 'Microserviço de Agendamentos com MongoDB — Clean Architecture',
    },
    servers: [{ url: 'http://localhost:3001', description: 'Local' }],
  },
  apis: ['./src/api/controllers/*.ts'],
})
