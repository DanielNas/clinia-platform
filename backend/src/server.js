const app = require('./app');

const PORT = 3000;

// inicia o servidor
app.listen(PORT, () => {
    console.log('Clinia APP rodando na porta ${PORT}')
});