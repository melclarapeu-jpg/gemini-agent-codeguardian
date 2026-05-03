import { useMemo, useState } from 'react';
import { Play, Search, Star } from 'lucide-react';
import Modal from './components/Modal';
import { bonusItems, modules } from './data/courseData';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [copiedBonusId, setCopiedBonusId] = useState('');

  const filteredModules = useMemo(() => modules.filter((module) => {
    const source = `${module.title} ${module.description} ${module.lessons.map((lesson) => lesson.name).join(' ')}`.toLowerCase();
    return source.includes(query.toLowerCase());
  }), [query]);

  const filteredBonus = useMemo(() => bonusItems.filter((bonus) => `${bonus.title} ${bonus.description}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const totalProgress = Math.round(modules.reduce((acc, module) => acc + module.progress, 0) / modules.length);

  const toggleFavorite = (lessonId) => setFavorites((prev) => (prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]));

  const copyPrompt = async (bonus) => {
    await navigator.clipboard.writeText(bonus.prompt);
    setCopiedBonusId(bonus.id);
    setTimeout(() => setCopiedBonusId(''), 1800);
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <header className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3">
        <h1 className="text-lg font-bold tracking-wide text-gold">IA na Beleza</h1>
        <div className="relative w-48 md:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-zinc-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar módulo, aula ou bônus" className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-9 pr-3 text-sm outline-none focus:border-gold" />
        </div>
      </header>

      <section className="mx-auto mb-8 w-full max-w-6xl rounded-2xl border border-gold/40 bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 shadow-glow md:p-10">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Plataforma premium</p>
        <h2 className="mb-2 text-3xl font-bold md:text-5xl">IA na Beleza</h2>
        <p className="mb-5 max-w-2xl text-zinc-300">Use inteligência artificial para criar conteúdo, atender melhor, organizar sua agenda e vender mais no salão.</p>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-gold px-5 py-2 font-semibold text-zinc-900">Continuar assistindo</button>
          <button onClick={() => setShowTrailer(true)} className="rounded-lg border border-zinc-500 px-5 py-2 font-semibold hover:border-gold">Assistir trailer</button>
        </div>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-zinc-700">
          <div style={{ width: `${totalProgress}%` }} className="h-full rounded-full bg-gold" />
        </div>
        <p className="mt-2 text-sm text-zinc-400">Progresso geral: {totalProgress}%</p>
      </section>

      <section className="mx-auto mb-10 w-full max-w-6xl">
        <h3 className="mb-4 text-2xl font-semibold">Módulos</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((module) => (
            <button key={module.id} onClick={() => setSelectedModule(module)} className={`rounded-xl border ${module.border} bg-gradient-to-br ${module.color} p-4 text-left shadow-glow transition hover:scale-[1.02]`}>
              <p className="mb-2 text-sm text-zinc-300">{module.duration}</p>
              <h4 className="mb-2 font-semibold">{module.title}</h4>
              <p className="text-sm text-zinc-200">{module.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <h3 className="mb-4 text-2xl font-semibold">Bônus</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBonus.map((bonus) => (
            <div key={bonus.id} className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
              <h4 className="mb-2 font-semibold text-gold">{bonus.title}</h4>
              <p className="mb-3 text-sm text-zinc-300">{bonus.description}</p>
              <button onClick={() => copyPrompt(bonus)} className="rounded-md border border-gold/50 px-3 py-2 text-sm hover:bg-gold/10">{copiedBonusId === bonus.id ? 'Prompt copiado!' : 'Copiar prompt'}</button>
            </div>
          ))}
        </div>
      </section>

      <Modal open={Boolean(selectedModule)} title={selectedModule?.title} onClose={() => setSelectedModule(null)}>
        {selectedModule && (
          <div>
            <p className="mb-3 text-zinc-300">{selectedModule.description}</p>
            <p className="mb-4 text-sm text-zinc-400">Duração total: {selectedModule.duration}</p>
            <ul className="space-y-3">
              {selectedModule.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center justify-between rounded-lg border border-zinc-700 p-3">
                  <div>
                    <p className="font-medium">{lesson.name}</p>
                    <p className="text-sm text-zinc-400">{lesson.duration} • {lesson.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-full border border-gold/70 p-2"><Play className="size-4" /></button>
                    <button onClick={() => toggleFavorite(lesson.id)} className={`rounded-full border p-2 ${favorites.includes(lesson.id) ? 'border-gold text-gold' : 'border-zinc-600'}`}><Star className="size-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      <Modal open={showTrailer} title="Trailer — IA na Beleza" onClose={() => setShowTrailer(false)}>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-10 text-center">
          <Play className="mx-auto mb-3 size-12 text-gold" />
          <p className="text-zinc-200">Trailer simulado: aqui entrará o vídeo de apresentação do curso.</p>
        </div>
      </Modal>
    </main>
  );
}
