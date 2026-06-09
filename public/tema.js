const apiBase = '/vestibular';

const searchButton = document.getElementById('searchButton'); //botão busca pelo ID
const refreshButton = document.getElementById('refreshButton');//botão de atualização
const message = document.getElementById('message');//a´rea de mensagens
const logoutButton = document.getElementById('logoutButton');//botão de lougout
const searchInput = document.getElementById('searchInput');//campo de pesquisa
const questionTable = document.getElementById('questionTable');// Seleciona o corpo da tabela onde as questões serão exibidas

function getToken() { // Função para obter o token salvo no navegador

  return localStorage.getItem('jwtToken');   // Retorna o token JWT armazenado no localStorage

}

// Função para exibir mensagens ao usuário
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    message.textContent = '';
  }, 3000);
}

// Função que cria os cabeçalhos de autenticação
function getAuthHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}

// Função para voltar para a tela de login
function redirectToLogin() {
  localStorage.removeItem('jwtToken');
  window.location.href = '/';
}

// Função genérica para fazer requisições à API
async function fetchJson(url, options = {}) {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    return null;
  }

  const response = await fetch(url, options);
  if (response.status === 401) {   // Verifica se o token expirou ou é inválido
    redirectToLogin();
    return null;
  }

  if (!response.ok) { // Verifica se houve erro na requisição
    const data = await response.json().catch(() => ({}));
    throw new Error(data.mensagem || 'Erro na requisição');
  }
  return response.json();
  // Retorna os dados em formato JSON
}

// Função para carregar todas as questões
async function loadQuestions() {
  const questions = await fetchJson(apiBase, {   // Busca todas as questões cadastradas
    headers: getAuthHeaders()
  });
  if (questions) {
    renderTable(questions);
  }
}

// Função para preencher a tabela
function renderTable(questions) {
  questionTable.innerHTML = '';
  if (!questions || questions.length === 0) {
    questionTable.innerHTML =
      '<tr><td colspan=\"6\">Nenhuma questão encontrada.</td></tr>';
    return;
  }
  questions.forEach(question => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${question.nome_tema}</td>
      <td>${question.nome}</td>
      <td>${question.ano_vest}</td>
      <td>${question.enun_qst}</td>
      <td>${question.enun_res}</td>
      <td>${question.comentario}</td>
    `;
    questionTable.appendChild(tr); // Adiciona a linha à tabela
  });
}

// Função responsável pela busca
async function handleSearch() {
  const term = searchInput.value.trim();
  if (!term) {
    await loadQuestions();
    return;
  }

  // Busca questões pelo tema informado
  const questions = await fetchJson(
    `${apiBase}/buscar/tema/${encodeURIComponent(term)}`,
    {
      headers: getAuthHeaders()
    }
  );
  if (questions) {
    renderTable(questions);
  }
}

// Evento de clique para sair do sistema
logoutButton.addEventListener('click', redirectToLogin);
// Evento de clique para buscar questões
searchButton.addEventListener('click', handleSearch);
// Evento de clique para atualizar a tabela
refreshButton.addEventListener('click', loadQuestions);
// Carrega as questões automaticamente ao abrir a página
loadQuestions();