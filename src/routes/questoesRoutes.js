const express = require('express');

const router = express.Router();

const QuestoesController =
require('../controllers/questoesController');

router.get('/',
  QuestoesController.listarTodas
);

router.get('/buscar/tema/:tema',
  QuestoesController.buscarPorTema
);

router.get('/buscar/id/:id',
  QuestoesController.buscarPorId
);

router.get('/buscar/ano/:ano',
  QuestoesController.buscarPorAno
);

router.get('/buscar/vestibular/:vestibular',
  QuestoesController.buscarPorVestibular
);

module.exports = router;