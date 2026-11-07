import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';

// Lazy loading: cada página se descarga solo cuando el usuario la visita
const Home = lazy(() => import('../pages/Home'));
const ListaProductos = lazy(() => import('../pages/ListaProductos'));
const AgregarProducto = lazy(() => import('../pages/AgregarProducto'));
const DetalleProducto = lazy(() => import('../pages/DetalleProducto'));
const Carrito = lazy(() => import('../pages/Carrito'));
const QuienesSomos = lazy(() => import('../pages/QuienesSomos'));
const Contacto = lazy(() => import('../pages/Contacto'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Todas las rutas de la aplicación viven en este único archivo
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        {/* Rutas anidadas: /articulos, /articulos/nuevo y /articulos/:id (parámetro dinámico) */}
        <Route path="articulos">
          <Route index element={<ListaProductos />} />
          <Route path="nuevo" element={<AgregarProducto />} />
          <Route path=":id" element={<DetalleProducto />} />
        </Route>

        <Route path="carrito" element={<Carrito />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
