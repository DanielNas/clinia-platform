# 🏗️ Clinia Platform — Stage 1 (Fundamentos Backend)

## 🎯 Objetivo do Stage 1
Este estágio tem como foco **aprender e consolidar os fundamentos de backend** de forma didática e profissional, servindo como base sólida para evoluções futuras da plataforma Clinia.

O Stage 1 prioriza:
- Organização de projeto
- Arquitetura em camadas
- Criação de API REST
- Boas práticas desde o início
- Aprendizado consciente (entender o *porquê* de cada decisão)

---

## 🏥 Visão geral do projeto

**Clinia Platform** é uma plataforma de gestão de clínicas, iniciando pela psicologia, mas pensada para escalar para:
- Psicologia
- Medicina
- Gestão administrativa
- Agenda
- Prontuário
- Financeiro
- Auditoria

Neste estágio, o foco **não é o negócio completo**, e sim a **fundação técnica correta**.

---

## 📁 Estrutura do projeto (Stage 1)

```
clinia-platform/
├── backend/
│   ├── src/
│   │   ├── app.js            # Configuração do Express
│   │   ├── server.js         # Inicialização do servidor
│   │   │
│   │   ├── routes/           # Definição das rotas HTTP
│   │   │   └── users.routes.js
│   │   │
│   │   ├── controllers/      # Controle de Request / Response
│   │   │   └── users.controller.js
│   │   │
│   │   ├── services/         # Regras de negócio
│   │   │   └── users.service.js
│   │   │
│   │   └── middlewares/      # (futuro)
│   │
│   ├── package.json
│   └── node_modules/
│
├── frontend/                 # (futuro – Flutter)
├── infra/                    # (futuro – Docker, Nginx)
└── docs/                     # Documentação
```

---

## 🔄 Fluxo de uma requisição

Exemplo: `POST /users`

```
Postman
  ↓
users.routes.js
  ↓
users.controller.js
  ↓
users.service.js
  ↓
Response JSON
```

### Responsabilidade de cada camada

| Camada | Responsabilidade |
|------|------------------|
| Routes | Define URL e método HTTP |
| Controller | Recebe request e devolve response |
| Service | Regra de negócio |
| (Futuro) Repository | Acesso ao banco de dados |

---

## 👤 Módulo Users (MVP)

### Endpoints disponíveis

#### GET /users
- Retorna todos os usuários
- Status: 200

#### GET /users/:id
- Retorna usuário por ID
- Status 200 se existir
- Status 404 se não existir

#### POST /users
- Cria um novo usuário
- Status 201

---

## 🧪 Estratégia de dados (Stage 1)

- Banco de dados **em memória** (array JS)
- Dados são resetados a cada restart do servidor
- Objetivo: foco em arquitetura e lógica, não persistência

---

## 🧠 Aprendizados consolidados até aqui

- Separação de responsabilidades
- Organização de projeto backend
- Uso correto do Express
- Debug de erros reais
- Leitura de stack trace
- Testes manuais com Postman
- Noções iniciais de arquitetura profissional

---

# ✅ Opção 1 — Validação de Dados (Próximo passo)

## 🎯 Objetivo
Garantir que a API:
- Receba apenas dados válidos
- Retorne erros claros
- Utilize status HTTP corretos

Isso melhora:
- Qualidade da API
- Segurança
- Experiência de quem consome a API

---

## 📌 Regras de validação (Users)

### POST /users

| Campo | Regra |
|----|-----|
| name | Obrigatório, mínimo 3 caracteres |
| email | Obrigatório, formato válido |

---

## ❌ Erros esperados

### Exemplo: nome ausente
Status: **400 Bad Request**

```json
{
  "error": "Name is required"
}
```

### Exemplo: email inválido
Status: **400 Bad Request**

```json
{
  "error": "Invalid email"
}
```

---

## 🧱 Onde a validação deve acontecer?

**No Controller** (Stage 1):
- Controller conhece o formato da requisição
- Service continua focado apenas em regra de negócio

(Futuramente, a validação pode ser extraída para middlewares ou libs como Zod/Joi)

---

## 📚 Conceitos aprendidos neste estágio

- Diferença entre erro de cliente (400) e erro de servidor (500)
- Validação de entrada de dados
- Design de API consistente
- Importância de mensagens claras

---

## 🧭 Roadmap após o Stage 1

- Stage 2: Middleware de erro global
- Stage 3: Persistência com Prisma + PostgreSQL
- Stage 4: Autenticação (JWT)
- Stage 5: Patients
- Stage 6: App Flutter

---

## ✅ Conclusão

O **Stage 1** estabelece uma base sólida de backend, permitindo evoluir a Clinia Platform com segurança, clareza e boas práticas.

Este documento deve servir como **referência de estudo** e ponto de comparação conforme o projeto evolui.
