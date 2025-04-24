const express = require('express');
const router = express.Router();
const { createAluno, getAlunos, updateAluno, deleteAluno, getAlunoById } = require('../controllers/alunoController');

// Rotas de plantações
router.post('/', createAluno);
router.get('/', getAlunos);
router.get('/:id', getAlunoById);
router.put('/:id', updateAluno); // Rota para atualizar plantação
router.delete('/:id', deleteAluno); // Rota para deletar plantação

module.exports = router;
