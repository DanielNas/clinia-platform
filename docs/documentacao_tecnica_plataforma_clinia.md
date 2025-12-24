# 🧠 Clinia

## Visão Geral

**Clinia** é uma plataforma SaaS de gestão para consultórios e clínicas, iniciando por Psicologia e evoluindo para Medicina e Gestão completa. O objetivo é oferecer uma solução segura, escalável e orientada a dados para a operação clínica e administrativa.

---

## Arquitetura Geral – Plataforma Clinia

### Frontend
- Flutter (Android, iOS e Web)
- Arquitetura: Clean Architecture
- State Management: Riverpod
- Offline-first para agenda e prontuário
- Criptografia local para dados sensíveis

### Backend
- Monólito modular (evolutivo para microserviços)
- API REST
- Camadas: Controllers, Services, Repositories, Domain
- Módulos principais:
  - Auth & Segurança
  - Usuários & Perfis
  - Pacientes
  - Agenda
  - Prontuário
  - Financeiro
  - Relatórios
  - Auditoria

### Banco de Dados
- PostgreSQL
- Criptografia em repouso
- Soft delete
- Auditoria e versionamento de prontuário

### Infraestrutura
- Docker
- Nginx (reverse proxy)
- Cloud (AWS/GCP/Azure)
- CI/CD (GitHub Actions)
- Ambientes: dev | staging | prod

---

## Stack Tecnológica

### Backend (Recomendado)
- Node.js + NestJS
- PostgreSQL
- Prisma ORM
- Redis (cache e filas)
- BullMQ (jobs)
- JWT + Refresh Token
- RBAC (Role Based Access Control)
- Swagger / OpenAPI

### Frontend
- Flutter
- Riverpod
- Clean Architecture

---

## Modelo de Dados (ERD – MVP)

### USERS
- id (PK)
- name
- email
- password_hash
- role (ADMIN | PROFISSIONAL)
- active
- created_at

### PROFESSIONALS
- id (PK)
- user_id (FK -> USERS)
- registration_number (CRP)
- specialty
- created_at

### PATIENTS
- id (PK)
- name
- document
- birth_date
- phone
- email
- active
- created_at

### APPOINTMENTS
- id (PK)
- professional_id (FK)
- patient_id (FK)
- start_time
- end_time
- status (SCHEDULED | DONE | CANCELED | NO_SHOW)
- created_at

### MEDICAL_RECORDS
- id (PK)
- appointment_id (FK)
- notes
- version
- created_at

### PAYMENTS
- id (PK)
- appointment_id (FK)
- amount
- payment_method
- paid_at

### AUDIT_LOGS
- id (PK)
- user_id
- action
- entity
- entity_id
- created_at

---

## Contratos de API (REST)

### Autenticação
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

### Usuários
- POST /users
- GET /users/me
- PATCH /users/:id

### Pacientes
- POST /patients
- GET /patients
- GET /patients/:id
- PATCH /patients/:id

### Agenda
- POST /appointments
- GET /appointments?date=YYYY-MM-DD
- PATCH /appointments/:id/status

### Prontuário
- POST /medical-records
- GET /medical-records/:appointment_id

### Financeiro
- POST /payments
- GET /payments?month=YYYY-MM

### Relatórios
- GET /reports/summary

---

## MVP – Funcionalidades Essenciais

- Cadastro de usuários e profissionais
- Cadastro de pacientes
- Agenda com status de atendimento
- Prontuário psicológico básico (versionado)
- Registro de pagamentos
- Relatórios simples (atendimentos e faturamento)
- Segurança, LGPD e auditoria

---

## Roadmap

### MVP (0–3 meses)
- Psicologia
- Agenda
- Prontuário simples
- Financeiro básico
- Relatórios essenciais

### Fase 2 (3–6 meses)
- Multi-profissional
- Multi-clínica
- Dashboards gerenciais
- Web app administrativo

### Fase 3 (6–12 meses)
- Medicina
- Convênios
- Teleatendimento
- Assinatura digital

### Fase 4 (12+ meses)
- Multi-especialidade
- BI avançado
- IA aplicada à saúde

---

## Backlog de Desenvolvimento (MVP)

### Sprint 1 – Fundação
- Setup repositório
- Infraestrutura Docker
- Autenticação e usuários

### Sprint 2 – Core Clínico
- Pacientes
- Agenda
- Status de sessões

### Sprint 3 – Prontuário
- Evolução clínica
- Versionamento
- Auditoria

### Sprint 4 – Financeiro e Relatórios
- Pagamentos
- Relatórios básicos
- Dashboard inicial

---

## Estrutura do Repositório

```
/clinia-platform
├── backend
│   ├── src
│   │   ├── auth
│   │   ├── users
│   │   ├── patients
│   │   ├── appointments
│   │   ├── medical-records
│   │   ├── payments
│   │   └── audit
│   ├── prisma
│   └── main.ts
│
├── frontend
│   ├── lib
│   │   ├── core
│   │   ├── modules
│   │   └── shared
│   └── main.dart
│
├── infra
│   ├── docker
│   └── nginx
│
└── docs
    ├── erd.md
    ├── api.md
    └── roadmap.md
```

---

## Princípios Não-Negociáveis
- Segurança desde o início
- LGPD by design
- Prontuário imutável
- Auditoria completa
- Arquitetura preparada para escalar

---

## Criação do Repositório e Estrutura Inicial

### Repositório
- Monorepo: `clinia-app`
- Plataforma: GitHub
- Branches principais:
  - `main` (produção)
  - `develop` (desenvolvimento)

### Estrutura Inicial
```
/clinia-platform
├── backend
│   ├── src
│   ├── prisma
│   ├── test
│   └── package.json
├── frontend
│   ├── lib
│   ├── test
│   └── pubspec.yaml
├── infra
│   ├── docker
│   └── nginx
├── docs
├── .editorconfig
├── .gitignore
└── README.md
```

### Padrões
- Commits: Conventional Commits
- Versionamento semântico

---

## Setup Completo do VS Code

### Extensões Obrigatórias
- Dart
- Flutter
- ESLint
- Prettier
- Docker
- REST Client
- Prisma

### Configuração Padrão (`.vscode/settings.json`)
- Format on save habilitado
- Prettier como formatter padrão
- ESLint integrado ao save

### Debug
- Flutter: Debug mobile e web
- Node.js: Debug API NestJS

### Benefícios
- Padronização do código
- Redução de erros
- Onboarding rápido de novos desenvolvedores

---

## Ambiente de Desenvolvimento (Docker)

### Serviços do Docker Compose
- API Backend (NestJS)
- PostgreSQL
- Redis
- Adminer

### docker-compose.yml
```yaml
version: "3.9"

services:
  api:
    container_name: clinia_api
    build: ./backend
    command: npm run start:dev
    volumes:
      - ./backend:/app
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    container_name: clinia_db
    environment:
      POSTGRES_DB: clinia
      POSTGRES_USER: clinia
      POSTGRES_PASSWORD: clinia
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: clinia_redis
    ports:
      - "6379:6379"

  adminer:
    image: adminer
    container_name: clinia_adminer
    ports:
      - "8080:8080"

volumes:
  postgres_data:
```

### Dockerfile (Backend)
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
```

---

## Variáveis de Ambiente

### .env.example
```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://clinia:clinia@db:5432/clinia
REDIS_HOST=redis
REDIS_PORT=6379

JWT_SECRET=supersecret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## Comandos de Execução

```bash
# subir ambiente
docker compose up -d --build

# parar ambiente
docker compose down
```

Após subir, acessar:
- API: http://localhost:3000
- Adminer: http://localhost:8080

---

## Objetivo desta etapa
- Ambiente padronizado
- Backend pronto para receber módulos
- Base sólida para evolução do ERD e contratos de API

