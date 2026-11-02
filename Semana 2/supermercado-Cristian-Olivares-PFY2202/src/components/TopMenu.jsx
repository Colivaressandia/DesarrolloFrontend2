import { NavLink } from 'react-router-dom';

const base = 'rounded px-3 py-2 text-sm font-medium transition sm:text-base';
const linkClass = ({ isActive }) =>
  `${base} ${isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-blue-700'}`;

export default function TopMenu() {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <nav
        aria-label="Menú de artículos"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6"
      >
        <NavLink to="/" end className="text-lg font-bold sm:text-xl">
          <span aria-hidden="true">🛒</span> Admin Supermercado
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/lista" className={linkClass}>
            <span aria-hidden="true">📋</span> Lista de Artículos
          </NavLink>
          <NavLink to="/agregar" className={linkClass}>
            <span aria-hidden="true">➕</span> Agregar Artículo
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
