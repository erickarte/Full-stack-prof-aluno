const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'Prof', required: true }
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
