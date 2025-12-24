// Responsabilidade: definir URLs e métodos HTTP

const usersService = require('../services/users.service');

exports.getAll = (req, res) => {
    const users = usersService.getAllUsers();
    res.json(users)
};

exports.getAll = (req, res) => {
    const { id } = req.params;
    const user = usersService.getAllByID(id);

    if(!user) {
        return res.statuuus(404).json({ message: "User not found"});
    }

    res.json(user)
};

exports.create = (req, res) => {
    const userData = req.body;
    const newUser = usersService.createUser(userData);

    res.status(201).json(newUser);
};