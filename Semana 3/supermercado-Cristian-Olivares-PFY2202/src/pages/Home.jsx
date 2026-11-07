import { useInventory } from '../hooks/useInventory';
import { useFiltroArticulos } from '../hooks/useFiltroArticulos';
import { useMetricasInventario } from '../hooks/useMetricasInventario';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatoCLP } from '../utils/formato';
import PageHeader from '../components/PageHeader';
import Metric from '../components/Metric';
import ProductTable from '../components/ProductTable';

export default function Home() {
  usePageTitle('Inventario');
  const { articulos } = useInventory();
  const { busqueda, setBusqueda, resultados } = useFiltroArticulos(articulos);
  const m = useMetricasInventario();

  return (
    <div>
      <PageHeader
        titulo="Gestión de Inventario"
        subtitulo="Panel de control de stock y abastecimiento en sucursales"
      />

      <section aria-label="Resumen del inventario" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Metric icono="📦" titulo="Total Productos" valor={`${m.totalProductos} ítems`} />
        <Metric icono="📊" titulo="Unidades en Stock" valor={`${m.unidadesStock} unids.`} />
        <Metric icono="⚠️" titulo="Stock Crítico" valor={`${m.stockCritico} alertas`} variante="warning" />
        <Metric icono="💰" titulo="Valor Inventario" valor={formatoCLP(m.valorInventario)} variante="success" />
        <Metric icono="🧺" titulo="En Carrito" valor={`${m.unidadesCarrito} unids.`} variante="info" />
      </section>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <label htmlFor="busqueda" className="sr-only">
            Buscar por nombre, marca o tipo de producto
          </label>
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar por nombre, marca o tipo..."
            className="input-field"
          />
        </div>
        <span className="text-sm text-slate-500" aria-live="polite">
          Mostrando: {resultados.length} productos
        </span>
      </div>

      <div className="mt-4">
        <ProductTable
          articulos={resultados}
          caption="Inventario de productos con precio, stock y estado"
          mensajeVacio="No se encontraron productos que coincidan con tu búsqueda."
        />
      </div>
    </div>
  );
}
