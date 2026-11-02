import { Routes, Route } from 'react-router-dom';
// Contexto Global
import { InventoryProvider } from './context/InventoryContext';

// Componentes
import TopMenu from './components/TopMenu';
import BottomNav from './components/BottomNav';

// Páginas antiguas (Semana 1)
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';

// Páginas nuevas (Semana 2)
import ListaProductos from './pages/ListaProductos';
import AgregarProducto from './pages/AgregarProducto';

import './App.css';

export default function App() {
  return (
    <InventoryProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
        
        {/* Nuevo Menú Superior (Semana 2) */}
        <TopMenu />

        <main className="flex-1 w-full max-w-7xl mx-auto">
          <Routes>
            {/* Rutas de la semana 1 */}
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contacto" element={<Contacto />} />
            
            {/* Nuevas rutas con Estado Global (Semana 2) */}
            <Route path="/lista" element={<ListaProductos />} />
            <Route path="/agregar" element={<AgregarProducto />} />
          </Routes>
        </main>

        {/* Menú Inferior (Semana 1) */}
        <BottomNav />
      </div>
    </InventoryProvider>
  );
}