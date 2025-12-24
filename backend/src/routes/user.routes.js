//Responsabilidade: definir URLs e métodos HTTP

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// GET /users
router.get('/', usersController.getAll);

//GET /users/:id
router.get('/:id', usersController.getById);

// POST /users
router.post('/', usersController.create);

module.exports = router;