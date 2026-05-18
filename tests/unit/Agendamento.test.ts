import { Agendamento } from '../../src/domain/entities/Agendamento'

describe('Agendamento Entity', () => {
  const makeAgendamento = () => new Agendamento({
    beneficiarioId:   'b-001',
    beneficiarioNome: 'Maria Silva',
    prestadorId:      'p-001',
    prestadorNome:    'Dr. Carlos Mendes',
    especialidade:    'Cardiologia',
    tipo:             'CONSULTA',
    data:             new Date('2026-05-01'),
    horario:          '09:00',
    status:           'PENDENTE',
  })

  it('deve criar um agendamento com status PENDENTE por padrão', () => {
    const a = makeAgendamento()
    expect(a.status).toBe('PENDENTE')
    expect(a.id).toBeDefined()
  })

  it('deve confirmar um agendamento PENDENTE', () => {
    const a = makeAgendamento()
    a.confirmar()
    expect(a.status).toBe('CONFIRMADO')
  })

  it('não deve confirmar um agendamento já CONFIRMADO', () => {
    const a = makeAgendamento()
    a.confirmar()
    expect(() => a.confirmar()).toThrow()
  })

  it('deve cancelar um agendamento PENDENTE', () => {
    const a = makeAgendamento()
    a.cancelar()
    expect(a.status).toBe('CANCELADO')
  })

  it('não deve cancelar um agendamento CONCLUIDO', () => {
    const a = new Agendamento({ ...makeAgendamento().toJSON(), status: 'CONCLUIDO' })
    expect(() => a.cancelar()).toThrow()
  })

  it('deve lançar erro se beneficiarioId não informado', () => {
    expect(() => new Agendamento({
      beneficiarioId: '',
      beneficiarioNome: 'X',
      prestadorId: 'p-001',
      prestadorNome: 'Dr X',
      especialidade: 'Geral',
      tipo: 'CONSULTA',
      data: new Date(),
      horario: '10:00',
      status: 'PENDENTE',
    })).toThrow('beneficiarioId é obrigatório')
  })

  it('deve serializar para JSON corretamente', () => {
    const a = makeAgendamento()
    const json = a.toJSON()
    expect(json.beneficiarioId).toBe('b-001')
    expect(json.tipo).toBe('CONSULTA')
  })
})
