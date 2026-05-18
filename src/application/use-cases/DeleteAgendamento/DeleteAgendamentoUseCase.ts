import { IAgendamentoRepository } from '../../../domain/repositories/IAgendamentoRepository'

export class DeleteAgendamentoUseCase {
  constructor(private readonly repository: IAgendamentoRepository) {}

  async execute(id: string): Promise<void> {
    const agendamento = await this.repository.findById(id)
    if (!agendamento) throw new Error(`Agendamento ${id} não encontrado`)
    await this.repository.delete(id)
  }
}
