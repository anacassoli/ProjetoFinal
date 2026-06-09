// Importa a conexão com o banco de dados
const pool = require('../config/database');

// Função para listar todas as questões
async function listarTodas() {

  // Executa a consulta SQL
  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    ORDER BY num_qst
  `);

  // Retorna todas as linhas encontradas
  return result.rows;
}

// Função para buscar uma questão pelo ID
async function buscarPorId(id) {
  // Executa a consulta SQL filtrando pelo número da questão
  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE num_qst = $1
  `, [id]);
  return result.rows[0];
}

// Função para buscar questões por tema
async function buscarPorTema(tema) {
  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE nome_tema ILIKE $1
  `, [`%${tema}%`]);
  return result.rows;
}

// Função para buscar questões por vestibular
async function buscarPorVestibular(vestibular) {
  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE nome ILIKE $1
  `, [`%${vestibular}%`]);
  return result.rows;
}

// Função para buscar questões por ano
async function buscarPorAno(ano) {
  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE ano_vest = $1
  `, [ano]);
  return result.rows;
}

// Exporta as funções para serem utilizadas em outros arquivos
module.exports = {
  listarTodas,
  buscarPorTema,
  buscarPorVestibular,
  buscarPorAno
};