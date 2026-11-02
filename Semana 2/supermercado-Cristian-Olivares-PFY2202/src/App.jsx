import { Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryProvider';

import TopMenu from './components/TopMenu';
import BottomNav from './components/BottomNav';

import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import ListaProductos from './pages/ListaProductos';
import AgregarProducto from './pages/AgregarProducto';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <InventoryProvider>
      <div className="flex min-h-screen flex-col bg-gray-50 pb-20 text-gray-800">
        <TopMenu />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/lista" element={<ListaProductos />} />
            <Route path="/agregar" element={<AgregarProducto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </InventoryProvider>
  );
}
