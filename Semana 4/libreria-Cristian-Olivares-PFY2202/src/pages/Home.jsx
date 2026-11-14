import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { URL_CATEGORIAS } from '../services/libreriaApi';
import PageHeader from '../components/PageHeader';
import CategoryCard from '../components/CategoryCard';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import AvisoObsoleto from '../components/AvisoObsoleto';

export default function Home() {
  usePageTitle('Categorías');
  const { data: categorias, cargando, error, obsoleto, reintentar } = useApi(URL_CATEGORIAS);

  return (
    <div>
      <PageHeader
        titulo="Explora nuestras categorías"
        subtitulo="Elige una categoría para ver los libros disponibles."
      />

      {cargando && <Cargando mensaje="Cargando categorías…" tarjetas={6} />}

      {!cargando && error && !categorias && (
        <MensajeError error={error} que="las categorías" onReintentar={reintentar} />
      )}

      {!cargando && categorias && (
        <>
          {obsoleto && <AvisoObsoleto onReintentar={reintentar} />}
          <section aria-label="Categorías de libros" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((c) => (
              <CategoryCard key={c.id} categoria={c} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
