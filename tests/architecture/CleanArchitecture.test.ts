/**
 * Testes de Arquitetura — MS Agendamentos
 * Usando ArchUnitTS (pacote: archunit)
 *
 * Valida Clean Architecture + Vertical Slice no microservico de Agendamentos.
 */
import { projectFiles, extendJestMatchers } from 'archunit'

extendJestMatchers()

describe('ArchUnitTS — Clean Architecture: MS Agendamentos', () => {

  it('[CA-01] Domain NAO deve importar camada Application', async () => {
    const rule = projectFiles()
      .inFolder('**/domain/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('**/application/**')
    await expect(rule).toPassAsync()
  })

  it('[CA-02] Domain NAO deve importar camada Infrastructure', async () => {
    const rule = projectFiles()
      .inFolder('**/domain/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('**/infrastructure/**')
    await expect(rule).toPassAsync()
  })

  it('[CA-03] Domain NAO deve importar camada API', async () => {
    const rule = projectFiles()
      .inFolder('**/domain/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('**/api/**')
    await expect(rule).toPassAsync()
  })

  it('[CA-04] Application NAO deve importar Infrastructure diretamente', async () => {
    const rule = projectFiles()
      .inFolder('**/application/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('**/infrastructure/**')
    await expect(rule).toPassAsync()
  })

  it('[CA-05] Application NAO deve importar camada API', async () => {
    const rule = projectFiles()
      .inFolder('**/application/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('**/api/**')
    await expect(rule).toPassAsync()
  })

  it('[CA-06] Infrastructure NAO deve importar camada API', async () => {
    const rule = projectFiles()
      .inFolder('**/infrastructure/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('**/api/**')
    await expect(rule).toPassAsync()
  })

  it('[CA-07] Use Cases NAO devem depender de MongoAgendamentoRepository', async () => {
    const rule = projectFiles()
      .inFolder('**/application/use-cases/**')
      .shouldNot()
      .dependOnFiles()
      .withName('MongoAgendamentoRepository.ts')
    await expect(rule).toPassAsync()
  })

  it('[CA-08] Domain NAO deve ter dependencias circulares', async () => {
    const rule = projectFiles()
      .inFolder('**/domain/**')
      .should()
      .haveNoCycles()
    await expect(rule).toPassAsync()
  })

  it('[CA-09] Application NAO deve ter dependencias circulares', async () => {
    const rule = projectFiles()
      .inFolder('**/application/**')
      .should()
      .haveNoCycles()
    await expect(rule).toPassAsync()
  })

  it('[VS-01] Use Cases devem estar em application/use-cases', async () => {
    const rule = projectFiles()
      .withName('*UseCase.ts')
      .should()
      .beInFolder('**/application/use-cases/**')
    await expect(rule).toPassAsync()
  })

  it('[VS-02] Interfaces de repositorio devem estar em domain/repositories', async () => {
    const rule = projectFiles()
      .withName('I*Repository.ts')
      .should()
      .beInFolder('**/domain/repositories/**')
    await expect(rule).toPassAsync()
  })

  it('[VS-03] Controllers devem estar dentro da pasta api', async () => {
    const rule = projectFiles()
      .withName('*Controller.ts')
      .should()
      .beInFolder('**/api/**')
    await expect(rule).toPassAsync()
  })
})