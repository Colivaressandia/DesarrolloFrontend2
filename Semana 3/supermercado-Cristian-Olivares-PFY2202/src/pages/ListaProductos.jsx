import { useInventory } from '../hooks/useInventory';
import { useFiltroArticulos } from '../hooks/useFiltroArticulos';
import { usePageTitle } from '../hooks/usePageTitle';
import { TIPOS_PRODUCTO } from '../data/constants';
import PageHeader from '../components/PageHeader';
import ProductTable from '../components/ProductTable';
import CampoSelect from '../components/form/CampoSelect';

const COLUMNAS_LISTA = ['id', 'nombre', 'marca', 'tipo', 'precio', 'stock', 'detalle'];

export default function ListaProductos() {
  usePageTitle('Lista de artículos');
  const { articulos } = useInventory();
  const { categoria, setCategoria, resultados, hayFiltros, limpiarFiltros } = useFiltroArticulos(articulos);

  return (
    <div>
      <PageHeader
        titulo="Lista de Artículos"
        subtitulo="Haz clic en un artículo para ver su detalle y agregarlo al carrito."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <CampoSelect
            id="categoria"
            label="Filtrar por categoría"
            placeholder="Todas las categorías"
            opciones={TIPOS_PRODUCTO}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500" aria-live="polite">
            Mostrando {resultados.length} de {articulos.length} artículos
          </p>
          {hayFiltros && (
            <button type="button" onClick={limpiarFiltros} className="btn-secondary">
              Quitar filtro
            </button>
          )}
        </div>
      </div>

      <ProductTable
        articulos={resultados}
        columnas={COLUMNAS_LISTA}
        caption="Artículos del inventario, filtrables por categoría"
        mensajeVacio={`No hay artículos en la categoría "${categoria}".`}
      />
    </div>
  );
}
