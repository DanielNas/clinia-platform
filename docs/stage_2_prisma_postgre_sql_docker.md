# Stage 2 — Integração Prisma + PostgreSQL com Docker

## 🎯 Objetivo do Stage 2

Este estágio tem como objetivo **conectar a aplicação backend Node.js (Express)** a um **banco de dados PostgreSQL**, utilizando **Prisma ORM**, tudo rodando de forma **containerizada com Docker**.

Ao final do Stage 2, garantimos que:
- O banco está versionado
- O schema é a fonte da verdade
- O ambiente é reproduzível em qualquer máquina

---

## 🧱 Arquitetura Envolvida

```
┌────────────┐        ┌──────────────┐        ┌──────────────┐
│  Express   │  ───▶  │    Prisma     │  ───▶  │ PostgreSQL   │
│  (Node.js) │        │ ORM + Client  │        │ (Docker)    │
└────────────┘        └──────────────┘        └──────────────┘
```

Todos os serviços rodam via **Docker Compose**.

---

## 🐳 Docker Compose

Arquivo `docker-compose.yml` na raiz do projeto:

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

📌 **Pontos importantes**:
- O serviço `db` cria o hostname `db`
- O Prisma deve usar `db:5432`, nunca `localhost`

---

## 📦 Prisma — Conceitos Importantes

### Por que Prisma?
- ORM moderno
- Schema como fonte da verdade
- Migrations versionadas
- Tipagem forte

---

## 📁 Estrutura do Prisma

```
backend/
 ├── prisma/
 │   ├── schema.prisma
 │   └── migrations/
 ├── prisma.config.ts
```

---

## 🧬 schema.prisma

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String   @id @default(uuid())
  name      String   @db.VarChar(255)
  email     String   @unique @db.VarChar(255)
  password  String   @db.VarChar(255)
  role      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

📌 No Prisma **v7**, a URL do banco **não fica mais aqui**.

---

## ⚙️ prisma.config.ts (Prisma v7)

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

📌 A variável `DATABASE_URL` vem do `.env`.

---

## 🔐 .env

```env
DATABASE_URL="postgresql://clinia:clinia@db:5432/clinia"
PORT=3000
```

---

## 🚀 Executando Migrations (CORRETO)

⚠️ **Nunca rode migrate fora do container**

Comando correto:

```bash
docker exec -it clinia_api npx prisma migrate dev --name init_users
```

Resultado esperado:

```
Applying migration `xxxx_init_users`
Your database is now in sync with your schema.
```

---

## 📂 O que o Prisma gerou

```
prisma/
 └── migrations/
     └── 2025xxxx_init_users/
         └── migration.sql
```

Esse SQL é a **história do banco**.

---

## 🧠 Conceitos Aprendidos no Stage 2

✔ Docker networking (`db` ≠ `localhost`)
✔ Banco não precisa estar instalado na máquina
✔ Prisma v7 mudou o local da URL
✔ Migrations devem rodar no container
✔ Banco versionado como código

---

## ✅ Status do Stage 2

**CONCLUÍDO COM SUCESSO** 🎉

O backend agora possui:
- PostgreSQL rodando
- Prisma conectado
- Tabela `User` criada

---

## 🔜 Próximo Stage

👉 **Stage 3 — Repository Pattern com Prisma**

Vamos ligar:

```
Controller → Service → Repository → Prisma → Postgres
```

Separando responsabilidades de forma profissional.

---

📌 Este documento faz parte do aprendizado progressivo do projeto **Clinia Platform**.

