// Importa o framework Express
const express = require('express');

// Cria um objeto de rotas do Express
const router = express.Router();

// Importa o controller responsável pelas questões
const QuestoesController =
require('../controllers/questoesController');

// Rota para listar todas as questões cadastradas
router.get('/',
  QuestoesController.listarTodas
);

// Rota para buscar questões por tema
router.get('/buscar/tema/:tema',
  QuestoesController.buscarPorTema
);

// Rota para buscar questões por ano
router.get('/buscar/ano/:ano',
  QuestoesController.buscarPorAno
);

// Rota para buscar questões por vestibular
router.get('/buscar/vestibular/:vestibular',
  QuestoesController.buscarPorVestibular
);

// Exporta as rotas para serem utilizadas no servidor
module.exports = router;