import { Agendamento } from '../../../domain/entities/Agendamento'
import { IAgendamentoRepository } from '../../../domain/repositories/IAgendamentoRepository'
import { CreateAgendamentoDTO, AgendamentoResponseDTO } from '../../dtos/AgendamentoDTO'

export class CreateAgendamentoUseCase {
  constructor(private readonly repository: IAgendamentoRepository) {}

  async execute(dto: CreateAgendamentoDTO): Promise<AgendamentoResponseDTO> {
    const agendamento = new Agendamento({
      beneficiarioId:   dto.beneficiarioId,
      beneficiarioNome: dto.beneficiarioNome,
      prestadorId:      dto.prestadorId,
      prestadorNome:    dto.prestadorNome,
      especialidade:    dto.especialidade,
      tipo:             dto.tipo,
      data:             new Date(dto.data),
      horario:          dto.horario,
      status:           'PENDENTE',
      observacoes:      dto.observacoes,
    })

    const saved = await this.repository.create(agendamento)
    return saved.toJSON() as AgendamentoResponseDTO
  }
}
