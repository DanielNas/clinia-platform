// Middleware de 404 (rota não encontrada)

module.exports = (req, res, next) => {
    res.status(404).json({
        error: 'Rota nao encontrada',
        method: req.method,
        path: req.originalUrl
    });
};

// Esse middleware só roda se nenhuma rota bateu.