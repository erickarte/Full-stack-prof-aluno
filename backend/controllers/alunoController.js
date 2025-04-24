const Aluno = require('../models/aluno');

// Criar nova plantação
exports.createAluno = async (req, res) => {
    try {
        const { name, description, responsible } = req.body;
        const aluno = new Aluno({ name, description, responsible });
        await aluno.save();
        res.status(201).json(aluno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as plantações
exports.getAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('responsible', 'name');
        res.status(200).json(alunos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAlunoById = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('responsible', 'name');
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar plantação
exports.updateAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, situation, responsible } = req.body;

        const updatedAluno = await Aluno.findByIdAndUpdate(id, { name, situation, responsible }, { new: true });
        if (!updatedAluno) return res.status(404).json({ message: 'Aluno não encontrado' });

        res.status(200).json(updatedAluno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir plantação
exports.deleteAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAluno = await Aluno.findByIdAndDelete(id);
        if (!deletedAluno) return res.status(404).json({ message: 'Aluno não encontrado' });

        res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
