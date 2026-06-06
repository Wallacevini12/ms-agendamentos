import { Agendamento } from '../entities/Agendamento'

export interface IAgendamentoRepository {
  create(agendamento: Agendamento): Promise<Agendamento>
  findById(id: string): Promise<Agendamento | null>
  findAll(filters?: { status?: string; beneficiarioId?: string }): Promise<Agendamento[]>
  update(agendamento: Agendamento): Promise<Agendamento>
  delete(id: string): Promise<void>
  /** Verifica se já existe agendamento ativo para o mesmo prestador, data e horário */
  findConflito(prestadorId: string, data: Date, horario: string): Promise<Agendamento | null>
}
