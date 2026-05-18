import { IAgendamentoRepository } from '../../../domain/repositories/IAgendamentoRepository'
import { UpdateAgendamentoDTO, AgendamentoResponseDTO } from '../../dtos/AgendamentoDTO'

export class UpdateAgendamentoUseCase {
  constructor(private readonly repository: IAgendamentoRepository) {}

  async execute(id: string, dto: UpdateAgendamentoDTO): Promise<AgendamentoResponseDTO> {
    const agendamento = await this.repository.findById(id)
    if (!agendamento) throw new Error(`Agendamento ${id} não encontrado`)

    if (dto.status === 'CONFIRMADO') agendamento.confirmar()
    if (dto.status === 'CANCELADO')  agendamento.cancelar()

    const updated = await this.repository.update(agendamento)
    return updated.toJSON() as AgendamentoResponseDTO
  }
}
