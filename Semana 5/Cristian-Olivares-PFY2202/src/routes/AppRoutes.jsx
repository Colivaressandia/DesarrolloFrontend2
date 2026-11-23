import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Destino from '../pages/Destino';
import Simulador from '../pages/Simulador';
import NotFound from '../pages/NotFound';

export default function AppRoutes({ errorInicioMock }) {
  return (
    <Routes>
      <Route element={<MainLayout errorInicioMock={errorInicioMock} />}>
        <Route index element={<Home />} />
        <Route path="destinos/:slug" element={<Destino />} />
        <Route path="simulador" element={<Simulador />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
