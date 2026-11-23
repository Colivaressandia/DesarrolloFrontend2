import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Link, useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { urlDestino } from '../services/libreriaApi';
import { formatoCLP, plural } from '../utils/formato';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';

const OPCIONES_VIAJE = gql`
  query OpcionesViaje($destinoSlug: String!) {
    destino(destinoSlug: $destinoSlug) {
      slug
      vuelos {
        id
        aerolinea
        origen
        destino
        precio
        salida
        llegada
        disponible
      }
      hoteles {
        id
        nombre
        estrellas
        precioPorNoche
        entrada
        salida
        disponible
      }
    }
  }
`;

export default function Destino() {
  const { slug } = useParams();
  const destinoRest = useApi(urlDestino(slug));
  const destino = destinoRest.data;
  usePageTitle(destino?.nombre ?? 'Destino');

  const opciones = useQuery(OPCIONES_VIAJE, {
    variables: { destinoSlug: slug },
    fetchPolicy: 'cache-first',
  });

  const volver = <Link to="/" className="btn-secondary">← Ver destinos</Link>;

  if (destinoRest.cargando) return <Cargando mensaje={`Cargando ${slug}…`} tarjetas={1} />;
  if (destinoRest.error && !destinoRest.data) {
    return (
      <MensajeError error={destinoRest.error} que={`el destino «${slug}»`} onReintentar={destinoRest.reintentar}>
        {volver}
      </MensajeError>
    );
  }
  if (!destino) return null;

  return (
    <div>
      <section className="relative mb-7 min-h-72 overflow-hidden rounded-[2rem] bg-brand-900 shadow-[0_20px_50px_rgba(18,63,58,0.18)]">
        <img src={destino.imagen} alt={`Paisaje de ${destino.nombre}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/55 to-orange-500/10" />
        <div className="relative flex min-h-72 flex-col justify-end p-6 text-white sm:p-10">
          <div className="mb-auto self-end">{volver}</div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">{destino.pais}</p>
          <h1 className="mt-1 text-4xl font-black sm:text-5xl">{destino.nombre}</h1>
          <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base">{destino.descripcion}</p>
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="text-lg font-bold text-slate-900">Actividades populares</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {destino.actividades.map((actividad) => (
            <li key={actividad} className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
              ✓ {actividad}
            </li>
          ))}
        </ul>
      </section>

      {opciones.loading && <Cargando mensaje="Consultando vuelos y hoteles por GraphQL…" tarjetas={4} />}
      {opciones.error && (
        <MensajeError
          error={{ tipo: 'graphql', status: null, message: opciones.error.message }}
          que="las opciones de viaje"
          onReintentar={() => opciones.refetch()}
        >{volver}</MensajeError>
      )}

      {!opciones.loading && !opciones.error && opciones.data?.destino && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="vuelos">
            <h2 id="vuelos" className="mb-3 text-xl font-bold text-slate-900">
              Vuelos · {plural(opciones.data.destino.vuelos.length, 'opción', 'opciones')}
            </h2>
            {opciones.data.destino.vuelos.length ? (
              <div className="space-y-3">
                {opciones.data.destino.vuelos.map((vuelo) => (
                  <article key={vuelo.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-bold">{vuelo.aerolinea}</p><p className="text-sm text-slate-500">{vuelo.origen} → {vuelo.destino}</p></div>
                      <span className={vuelo.disponible ? 'badge bg-emerald-100 text-emerald-800' : 'badge bg-red-100 text-red-800'}>
                        {vuelo.disponible ? 'Disponible' : 'Sin cupos'}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">Salida: {vuelo.salida} · Llegada: {vuelo.llegada}</p>
                    <p className="mt-2 text-lg font-extrabold text-brand-700">{formatoCLP(vuelo.precio)}</p>
                  </article>
                ))}
              </div>
            ) : <p className="card text-center text-slate-500">No hay vuelos disponibles para este destino.</p>}
          </section>

          <section aria-labelledby="hoteles">
            <h2 id="hoteles" className="mb-3 text-xl font-bold text-slate-900">
              Hoteles · {plural(opciones.data.destino.hoteles.length, 'opción', 'opciones')}
            </h2>
            {opciones.data.destino.hoteles.length ? (
              <div className="space-y-3">
                {opciones.data.destino.hoteles.map((hotel) => (
                  <article key={hotel.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-bold">{hotel.nombre}</p><p className="text-sm text-amber-600">{'★'.repeat(hotel.estrellas)}</p></div>
                      <span className={hotel.disponible ? 'badge bg-emerald-100 text-emerald-800' : 'badge bg-red-100 text-red-800'}>
                        {hotel.disponible ? 'Disponible' : 'Completo'}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">Entrada: {hotel.entrada} · Salida: {hotel.salida}</p>
                    <p className="mt-2 text-lg font-extrabold text-brand-700">{formatoCLP(hotel.precioPorNoche)} <span className="text-xs font-normal text-slate-500">/ noche</span></p>
                  </article>
                ))}
              </div>
            ) : <p className="card text-center text-slate-500">No hay hoteles disponibles para este destino.</p>}
          </section>
        </div>
      )}
    </div>
  );
}
