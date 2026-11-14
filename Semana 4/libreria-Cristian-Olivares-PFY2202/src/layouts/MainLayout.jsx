import { Outlet } from 'react-router';
import TopMenu from '../components/TopMenu';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopMenu />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Librería · Actividad formativa de Desarrollo Frontend II · Datos entregados por una API REST mock (MSW)
      </footer>
    </div>
  );
}
