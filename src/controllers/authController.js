// Importa a biblioteca JWT para gerar tokens de autenticação
const jwt = require('jsonwebtoken');

// Obtém o usuário autorizado definido no arquivo .env
const AUTH_USER = process.env.AUTH_USER;

// Obtém a senha autorizada definida no arquivo .env
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

// Função responsável pelo login
function login(req, res) {

  // Obtém o e-mail e a senha enviados pelo usuário
  const { email, password } = req.body;

  // Verifica se os campos foram preenchidos
  if (!email || !password) {
    return res.status(400).json({
      mensagem: 'E-mail e senha são obrigatórios'
    });
  }

  // Verifica se o e-mail e a senha estão corretos
  if (email !== AUTH_USER || password !== AUTH_PASSWORD) {
    return res.status(401).json({
      mensagem: 'Credenciais inválidas'
    });
  }

  // Cria os dados que serão armazenados dentro do token
  const payload = { email };

  // Obtém a chave secreta do .env ou usa uma padrão
  const secret = process.env.JWT_SECRET || 'secret_jwt_default';

  // Gera o token JWT com validade de 2 horas
  const token = jwt.sign(payload, secret, {
    expiresIn: '2h'
  });

  // Retorna o token para o usuário
  res.status(200).json({ token });
}

// Exporta a função login para ser utilizada nas rotas
module.exports = {
  login
};