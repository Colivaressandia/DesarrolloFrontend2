import { NavLink } from 'react-router-dom';

const ITEMS = [
  { to: '/', icono: '📦', texto: 'Inventario', end: true },
  { to: '/quienes-somos', icono: '🏢', texto: 'Quiénes Somos' },
  { to: '/contacto', icono: '✉️', texto: 'Contáctanos' },
];

const linkClass = ({ isActive }) =>
  `flex flex-col items-center gap-0.5 rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition sm:flex-row sm:gap-2 sm:px-5 sm:py-2 sm:text-sm ${
    isActive
      ? 'border-blue-200 bg-blue-50 text-blue-600'
      : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-900'
  }`;

export default function BottomNav() {
  return (
    <nav
      aria-label="Menú principal"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] sm:justify-center sm:gap-5"
    >
      {ITEMS.map(({ to, icono, texto, end }) => (
        <NavLink key={to} to={to} end={end} className={linkClass}>
          <span aria-hidden="true">{icono}</span>
          <span>{texto}</span>
        </NavLink>
      ))}
    </nav>
  );
}
