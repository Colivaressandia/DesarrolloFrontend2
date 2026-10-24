import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import BottomNav from './components/BottomNav';
import './App.css';

export default function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h2>🛒 Supermercado App - PFY2202</h2>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      {/* Menú inferior con React Router */}
      <BottomNav />
    </div>
  );
}