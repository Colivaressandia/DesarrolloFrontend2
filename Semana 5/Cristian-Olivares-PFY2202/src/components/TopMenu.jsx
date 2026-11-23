import { NavLink } from 'react-router';

const linkClass = ({ isActive }) => (isActive ? 'top-link top-link-active' : 'top-link');

export default function TopMenu() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-gradient-to-b from-sky-500/95 to-cyan-700/95 text-white shadow-[0_5px_18px_rgba(20,130,185,0.28)] backdrop-blur">
      <nav aria-label="Menú principal" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-black tracking-tight sm:text-xl">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-gradient-to-br from-white via-amber-100 to-sky-300 text-sm font-black text-sky-800 shadow-[inset_0_2px_5px_white,0_4px_12px_rgba(0,70,130,0.35)]" aria-hidden="true">RM</span>
          Rutas del Mundo
        </NavLink>
        <div className="flex gap-1 sm:gap-2">
          <NavLink to="/" end className={linkClass}>Destinos</NavLink>
          <NavLink to="/simulador" className={linkClass}>Planear viaje</NavLink>
        </div>
      </nav>
    </header>
  );
}
