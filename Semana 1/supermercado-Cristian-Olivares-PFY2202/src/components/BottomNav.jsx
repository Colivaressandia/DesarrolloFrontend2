import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        end
      >
        📦 Inventario
      </NavLink>

      <NavLink 
        to="/quienes-somos" 
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        🏢 Quiénes Somos
      </NavLink>

      <NavLink 
        to="/contacto" 
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        ✉️ Contáctanos
      </NavLink>
    </nav>
  );
}