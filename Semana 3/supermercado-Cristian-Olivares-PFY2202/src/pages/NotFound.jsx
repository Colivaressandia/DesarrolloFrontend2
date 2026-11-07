import { Link } from 'react-router';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Página no encontrada');

  return (
    <div className="card mx-auto mt-10 max-w-md p-8 text-center">
      <p className="text-5xl" aria-hidden="true">🛒</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">404: página no encontrada</h1>
      <p className="mt-2 text-slate-500">La dirección que buscas no existe o fue movida.</p>
      <Link to="/" className="btn-primary mt-6">Volver al inventario</Link>
    </div>
  );
}
