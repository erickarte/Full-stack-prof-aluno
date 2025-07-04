const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profRoutes = require('./routes/profRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB

//mongoose.connect('mongodb://localhost:27017/prof_aluno_db')
  //.then(() => console.log('Conectado ao MongoDB!'))
  //.catch(err => console.log('Erro ao conectar ao MongoDB:', err));

mongoose.connect('mongodb://localhost:27017/prof_aluno_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
});

// Usando rotas
app.use('/api/profs', profRoutes);
app.use('/api/alunos', alunoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
