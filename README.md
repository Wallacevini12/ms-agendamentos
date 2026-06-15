# MS Agendamentos — Sistema de Agendamento Unimed

Microsserviço responsável pelo domínio de **Agendamentos** (consultas, exames e procedimentos) do Sistema de Agendamento Unimed. Persiste os dados em **MongoDB Atlas** e expõe uma API REST documentada via Swagger.

## Arquitetura

Este microsserviço segue **Clean Architecture** com quatro camadas isoladas e organização interna por **Vertical Slice** (uma pasta por caso de uso):

```
src/
├── domain/            # Entidades e interfaces de repositório (regras de negócio)
│   ├── entities/             -> Agendamento
│   └── repositories/         -> IAgendamentoRepository
├── application/       # Casos de uso (Vertical Slice)
│   └── use-cases/
│       ├── CreateAgendamento/
│       ├── GetAgendamento/
│       ├── ListAgendamentos/
│       ├── UpdateAgendamento/
│       └── DeleteAgendamento/
├── infrastructure/    # Implementações concretas (MongoDB via Mongoose)
│   ├── database/
│   └── repositories/         -> MongoAgendamentoRepository
└── api/               # Controllers REST e configuração Swagger
```

A regra de dependência é unidirecional: as camadas externas dependem das internas, nunca o contrário. A conformidade é garantida por **testes de arquitetura** (ArchUnitTS).

### Regra de negócio: bloqueio de horário
O caso de uso `CreateAgendamento` impede **overbooking**: através do método `findConflito`, não permite dois agendamentos ativos para o mesmo prestador, na mesma data e horário. Em caso de conflito, retorna HTTP 400.

## Tecnologias

- **Node.js** + **TypeScript**
- **Express** (API REST)
- **MongoDB Atlas** + **Mongoose** (persistência)
- **Swagger** (swagger-ui-express + swagger-jsdoc)
- **Jest** + **ts-jest** (testes unitários)
- **ArchUnitTS** (testes de arquitetura)
- **Docker**

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | /agendamentos | Lista agendamentos (filtros: status, beneficiarioId) |
| GET    | /agendamentos/:id | Busca um agendamento por ID |
| POST   | /agendamentos | Cria um novo agendamento (valida conflito de horário) |
| PUT    | /agendamentos/:id | Atualiza status (CONFIRMADO/CANCELADO) |
| DELETE | /agendamentos/:id | Remove um agendamento |

Documentação completa em **http://localhost:3001/docs**

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Criar o arquivo .env na raiz com:
#    PORT=3001
#    MONGODB_URI=<sua-connection-string-do-mongodb-atlas>
#    NODE_ENV=development

# 3. Rodar em modo desenvolvimento
npm run dev
```

O serviço sobe em **http://localhost:3001** e o Swagger em **http://localhost:3001/docs**.

## Testes

```bash
# Todos os testes
npm test

# Apenas testes de arquitetura
npm test -- --testPathPattern=architecture
```

## Docker

```bash
docker build -t wallacevini12/ms-agendamentos:v1 .
docker push wallacevini12/ms-agendamentos:v1
```

Imagem publicada: `wallacevini12/ms-agendamentos:v1`

## Vídeo de demonstração
https://youtu.be/yXW6vKhXH8o

## Equipe

- Gabriel Girotto
- Giovani Tortatto
- Lucas Cunha
- Matheus Garozi
- Wallace Vinicius

> Pontifícia Universidade Católica do Paraná (PUCPR) — Arquitetura e Soluções Cloud — 2026
