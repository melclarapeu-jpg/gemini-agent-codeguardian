const services = [
  {
    title: 'Diagnóstico com IA',
    description: 'Analisa necessidades e sugere tratamentos personalizados para cada cliente.'
  },
  {
    title: 'Agenda inteligente',
    description: 'Organiza horários e reduz faltas com lembretes automáticos e insights.'
  },
  {
    title: 'Recomendações comerciais',
    description: 'Aumenta ticket médio com ofertas assertivas no momento certo.'
  }
]

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-12 text-slate-100">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-50">IA na Beleza</p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">Operação moderna para salões e clínicas de beleza</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Projeto front-end em React + Vite + Tailwind, pronto para evoluir com componentes reutilizáveis e dados fáceis de manter.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-xl border border-white/10 bg-slate-800/60 p-5">
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
