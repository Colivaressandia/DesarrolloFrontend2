const VARIANTES = {
  neutral: 'border-slate-200 bg-white',
  warning: 'border-amber-300 bg-amber-50',
  success: 'border-emerald-300 bg-emerald-50',
  info: 'border-brand-200 bg-brand-50',
};

export default function Metric({ icono, titulo, valor, variante = 'neutral' }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border p-4 shadow-sm ${VARIANTES[variante]}`}>
      <span className="text-3xl" aria-hidden="true">{icono}</span>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{titulo}</h2>
        <p className="text-xl font-bold text-slate-900">{valor}</p>
      </div>
    </div>
  );
}
