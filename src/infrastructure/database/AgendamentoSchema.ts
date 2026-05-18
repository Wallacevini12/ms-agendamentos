import mongoose, { Schema, Document } from 'mongoose'

export interface IAgendamentoDocument extends Document {
  beneficiarioId:   string
  beneficiarioNome: string
  prestadorId:      string
  prestadorNome:    string
  especialidade:    string
  tipo:             string
  data:             Date
  horario:          string
  status:           string
  observacoes?:     string
  createdAt:        Date
  updatedAt:        Date
}

const AgendamentoSchema = new Schema<IAgendamentoDocument>(
  {
    beneficiarioId:   { type: String, required: true, index: true },
    beneficiarioNome: { type: String, required: true },
    prestadorId:      { type: String, required: true },
    prestadorNome:    { type: String, required: true },
    especialidade:    { type: String, required: true },
    tipo:             { type: String, enum: ['CONSULTA', 'EXAME', 'PROCEDIMENTO'], required: true },
    data:             { type: Date, required: true },
    horario:          { type: String, required: true },
    status:           { type: String, enum: ['PENDENTE', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO'], default: 'PENDENTE' },
    observacoes:      { type: String },
  },
  { timestamps: true }
)

export const AgendamentoModel = mongoose.model<IAgendamentoDocument>('Agendamento', AgendamentoSchema)
