/*
- Responsabilidade: definir URLs e métodos HTTP
- Receber a requisição HTTP e devolver uma resposta HTTP.
*/

// importa o service (onde está a regra de negócio)
const usersService = require('../services/users.service');

// GET /users
exports.getAll = (req, res) => {
    // chama o service para buscar usuários
    const users = usersService.getAllUsers();

    // retorna JSON com status 200
    res.json(users)
};

// GET /user:id
exports.getById = (req, res) => {
    // pega o parâmetro id da URL
    const { id } = req.params;
    // busca o usuário no service
    const user = usersService.getByID(id);
    // se não econtrar, retorna 404
    if(!user) {
        return res.status(404).json({ message: "User not found"});
    }

    // se encontrar, retorna o usuário
    res.json(user)
};

// POST /users
exports.create = (req, res) => {
    // dados enviados no corpo da requisição
    const { name, email} = req.body;

    // cria o usuario no service caso tenha passado pelas validações
    const newUser = usersService.createUser({
        name,
        email
    });

    // retorna usuario criado + status 201
    res.status(201).json(newUser);
};