import { NavLink } from 'react-router';

const linkClass = ({ isActive }) => (isActive ? 'top-link top-link-active' : 'top-link');

export default function TopMenu() {
  return (
    <header className="bg-brand-800 text-white shadow-md">
      <nav
        aria-label="Menú principal"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6"
      >
        <NavLink to="/" className="text-lg font-bold sm:text-xl">
          <span aria-hidden="true">📚</span> Librería
        </NavLink>
        <div className="flex gap-1 sm:gap-2">
          <NavLink to="/" end className={linkClass}>
            Categorías
          </NavLink>
          <NavLink to="/simulador" className={linkClass}>
            Simulador
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
