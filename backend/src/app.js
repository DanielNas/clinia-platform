
const express = require('express');
const app = express();

// recebe o JSON no body
app.use(express.json());

// importa as rotas de usuários
const usersRoutes = require('./routes/users.routes');
// define o prefixo/users
app.use('/users', usersRoutes);

// rotas não encontradas (sempre depois das rotas)
const notFound = require('./middlewares/notFound.middleware');
app.use(notFound)

// erros globais (sempre por último)
const errorHandler = require('./middlewares/errorHandler.middleware');
app.use(errorHandler);

module.exports = app;