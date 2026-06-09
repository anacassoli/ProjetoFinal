// Importa o model responsável pelas consultas ao banco de dados
const QuestoesModel = require('../model/questoesModel');

// Função para listar todas as questões cadastradas
async function listarTodas(req, res) {
  try {
    // Busca todas as questões no banco de dados
    const questoes =
      await QuestoesModel.listarTodas();
    // Retorna as questões encontradas
    res.status(200).json(questoes);
  } catch (erro) {
    // Retorna erro caso a consulta falhe
    res.status(500).json({
      mensagem: 'Erro ao listar questões',
      erro: erro.message
    });
  }
}

// Função para buscar uma questão pelo ID
async function buscarPorId(req, res) {
  try {
    // Converte o ID recebido para número
    const id = parseInt(req.params.id);
    // Verifica se o ID é válido
    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }
    // Busca a questão pelo ID informado
    const questao =
      await QuestoesModel.buscarPorId(id);
    // Verifica se a questão foi encontrada
    if (questao) {
      res.status(200).json(questao);
    } else {
      res.status(404).json({
        mensagem: `Questão ${id} não encontrada`
      });
    }
  } catch (erro) {

    // Retorna erro caso a consulta falhe
    res.status(500).json({
      mensagem: 'Erro ao buscar questão',
      erro: erro.message
    });
  }
}

// Função para buscar questões por tema
async function buscarPorTema(req, res) {
  try {
    // Obtém o tema enviado pela rota
    const { tema } = req.params;
    // Busca as questões do tema informado
    const questoes =
      await QuestoesModel.buscarPorTema(tema);
    // Retorna os resultados encontrados
    res.status(200).json(questoes);
  } catch (erro) {
    // Retorna erro caso a consulta falhe
    res.status(500).json({
      mensagem: 'Erro ao buscar questões por tema',
      erro: erro.message
    });
  }
}

// Função para buscar questões por vestibular
async function buscarPorVestibular(req, res) {
  try {
    // Obtém o vestibular enviado pela rota
    const { vestibular } = req.params;
    // Busca as questões do vestibular informado
    const questoes =
      await QuestoesModel.buscarPorVestibular(
        vestibular
      );
    // Retorna os resultados encontrados
    res.status(200).json(questoes);
  } catch (erro) {
    // Retorna erro caso a consulta falhe
    res.status(500).json({
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message
    });
  }
}

// Função para buscar questões por ano
async function buscarPorAno(req, res) {
  try {
    // Obtém o ano enviado pela rota
    const { ano } = req.params;
    // Busca as questões do ano informado
    const questoes =
      await QuestoesModel.buscarPorAno(ano);
    // Retorna os resultados encontrados
    res.status(200).json(questoes);
  } catch (erro) {
    // Retorna erro caso a consulta falhe
    res.status(500).json({
      mensagem: 'Erro ao buscar ano',
      erro: erro.message
    });
  }
}

// Exporta as funções para serem utilizadas nas rotas
module.exports = {
  listarTodas,
  buscarPorTema,
  buscarPorVestibular,
  buscarPorAno
};