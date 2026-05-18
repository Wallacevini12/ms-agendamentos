import mongoose from 'mongoose'

export async function connectMongoDB(): Promise<void> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI não definido no .env')

  await mongoose.connect(uri)
  console.log('✅ MongoDB conectado com sucesso')

  mongoose.connection.on('error', err => console.error('❌ MongoDB erro:', err))
  mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB desconectado'))
}
