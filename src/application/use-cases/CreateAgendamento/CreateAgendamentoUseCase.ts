import { Agendamento } from '../../../domain/entities/Agendamento'
import { IAgendamentoRepository } from '../../../domain/repositories/IAgendamentoRepository'
import { CreateAgendamentoDTO, AgendamentoResponseDTO } from '../../dtos/AgendamentoDTO'

export class CreateAgendamentoUseCase {
  constructor(private readonly repository: IAgendamentoRepository) {}

  async execute(dto: CreateAgendamentoDTO): Promise<AgendamentoResponseDTO> {
    const dataAgendamento = new Date(dto.data)

    // ── Regra de negócio: não permitir dois agendamentos no mesmo
    //    prestador + data + horário (evita overbooking) ──────────────────
    const conflito = await this.repository.findConflito(
      dto.prestadorId,
      dataAgendamento,
      dto.horario,
    )
    if (conflito) {
      throw new Error(
        `Horário indisponível: ${dto.prestadorNome} já possui agendamento em ` +
        `${dto.data} às ${dto.horario}. Escolha outro horário.`
      )
    }

    const agendamento = new Agendamento({
      beneficiarioId:   dto.beneficiarioId,
      beneficiarioNome: dto.beneficiarioNome,
      prestadorId:      dto.prestadorId,
      prestadorNome:    dto.prestadorNome,
      especialidade:    dto.especialidade,
      tipo:             dto.tipo,
      data:             dataAgendamento,
      horario:          dto.horario,
      status:           'PENDENTE',
      observacoes:      dto.observacoes,
    })

    const saved = await this.repository.create(agendamento)
    return saved.toJSON() as AgendamentoResponseDTO
  }
}
