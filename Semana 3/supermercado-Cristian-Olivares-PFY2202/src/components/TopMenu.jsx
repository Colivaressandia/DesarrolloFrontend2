import { NavLink } from 'react-router';
import { useInventory } from '../hooks/useInventory';
import { totalUnidadesCarrito } from '../utils/inventario';

const linkClass = ({ isActive }) => (isActive ? 'top-link top-link-active' : 'top-link');

export default function TopMenu() {
  const { carrito } = useInventory();
  const unidades = totalUnidadesCarrito(carrito);

  return (
    <header className="bg-brand-800 text-white shadow-md">
      <nav
        aria-label="Menú de artículos"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6"
      >
        <NavLink to="/" end className="text-lg font-bold sm:text-xl">
          <span aria-hidden="true">🛒</span> Admin Supermercado
        </NavLink>
        <div className="flex gap-1 sm:gap-2">
          <NavLink to="/articulos" end className={linkClass}>
            <span aria-hidden="true">📋</span> Artículos
          </NavLink>
          <NavLink to="/articulos/nuevo" className={linkClass}>
            <span aria-hidden="true">➕</span> Agregar
          </NavLink>
          <NavLink to="/carrito" className={linkClass}>
            <span aria-hidden="true">🧺</span> Carrito
            {unidades > 0 && (
              <span className="ml-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
                <span aria-hidden="true">{unidades}</span>
                <span className="sr-only"> ({unidades} unidades en el carrito)</span>
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
