import { Agendamento } from '../entities/Agendamento'

export interface IAgendamentoRepository {
  create(agendamento: Agendamento): Promise<Agendamento>
  findById(id: string): Promise<Agendamento | null>
  findAll(filters?: { status?: string; beneficiarioId?: string }): Promise<Agendamento[]>
  update(agendamento: Agendamento): Promise<Agendamento>
  delete(id: string): Promise<void>
}
