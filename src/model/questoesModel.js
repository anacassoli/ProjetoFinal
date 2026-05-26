const pool = require('../config/database');
async function listarTodas() {

  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    ORDER BY num_qst
  `);

  return result.rows;

}

async function buscarPorId(id) {

  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE num_qst = $1
  `, [id]);

  return result.rows[0];

}

async function buscarPorTema(tema) {

  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE nome_tema ILIKE $1
  `, [`%${tema}%`]);

  return result.rows;

}

async function buscarPorVestibular(vestibular) {

  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE nome ILIKE $1
  `, [`%${vestibular}%`]);

    return result.rows;
}

async function buscarPorAno(ano) {

  const result = await pool.query(`
    SELECT *
    FROM BuscaTudo
    WHERE ano_vest = $1
  `, [ano]);

  return result.rows;

}

module.exports = {
  listarTodas,
  buscarPorId,
  buscarPorTema,
  buscarPorVestibular,
  buscarPorAno
};