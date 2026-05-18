import { IAgendamentoRepository } from '../../../domain/repositories/IAgendamentoRepository'
import { AgendamentoResponseDTO } from '../../dtos/AgendamentoDTO'

export class GetAgendamentoUseCase {
  constructor(private readonly repository: IAgendamentoRepository) {}

  async execute(id: string): Promise<AgendamentoResponseDTO> {
    const agendamento = await this.repository.findById(id)
    if (!agendamento) throw new Error(`Agendamento ${id} não encontrado`)
    return agendamento.toJSON() as AgendamentoResponseDTO
  }
}
