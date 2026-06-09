// Importa a biblioteca JWT para validar tokens
const jwt = require('jsonwebtoken');

// Middleware responsável por verificar se o usuário está autenticado
function verificarToken(req, res, next) {

  // Obtém o cabeçalho Authorization da requisição
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      mensagem: 'Token não fornecido'
    });
  }

  // Extrai apenas o token do cabeçalho
  const token = authHeader.split(' ')[1];
  try {
    const secret =
      process.env.JWT_SECRET || 'secret_jwt_default';

    // Verifica se o token é válido
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (erro) {

    // Retorna erro caso o token seja inválido ou expirado
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado'
    });
  }
}

// Exporta o middleware para ser utilizado nas rotas protegidas
module.exports = {
  verificarToken
};