import { NavLink } from 'react-router-dom';

export default function TopMenu() {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">🛒 Admin Supermercado</div>
      <div className="flex gap-4">
        <NavLink 
          to="/lista" 
          className={({ isActive }) => isActive ? "bg-blue-600 px-3 py-2 rounded font-semibold" : "hover:bg-blue-700 px-3 py-2 rounded transition"}
        >
          📋 Lista de Artículos
        </NavLink>
        <NavLink 
          to="/agregar" 
          className={({ isActive }) => isActive ? "bg-blue-600 px-3 py-2 rounded font-semibold" : "hover:bg-blue-700 px-3 py-2 rounded transition"}
        >
          ➕ Agregar Artículo
        </NavLink>
      </div>
    </nav>
  );
}