import { useInventory } from '../hooks/useInventory';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ListaProductos() {
  usePageTitle('Lista de artículos');
  const { articulos } = useInventory();

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold text-gray-800">Lista de Artículos</h1>
      <p className="mb-6 text-sm text-slate-500">
        {articulos.length} artículos registrados actualmente en el inventario.
      </p>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <caption className="sr-only">Todos los artículos del inventario</caption>
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Nombre del Producto</th>
              <th scope="col" className="px-6 py-3">Marca</th>
              <th scope="col" className="px-6 py-3">Tipo de Producto</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {articulos.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-3 font-mono text-gray-500">{item.id}</td>
                <td className="px-6 py-3 font-bold">{item.nombre}</td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">{item.marca}</span>
                </td>
                <td className="px-6 py-3">{item.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
