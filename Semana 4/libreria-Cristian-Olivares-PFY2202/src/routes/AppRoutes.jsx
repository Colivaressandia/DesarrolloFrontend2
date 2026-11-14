import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Categoria from '../pages/Categoria';
import Simulador from '../pages/Simulador';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="categorias/:slug" element={<Categoria />} />
        <Route path="simulador" element={<Simulador />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
