import { IAgendamentoRepository } from '../../../domain/repositories/IAgendamentoRepository'
import { AgendamentoResponseDTO } from '../../dtos/AgendamentoDTO'

export class ListAgendamentosUseCase {
  constructor(private readonly repository: IAgendamentoRepository) {}

  async execute(filters?: { status?: string; beneficiarioId?: string }): Promise<AgendamentoResponseDTO[]> {
    const agendamentos = await this.repository.findAll(filters)
    return agendamentos.map(a => a.toJSON() as AgendamentoResponseDTO)
  }
}
