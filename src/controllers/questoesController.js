const QuestoesModel = require('../models/questoesModel');

async function listarTodas(req, res) {

  try {

    const questoes =
      await QuestoesModel.listarTodas();

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao listar questões',
      erro: erro.message
    });

  }

}

async function buscarPorId(req, res) {

  try {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {

      return res.status(400).json({
        mensagem: 'ID inválido'
      });

    }

    const questao =
      await QuestoesModel.buscarPorId(id);

    if (questao) {

      res.status(200).json(questao);

    } else {

      res.status(404).json({
        mensagem: `Questão ${id} não encontrada`
      });

    }

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar questão',
      erro: erro.message
    });

  }

}

async function buscarPorTema(req, res) {

  try {

    const { tema } = req.params;

    const questoes =
      await QuestoesModel.buscarPorTema(tema);

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar questões por tema',
      erro: erro.message
    });

  }

}

async function buscarPorVestibular(req, res) {

  try {

    const { vestibular } = req.params;

    const questoes =
      await QuestoesModel.buscarPorVestibular(
        vestibular
      );

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message
    });

  }

}

async function buscarPorAno(req, res) {

  try {

    const { ano } = req.params;

    const questoes =
      await QuestoesModel.buscarPorAno(ano);

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar ano',
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