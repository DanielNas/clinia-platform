/*
- Responsabilidade: definir URLs e métodos HTTP.
- Qual URL existe e qual função será chamada. 
*/

// Importa o framework Express
const express = require('express');
// cria um "mini-app" de rotas
const router = express.Router();
// importa o controller de usuários
const usersController = require('../controllers/users.controller');
const validateUser = require('../middlewares/validateUser.middleware') 

// GET /users
router.get('/', usersController.getAll);

//GET /users/:id
router.get('/:id', usersController.getById);

// POST /users 
router.post('/', validateUser, usersController.create);

// Exporta as rotas para serem usadas no app
module.exports = router;