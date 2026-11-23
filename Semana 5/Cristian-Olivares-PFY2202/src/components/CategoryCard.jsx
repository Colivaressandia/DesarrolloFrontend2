import { Link } from 'react-router';
import { plural } from '../utils/formato';

export default function CategoryCard({ categoria }) {
  const { slug, nombre, descripcion, cantidad } = categoria;

  return (
    <Link
      to={`/categorias/${slug}`}
      className="card group block transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <h2 className="text-lg font-bold text-brand-900 group-hover:text-brand-700">{nombre}</h2>
      <p className="mt-1 text-sm text-slate-600">{descripcion}</p>
      <p className="mt-4">
        <span className="badge badge-info">
          {cantidad > 0 ? plural(cantidad, 'libro', 'libros') : 'Sin libros por ahora'}
        </span>
      </p>
    </Link>
  );
}
