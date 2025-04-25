const express = require('express');
const router = express.Router();
const { createProf, getProfs, login, updateProf, deleteProf, getProfById, getProfsById } = require('../controllers/profController');

// Rotas de usuários
router.post('/', createProf);
router.get('/', getProfs);
router.get('/:id', getProfsById);
router.post('/login', login);
router.put('/:id', updateProf); // Rota para atualizar usuário
router.delete('/:id', deleteProf); // Rota para deletar usuário

module.exports = router;
