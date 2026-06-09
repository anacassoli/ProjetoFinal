// Importa o framework Express
const express = require('express');

// Cria um objeto de rotas do Express
const router = express.Router();

// Importa o controller responsável pela autenticação
const AuthController = require('../controllers/authController');

// Cria a rota POST /login para realizar o login do usuário
router.post('/login', AuthController.login);

// Exporta as rotas para serem utilizadas no servidor
module.exports = router;