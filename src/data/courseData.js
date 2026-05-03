export const modules = [
  {
    id: 'm1',
    title: 'Módulo 1 — IA sem complicação',
    color: 'from-amber-300/30 to-amber-600/20',
    border: 'border-amber-400/40',
    description: 'Entenda os fundamentos da IA e aplique no seu salão sem termos técnicos difíceis.',
    duration: '1h35',
    progress: 72,
    lessons: [
      { id: 'm1a1', name: 'Começando com IA no dia a dia', duration: '18 min', status: 'Concluída' },
      { id: 'm1a2', name: 'Ferramentas essenciais para beleza', duration: '22 min', status: 'Em andamento' },
      { id: 'm1a3', name: 'Primeiros comandos práticos', duration: '16 min', status: 'Não iniciada' },
    ],
  },
  { id: 'm2', title: 'Módulo 2 — Conteúdo sem travar', color: 'from-violet-300/30 to-violet-700/20', border: 'border-violet-400/40', description: 'Crie ideias, roteiros e posts em minutos com consistência e identidade.', duration: '2h10', progress: 44, lessons: [
    { id: 'm2a1', name: 'Ideias infinitas de conteúdo', duration: '20 min', status: 'Concluída' },
    { id: 'm2a2', name: 'Roteiros para Reels que convertem', duration: '24 min', status: 'Em andamento' },
    { id: 'm2a3', name: 'Legendas e CTA estratégicos', duration: '19 min', status: 'Não iniciada' },
  ]},
  { id: 'm3', title: 'Módulo 3 — WhatsApp Profissional', color: 'from-emerald-300/30 to-emerald-700/20', border: 'border-emerald-400/40', description: 'Padronize atendimento e venda mais com mensagens inteligentes e humanizadas.', duration: '1h50', progress: 18, lessons: [
    { id: 'm3a1', name: 'Estrutura de atendimento premium', duration: '21 min', status: 'Em andamento' },
    { id: 'm3a2', name: 'Respostas para objeções', duration: '17 min', status: 'Não iniciada' },
    { id: 'm3a3', name: 'Pós-atendimento que fideliza', duration: '15 min', status: 'Não iniciada' },
  ]},
  { id: 'm4', title: 'Módulo 4 — Agenda cheia e organizada', color: 'from-sky-300/30 to-sky-700/20', border: 'border-sky-400/40', description: 'Organize horários e reduza faltas com automações simples e comunicação clara.', duration: '1h42', progress: 0, lessons: [
    { id: 'm4a1', name: 'Confirmações automáticas', duration: '18 min', status: 'Não iniciada' },
    { id: 'm4a2', name: 'Lembretes e reagendamentos', duration: '20 min', status: 'Não iniciada' },
    { id: 'm4a3', name: 'Controle da agenda semanal', duration: '22 min', status: 'Não iniciada' },
  ]},
  { id: 'm5', title: 'Módulo 5 — Campanhas e vendas', color: 'from-rose-300/30 to-rose-700/20', border: 'border-rose-400/40', description: 'Crie campanhas rápidas para lotar horários e aumentar ticket médio.', duration: '2h05', progress: 0, lessons: [
    { id: 'm5a1', name: 'Campanhas sazonais com IA', duration: '25 min', status: 'Não iniciada' },
    { id: 'm5a2', name: 'Ofertas irresistíveis', duration: '23 min', status: 'Não iniciada' },
    { id: 'm5a3', name: 'Follow-up inteligente', duration: '20 min', status: 'Não iniciada' },
  ]},
  { id: 'm6', title: 'Módulo 6 — Profissionalização e crescimento', color: 'from-orange-300/30 to-orange-700/20', border: 'border-orange-400/40', description: 'Transforme seu atendimento em negócio escalável com posicionamento de autoridade.', duration: '2h20', progress: 0, lessons: [
    { id: 'm6a1', name: 'Marca pessoal no mercado da beleza', duration: '24 min', status: 'Não iniciada' },
    { id: 'm6a2', name: 'Plano de crescimento em 90 dias', duration: '26 min', status: 'Não iniciada' },
    { id: 'm6a3', name: 'Métricas para decisão', duration: '18 min', status: 'Não iniciada' },
  ]},
];

export const bonusItems = [
  { id: 'b1', title: '50 prompts prontos', description: 'Prompts para posts, vendas e atendimento.', prompt: 'Crie 10 ideias de Reels para salão focado em transformação capilar premium.' },
  { id: 'b2', title: 'Scripts de WhatsApp', description: 'Mensagens para agendamento, follow-up e fechamento.', prompt: 'Escreva uma mensagem de confirmação elegante para cliente de salão com tom acolhedor.' },
  { id: 'b3', title: 'Calendário de 30 dias', description: 'Plano de conteúdo diário para atrair clientes locais.', prompt: 'Monte um calendário de conteúdo de 30 dias para manicure com foco em retenção.' },
  { id: 'b4', title: 'Checklist de gravação', description: 'Passo a passo para gravar vídeos mais profissionais.', prompt: 'Crie um checklist rápido para gravar Reels no salão com qualidade e agilidade.' },
];
