import { Suspense } from 'react';
import { Outlet } from 'react-router';
import TopMenu from '../components/TopMenu';
import BottomNav from '../components/BottomNav';

// Estructura compartida por todas las páginas: menú superior, contenido y menú inferior
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <TopMenu />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        {/* Mientras carga una página (lazy loading) se muestra este mensaje */}
        <Suspense fallback={<p role="status" className="py-10 text-center text-slate-500">Cargando…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <BottomNav />
    </div>
  );
}
