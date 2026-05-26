require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const authRoutes = require('./src/routes/authRoutes');

const vestibularRoutes =
  require('./src/routes/questoesRoutes');

// Auth
app.use('/auth', authRoutes);

// Questões
app.use('/vestibular', vestibularRoutes);

// Página de login
app.get('/', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'login.html'
    )
  );

});

app.get('/home', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'home.html'
    )
  );

});

app.get('/cadastro', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'cadastro.html'
    )
  );

});

app.get('/tematicas', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'tematicas.html'
    )
  );

});

// Servidor
app.listen(PORT, () => {

  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));

});