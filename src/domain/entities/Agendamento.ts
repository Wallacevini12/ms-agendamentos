export type AgendamentoStatus = 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'
export type AgendamentoTipo   = 'CONSULTA' | 'EXAME' | 'PROCEDIMENTO'

export interface AgendamentoProps {
  id?: string
  beneficiarioId: string
  beneficiarioNome: string
  prestadorId: string
  prestadorNome: string
  especialidade: string
  tipo: AgendamentoTipo
  data: Date
  horario: string
  status: AgendamentoStatus
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Agendamento {
  readonly id: string
  readonly beneficiarioId: string
  readonly beneficiarioNome: string
  readonly prestadorId: string
  readonly prestadorNome: string
  readonly especialidade: string
  readonly tipo: AgendamentoTipo
  readonly data: Date
  readonly horario: string
  status: AgendamentoStatus
  readonly observacoes?: string
  readonly createdAt: Date
  updatedAt: Date

  constructor(props: AgendamentoProps) {
    if (!props.beneficiarioId) throw new Error('beneficiarioId é obrigatório')
    if (!props.prestadorId)    throw new Error('prestadorId é obrigatório')
    if (!props.data)           throw new Error('data é obrigatória')
    if (!props.horario)        throw new Error('horario é obrigatório')

    this.id              = props.id ?? crypto.randomUUID()
    this.beneficiarioId  = props.beneficiarioId
    this.beneficiarioNome= props.beneficiarioNome
    this.prestadorId     = props.prestadorId
    this.prestadorNome   = props.prestadorNome
    this.especialidade   = props.especialidade
    this.tipo            = props.tipo
    this.data            = props.data
    this.horario         = props.horario
    this.status          = props.status ?? 'PENDENTE'
    this.observacoes     = props.observacoes
    this.createdAt       = props.createdAt ?? new Date()
    this.updatedAt       = props.updatedAt ?? new Date()
  }

  confirmar(): void {
    if (this.status !== 'PENDENTE') throw new Error('Apenas agendamentos PENDENTES podem ser confirmados')
    this.status    = 'CONFIRMADO'
    this.updatedAt = new Date()
  }

  cancelar(): void {
    if (this.status === 'CONCLUIDO') throw new Error('Agendamento concluído não pode ser cancelado')
    this.status    = 'CANCELADO'
    this.updatedAt = new Date()
  }

  toJSON(): AgendamentoProps {
    return {
      id:              this.id,
      beneficiarioId:  this.beneficiarioId,
      beneficiarioNome:this.beneficiarioNome,
      prestadorId:     this.prestadorId,
      prestadorNome:   this.prestadorNome,
      especialidade:   this.especialidade,
      tipo:            this.tipo,
      data:            this.data,
      horario:         this.horario,
      status:          this.status,
      observacoes:     this.observacoes,
      createdAt:       this.createdAt,
      updatedAt:       this.updatedAt,
    }
  }
}
