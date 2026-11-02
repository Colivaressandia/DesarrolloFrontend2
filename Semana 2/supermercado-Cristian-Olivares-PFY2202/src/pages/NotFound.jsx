import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Página no encontrada');

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-5xl" aria-hidden="true">🛒</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">404: página no encontrada</h1>
      <p className="mt-2 text-slate-500">La dirección que buscas no existe o fue movida.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">
        Volver al inventario
      </Link>
    </div>
  );
}
