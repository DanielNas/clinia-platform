// Responsabilidade: regra de negócio

// importa o framework Express
let users = [
    { id: 1, name: 'Daniel', email: 'daniel@hootmail.com'}
];

// retorna todos usuarios
exports.getAllUsers = () => {
    return users;
};

// retorna usuario por ID
exports.getUserById = (id) => {
    return users.find(user => user.id === Number(id));
};

// cria um novo usuário
exports.createUser = (data) => {
    const newUser = {
        id: users.length + 1,
        name: data.name,
        email: data.email
    }

    // push correto
    users.push(newUser);
    return newUser;
};