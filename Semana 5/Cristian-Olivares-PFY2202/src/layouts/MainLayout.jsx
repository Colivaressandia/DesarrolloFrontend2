import { Outlet } from 'react-router';
import TopMenu from '../components/TopMenu';

export default function MainLayout({ errorInicioMock }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopMenu />
      <div className="travel-mosaic" aria-hidden="true">
        <div className="travel-mosaic-side travel-mosaic-left">
          <span className="travel-photo travel-photo-one" />
          <span className="travel-photo travel-photo-two" />
          <span className="travel-photo travel-photo-three" />
        </div>
        <div className="travel-mosaic-side travel-mosaic-right">
          <span className="travel-photo travel-photo-four" />
          <span className="travel-photo travel-photo-five" />
          <span className="travel-photo travel-photo-six" />
        </div>
      </div>
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        {errorInicioMock && (
          <p role="alert" className="alert alert-warning mb-5">
            No pudimos iniciar el servicio mock. La aplicación seguirá abierta, pero las consultas pueden fallar.
          </p>
        )}
        <Outlet />
      </main>
      <footer className="relative z-10 mt-10 overflow-hidden border-t border-white/50 bg-gradient-to-b from-sky-600 to-sky-900 py-6 text-center text-xs font-medium text-white/85">
        Rutas del Mundo · Agencia de viajes · REST y GraphQL simulados con MSW
      </footer>
    </div>
  );
}
