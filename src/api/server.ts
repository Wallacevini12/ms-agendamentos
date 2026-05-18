import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { connectMongoDB } from '../infrastructure/database/connection'
import { swaggerSpec } from './swagger/swagger'
import agendamentoRouter from './controllers/AgendamentoController'

const app  = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'ms-agendamentos', timestamp: new Date() }))

// Routes
app.use('/agendamentos', agendamentoRouter)

async function bootstrap() {
  await connectMongoDB()
  app.listen(PORT, () => {
    console.log(`🚀 ms-agendamentos rodando em http://localhost:${PORT}`)
    console.log(`📚 Swagger em http://localhost:${PORT}/docs`)
  })
}

bootstrap().catch(err => { console.error(err); process.exit(1) })

export default app
