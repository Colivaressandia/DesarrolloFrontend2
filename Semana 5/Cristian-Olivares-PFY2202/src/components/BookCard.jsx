import { formatoCLP } from '../utils/formato';

const PORTADAS = [
  'from-brand-600 to-brand-800',
  'from-emerald-500 to-emerald-700',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-rose-700',
  'from-sky-500 to-sky-700',
];

export default function BookCard({ libro }) {
  const portada = PORTADAS[libro.id % PORTADAS.length];

  return (
    <article className="card flex gap-4">
      <div
        className={`flex h-24 w-16 shrink-0 items-center justify-center rounded bg-gradient-to-br ${portada} text-2xl font-bold text-white shadow`}
        aria-hidden="true"
      >
        {libro.titulo.charAt(0)}
      </div>
      <div className="min-w-0">
        <h2 className="font-bold leading-snug text-slate-900">{libro.titulo}</h2>
        <p className="text-sm text-slate-600">{libro.autor}</p>
        <p className="text-xs text-slate-500">Publicado en {libro.anio}</p>
        <p className="mt-2 text-lg font-extrabold text-brand-800">{formatoCLP(libro.precio)}</p>
      </div>
    </article>
  );
}
