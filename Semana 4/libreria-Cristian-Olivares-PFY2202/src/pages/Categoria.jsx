import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { URL_CATEGORIAS, urlLibros } from '../services/libreriaApi';
import { plural } from '../utils/formato';
import PageHeader from '../components/PageHeader';
import BookCard from '../components/BookCard';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import AvisoObsoleto from '../components/AvisoObsoleto';

function ContenidoCategoria({ slug }) {
  const libros = useApi(urlLibros(slug));
  const categorias = useApi(URL_CATEGORIAS); // normalmente ya está en caché desde el inicio
  const [busqueda, setBusqueda] = useState('');

  const categoria = categorias.data?.find((c) => c.slug === slug);
  const nombre = categoria?.nombre ?? slug;
  usePageTitle(nombre);

  // El filtro se aplica en memoria sobre lo ya cargado: no genera nuevas peticiones
  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return (libros.data ?? []).filter(
      (l) => !q || l.titulo.toLowerCase().includes(q) || l.autor.toLowerCase().includes(q)
    );
  }, [libros.data, busqueda]);

  const volver = (
    <Link to="/" className="btn-secondary">
      ← Ver todas las categorías
    </Link>
  );

  return (
    <div>
      <PageHeader
        titulo={nombre}
        subtitulo={categoria?.descripcion ?? 'Libros de esta categoría'}
      >
        {volver}
      </PageHeader>

      {libros.cargando && <Cargando mensaje={`Cargando libros de ${nombre}…`} tarjetas={3} />}

      {!libros.cargando && libros.error && !libros.data && (
        <MensajeError error={libros.error} que={`los libros de la categoría «${nombre}»`} onReintentar={libros.reintentar}>
          {volver}
        </MensajeError>
      )}

      {!libros.cargando && libros.data && (
        <>
          {libros.obsoleto && <AvisoObsoleto onReintentar={libros.reintentar} />}

          {libros.data.length === 0 ? (
            <div className="card text-center">
              <p className="text-4xl" aria-hidden="true">📭</p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">Aún no hay libros en esta categoría</h2>
              <p className="mt-1 text-slate-600">Estamos preparando nuevos títulos. Mientras tanto, explora otras categorías.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:max-w-md">
                  <label htmlFor="busqueda" className="sr-only">Buscar por título o autor</label>
                  <input
                    id="busqueda"
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="🔍 Buscar por título o autor..."
                    className="input-field"
                  />
                </div>
                <p className="text-sm text-slate-500" aria-live="polite">
                  Mostrando {visibles.length} de {plural(libros.data.length, 'libro', 'libros')}
                </p>
              </div>

              {visibles.length > 0 ? (
                <section aria-label={`Libros de ${nombre}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibles.map((l) => (
                    <BookCard key={l.id} libro={l} />
                  ))}
                </section>
              ) : (
                <p className="card text-center text-slate-500">Ningún libro coincide con tu búsqueda.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// `key={slug}` reinicia la búsqueda al cambiar de categoría
export default function Categoria() {
  const { slug } = useParams();
  return <ContenidoCategoria key={slug} slug={slug} />;
}
