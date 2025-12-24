// Validação, autenticação, etc.v

module.exports = (req, res, next) => {
    const {name, email} = req.body;

    // nome obriagtório
    if(!name) {
        return res.status(400).json({
            error: "Nome obrigatorio"
        });
    }

    // tamanho minimo do nome
    if(!name.lenght < 3) {
        return res.status(400).json({
            error: "Nome deve ter pelo mneos 3 caracteres"
        });
    }

    // emaill válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            error: "Email invalido"
        });
    }

    // se tiver tudo ok, seguue o fluxo
    next();
};