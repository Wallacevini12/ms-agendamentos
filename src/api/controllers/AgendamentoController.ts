import { Router, Request, Response } from 'express'
import { MongoAgendamentoRepository } from '../../infrastructure/repositories/MongoAgendamentoRepository'
import { CreateAgendamentoUseCase }  from '../../application/use-cases/CreateAgendamento/CreateAgendamentoUseCase'
import { GetAgendamentoUseCase }     from '../../application/use-cases/GetAgendamento/GetAgendamentoUseCase'
import { ListAgendamentosUseCase }   from '../../application/use-cases/ListAgendamentos/ListAgendamentosUseCase'
import { UpdateAgendamentoUseCase }  from '../../application/use-cases/UpdateAgendamento/UpdateAgendamentoUseCase'
import { DeleteAgendamentoUseCase }  from '../../application/use-cases/DeleteAgendamento/DeleteAgendamentoUseCase'

const router = Router()
const repo   = new MongoAgendamentoRepository()

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDENTE, CONFIRMADO, CANCELADO, CONCLUIDO] }
 *       - in: query
 *         name: beneficiarioId
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const useCase = new ListAgendamentosUseCase(repo)
    const data    = await useCase.execute({ status: req.query.status as string, beneficiarioId: req.query.beneficiarioId as string })
    res.json({ success: true, data, total: data.length })
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message })
  }
})

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Busca agendamento por ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const useCase = new GetAgendamentoUseCase(repo)
    const data    = await useCase.execute(req.params.id)
    res.json({ success: true, data })
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message })
  }
})

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [beneficiarioId, beneficiarioNome, prestadorId, prestadorNome, especialidade, tipo, data, horario]
 *             properties:
 *               beneficiarioId:   { type: string }
 *               beneficiarioNome: { type: string }
 *               prestadorId:      { type: string }
 *               prestadorNome:    { type: string }
 *               especialidade:    { type: string }
 *               tipo:             { type: string, enum: [CONSULTA, EXAME, PROCEDIMENTO] }
 *               data:             { type: string, format: date }
 *               horario:          { type: string, example: "09:00" }
 *               observacoes:      { type: string }
 *     responses:
 *       201:
 *         description: Agendamento criado
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const useCase = new CreateAgendamentoUseCase(repo)
    const data    = await useCase.execute(req.body)
    res.status(201).json({ success: true, data })
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message })
  }
})

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [CONFIRMADO, CANCELADO] }
 *               observacoes: { type: string }
 *     responses:
 *       200:
 *         description: Agendamento atualizado
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const useCase = new UpdateAgendamentoUseCase(repo)
    const data    = await useCase.execute(req.params.id, req.body)
    res.json({ success: true, data })
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message })
  }
})

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Remove agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Removido com sucesso
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const useCase = new DeleteAgendamentoUseCase(repo)
    await useCase.execute(req.params.id)
    res.status(204).send()
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message })
  }
})

export default router
