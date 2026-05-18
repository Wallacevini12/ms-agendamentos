import { AgendamentoStatus, AgendamentoTipo } from '../../domain/entities/Agendamento'

export interface CreateAgendamentoDTO {
  beneficiarioId:   string
  beneficiarioNome: string
  prestadorId:      string
  prestadorNome:    string
  especialidade:    string
  tipo:             AgendamentoTipo
  data:             string
  horario:          string
  observacoes?:     string
}

export interface UpdateAgendamentoDTO {
  status?:      AgendamentoStatus
  observacoes?: string
  horario?:     string
  data?:        string
}

export interface AgendamentoResponseDTO {
  id:              string
  beneficiarioId:  string
  beneficiarioNome:string
  prestadorId:     string
  prestadorNome:   string
  especialidade:   string
  tipo:            AgendamentoTipo
  data:            Date
  horario:         string
  status:          AgendamentoStatus
  observacoes?:    string
  createdAt:       Date
  updatedAt:       Date
}
