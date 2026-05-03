const modules = [
  {
    id: 1,
    title: 'Fundamentos de Prompting',
    level: 'Iniciante',
    duration: '35 min',
    description: 'Estrutura de prompts claros, contexto e critérios objetivos.',
    prompt: 'Atue como revisor técnico. Liste 3 riscos, 3 melhorias e 1 plano de correção priorizado.'
  },
  {
    id: 2,
    title: 'Agentes e System Instructions',
    level: 'Intermediário',
    duration: '42 min',
    description: 'Como definir guardrails e memória curta para consistência.',
    prompt: 'Siga estas regras: [regras]. Para cada resposta, valide segurança, precisão e ação recomendada.'
  },
  {
    id: 3,
    title: 'Code Review Determinístico',
    level: 'Avançado',
    duration: '58 min',
    description: 'Checklist técnico para reduzir variabilidade em análises.',
    prompt: 'Analise este diff. Responda em: bugs, performance, segurança e patch sugerido.'
  },
  {
    id: 4,
    title: 'Playbooks de Produção',
    level: 'Avançado',
    duration: '50 min',
    description: 'Padrões para operações reais e escaláveis em times.',
    prompt: 'Crie playbook com gatilho, diagnóstico, ações, rollback e métricas pós-ação.'
  }
];

const bonuses = [
  { title: 'Biblioteca de Prompts Premium', description: 'Templates editáveis por cenário.' },
  { title: 'Checklist de Segurança', description: 'Pontos essenciais antes de publicar.' }
];

const state = {
  favorites: new Set(JSON.parse(localStorage.getItem('cg_favorites') || '[]')),
  completed: new Set(JSON.parse(localStorage.getItem('cg_completed') || '[]')),
  search: '',
  onlyFavorites: false,
  selectedModuleId: null
};

const el = {
  moduleGrid: document.getElementById('moduleGrid'),
  bonusGrid: document.getElementById('bonusGrid'),
  moduleCount: document.getElementById('moduleCount'),
  searchInput: document.getElementById('searchInput'),
  filterFavoritesBtn: document.getElementById('filterFavoritesBtn'),
  progressLabel: document.getElementById('progressLabel'),
  progressFill: document.getElementById('progressFill'),
  modal: document.getElementById('moduleModal'),
  modalTitle: document.getElementById('modalTitle'),
  modalDescription: document.getElementById('modalDescription'),
  modalLevel: document.getElementById('modalLevel'),
  modalDuration: document.getElementById('modalDuration'),
  modalPrompt: document.getElementById('modalPrompt'),
  copyPromptBtn: document.getElementById('copyPromptBtn'),
  toggleCompleteBtn: document.getElementById('toggleCompleteBtn'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  toast: document.getElementById('toast')
};

function saveState() {
  localStorage.setItem('cg_favorites', JSON.stringify([...state.favorites]));
  localStorage.setItem('cg_completed', JSON.stringify([...state.completed]));
}

function filteredModules() {
  return modules.filter((m) => {
    const q = state.search.trim().toLowerCase();
    const searchOk = !q || [m.title, m.description, m.level].join(' ').toLowerCase().includes(q);
    const favOk = !state.onlyFavorites || state.favorites.has(m.id);
    return searchOk && favOk;
  });
}

function renderProgress() {
  const total = modules.length;
  const done = state.completed.size;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  el.progressLabel.textContent = `${done} de ${total} módulos concluídos`;
  el.progressFill.style.width = `${percent}%`;
}

function renderModules() {
  const data = filteredModules();
  el.moduleCount.textContent = `${data.length} exibidos`;
  el.moduleGrid.innerHTML = data.map((m) => {
    const favorite = state.favorites.has(m.id);
    const completed = state.completed.has(m.id);
    return `
      <article class="card ${completed ? 'completed' : ''}" data-id="${m.id}">
        <div class="meta">
          <span class="pill">${m.level}</span>
          <button class="favorite" data-fav="${m.id}" title="Favoritar">${favorite ? '★' : '☆'}</button>
        </div>
        <h3>${m.title}</h3>
        <p>${m.description}</p>
        <div class="meta"><small>${m.duration}</small><small>${completed ? 'Concluído' : 'Em andamento'}</small></div>
      </article>`;
  }).join('');
}

function renderBonuses() {
  el.bonusGrid.innerHTML = bonuses.map((b) => `
    <article class="card"><h3>${b.title}</h3><p>${b.description}</p></article>
  `).join('');
}

function openModuleModal(moduleId) {
  const m = modules.find((item) => item.id === moduleId);
  if (!m) return;
  state.selectedModuleId = m.id;
  el.modalTitle.textContent = m.title;
  el.modalDescription.textContent = m.description;
  el.modalLevel.textContent = m.level;
  el.modalDuration.textContent = m.duration;
  el.modalPrompt.textContent = m.prompt;
  el.toggleCompleteBtn.textContent = state.completed.has(m.id) ? 'Marcar como não concluído' : 'Marcar como concluído';
  el.modal.showModal();
}

function showToast(text) {
  el.toast.textContent = text;
  el.toast.classList.add('show');
  setTimeout(() => el.toast.classList.remove('show'), 1600);
}

el.moduleGrid.addEventListener('click', (event) => {
  const favId = event.target.dataset.fav;
  if (favId) {
    const id = Number(favId);
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    saveState();
    renderModules();
    return;
  }
  const card = event.target.closest('.card[data-id]');
  if (card) openModuleModal(Number(card.dataset.id));
});

el.searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderModules();
});

el.filterFavoritesBtn.addEventListener('click', () => {
  state.onlyFavorites = !state.onlyFavorites;
  el.filterFavoritesBtn.setAttribute('aria-pressed', String(state.onlyFavorites));
  el.filterFavoritesBtn.textContent = state.onlyFavorites ? 'Todos os módulos' : 'Somente favoritos';
  renderModules();
});

el.copyPromptBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(el.modalPrompt.textContent || '');
    showToast('Prompt copiado com sucesso.');
  } catch {
    showToast('Não foi possível copiar automaticamente.');
  }
});

el.toggleCompleteBtn.addEventListener('click', () => {
  const id = state.selectedModuleId;
  if (!id) return;
  state.completed.has(id) ? state.completed.delete(id) : state.completed.add(id);
  saveState();
  renderModules();
  renderProgress();
  openModuleModal(id);
});

el.closeModalBtn.addEventListener('click', () => el.modal.close());
el.modal.addEventListener('click', (event) => {
  if (event.target === el.modal) el.modal.close();
});

renderBonuses();
renderModules();
renderProgress();
