const GeneticaButton = document.getElementById('GeneticaButton');

async function handleSearch1() {
    const term = 'Genética e Biotecnologia';

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

GeneticaButton.addEventListener('click', handleSearch1);

loadQuestions();