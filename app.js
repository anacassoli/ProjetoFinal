// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o framework Express
const express = require('express');
// Importa o módulo para trabalhar com caminhos de arquivos
const path = require('path');
// Cria a aplicação Express
const app = express();
// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Middlewares
// Permite receber dados em formato JSON
app.use(express.json());
// Permite acessar arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
// Importa as rotas de autenticação
const authRoutes = require('./src/routes/authRoutes');
// Importa as rotas de questões
const vestibularRoutes = require('./src/routes/questoesRoutes');

// Auth
// Define o prefixo /auth para as rotas de autenticação
app.use('/auth', authRoutes);

// Questões
// Define o prefixo /vestibular para as rotas de questões
app.use('/vestibular', vestibularRoutes);
// Página de login
app.get('/', (req, res) => {
  // Envia o arquivo login.html
  res.sendFile(
    path.join(
      __dirname,
      'public',
      'login.html'
    )
  );
});

// Página inicial
app.get('/home', (req, res) => {
  // Envia o arquivo home.html
  res.sendFile(
    path.join(
      __dirname,
      'public',
      'home.html'
    )
  );
});

// Página de enunciados
app.get('/enunciados', (req, res) => {
  // Envia o arquivo enunciados.html
  res.sendFile(
    path.join(
      __dirname,
      'public',
      'enunciados.html'
    )
  );
});

// Página de temáticas
app.get('/tematicas', (req, res) => {
  // Envia o arquivo tematicas.html
  res.sendFile(
    path.join(
      __dirname,
      'public',
      'tematicas.html'
    )
  );
});

// Inicializa o servidor
app.listen(PORT, () => {
  // Exibe informações no terminal quando o servidor inicia
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});