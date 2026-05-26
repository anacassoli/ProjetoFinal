const pool = require('../config/database');

async function listarTodas(req, res) {

  try {

    const resultado = await pool.query(`
      SELECT *
      FROM BuscaTudo
      ORDER BY num_qst
    `);

    res.status(200).json(
      resultado.rows
    );

  } catch (erro) {

    res.status(500).json({
      mensagem:
      'Erro ao listar questões',
      erro: erro.message
    });

  }

}

async function buscarPorId(req, res) {

  try {

    const id =
      parseInt(req.params.id);

    if (isNaN(id)) {

      return res.status(400).json({
        mensagem: 'ID inválido'
      });

    }

    const resultado =
      await pool.query(`
        SELECT *
        FROM BuscaTudo
        WHERE num_qst = $1
      `, [id]);

    if (
      resultado.rows.length === 0
    ) {

      return res.status(404).json({
        mensagem:
        'Questão não encontrada'
      });

    }

    res.status(200).json(
      resultado.rows[0]
    );

  } catch (erro) {

    res.status(500).json({
      mensagem:
      'Erro ao buscar questão',
      erro: erro.message
    });

  }

}

async function buscarPorTema(req, res) {

  try {

    const { tema } = req.params;

    const resultado =
      await pool.query(`
        SELECT *
        FROM BuscaTudo
        WHERE LOWER(nome_tema)
        LIKE LOWER($1)
      `, [`%${tema}%`]);

    res.status(200).json(
      resultado.rows
    );

  } catch (erro) {

    res.status(500).json({
      mensagem:
      'Erro ao buscar questões',
      erro: erro.message
    });

  }

}

async function buscarPorVestibular(
  req,
  res
) {

  try {

    const { vestibular } =
      req.params;

    const resultado =
      await pool.query(`
        SELECT *
        FROM BuscaTudo
        WHERE nome ILIKE $1
      `, [`%${vestibular}%`]);

    res.status(200).json(
      resultado.rows
    );

  } catch (erro) {

    res.status(500).json({
      mensagem:
      'Erro ao buscar vestibular',
      erro: erro.message
    });

  }

}

async function buscarPorAno(
  req,
  res
) {

  try {

    const { ano } = req.params;

    const resultado =
      await pool.query(`

        SELECT *
        FROM BuscaTudo
        WHERE ano_vest = $1

      `, [ano]);

    res.status(200).json(
      resultado.rows
    );

  } catch (erro) {

    res.status(500).json({

      mensagem:
      'Erro ao buscar ano',

      erro: erro.message

    });

  }

}

module.exports = {

  listarTodas,
  buscarPorId,
  buscarPorTema,
  buscarPorVestibular,
  buscarPorAno
};