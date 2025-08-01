# Aplicativo de Transações Financeiras

## Tecnologias / Linguagens de programação

- Javascript
- NodeJS
- GitHub
- Typescript
- Fastify
- Knex
- Zod
- PostgreSQL
- SQLite
- Vitest

## Requisitos da aplicação

```md
- Requisitos Funcionais

  - [] Criar uma nova transação;
  - [] Obter um resumo da conta do usuário;
  - [] Listar toda as transações já feitas;
  - [] Visualizar uma transação única;

- Requisitos Não Funcionais

  - [] Transação deve ser do tipo rédito, que somará ao vaor total, ou débito subtrairá;
  - [] Deve ser possível identificar o usuário entre as requisições;
  - [] O usuário só pode visualizar transações o qual ele criou;
```

## Rotas

A API REST para o aplicativo de exemplo é descrita abaixo.

- Criação da transação: `POST /transactions`
- Listagem das transações: `GET  /transactions`
- Listagem de uma transação: `GET  /transactions/:id`
- Obter saldo: `GET  /transactions/summary`
