import { Agendamento } from '../../domain/entities/Agendamento'
import { IAgendamentoRepository } from '../../domain/repositories/IAgendamentoRepository'
import { AgendamentoModel } from '../database/AgendamentoSchema'

export class MongoAgendamentoRepository implements IAgendamentoRepository {
  async create(agendamento: Agendamento): Promise<Agendamento> {
    const doc = await AgendamentoModel.create(agendamento.toJSON())
    return this.toDomain(doc)
  }

  async findById(id: string): Promise<Agendamento | null> {
    const doc = await AgendamentoModel.findById(id).lean()
    if (!doc) return null
    return this.toDomain(doc)
  }

  async findAll(filters?: { status?: string; beneficiarioId?: string }): Promise<Agendamento[]> {
    const query: Record<string, unknown> = {}
    if (filters?.status)        query.status        = filters.status
    if (filters?.beneficiarioId) query.beneficiarioId = filters.beneficiarioId

    const docs = await AgendamentoModel.find(query).sort({ data: -1 }).lean()
    return docs.map(d => this.toDomain(d))
  }

  async findConflito(prestadorId: string, data: Date, horario: string): Promise<Agendamento | null> {
    // Considera conflito apenas para agendamentos ativos (não cancelados).
    // Compara o dia inteiro (início ao fim do dia) + mesmo horário + mesmo prestador.
    const inicioDia = new Date(data); inicioDia.setHours(0, 0, 0, 0)
    const fimDia    = new Date(data); fimDia.setHours(23, 59, 59, 999)

    const doc = await AgendamentoModel.findOne({
      prestadorId,
      horario,
      data:   { $gte: inicioDia, $lte: fimDia },
      status: { $ne: 'CANCELADO' },
    }).lean()

    if (!doc) return null
    return this.toDomain(doc)
  }

  async update(agendamento: Agendamento): Promise<Agendamento> {
    const doc = await AgendamentoModel.findByIdAndUpdate(
      agendamento.id,
      { $set: agendamento.toJSON() },
      { new: true }
    ).lean()
    if (!doc) throw new Error('Agendamento não encontrado para atualização')
    return this.toDomain(doc)
  }

  async delete(id: string): Promise<void> {
    await AgendamentoModel.findByIdAndDelete(id)
  }

  private toDomain(doc: any): Agendamento {
    return new Agendamento({
      id:              doc._id?.toString() ?? doc.id,
      beneficiarioId:  doc.beneficiarioId,
      beneficiarioNome:doc.beneficiarioNome,
      prestadorId:     doc.prestadorId,
      prestadorNome:   doc.prestadorNome,
      especialidade:   doc.especialidade,
      tipo:            doc.tipo,
      data:            doc.data,
      horario:         doc.horario,
      status:          doc.status,
      observacoes:     doc.observacoes,
      createdAt:       doc.createdAt,
      updatedAt:       doc.updatedAt,
    })
  }
}
