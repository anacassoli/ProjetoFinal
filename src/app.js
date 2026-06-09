// Seleciona o formulário de login
const loginForm = document.getElementById('loginForm');

// Seleciona a área onde as mensagens serão exibidas
const message = document.getElementById('message');

// Função para exibir mensagens ao usuário
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    message.textContent = '';
  }, 3000);
}

// Função responsável pelo login
async function handleLogin(event) {
  event.preventDefault();
  const email =
    document.getElementById('email')
    .value
    .trim();
  const password =
    document.getElementById('password')
    .value
    .trim();
  if (!email || !password) {
    showMessage(
      'Preencha e-mail e senha.'
    );
    return;
  }
  try {

    // Envia os dados para a rota de login
    const response = await fetch(
      '/auth/login',
      {
        method: 'POST', // Método HTTP utilizado
        headers: {
          'Content-Type':
          'application/json'
        },
        // Converte os dados para JSON
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    // Verifica se ocorreu erro no login
    if (!response.ok) {
      const data =
        await response.json();
      throw new Error(
        data.mensagem ||
        'Falha no login'
      );
    }

    // Obtém os dados retornados pela API
    const data =
      await response.json();
    localStorage.setItem(
      'jwtToken',
      data.token
    );
    window.location.href =
      '/questoes';
  } catch (error) {
    showMessage(error.message);
  }
}

loginForm.addEventListener(
  'submit',
  handleLogin
);