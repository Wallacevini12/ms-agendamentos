# MS Agendamentos — Unimed

> Microserviço responsável pelo domínio de Agendamentos médicos  
> **Stack:** Node.js · TypeScript · Express · MongoDB Atlas · Clean Architecture

**Equipe:** Gabriel Girotto | Giovani Tortatto | Lucas Cunha | Matheus Garozi | Wallace Vinicius

---

## Arquitetura

```
src/
├── domain/                        # Camada de Domínio (sem dependências externas)
│   ├── entities/Agendamento.ts    # Entidade rica com regras de negócio
│   └── repositories/              # Interfaces (contratos)
├── application/                   # Camada de Aplicação (casos de uso)
│   ├── dtos/                      # Data Transfer Objects
│   └── use-cases/                 # Vertical Slice — um folder por feature
│       ├── CreateAgendamento/
│       ├── GetAgendamento/
│       ├── ListAgendamentos/
│       ├── UpdateAgendamento/
│       └── DeleteAgendamento/
├── infrastructure/                # Camada de Infraestrutura (MongoDB)
│   ├── database/                  # Schema Mongoose + conexão
│   └── repositories/              # Implementação concreta do repositório
└── api/                           # Camada de API (Express)
    ├── controllers/               # Controllers com Swagger JSDoc
    ├── swagger/                   # Configuração OpenAPI
    └── server.ts                  # Entrypoint
```

**Padrões:** Clean Architecture · Vertical Slice · Dependency Inversion · Repository Pattern

---

## Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Node.js | 20 LTS | Runtime |
| TypeScript | 5.3 | Tipagem estática |
| Express | 4.18 | Framework HTTP |
| Mongoose | 8.x | ODM para MongoDB |
| MongoDB Atlas | Free Tier | Banco de dados |
| Swagger UI | 5.x | Documentação |
| Jest | 29 | Testes unitários e de arquitetura |
| Docker | — | Containerização |

---

## Como rodar localmente

### 1. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com sua string de conexão do MongoDB Atlas:

```
PORT=3001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/agendamentos
```

### 2. Instalar e rodar

```bash
npm install
npm run dev
```

### 3. Acessar

| URL | Descrição |
|-----|-----------|
| http://localhost:3001/agendamentos | API REST |
| http://localhost:3001/docs | Swagger UI |
| http://localhost:3001/health | Health check |

### 4. Rodar testes

```bash
npm test              # Todos os testes
npm run test:unit     # Apenas testes unitários
npm run test:arch     # Testes de arquitetura (Clean Architecture)
```

---

## Docker

```bash
docker build -t dockerhubuser/pjbl/ms-agendamentos:v1 .
docker push dockerhubuser/pjbl/ms-agendamentos:v1
```

---

## Exemplo de request

```bash
# Criar agendamento
curl -X POST http://localhost:3001/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "beneficiarioId": "b-001",
    "beneficiarioNome": "Maria Silva",
    "prestadorId": "p-001",
    "prestadorNome": "Dr. Carlos Mendes",
    "especialidade": "Cardiologia",
    "tipo": "CONSULTA",
    "data": "2026-05-10",
    "horario": "09:00"
  }'

# Confirmar agendamento
curl -X PUT http://localhost:3001/agendamentos/<id> \
  -H "Content-Type: application/json" \
  -d '{ "status": "CONFIRMADO" }'
```
