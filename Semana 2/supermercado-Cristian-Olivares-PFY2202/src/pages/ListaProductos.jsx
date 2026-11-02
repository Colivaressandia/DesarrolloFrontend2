import { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

export default function ListaProductos() {
  // Obtenemos los artículos desde el Estado Global
  const { articulos } = useContext(InventoryContext);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventario Actual</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 border-b">ID</th>
              <th className="py-3 px-6 border-b">Nombre del Producto</th>
              <th className="py-3 px-6 border-b">Marca</th>
              <th className="py-3 px-6 border-b">Tipo de Producto</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {articulos.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-mono text-gray-500">{item.id}</td>
                <td className="py-3 px-6 font-bold">{item.nombre}</td>
                <td className="py-3 px-6">
                  <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs">{item.marca}</span>
                </td>
                <td className="py-3 px-6">{item.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}