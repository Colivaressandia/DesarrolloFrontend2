import { useMemo, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { URL_DESTINOS } from '../services/libreriaApi';
import DestinationCard from '../components/DestinationCard';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import AvisoObsoleto from '../components/AvisoObsoleto';

export default function Home() {
  usePageTitle('Destinos');
  const [busqueda, setBusqueda] = useState('');
  const { data: destinos, cargando, error, obsoleto, reintentar } = useApi(URL_DESTINOS);

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return (destinos ?? []).filter((destino) =>
      !q || destino.nombre.toLowerCase().includes(q) || destino.pais.toLowerCase().includes(q)
    );
  }, [destinos, busqueda]);

  return (
    <div>
      <section className="relative mb-8 min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/70 bg-brand-900 px-6 py-10 text-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.7),0_20px_50px_rgba(21,142,212,0.22)] sm:px-10 sm:py-14">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85"
          alt="Avión sobrevolando las nubes"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/95 via-sky-800/55 to-cyan-300/5" />
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-emerald-200 drop-shadow">El viaje empieza aquí</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">Encuentra tu próximo destino</h1>
          <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">Descubre paisajes increíbles y compara vuelos y hoteles para tu próxima aventura.</p>
        </div>
        <div className="absolute bottom-7 right-7 hidden w-52 rotate-[-3deg] rounded-2xl border-2 border-dashed border-white/80 bg-sky-950/80 p-4 shadow-2xl backdrop-blur-md sm:block">
          <div className="flex items-center justify-between border-b border-white/30 pb-3">
            <span className="text-sm font-black tracking-[0.18em]">RM</span>
            <span className="rounded-full border border-white/50 px-2 py-1 text-[9px] font-bold">AGENCIA DE VIAJES</span>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-sky-200">Tu próxima ruta</p>
          <p className="mt-1 text-lg font-black">SCL — MUNDO</p>
        </div>
      </section>

      <section className="mb-7 grid overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-[0_8px_24px_rgba(45,157,192,0.10)] backdrop-blur sm:grid-cols-3" aria-label="Estilos de viaje">
        {[
          ['01', 'Costa', 'Playas, islas y días junto al mar'],
          ['02', 'Naturaleza', 'Montañas, lagos y paisajes abiertos'],
          ['03', 'Ciudades', 'Arquitectura, cultura y gastronomía'],
        ].map(([numero, titulo, detalle]) => (
          <div key={titulo} className="flex min-h-24 items-center gap-4 border-b border-sky-100 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="text-2xl font-black text-sky-500/70">{numero}</span>
            <div>
              <h3 className="font-black text-brand-900">{titulo}</h3>
              <p className="mt-1 text-xs text-slate-500">{detalle}</p>
            </div>
          </div>
        ))}
      </section>

      {!cargando && destinos && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/80 bg-gradient-to-b from-white/95 to-sky-50/90 p-4 shadow-[inset_0_1px_2px_white,0_8px_24px_rgba(45,157,192,0.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">Colección de verano</p>
            <h2 className="mt-1 text-xl font-black text-slate-900">Destinos populares</h2>
          </div>
          <div className="w-full sm:max-w-sm">
            <label htmlFor="buscar-destino" className="sr-only">Buscar destino o país</label>
            <input
              id="buscar-destino"
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar playa, ciudad o país..."
              className="input-field"
            />
          </div>
        </div>
      )}

      {cargando && <Cargando mensaje="Cargando destinos…" tarjetas={6} />}
      {!cargando && error && !destinos && (
        <MensajeError error={error} que="los destinos" onReintentar={reintentar} />
      )}
      {!cargando && destinos && (
        <>
          {obsoleto && <AvisoObsoleto onReintentar={reintentar} />}
          {visibles.length ? (
            <section aria-label="Destinos disponibles" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((destino) => <DestinationCard key={destino.id} destino={destino} />)}
            </section>
          ) : (
            <p className="card text-center text-slate-500">Ningún destino coincide con tu búsqueda.</p>
          )}
        </>
      )}
    </div>
  );
}
