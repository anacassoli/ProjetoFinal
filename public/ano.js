const apiBase = '/vestibular';

const searchButton = document.getElementById('searchButton');
const refreshButton = document.getElementById('refreshButton');
const message = document.getElementById('message');
const logoutButton = document.getElementById('logoutButton');
const searchInput = document.getElementById('searchInput');
const questionTable = document.getElementById('questionTable');

function getToken() {

  return localStorage.getItem('jwtToken');

}

function showMessage(text) {

  message.textContent = text;

  setTimeout(() => {

    message.textContent = '';

  }, 3000);

}

function getAuthHeaders() {

  const token = getToken();

  return {

    'Content-Type': 'application/json',

    Authorization: `Bearer ${token}`

  };

}

function redirectToLogin() {

  localStorage.removeItem('jwtToken');

  window.location.href = '/';

}

async function fetchJson(url, options = {}) {

  const token = getToken();

  if (!token) {

    redirectToLogin();

    return null;

  }

  const response = await fetch(url, options);

  if (response.status === 401) {

    redirectToLogin();

    return null;

  }

  if (!response.ok) {

    const data = await response.json().catch(() => ({}));

    throw new Error(data.mensagem || 'Erro na requisição');

  }

  return response.json();

}

async function loadQuestions() {

  const questions = await fetchJson(apiBase, {

    headers: getAuthHeaders()

  });

  if (questions) {

    renderTable(questions);

  }

}

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

    questionTable.appendChild(tr);

  });

}

async function handleSearch() {

  const term = searchInput.value.trim();

  if (!term) {

    await loadQuestions();

    return;

  }

  const questions = await fetchJson(
    `${apiBase}/buscar/ano/${encodeURIComponent(term)}`,
    {
      headers: getAuthHeaders()
    }
  );

  if (questions) {

    renderTable(questions);

  }

}

async function handleSave(event) {

  event.preventDefault();

  const tema = document.getElementById('tema').value.trim();

  const vestibular = document.getElementById('vestibular').value.trim();

  const ano = Number(document.getElementById('ano').value);

  const pergunta = document.getElementById('pergunta').value.trim();

  const resposta = document.getElementById('resposta').value.trim();

  const comentario = document.getElementById('comentario').value.trim();

  if (
    !tema ||
    !vestibular ||
    !ano ||
    !pergunta ||
    !resposta ||
    !comentario
  ) {

    showMessage('Preencha todos os campos.');

    return;

  }

  try {

    await fetchJson(apiBase, {

      method: 'POST',

      headers: getAuthHeaders(),

      body: JSON.stringify({

        tema,
        vestibular,
        ano,
        pergunta,
        resposta,
        comentario

      })

    });

    questionForm.reset();

    await loadQuestions();

    showMessage('Questão cadastrada com sucesso!');

  } catch (error) {

    showMessage(error.message);

  }

}

logoutButton.addEventListener('click', redirectToLogin);

searchButton.addEventListener('click', handleSearch);

refreshButton.addEventListener('click', loadQuestions);


loadQuestions();