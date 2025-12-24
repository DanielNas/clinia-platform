// Middleware de erro global

module.exports = (err, req, res, next) => {
    console.error('Erro capturado:', err)

    res.status(500).json({
        error: 'Erro interno do servidor'
    });
};