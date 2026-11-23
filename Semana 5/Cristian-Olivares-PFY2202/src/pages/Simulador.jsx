import { useState } from 'react';
import { Link } from 'react-router';
import { usePageTitle } from '../hooks/usePageTitle';
import { MODOS, fijarModo, obtenerModo } from '../mocks/config';
import { invalidarCache } from '../services/apiClient';
import { apolloClient } from '../services/apolloClient';
import PageHeader from '../components/PageHeader';

const MOCK_ACTIVO = import.meta.env.VITE_USE_MOCKS !== 'false';

export default function Simulador() {
  usePageTitle('Simulador del servidor');
  const [modo, setModo] = useState(obtenerModo);

  const cambiarModo = (nuevo) => {
    fijarModo(nuevo);
    invalidarCache();
    apolloClient.clearStore();
    setModo(nuevo);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <section className="relative mb-6 h-52 overflow-hidden rounded-[2rem] bg-brand-900 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
          alt="Autopista panorámica"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 to-brand-700/20" />
        <div className="relative flex h-full flex-col justify-end p-7 text-white">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">Centro de pruebas</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Tu viaje, sin sorpresas</h1>
        </div>
      </section>
      <PageHeader titulo="Simulador del servidor" subtitulo="Prueba respuestas normales, lentas y con errores en REST y GraphQL." />
      {!MOCK_ACTIVO ? (
        <p className="alert alert-warning">El mock está desactivado. Activa VITE_USE_MOCKS para usar el simulador.</p>
      ) : (
        <>
          <fieldset className="card space-y-3">
            <legend className="sr-only">Comportamiento del servidor mock</legend>
            {Object.entries(MODOS).map(([clave, { etiqueta, detalle }]) => (
              <label key={clave} htmlFor={`modo-${clave}`} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${modo === clave ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input id={`modo-${clave}`} type="radio" name="modo" checked={modo === clave} onChange={() => cambiarModo(clave)} className="mt-1" />
                <span><span className="block font-semibold text-slate-900">{etiqueta}</span><span className="block text-sm text-slate-600">{detalle}</span></span>
              </label>
            ))}
          </fieldset>
          <p role="status" className="alert alert-success mt-4">Modo activo: <strong>{MODOS[modo].etiqueta}</strong>. Se aplica a REST y GraphQL.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary">Probar destinos</Link>
            <Link to="/destinos/santiago" className="btn-secondary">Probar Santiago</Link>
            <Link to="/destinos/no-existe" className="btn-secondary">Destino inexistente</Link>
          </div>
        </>
      )}
    </div>
  );
}
