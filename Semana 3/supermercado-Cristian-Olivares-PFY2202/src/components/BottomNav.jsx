import { NavLink } from 'react-router';

const ITEMS = [
  { to: '/', icono: '📦', texto: 'Inventario', end: true },
  { to: '/quienes-somos', icono: '🏢', texto: 'Quiénes Somos' },
  { to: '/contacto', icono: '✉️', texto: 'Contáctanos' },
];

const linkClass = ({ isActive }) => (isActive ? 'bottom-link bottom-link-active' : 'bottom-link');

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
