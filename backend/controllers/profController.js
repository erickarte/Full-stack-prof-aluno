const Prof = require('../models/prof');
const bcrypt = require('bcryptjs');

// Criar novo usuário
exports.createProf = async (req, res) => {
    try {
        const { name, password, profile } = req.body;
        const prof = new Prof({ name, password, profile });
        await prof.save();
        res.status(201).json(prof);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os usuários
exports.getProfs = async (req, res) => {
    try {
        const profs = await Prof.find();
        res.status(200).json(profs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar um usuário específico por ID
exports.getProfsById = async (req, res) => {
    try {
        const prof = await Prof.findById(req.params.id);
        if (!prof) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.status(200).json(prof);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fazer login
exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const prof = await Prof.findOne({ name });
        if (!prof) return res.status(400).json({ message: 'Professor não encontrado' });

        const isMatch = await bcrypt.compare(password, prof.password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido', prof });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar usuário
exports.updateProf = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, profile } = req.body;

        const updatedProf = await Prof.findByIdAndUpdate(id, { name, password, profile }, { new: true });
        if (!updatedProf) return res.status(404).json({ message: 'Professor não encontrado' });

        res.status(200).json(updatedProf);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir usuário
exports.deleteProf = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProf = await Prof.findByIdAndDelete(id);
        if (!deletedProf) return res.status(404).json({ message: 'Professor não encontrado' });

        res.status(200).json({ message: 'Professor excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
