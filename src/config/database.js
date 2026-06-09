// Carrega as variáveis do arquivo .env
require('dotenv').config();

// Importa a classe Pool da biblioteca PostgreSQL
const { Pool } = require('pg');

// Cria uma conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER, // Usuário do banco
  host: process.env.DB_HOST, // Endereço do servidor do banco
  database: process.env.DB_NAME, // Nome do banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco
  port: parseInt(process.env.DB_PORT) // Porta de conexão
});

// Testa a conexão com o banco de dados
pool.connect((erro, client, release) => {
  if (erro) {
    console.error(
      '❌ Erro ao conectar no PostgreSQL:',
      erro.message
    );
  } else {
    console.log('✅ PostgreSQL conectado');
    console.log(`📚 Banco: ${process.env.DB_NAME}`);
    release();
  }
});

// Exporta o pool para ser utilizado em outros arquivos
module.exports = pool;