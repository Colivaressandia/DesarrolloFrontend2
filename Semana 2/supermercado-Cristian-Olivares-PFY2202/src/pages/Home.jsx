import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { usePageTitle } from '../hooks/usePageTitle';
import { UMBRAL_STOCK_CRITICO } from '../data/constants';

const clp = (n) => `$${n.toLocaleString('es-CL')}`;

function Metric({ icono, titulo, valor, color }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm ${color}`}>
      <span className="text-3xl" aria-hidden="true">{icono}</span>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{titulo}</h2>
        <p className="text-xl font-bold text-slate-900">{valor}</p>
      </div>
    </div>
  );
}

export default function Home() {
  usePageTitle('Inventario');
  const { articulos } = useInventory();
  const [busqueda, setBusqueda] = useState('');

  const q = busqueda.trim().toLowerCase();
  const filtrados = articulos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(q) ||
      a.marca.toLowerCase().includes(q) ||
      a.tipo.toLowerCase().includes(q)
  );

  const totalStock = articulos.reduce((acc, a) => acc + a.stock, 0);
  const stockCritico = articulos.filter((a) => a.stock < UMBRAL_STOCK_CRITICO).length;
  const valorTotal = articulos.reduce((acc, a) => acc + a.precio * a.stock, 0);

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Gestión de Inventario</h1>
      <p className="mt-1 text-sm text-slate-500">Panel de control de stock y abastecimiento en sucursales</p>

      <section aria-label="Resumen del inventario" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icono="📦" titulo="Total Productos" valor={`${articulos.length} ítems`} color="border-slate-200" />
        <Metric icono="📊" titulo="Unidades en Stock" valor={`${totalStock} unids.`} color="border-slate-200" />
        <Metric icono="⚠️" titulo="Stock Crítico" valor={`${stockCritico} alertas`} color="border-amber-300 bg-amber-50" />
        <Metric icono="💰" titulo="Valor Inventario" valor={clp(valorTotal)} color="border-emerald-300 bg-emerald-50" />
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-slate-500" aria-live="polite">
          Mostrando: {filtrados.length} productos
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Inventario de productos con precio, stock y estado</caption>
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th scope="col" className="px-4 py-3">ID</th>
              <th scope="col" className="px-4 py-3">Producto</th>
              <th scope="col" className="px-4 py-3">Marca</th>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3">Precio</th>
              <th scope="col" className="px-4 py-3">Stock</th>
              <th scope="col" className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length > 0 ? (
              filtrados.map((a) => {
                const ok = a.stock >= UMBRAL_STOCK_CRITICO;
                return (
                  <tr key={a.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-gray-500">#{a.id}</td>
                    <td className="px-4 py-3 font-bold">{a.nombre}</td>
                    <td className="px-4 py-3">{a.marca}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">{a.tipo}</span>
                    </td>
                    <td className="px-4 py-3">{clp(a.precio)}</td>
                    <td className="px-4 py-3"><strong>{a.stock}</strong> unids.</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {ok ? '● En Stock' : '▲ Crítico'}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No se encontraron productos que coincidan con tu búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
