//Programação do LOGIN!


// Seleciona o formulário de login pelo ID
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


// Função responsável por realizar o login
async function handleLogin(event) {
  event.preventDefault();   // Impede o recarregamento automático da página
  const email = document.getElementById('email').value.trim(); // Obtém o e-mail digitado
  const password = document.getElementById('password').value.trim();  // Obtém a senha digitada
  if (!email || !password) { // Verifica se os campos foram preenchidos
    showMessage('Preencha e-mail e senha.');
    return;
  }
  try {
    const response = await fetch('/auth/login', {   // Envia os dados para a rota de login
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {  // Verifica se houve erro no login
      const data = await response.json();
      throw new Error(data.mensagem || 'Falha no login');
    }


    const data = await response.json(); // Obtém os dados retornados pela API
    localStorage.setItem('jwtToken', data.token);     // Salva o token JWT no navegador
    window.location.href = '/home';
  } catch (error) {
    showMessage(error.message);
  }
}

// Adiciona o evento de envio do formulário
loginForm.addEventListener('submit', handleLogin);
