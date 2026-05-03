export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl border border-gold/40 bg-zinc-900 p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gold">{title}</h3>
          <button className="rounded-md border border-zinc-600 px-3 py-1 text-sm hover:border-gold" onClick={onClose}>Fechar</button>
        </div>
        {children}
      </div>
    </div>
  );
}
